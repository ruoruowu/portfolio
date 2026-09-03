"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CompanyLink.module.css";

export type Company = {
  name: string;
  href: string;
  /* Square mark shown in the pill. */
  icon: string;
  /* 16:9 screenshot of the site, shown in the hover card. */
  preview: string;
  blurb: string;
};

/* Half the card's width, for clamping it inside the viewport. */
const HALF = 148;
const EDGE = 12;

/**
 * A company name in running prose, rendered as a favicon pill that raises a
 * screenshot of the site on hover — the pattern from benshih.design.
 *
 * The card is portalled to <body> rather than rendered in place. It has to be:
 * the hero sets `perspective` and its layers carry transforms, and either of
 * those makes an ancestor the containing block for `position: fixed`, so a
 * card rendered inline would be positioned against the tilting hero plane
 * instead of the viewport — and would rotate with it.
 */
export default function CompanyLink({ company }: { company: Company }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      // Centred on the pill, then held clear of both viewport edges.
      x: Math.min(
        Math.max(r.left + r.width / 2, HALF + EDGE),
        window.innerWidth - HALF - EDGE,
      ),
      y: r.top,
    });
  }, []);

  const show = useCallback(() => {
    /*
     * A card that opens on tap and can only be dismissed by tapping elsewhere
     * is worse than no card, and it would cover the link it describes. Touch
     * gets the plain link.
     */
    if (!window.matchMedia("(hover: hover)").matches) return;
    measure();
    setOpen(true);
  }, [measure]);

  const hide = useCallback(() => setOpen(false), []);

  /*
   * The card is fixed to the viewport but anchored to an element in the page,
   * so it has to be re-measured while the page moves under it. Cheap enough to
   * run on every scroll frame — it is one getBoundingClientRect, and only
   * while a card is actually open.
   */
  useEffect(() => {
    if (!open) return;
    const onMove = () => measure();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [open, measure]);

  return (
    <>
      <a
        ref={ref}
        className={styles.pill}
        href={company.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- see Marquee */}
        <img className={styles.mark} src={company.icon} alt="" />
        {company.name}
      </a>

      {/*
        Kept mounted once opened, and toggled with an attribute, so the card can
        transition out as well as in. Unmounting on pointer-leave would make it
        vanish on a hard cut.
      */}
      {/*
        `pos` is only ever set from a pointer or focus handler, so this branch
        cannot be reached during the server render — which is what makes it
        safe to reach for document.body without a mounted flag.
      */}
      {pos &&
        createPortal(
          <div
            className={styles.card}
            data-open={open || undefined}
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- see Marquee */}
            <img className={styles.shot} src={company.preview} alt="" />
            <div className={styles.meta}>
              <span className={styles.cardName}>{company.name}</span>
              <span className={styles.cardBlurb}>{company.blurb}</span>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
