import Link from "next/link";
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
  return (
    <div className={styles.case}>
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
      <div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag.label} className={`${styles.tag} ${styles[tag.tone]}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <Link href={href} className={styles.link}>
          Learn more
        </Link>
      </div>
    </div>
  );
}
