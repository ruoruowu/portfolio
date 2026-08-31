import Nav from "@/components/Nav";
import BlueprintReveal from "@/components/BlueprintReveal";
import BlueprintToggle from "@/components/BlueprintToggle";
import CaseCard, { type CaseCardProps } from "@/components/CaseCard";
import HeroStage from "@/components/HeroStage";
import Marquee, { type MarqueeItem } from "@/components/Marquee";
import styles from "./page.module.css";

/*
 * `readMinutes` is measured, not guessed: prose at 200 wpm plus 10s per figure,
 * counted off each case study as it currently renders (2026-08-30). Re-measure
 * when a case study's copy changes — a stale number is worse than none. EY has
 * no case study to read yet, so it carries no estimate.
 */
const CASES: CaseCardProps[] = [
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
    readMinutes: 4,
    status: "wip",
    cover: {
      src: "/paper-tots/home-cover.png",
      alt:
        "The Paper Tots landing page — a boy meeting a dragon, headlined ‘Stories for the kid you know best’ — with the spread editor and a finished classroom page layered over it, and the potato mascot below.",
    },
  },
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
    readMinutes: 4,
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
    readMinutes: 2,
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
    readMinutes: 2,
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
];

/*
 * Twenty, drawn from the resume and worded the way the discipline words them
 * today — "Design-to-Code" rather than "frontend engineering", "AI Product
 * Design" rather than "AI Design". Order is the reading order of the band, and
 * it is deliberate: the first few are what the rest of the page then proves.
 */
const SKILLS: MarqueeItem[] = [
  { label: "AI Product Design" },
  { label: "Design Systems" },
  { label: "0-to-1 Product Design" },
  { label: "End-to-End Flows" },
  { label: "Prototyping" },
  { label: "Design Strategy" },
  { label: "Product Discovery" },
  { label: "User Research" },
  { label: "Usability Testing" },
  { label: "A/B Testing" },
  { label: "Conversion Optimization" },
  { label: "Information Architecture" },
  { label: "Interaction Design" },
  { label: "Responsive Web Design" },
  { label: "Mobile App Design" },
  { label: "Motion Design" },
  { label: "Accessibility" },
  { label: "Design-to-Code" },
  { label: "Journey Mapping" },
  { label: "Stakeholder Alignment" },
];

/*
 * The marks in /public/tools are placeholders — the same cross-ruled box the
 * blueprint uses to reserve room for art. Drop a real logo in over one of
 * those files, keep the filename, and it appears here with no code change.
 */
const TOOLS: MarqueeItem[] = [
  { label: "Figma", icon: "/tools/figma.svg" },
  { label: "Figma Make", icon: "/tools/figma-make.svg" },
  { label: "Claude", icon: "/tools/claude.svg" },
  { label: "Claude Code", icon: "/tools/claude-code.svg" },
  { label: "Cursor", icon: "/tools/cursor.svg" },
  { label: "ChatGPT", icon: "/tools/chatgpt.svg" },
  { label: "Miro", icon: "/tools/miro.svg" },
  { label: "Jira", icon: "/tools/jira.svg" },
  { label: "GitHub", icon: "/tools/github.svg" },
];

/*
 * Seconds per loop. These are set from measured track lengths so all three rows
 * travel at about the same speed — ~42px/s horizontally, and a little over half
 * that vertically, where the eye has less runway and a fast column is harder to
 * read. Matching durations instead of speeds would have left the nine-item tools
 * row crawling beside the twenty-item band. Re-derive them if the lists change:
 * seconds = (length of one copy of the set) / 42.
 */
const BAND_SECONDS = 72;
const RAIL_SECONDS = 40;
const TOOLS_SECONDS = 24;

export default function Home() {
  return (
    <>
      <BlueprintReveal />
      <Nav active="Portfolio" />

      <Marquee
        className={styles.skillBand}
        items={SKILLS}
        direction="left"
        seconds={BAND_SECONDS}
        label="Skills"
      />

      <HeroStage
        className={styles.hero}
        artClassName={styles.heroArt}
        rail={
          <Marquee
            className={styles.rail}
            items={SKILLS}
            direction="up"
            seconds={RAIL_SECONDS}
            label="Skills, continued"
          />
        }
        footer={
          <div className={styles.tools}>
            <span className={styles.toolsLabel}>TOOLS</span>
            <Marquee
              items={TOOLS}
              direction="right"
              seconds={TOOLS_SECONDS}
              label="Tools"
            />
          </div>
        }
      >
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
          <BlueprintToggle />
        </div>
      </HeroStage>

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
