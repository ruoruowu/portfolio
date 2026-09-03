import { cookies } from "next/headers";
import {
  cookieNameFor,
  cookieOptions,
  tokenIfCorrect,
} from "@/lib/gate";

/**
 * The only way in. A Client Component posts { slug, password } here; on a
 * match this sets the gate's httpOnly cookie and the client re-renders the
 * route, at which point the server sends the protected content for the first
 * time. Nothing protected is ever in the page before that.
 *
 * A Route Handler rather than a Server Function because the unlock plays an
 * animation before the swap: the client needs to know it succeeded, and to
 * choose when the new UI arrives. A form action would return both at once.
 */

/**
 * Deliberately modest, and per-instance: enough to make a scripted guess at a
 * shared human-memorable password slow, not a substitute for a real limiter.
 * Serverless spreads requests across instances, so treat it as friction.
 */
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    // The map only ever holds keys seen this window; sweep the expired ones so
    // a long-lived instance does not accumulate them.
    if (attempts.size > 500) {
      for (const [k, v] of attempts) if (now > v.resetAt) attempts.delete(k);
    }
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

/* Behind a proxy the original scheme only survives in the forwarded header. */
function isHttps(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0].trim() === "https";
  return new URL(request.url).protocol === "https:";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { slug, password } =
    (body as { slug?: unknown; password?: unknown }) ?? {};

  if (typeof slug !== "string" || typeof password !== "string") {
    return Response.json({ ok: false }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (tooManyAttempts(`${ip}:${slug}`)) {
    return Response.json(
      { ok: false, reason: "throttled" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const token = tokenIfCorrect(slug, password);
  if (!token) {
    // No distinction between a wrong password and an unconfigured gate: which
    // one it is, is not the visitor's business.
    return Response.json({ ok: false, reason: "denied" }, { status: 401 });
  }

  (await cookies()).set(cookieNameFor(slug), token, cookieOptions(isHttps(request)));
  return Response.json({ ok: true });
}

/** Locks a gate again — used by the "lock" affordance and handy in testing. */
export async function DELETE(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return Response.json({ ok: false }, { status: 400 });

  (await cookies()).set(cookieNameFor(slug), "", {
    ...cookieOptions(isHttps(request)),
    maxAge: 0,
  });
  return Response.json({ ok: true });
}
