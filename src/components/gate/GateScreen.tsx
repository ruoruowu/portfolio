"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import styles from "./GateScreen.module.css";

export type GateVariant = "blueprint" | "draw" | "paper";

/**
 * How long the success animation runs before the protected page is asked for.
 * The client owns this timing, so the reveal is a beat rather than a jump cut;
 * `0` under reduced motion, where there is no beat to wait for.
 */
const EXIT_MS: Record<GateVariant, number> = {
  blueprint: 1250,
  draw: 1000,
  paper: 950,
};

export interface GateScreenProps {
  /** Which gate this is. Must match the slug the page passes to <Gate>. */
  slug: string;
  variant?: GateVariant;
  title?: string;
  blurb?: string;
  /** Sits under the field — usually how to ask for the password. */
  hint?: ReactNode;
  /**
   * Preview only. When set, the password is checked in the browser against
   * this value and no cookie is issued, so the three variants can be compared
   * without a configured gate. Never pass it from a real page.
   */
  demoPassword?: string;
  /** Preview only. Runs instead of re-rendering the route on success. */
  onUnlocked?: () => void;
}

function subscribeToMotionPreference(onChange: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const readMotionPreference = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/* The server has no media queries; assume motion and correct on hydration. */
const motionPreferenceOnServer = () => false;

export default function GateScreen({
  slug,
  variant = "blueprint",
  title = "This one's under wraps",
  blurb = "This case study covers work I can't publish openly. Enter the password and it opens up.",
  hint,
  demoPassword,
  onUnlocked,
}: GateScreenProps) {
  const router = useRouter();
  const inputId = useId();
  const messageId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "denied" | "granted">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionPreference,
    motionPreferenceOnServer,
  );

  const submit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (state === "checking" || state === "granted" || !password) return;

      setState("checking");
      setMessage(null);

      let outcome: "ok" | "denied" | "throttled" | "error";

      if (demoPassword !== undefined) {
        outcome = password === demoPassword ? "ok" : "denied";
      } else {
        try {
          const response = await fetch("/api/gate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug, password }),
          });
          outcome = response.ok
            ? "ok"
            : response.status === 429
              ? "throttled"
              : "denied";
        } catch {
          outcome = "error";
        }
      }

      if (outcome !== "ok") {
        setState("denied");
        setMessage(
          outcome === "throttled"
            ? "Too many tries. Give it a minute."
            : outcome === "error"
              ? "Couldn't reach the server. Try again."
              : "That's not the password.",
        );
        // The field keeps its text so a near-miss can be edited rather than
        // retyped; selecting it means a fresh attempt is just typing.
        inputRef.current?.select();
        return;
      }

      setState("granted");
      const wait = reducedMotion ? 0 : EXIT_MS[variant];
      window.setTimeout(() => {
        if (onUnlocked) onUnlocked();
        else router.refresh();
      }, wait);
    },
    [
      demoPassword,
      onUnlocked,
      password,
      reducedMotion,
      router,
      slug,
      state,
      variant,
    ],
  );

  return (
    <div
      className={styles.root}
      data-variant={variant}
      data-state={state}
    >
      <Nav active="Portfolio" />

      {/* Drafting furniture for the blueprint variant; inert everywhere else. */}
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.sheetFrame} aria-hidden="true" />
      <div className={styles.titleBlock} aria-hidden="true">
        <span>RESTRICTED</span>
        <span>SHT 00</span>
      </div>

      <main className={styles.main}>
        <div className={styles.stage}>
          {/*
            The drawn frame, variant "draw" only. Four separate strokes with
            pathLength normalised to 1, so the dash maths is independent of the
            card's real size and the corners still meet.
          */}
          <svg
            className={styles.drawnFrame}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              { x1: 0, y1: 0, x2: 100, y2: 0 },
              { x1: 100, y1: 0, x2: 100, y2: 100 },
              { x1: 100, y1: 100, x2: 0, y2: 100 },
              { x1: 0, y1: 100, x2: 0, y2: 0 },
            ].map((line, index) => (
              <line
                key={index}
                {...line}
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${index * 170}ms` }}
              />
            ))}
          </svg>

          <form className={styles.card} onSubmit={submit} noValidate>
            {/* The lifted corner, variant "paper" only. */}
            <span className={styles.fold} aria-hidden="true" />

            <span className={styles.badge}>Protected</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.blurb}>{blurb}</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={inputId}>
                Password
              </label>
              <input
                id={inputId}
                ref={inputRef}
                className={styles.input}
                type="password"
                value={password}
                autoComplete="off"
                autoFocus
                spellCheck={false}
                aria-invalid={state === "denied"}
                aria-describedby={message ? messageId : undefined}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (state === "denied") {
                    setState("idle");
                    setMessage(null);
                  }
                }}
              />
            </div>

            <button
              className={styles.submit}
              type="submit"
              disabled={!password || state === "checking" || state === "granted"}
            >
              {state === "checking"
                ? "Checking…"
                : state === "granted"
                  ? "Opening"
                  : "Unlock"}
            </button>

            {/* Always in the DOM so a message never reflows the card, and so
                assistive tech has a live region to announce into. */}
            <p className={styles.message} id={messageId} role="status">
              {message}
            </p>

            {hint && <p className={styles.hint}>{hint}</p>}
          </form>

          {/* The stamp, variant "draw" only. */}
          <span className={styles.stamp} aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M9 16.5l4.8 4.8L23 12" pathLength={1} />
            </svg>
          </span>
        </div>
      </main>
    </div>
  );
}
