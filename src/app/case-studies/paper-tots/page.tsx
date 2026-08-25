import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Paper Tots — Ruochen Wu",
  description:
    "AI-generated children's books that turn a kid's own idea into an illustrated story.",
};

const ROLE_CHIPS = [
  "Solo founding designer",
  "Research & product strategy",
  "Two-person engineering team",
  "No PM",
];

const DECISIONS = [
  {
    heading: "Turning a rough idea into a story that holds together",
    text: "Kids don't pitch a plot, they say something like “a dinosaur who's scared of the dark.” The intake flow had to do the work of turning a single fragment into a story with a beginning, a problem, and an ending, without the questions themselves feeling like homework for a five-year-old (or their parent).",
  },
  {
    heading: "Keeping a character recognizable across an entire book",
    text: "Generative illustration is strong panel-to-panel and weak at continuity. The design had to compensate for that: locking down a character reference early, constraining prompts per page, and building review points where inconsistency gets caught before a parent ever sees it.",
  },
  {
    heading: "Scoping what a two-person team could actually ship",
    text: "With no PM and two engineers, every design decision was also a scope decision. That meant favoring one flow done well over several done partially, and being explicit about what “in active development” means rather than shipping a feature-complete promise the team couldn't back.",
  },
];

export default function PaperTots() {
  return (
    <>
      <Nav active="Portfolio" />

      <header className={styles.header}>
        <span className={styles.badge}>In active development</span>
        <h1 className={styles.title}>Paper Tots</h1>
        <p className={styles.roleLine}>
          AI-generated children&apos;s books that turn a kid&apos;s own idea
          into an illustrated story, built solo end-to-end with a lean
          engineering team.
        </p>
        <div className={styles.chips}>
          {ROLE_CHIPS.map((chip) => (
            <span key={chip} className={styles.chip}>
              {chip}
            </span>
          ))}
        </div>
      </header>

      <section className={styles.situationBand}>
        <div className={styles.situationInner}>
          <div className={styles.situationLabel}>The situation</div>
          <div className={styles.situationGrid}>
            <div className={styles.problem}>
              <svg
                className={styles.problemIcon}
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M8,36 L8,14 Q8,10 12,10 L36,10 Q40,10 40,14 L40,36"
                  fill="none"
                  stroke="#191C1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8,36 L40,36"
                  stroke="#191C1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M15,28 L21,20 L27,25 L33,16"
                  fill="none"
                  stroke="#C0431F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className={styles.problemHeading}>Business problem</h3>
              <p className={styles.problemText}>
                Personalized children&apos;s media is either templated
                print-on-demand, which barely uses the kid&apos;s own idea, or
                bespoke and too costly to produce at consumer scale. There
                wasn&apos;t a good option in between.
              </p>
            </div>
            <div className={styles.problem}>
              <svg
                className={styles.problemIcon}
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M24,10 Q30,10 32,17 Q34,23 29,27 L29,32 L19,32 L19,27 Q14,23 16,17 Q18,10 24,10 Z"
                  fill="none"
                  stroke="#191C1E"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M20,37 L28,37"
                  stroke="#191C1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="19" r="3" fill="#245E5B" />
              </svg>
              <h3 className={styles.problemHeading}>User problem</h3>
              <p className={styles.problemText}>
                Parents want to spark a kid&apos;s imagination and watch their
                own idea become something real. Most story-generation tools
                produce output that&apos;s technically personalized but
                emotionally forgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <p className={styles.quote}>
          The idea has to still feel like the kid&apos;s, even after
          it&apos;s been through a model.
        </p>
      </section>

      <section className={styles.decisions}>
        {DECISIONS.map((decision, i) => (
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

      <section className={styles.closingBand}>
        <div className={styles.closingInner}>
          <div className={styles.closingLabel}>Where this stands</div>
          <p className={styles.closingText}>
            Paper Tots is in active development. These decisions are grounded
            in user research and product judgment, but not yet validated with
            usage data, that part is still ahead.
          </p>
          <Link href="/" className={styles.button}>
            Back to all work
          </Link>
        </div>
      </section>
    </>
  );
}
