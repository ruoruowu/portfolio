"use client";

import { type CSSProperties } from "react";
import { useInView } from "@/components/useInView";
import styles from "./page.module.css";

export interface Testimonial {
  quote: string;
  attribution: string;
}

/**
 * Two hand-drawn bubbles so the pair never reads as one shape stamped twice.
 * `body` is the closed contour (bubble + tail, drawn in one stroke); `sketch`
 * is a deliberately imperfect second pass that stops short of closing the loop,
 * the way a real pen does. Both live in a 480x272 box: bubble x20-455 / y21-231,
 * tail hanging to y267, and a little "ding" of sparkle strokes above the corner.
 */
const BUBBLES = [
  {
    body: "M22,54 C21,38 33,29 52,28 C156,21 336,22 428,28 C447,30 456,39 455,56 C459,110 458,168 454,206 C453,219 442,225 424,226 C340,230 260,231 122,230 C116,247 105,259 82,267 C74,270 70,264 75,258 C85,247 92,239 94,229 C81,229 68,229 56,228 C38,227 27,220 26,206 C22,160 18,102 22,54 Z",
    sketch:
      "M70,25 C170,18 338,19 430,25 C449,27 458,36 457,53 C461,108 460,170 456,208 C455,221 444,227 426,228 C342,232 262,233 124,232 C118,249 107,261 84,269 C76,272 72,266 77,260 C87,249 94,241 96,231 C83,231 70,231 58,230 C40,229 29,222 28,208 C24,162 20,104 24,56",
    sparkle: ["M410,20 L400,6", "M432,16 L430,2", "M452,20 L462,8"],
  },
  {
    body: "M24,50 C23,34 34,25 54,24 C158,17 334,18 426,25 C445,27 455,36 454,53 C458,108 457,166 452,204 C451,218 440,224 422,225 C338,229 258,230 120,229 C114,246 102,258 80,266 C72,269 68,263 73,257 C84,246 90,238 92,228 C79,228 66,228 54,227 C36,226 25,219 24,205 C20,158 20,98 24,50 Z",
    sketch:
      "M30,196 C26,150 26,94 30,50 C31,34 42,25 62,24 C164,17 336,18 428,24 C447,26 457,35 456,52 C460,107 459,167 454,205 C453,219 442,225 424,226 C340,230 260,231 122,230 C116,247 104,259 82,267",
    sparkle: ["M406,22 L396,8", "M428,18 L428,3", "M448,22 L460,10"],
  },
];

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const { ref, inView: drawn } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={`${styles.bubbleGrid} ${drawn ? styles.drawn : ""}`}
    >
      {items.map((item, i) => {
        const art = BUBBLES[i % BUBBLES.length];
        return (
          <figure
            key={item.attribution}
            className={styles.bubbleItem}
            style={{ "--i": i } as CSSProperties}
          >
            <div className={styles.bubble}>
              <svg
                className={styles.bubbleInk}
                viewBox="0 0 480 272"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className={styles.paper} d={art.body} />
                <path
                  className={styles.strokeMain}
                  d={art.body}
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className={styles.strokeSecond}
                  d={art.sketch}
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
                <g className={styles.sparkle}>
                  {art.sparkle.map((d) => (
                    <path
                      key={d}
                      d={d}
                      pathLength={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>
              </svg>
              <blockquote className={styles.bubbleQuote}>
                {item.quote}
              </blockquote>
            </div>
            <figcaption className={styles.bubbleAttribution}>
              {item.attribution}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
