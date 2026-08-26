import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Testimonials, { type Testimonial } from "./Testimonials";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Ruochen Wu",
  description:
    "Designer, researcher, and product leader building experiences that meaningfully connect people.",
};

const TESTIMONIALS: Testimonial[] = [
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
        <a
          href="https://drive.google.com/file/d/19c-5to9HqjLQBd3r6vBzh1wz7jB_bamF/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          My Resume
        </a>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialsLabel}>Testimonials</div>
          <Testimonials items={TESTIMONIALS} />
        </div>
      </section>
    </>
  );
}
