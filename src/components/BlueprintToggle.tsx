"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "bp-lock";

/*
 * `data-bp` on <html> is written by three different things — the boot script on
 * first paint, the reveal's own timers, and this button — so it is the source
 * of truth rather than anything this component holds. Subscribing to it keeps
 * the label honest no matter which of them moved last, and avoids syncing
 * state in an effect.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bp"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.getAttribute("data-bp") === "locked";

/* No document on the server, and the served HTML never ships locked. */
const getServerSnapshot = () => false;

/**
 * Holds the site in the drafting-pen palette instead of letting it resolve.
 *
 * The reveal in the root layout is a timed sequence that always ends in colour.
 * This is the other thing you might want from the same drawing — to stop it and
 * read it. It sets `data-bp="locked"`, a phase that shares the draft palette but
 * has no successor, so nothing is scheduled to take it away.
 *
 * The choice is remembered for the session and re-applied by the boot script
 * before paint, so it survives navigation without a flash of colour. That script
 * also refuses to clear a locked sheet, which is what makes pressing this
 * mid-reveal safe.
 */
export default function BlueprintToggle({ className }: { className?: string }) {
  const locked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const root = document.documentElement;

    if (root.getAttribute("data-bp") === "locked") {
      root.removeAttribute("data-bp");
      try {
        sessionStorage.removeItem(KEY);
      } catch {
        // A blocked store only costs the preference on the next page.
      }
    } else {
      root.setAttribute("data-bp", "locked");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-pressed={locked}
    >
      {locked ? "Exit blueprint" : "View as blueprint"}
    </button>
  );
}
