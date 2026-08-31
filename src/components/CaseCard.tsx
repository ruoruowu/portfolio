"use client";

import Link from "next/link";
import { useInView } from "./useInView";
import styles from "./CaseCard.module.css";

export type TagTone = "teal" | "coral" | "cream";

export interface CaseCardProps {
  tags: { label: string; tone: TagTone }[];
  title: string;
  description: string;
  href: string;
  status?: "wip";
  /** Real cover art. Replaces the stand-in screen when present. */
  cover?: { src: string; alt: string };
  /** Minutes to read the case study. Omitted where there is nothing to read. */
  readMinutes?: number;
  /** Plate number for the blueprint reveal's callout bubble. Decorative. */
  plate?: number;
}

export default function CaseCard({
  tags,
  title,
  description,
  href,
  status,
  cover,
  readMinutes,
  plate,
}: CaseCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`${styles.case} ${inView ? styles.revealed : ""}`}
    >
      {plate !== undefined && (
        <span className={styles.plate} aria-hidden="true">
          {plate}
        </span>
      )}
      <Link
        href={href}
        className={styles.visualLink}
        /*
         * The same destination as "Learn more" below, so it is redundant for
         * anyone not using a pointer: out of the tab order and out of the
         * accessibility tree, leaving exactly one link per card.
         */
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className={[
            styles.visual,
            cover ? styles.covered : "",
            !cover && status === "wip" ? styles.wip : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {cover ? (
            <>
              <img src={cover.src} alt={cover.alt} className={styles.cover} />
              {status === "wip" && (
                <span className={`${styles.wipLabel} ${styles.wipBadge}`}>
                  In active development
                </span>
              )}
            </>
          ) : status === "wip" ? (
            <span className={styles.wipLabel}>In active development</span>
          ) : (
            <div className={styles.screen}>
              <div className={styles.bar} />
              <div className={`${styles.bar} ${styles.short}`} />
              <div className={`${styles.bar} ${styles.tiny}`} />
              <div className={`${styles.bar} ${styles.tiny} ${styles.short}`} />
            </div>
          )}
        </div>
      </Link>
      {/*
        Every direct child here slides out from behind the visual, so each one
        has to be block-level and full width — hence the wrapper on the link.
      */}
      <div className={styles.content}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.label} className={`${styles.tag} ${styles[tag.tone]}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <div className={styles.linkRow}>
          <Link href={href} className={styles.link}>
            Learn more
          </Link>
          {readMinutes !== undefined && (
            <span className={styles.readTime}>{readMinutes} min read</span>
          )}
        </div>
      </div>
    </div>
  );
}
