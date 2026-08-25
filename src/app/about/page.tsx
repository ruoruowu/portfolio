import type { Metadata } from "next";
import Nav from "@/components/Nav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Ruochen Wu",
  description:
    "Designer, researcher, and product leader building experiences that meaningfully connect people.",
};

const TESTIMONIALS = [
  {
    quote:
      "Ruochen's ability to juggle documentation, research, and cross-team outreach to understand the landscape of push notifications within EG is impressive.",
    attribution: "Catherine Kim — Director at Expedia Group",
  },
  {
    quote:
      "You're one of the most positive and productive colleagues I've worked with in EY, and the end result shows that EY is lucky to have you on our team.",
    attribution: "Robin Das — Senior, EY",
  },
];

export default function About() {
  return (
    <>
      <Nav active="About" />

      <section className={styles.hero}>
        <h1 className={styles.heading}>About Me</h1>
        <p className={styles.bio}>
          I&apos;m a designer, researcher, and product leader versed in
          information science, business strategy, and empathy. I&apos;m
          passionate about building experiences that meaningfully connect
          people through thoughtful digital design.
        </p>
        <a href="#" className={styles.button}>
          My Resume
        </a>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialsLabel}>Testimonials</div>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.attribution} className={styles.testimonial}>
                <p className={styles.testimonialQuote}>{t.quote}</p>
                <p className={styles.testimonialAttribution}>
                  {t.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
