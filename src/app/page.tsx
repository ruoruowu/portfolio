import Nav from "@/components/Nav";
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
            <a href="#">Resume</a>
            <a href="#">LinkedIn</a>
            <a href="#">Paper Tots</a>
          </div>
        </div>
        <div className={styles.heroArt}>
          <svg width="100%" height="100%" viewBox="0 0 380 300" role="img">
            <title>Hand-drawn motifs</title>
            <desc>
              Three ink-sketched icons using the real teal and coral tokens.
            </desc>
            <g transform="translate(90,80) rotate(-6)">
              <path
                d="M-42,-26 Q-44,-28 -40,-28 L40,-28 Q44,-28 42,-24 L44,24 Q44,28 40,28 L-40,28 Q-44,28 -42,24 Z"
                fill="none"
                stroke="#191C1E"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M-13,-28 L-13,28"
                stroke="#191C1E"
                strokeWidth="1.2"
                strokeDasharray="2 5"
              />
              <circle cx="30" cy="-16" r="5" fill="#C0431F" />
            </g>
            <g transform="translate(260,70) rotate(5)">
              <path
                d="M-40,-21 Q-43,-23 -39,-24 L37,-25 Q42,-24 41,-18 L42,9 Q41,15 35,15 L-7,16 L-19,30 L-17,15 L-37,15 Q-42,14 -40,8 Z"
                fill="none"
                stroke="#191C1E"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="0" r="5" fill="#245E5B" />
            </g>
            <g transform="translate(180,210) rotate(-3)">
              <path
                d="M-20,0 Q-22,4 -18,6 L-5,17 Q-1,19 1,15 L22,-19"
                fill="none"
                stroke="#191C1E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="-22" r="5" fill="#8A6A12" />
            </g>
          </svg>
        </div>
      </section>

      <section className={styles.cases}>
        {CASES.map((c) => (
          <CaseCard key={c.title} {...c} />
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
            stroke="#191C1E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="14" r="4" fill="#C0431F" />
        </svg>
        <p>
          Off the clock, I draw and take photos.{" "}
          <a href="#">See the drawings</a> · <a href="#">See the photos</a>
        </p>
      </div>
    </>
  );
}
