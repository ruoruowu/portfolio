import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gate from "@/components/gate/Gate";
import Nav from "@/components/Nav";

/**
 * The real thing, one route: <Gate> with a real slug, a real cookie and a real
 * password out of the environment. The bench at /lab/gate compares animations
 * without a server; this proves the lock itself works on a given deploy.
 *
 * Set GATE_PASSWORD_LIVE (or GATE_PASSWORD) and try it.
 */
const enabled =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.GATE_LAB === "1";

export const metadata: Metadata = {
  title: "Gate test",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (!enabled) notFound();

  return (
    <Gate
      slug="live"
      variant="blueprint"
      title="This one's under wraps"
      blurb="A live test of the gate: the text below this line is rendered by the server only once the cookie is set."
      hint={<>Set GATE_PASSWORD_LIVE, or GATE_PASSWORD, and use that.</>}
    >
      <>
        <Nav active="Portfolio" />
        <main style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "80px var(--page-gutter)" }}>
          <h1 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: 34 }}>
            Unlocked.
          </h1>
          <p style={{ color: "var(--fg-muted)", marginTop: 12 }}>
            This paragraph was not in the page before you entered the password —
            check View Source on the locked state to confirm it.
          </p>
        </main>
      </>
    </Gate>
  );
}
