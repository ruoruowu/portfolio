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
}

export default function CaseCard({
  tags,
  title,
  description,
  href,
  status,
}: CaseCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`${styles.case} ${inView ? styles.revealed : ""}`}
    >
      <div className={`${styles.visual} ${status === "wip" ? styles.wip : ""}`}>
        {status === "wip" ? (
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
        </div>
      </div>
    </div>
  );
}
