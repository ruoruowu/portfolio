"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./CaseStudyPage.module.css";

/** How far the art trails the page as it scrolls. */
const PARALLAX_RATE = 0.32;
/**
 * Share of the artwork's height it may travel past the hero's bottom edge.
 * The mockups end at 84% of the PNG, so a small budget only ever clips the
 * empty floor gradient beneath them, never a device.
 */
const PARALLAX_TRAVEL = 0.1;

export default function ParallaxHero({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), rect.height);
      const travel = media.offsetHeight * PARALLAX_TRAVEL;
      const offset = Math.min(scrolled * PARALLAX_RATE, travel);
      media.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div ref={mediaRef} className={styles.heroMedia}>
        <div className={styles.heroMediaInner}>
          <img src={src} alt={alt} className={styles.heroImage} />
        </div>
      </div>
      <div className={styles.heroContent}>{children}</div>
    </section>
  );
}
