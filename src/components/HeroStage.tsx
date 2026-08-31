"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import styles from "./HeroStage.module.css";

/*
 * Same source of truth as BlueprintToggle: `data-bp` on <html>, written by the
 * boot script, the reveal's timers and the toggle. Subscribing to it rather
 * than holding phase in state is what keeps the stage honest when the visitor
 * locks the sheet mid-reveal.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bp"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => {
  const phase = document.documentElement.getAttribute("data-bp");
  return phase === "draft" || phase === "locked";
};

/* The served HTML never ships with the sheet up. */
const getServerSnapshot = () => false;

/*
 * The angle the sheet opens at, and how far the pointer may swing it from
 * there. Both are pre-depth: each layer scales them by its own --depth. The
 * base is deliberately larger than the range, so the stage never passes back
 * through flat while the drawing is up — it reads as an object on a desk the
 * whole time, not as a page that happens to tilt.
 */
const BASE_X = 5;
const BASE_Y = -9;
const RANGE_X = 6;
const RANGE_Y = 8;

/**
 * The hero, staged in three dimensions for as long as the blueprint sheet is
 * up: the copy and the artwork sit on two planes at different depths, both
 * rotating with the pointer, so the drawing reads as a sheet on a desk rather
 * than a flat page. When the sheet comes down the planes ease back to 0° and
 * the stage stops listening — the finished page is flat and static.
 *
 * The rotation is written to CSS custom properties on the stage element, not
 * to React state: a pointer move must not re-render the hero.
 */
export default function HeroStage({
  className,
  artClassName,
  rail,
  footer,
  children,
}: {
  className?: string;
  artClassName?: string;
  /* Sits alongside the artwork, on the artwork's plane. */
  rail?: ReactNode;
  /* Sits beneath both, still on the artwork's plane. */
  footer?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const sheetUp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const write = useCallback((rx: number, ry: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
     * Clearing the inline values hands the transform back to the CSS, where
     * the resting state is 0° — so taking the sheet down flattens the stage
     * without this effect having to animate anything itself.
     */
    if (!sheetUp) {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      return;
    }

    /*
     * A coarse pointer has nothing to track, and reduced motion never reaches
     * the draft phase in the first place. Both still get the opening tilt the
     * stylesheet sets — it just holds still.
     */
    const canTrack = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canTrack) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Pointer position across the viewport, as -1…1 from the centre.
        const nx = (event.clientX / window.innerWidth) * 2 - 1;
        const ny = (event.clientY / window.innerHeight) * 2 - 1;
        // Nose-up when the pointer is high, turned toward the pointer's side.
        write(BASE_X - ny * RANGE_X, BASE_Y + nx * RANGE_Y);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sheetUp, write]);

  return (
    <section ref={ref} className={`${className ?? ""} ${styles.stage}`}>
      <div className={`${styles.layer} ${styles.copy}`}>{children}</div>

      <div className={`${styles.layer} ${styles.art}`}>
        <div className={styles.artRow}>
          <div className={styles.artBox}>
            {/*
              Decorative, and drawn entirely by page.module.css as a background
              so the reduced-motion swap can be a plain media query. See
              .heroArt.
            */}
            <div className={artClassName} aria-hidden="true" />

            {/*
              The illustration is raster-flat colour art, so it cannot be drawn
              in pencil — it stays off the sheet (page.module.css fades it out)
              and this stands in its place: the boxed, cross-ruled elevation a
              plan uses to reserve room for artwork that is not drawn yet.
            */}
            <div className={styles.plate} aria-hidden="true">
              <span className={styles.plateLabel}>ELEV 01 — ARTWORK</span>
            </div>
          </div>

          {rail}
        </div>

        {footer}
      </div>
    </section>
  );
}
