import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import ParallaxHero from "./ParallaxHero";
import ReferenceVideo from "./ReferenceVideo";
import styles from "./CaseStudyPage.module.css";

export interface CaseStudyReference {
  /** The image, or the poster frame when `video` is set. */
  src: string;
  alt: string;
  label?: string;
  wide?: boolean;
  /**
   * An mp4 to play in place of the still. Some references only argue in
   * motion — an animation iterating, a page turning — and a frame of them
   * argues nothing. `src` becomes the poster.
   */
  video?: string;
}

export interface CaseStudyData {
  badge: string;
  badgeTone: "coral" | "teal";
  heroImage?: { src: string; alt: string };
  title: string;
  roleLine: string;
  roleChips: string[];
  stats?: { value: string; label: string }[];
  situation: {
    business: { icon: ReactNode; heading: string; text: string };
    user: { icon: ReactNode; heading: string; text: string };
  };
  quote: string;
  decisions: { heading: string; text: string }[];
  references?: CaseStudyReference[];
  learnings?: string[];
  /** Defaults to "What I learned"; a project still in flight wants a different tense. */
  learningsLabel?: string;
  closingLabel: string;
  closingText: string;
  cta: { href: string; label: string };
  /**
   * A shipped, public URL for this project. Sits with the status badge at the
   * top of the hero: it belongs to this project, not to the site around it.
   */
  liveSite?: { href: string; label: string };
}

export default function CaseStudyPage({ data }: { data: CaseStudyData }) {
  const intro = (
    <>
      <div className={styles.heroMeta}>
        <span className={`${styles.badge} ${styles[data.badgeTone]}`}>
          {data.badge}
        </span>
        {/*
          The one link in the hero that leaves the portfolio, so it is styled
          as a destination rather than as body copy. The dot carries "live"
          visually; the label carries it for anyone not seeing the dot.
        */}
        {data.liveSite && (
          <a
            href={data.liveSite.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.live}
            aria-label={`${data.liveSite.label} — live site, opens in a new tab`}
          >
            <span className={styles.liveDot} aria-hidden="true" />
            {data.liveSite.label}
            <span className={styles.liveArrow} aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.roleLine}>{data.roleLine}</p>
      <div className={styles.chips}>
        {data.roleChips.map((chip) => (
          <span key={chip} className={styles.chip}>
            {chip}
          </span>
        ))}
      </div>

      {data.stats && (
        <div className={styles.stats}>
          {data.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <Nav active="Portfolio" />

      {data.heroImage ? (
        <ParallaxHero src={data.heroImage.src} alt={data.heroImage.alt}>
          {intro}
        </ParallaxHero>
      ) : (
        <header className={styles.header}>{intro}</header>
      )}

      <section className={styles.situationBand}>
        <div className={styles.situationInner}>
          <div className={styles.situationLabel}>The situation</div>
          <div className={styles.situationGrid}>
            <div className={styles.problem}>
              <div className={styles.problemIcon}>
                {data.situation.business.icon}
              </div>
              <h3 className={styles.problemHeading}>
                {data.situation.business.heading}
              </h3>
              <p className={styles.problemText}>
                {data.situation.business.text}
              </p>
            </div>
            <div className={styles.problem}>
              <div className={styles.problemIcon}>
                {data.situation.user.icon}
              </div>
              <h3 className={styles.problemHeading}>
                {data.situation.user.heading}
              </h3>
              <p className={styles.problemText}>{data.situation.user.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <p className={styles.quote}>{data.quote}</p>
      </section>

      <section className={styles.decisions}>
        {data.decisions.map((decision, i) => (
          <div
            key={decision.heading}
            className={`${styles.decision} ${i % 2 === 1 ? styles.reverse : ""}`}
          >
            <div className={styles.numeral} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className={styles.decisionContent}>
              <h2 className={styles.decisionHeading}>{decision.heading}</h2>
              <p className={styles.decisionText}>{decision.text}</p>
            </div>
          </div>
        ))}
      </section>

      {data.references && data.references.length > 0 && (
        <section className={styles.referencesSection}>
          <div className={styles.referencesHeader}>Selected references</div>
          <div className={styles.referenceGrid}>
            {data.references.map((item) => (
              <figure
                key={item.src}
                className={`${styles.referenceCard} ${item.wide ? styles.wide : ""}`}
              >
                {item.video ? (
                  <ReferenceVideo
                    src={item.video}
                    poster={item.src}
                    className={styles.referenceImage}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={styles.referenceImage}
                  />
                )}
                {item.label && (
                  <figcaption className={styles.referenceLabel}>{item.label}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {data.learnings && (
        <section className={styles.learningsSection}>
          <div className={styles.learningsLabel}>
            {data.learningsLabel ?? "What I learned"}
          </div>
          <div className={styles.learningsList}>
            {data.learnings.map((item) => (
              <p key={item} className={styles.learningItem}>
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      <section className={styles.closingBand}>
        <div className={styles.closingInner}>
          <div className={styles.closingLabel}>{data.closingLabel}</div>
          <p className={styles.closingText}>{data.closingText}</p>
          <Link href={data.cta.href} className={styles.button}>
            {data.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
