import type { CSSProperties } from "react";

import styles from "./Marquee.module.css";

export type MarqueeItem = {
  label: string;
  /* Path under /public. Present on tools, absent on skills. */
  icon?: string;
};

type Direction = "left" | "right" | "up" | "down";

const VERTICAL: Direction[] = ["up", "down"];

/* "right" and "down" are the same animation played backwards. */
const REVERSED: Direction[] = ["right", "down"];

/**
 * One continuously sliding, edge-clipped row (or column) of pills.
 *
 * The set is rendered twice and the track is translated by exactly half its
 * length, which is what makes the loop seamless: at the moment the animation
 * resets, copy two sits precisely where copy one started. The trailing gap
 * lives inside each copy (see `.set` padding) so that half-length is a whole
 * number of pills plus one gap — without it the seam drifts by half a gap.
 *
 * The duplicate is `aria-hidden`, so a screen reader hears the list once.
 */
export default function Marquee({
  items,
  direction = "left",
  seconds,
  label,
  className,
}: {
  items: MarqueeItem[];
  direction?: Direction;
  /*
   * Seconds per full pass of one copy of the set — a prop rather than a shared
   * constant because the rows hold very different item counts, and it is the
   * pixels per second that has to match between them. Three rows each looping
   * in 40s while carrying 20, 20 and 9 items would move at three visibly
   * different speeds and read as three unrelated components.
   */
  seconds: number;
  label: string;
  className?: string;
}) {
  const vertical = VERTICAL.includes(direction);

  const set = (duplicate: boolean) => (
    <ul className={styles.set} aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <li key={item.label} className={styles.pill}>
          {item.icon ? (
            /* eslint-disable-next-line @next/next/no-img-element -- the
               optimizer rejects SVG without dangerouslyAllowSVG, and the rest
               of the site serves its art the same way. */
            <img className={styles.mark} src={item.icon} alt="" />
          ) : (
            <span className={styles.dot} aria-hidden="true" />
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${styles.marquee} ${
        vertical ? styles.vertical : styles.horizontal
      } ${className ?? ""}`}
      style={{ "--duration": `${seconds}s` } as CSSProperties}
      role="group"
      aria-label={label}
    >
      <div
        className={styles.track}
        data-reverse={REVERSED.includes(direction) || undefined}
      >
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}
