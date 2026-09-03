"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import styles from "./Nav.module.css";

/*
 * Portfolio lands on the work itself rather than the top of Home — the case
 * list is what the label promises. The mark beside it is the one that goes to
 * the top, so both destinations stay reachable from every page.
 */
const LINKS = [
  { href: "/#work", label: "Portfolio" },
  { href: "/about", label: "About" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/19c-5to9HqjLQBd3r6vBzh1wz7jB_bamF/view?usp=sharing";

/**
 * The nav, which becomes a floating island once the bar it starts as has
 * scrolled out of view.
 *
 * It is one element in both states rather than a bar plus a separate floating
 * copy: two copies would put the same three links in the document twice, which
 * a screen reader reads as two navigations and a keyboard walks through twice.
 *
 * Going fixed takes the bar out of flow, so the spacer below stands in for its
 * height — without it, everything under the nav jumps up by ~96px at the
 * moment of the switch.
 */
export default function Nav({ active = "Portfolio" }: { active?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  /* The bar's height is only knowable while the bar is still a bar. */
  const measured = useRef(false);

  const [floating, setFloating] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    /*
     * Without IntersectionObserver the nav simply stays a bar. That is the
     * whole feature degrading to the design it already had, which is a fine
     * place to land.
     */
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      /*
       * `top < 0` is what distinguishes "scrolled up past the top" from "not
       * yet reached" — a sentinel below the fold is also not intersecting, and
       * must not raise the island.
       */
      const gone = !entry.isIntersecting && entry.boundingClientRect.top < 0;

      if (gone && !measured.current && navRef.current) {
        measured.current = true;
        setBarHeight(navRef.current.offsetHeight);
      }
      setFloating(gone);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={styles.nav}
        data-floating={floating || undefined}
      >
        {/* Mark and wordmark are one target, so the whole thing goes home. */}
        <Link href="/" className={styles.logo}>
          <Logo size={32} />
          <span className={styles.wordmark}>ruochen.wu</span>
        </Link>
        <div className={styles.links}>
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.label === active ? styles.active : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </nav>

      {/* Holds the bar's place in the flow while the bar is floating. */}
      <div aria-hidden="true" style={{ height: floating ? barHeight : 0 }} />

      {/*
        Sits at the bar's lower edge. It is the thing being watched, not the
        nav itself: once the nav goes fixed it never leaves the viewport again,
        so observing it would latch the island on permanently.
      */}
      <div ref={sentinelRef} aria-hidden="true" />
    </>
  );
}
