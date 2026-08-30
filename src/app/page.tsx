import Nav from "@/components/Nav";
import BlueprintReveal from "@/components/BlueprintReveal";
import CaseCard, { type CaseCardProps } from "@/components/CaseCard";
import styles from "./page.module.css";

const CASES: CaseCardProps[] = [
  {
    tags: [
      { label: "Prototype", tone: "teal" },
      { label: "Conversion", tone: "coral" },
      { label: "AI Design", tone: "cream" },
    ],
    title: "Expedia Group: Partnerships",
    description:
      "Optimized and launched new end-to-end corporate partnership booking experiences for 200+ brands, driving $8.2M in annualized revenue.",
    href: "/case-studies/partnerships",
  },
  {
    tags: [
      { label: "Design Strategy", tone: "cream" },
      { label: "Email Design", tone: "teal" },
      { label: "Design System", tone: "coral" },
    ],
    title: "Expedia Group: Communications",
    description:
      "Owned end-to-end in-app, push, and email communications strategy, generating $15.6M annual gross profit and a 2.78% lift in app downloads.",
    href: "/case-studies/communications",
  },
  {
    tags: [
      { label: "0-to-1", tone: "cream" },
      { label: "User Research", tone: "teal" },
      { label: "Growth", tone: "coral" },
    ],
    title: "Expedia Group: Connected Profiles",
    description:
      "Led 0-to-1 social feature design connecting travelers with friends and family, driving a 2–3x increase in hotel saves and conversion.",
    href: "/case-studies/connected-profiles",
  },
  {
    tags: [
      { label: "User Research", tone: "teal" },
      { label: "Interaction Design", tone: "cream" },
      { label: "Web App", tone: "coral" },
    ],
    title: "EY: Engagement Center",
    description:
      "Launched a 2-sided resource management platform expected to reduce annual churn cost by $46M for EY Americas' 400,000+ employees.",
    href: "#",
  },
  {
    tags: [
      { label: "Product Leadership", tone: "coral" },
      { label: "0-to-1", tone: "cream" },
      { label: "AI Design", tone: "teal" },
    ],
    title: "Paper Tots",
    description:
      "AI-generated children's books that turn a kid's own idea into an illustrated story. Solo founding designer, researcher, and product leader, full ownership across a two-person engineering team.",
    href: "/case-studies/paper-tots",
    status: "wip",
  },
];

export default function Home() {
  return (
    <>
      <BlueprintReveal />
      <Nav active="Portfolio" />

      <section className={styles.hero}>
        <div>
          <h1 className={styles.heading}>
            Intentional designs.
            <br />
            Measurable{" "}
            <span className={styles.markWrap}>
              impact
              <svg viewBox="0 0 160 60" aria-hidden="true">
                <path
                  className={styles.markPath}
                  d="M8,32 C4,14 30,4 78,5 C130,6 154,16 150,32 C146,50 110,56 76,55 C36,54 6,48 10,34"
                />
              </svg>
            </span>
            .
          </h1>
          <p className={styles.subtext}>
            Designer, researcher, and product leader of 7 years and $60M+
            impact shipping app and web experiences. AI-fluent, focused on
            conversion and growth at Expedia Group, EY, and Pop Social. Solo
            founding designer of Paper Tots.
          </p>
          <div className={styles.heroLinks}>
            <a
              href="https://drive.google.com/file/d/19c-5to9HqjLQBd3r6vBzh1wz7jB_bamF/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/ruochenwu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="#">Paper Tots</a>
          </div>
        </div>
        {/*
          Decorative, and drawn entirely by page.module.css as a background so
          the reduced-motion swap can be a plain media query. See .heroArt.
        */}
        <div className={styles.heroArt} aria-hidden="true" />
      </section>

      <section className={styles.cases}>
        {CASES.map((c, i) => (
          <CaseCard key={c.title} {...c} plate={i + 1} />
        ))}
      </section>

      <p className={styles.placeholderNote}>
        The teal boxes are stand-ins for real screenshots, not final art.
      </p>

      <div className={styles.bonus}>
        <svg width="44" height="44" viewBox="0 0 60 60" aria-hidden="true">
          <path
            d="M12,42 Q10,46 14,48 L24,54 Q28,56 30,52 L48,18"
            fill="none"
            stroke="var(--ink-900)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="14" r="4" fill="var(--coral-700)" />
        </svg>
        <p>
          Off the clock, I draw and take photos.{" "}
          <a href="#">See the drawings</a> · <a href="#">See the photos</a>
        </p>
      </div>
    </>
  );
}
