import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * The password gate, server side. Nothing in this file may be imported from a
 * Client Component — it reads the passwords out of the environment, and a
 * client import would ship them to the browser. Everything the browser needs
 * goes through `POST /api/gate` instead.
 *
 * One gate per `slug`, so a set of protected pages can be opened
 * independently: unlocking `paper-tots` says nothing about `acme-nda`.
 *
 * Passwords live in the environment, never in the repo:
 *
 *   GATE_PASSWORD                 fallback for every gate
 *   GATE_PASSWORD_<SLUG>          overrides it for one gate, slug upper-cased
 *                                 with dashes as underscores (paper-tots →
 *                                 GATE_PASSWORD_PAPER_TOTS)
 *   GATE_SECRET                   optional; see `tokenFor` below
 */

/** How long an unlocked gate stays unlocked. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

/**
 * Bumping this invalidates every cookie already issued, which is the fast way
 * to revoke access without changing the passwords themselves.
 */
const TOKEN_VERSION = "v1";

export const cookieNameFor = (slug: string) => `gate_${slug}`;

const envKeyFor = (slug: string) =>
  `GATE_PASSWORD_${slug.toUpperCase().replace(/-/g, "_")}`;

/**
 * The password for one gate, or null when none is configured.
 *
 * Null fails *closed* — an unconfigured gate cannot be opened by anyone. A
 * forgotten environment variable therefore hides the page rather than
 * publishing it, which is the only safe direction for work that is under NDA.
 */
export function passwordFor(slug: string): string | null {
  const password = process.env[envKeyFor(slug)] ?? process.env.GATE_PASSWORD;
  return password && password.length > 0 ? password : null;
}

/**
 * What the cookie actually carries. Not the password: a keyed digest of the
 * slug, so a cookie read off one machine cannot be replayed as a password
 * anywhere else, and cannot be re-pointed at a different gate.
 *
 * The key is GATE_SECRET when set. Without it the password itself keys the
 * digest, which keeps deploys to one variable and has the useful property that
 * changing a password invalidates its outstanding cookies.
 */
function tokenFor(slug: string, password: string): string {
  const key = process.env.GATE_SECRET || password;
  return createHmac("sha256", key)
    .update(`${TOKEN_VERSION}:${slug}:${password}`)
    .digest("hex");
}

/** Length-independent, and constant-time once the lengths match. */
function equals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/**
 * True when this request already carries a valid cookie for the gate.
 *
 * Reading cookies opts the calling route into dynamic rendering, which is what
 * we want: a protected page must never be prerendered into a static payload.
 */
export async function isUnlocked(slug: string): Promise<boolean> {
  /*
   * Read first, and unconditionally, even though an unconfigured gate cannot
   * be opened whatever the cookie says. Reading cookies is what marks the
   * route dynamic, and returning before it would let a build with no password
   * in its environment prerender the *locked* page as static — after which no
   * password could ever open it, because the response would never be computed
   * again.
   */
  const cookie = (await cookies()).get(cookieNameFor(slug));

  const password = passwordFor(slug);
  if (!password || !cookie) return false;

  return equals(cookie.value, tokenFor(slug, password));
}

/** Checks a submitted password and returns the cookie value to set, or null. */
export function tokenIfCorrect(slug: string, attempt: string): string | null {
  const password = passwordFor(slug);
  if (!password) return null;
  return equals(attempt, password) ? tokenFor(slug, password) : null;
}

/**
 * `secure` is decided by the scheme the request actually arrived on rather than
 * by NODE_ENV, so a production build served over http://localhost — which is
 * how you would smoke-test one — can still set the cookie, while a real deploy
 * over https always gets the flag.
 */
export const cookieOptions = (secure: boolean) =>
  ({
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  }) as const;
