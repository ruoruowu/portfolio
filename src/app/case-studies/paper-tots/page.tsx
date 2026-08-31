import type { Metadata } from "next";
import CaseStudyPage, {
  type CaseStudyData,
} from "@/components/case-study/CaseStudyPage";
import { IconTrend, IconBulb } from "@/components/case-study/icons";

export const metadata: Metadata = {
  title: "Paper Tots — Ruochen Wu",
  description:
    "AI-generated children's books that turn a kid's own idea into an illustrated story.",
};

/**
 * SCAFFOLD — structure is final, narrative copy is not.
 *
 * The spine is process-forward: the case argues that a two-person team shipped
 * this because the generation itself was designed — prompts, voice, and evals
 * treated as design surfaces rather than model output. That ordering comes from
 * the case deck, where six of eleven slides are about how the work was made.
 *
 * Every `TODO:` is a stub for Ruochen. Headings, labels and image captions are
 * drawn from the deck and are factual; the prose between them is deliberately
 * unwritten rather than invented.
 *
 * The one block of finished copy is `decisions[1].text`, reproduced verbatim
 * from the "Replace with" blocks of the copy-update doc (Phase 1's spread fix
 * and Phase 2's cut of the "not just X, it's Y" construction are both applied).
 *
 * Images: hero and ten of the eleven references are real exports. The one
 * exception is the research slot, which keeps its labelled placeholder — see
 * the note on `references`.
 */
const data: CaseStudyData = {
  badge: "In active development",
  badgeTone: "coral",

  heroImage: {
    src: "/paper-tots/hero.png",
    alt: "Paper Tots on three devices: the landing page headlined “Stories for the kid you know best,” the phone step where a story's beginning and middle are mapped out, and the edit panel for a two-page classroom spread with per-character and background controls.",
  },

  title: "Paper Tots",

  // OUT OF SCOPE per the copy doc — the role line and the "no PM / owned it
  // end to end" framing stay exactly as they are.
  roleLine:
    "AI-generated children's books that turn a kid's own idea into an illustrated story, built solo end-to-end with a lean engineering team.",

  // The "User research" chip is now substantiated by decisions[0], which is
  // built on the interview guide and shadowing sessions in deck slide 3.
  // Resolves the TODO the copy doc asked for.
  roleChips: [
    "Solo founding designer",
    "User research",
    "Research & product strategy",
    "Two-person engineering team",
    "No PM",
  ],

  situation: {
    business: {
      icon: <IconTrend />,
      heading: "Business problem",
      text: "TODO: the market gap. The deck's research slide has the numbers if you want them — $1.8B in 2025 to a projected $9.4B by 2034, 20.1% CAGR, and 62M AI-generated children's books consumed in 2025. Decide whether the case leads with market size or with the quality gap between templated and bespoke.",
    },
    user: {
      icon: <IconBulb />,
      heading: "User problem",
      text: "TODO: the parent's problem, in your voice.",
    },
  },

  // TODO: pull-quote. Candidate from the deck's content guidelines, if you want
  // the case to state its own thesis: "The antidote to AI copy isn't trying
  // harder. It's being more specific."
  quote: "TODO: pull-quote.",

  decisions: [
    {
      heading: "Watching parents make a book before deciding what to build",
      text: "TODO. Shadowing sessions, facilitator-observer split, two-part structure with creation and review scheduled separately. This is the section that has to earn the “User research” chip, so name one finding and what it changed. SLOT 02.",
    },
    {
      // FINAL COPY — verbatim from the copy-update doc, Phases 1 and 2 applied.
      // Phase 1: "the first full page generates" -> "the first spread
      //   generates: two pages, not one".
      // Phase 2: the "not just X, it's Y" construction is gone.
      heading: "Staging generation so cost and trust point the same way",
      text: "Instead of generating everything at once, I broke the experience into stages. Characters appear first, separate from the story text. After a short wait, the first spread generates: two pages, not one. A user sees real progress before the product has spent money generating content they haven't purchased yet. Cost forced the staging. Trust is what makes it work. Seeing something appear, something recognizably theirs, is what keeps a user in the flow long enough to commit.",
    },
    {
      heading: "Treating the illustration prompt as a design system",
      text: "TODO. Four named art styles, each specified the way a design system specifies a component: primary medium, linework, colour strategy, texture density. The point to make is that consistency across a book came from constraining the prompt, not from picking a better model. SLOT 04.",
    },
    {
      heading: "Writing a voice the model can't smooth over",
      text: "TODO. Tone shifts by context — marketing, creation, confirmation, error — against a fixed voice, plus the DO and DON'T pairs that keep generated copy specific. Worth connecting back to the case's own copy discipline. SLOT 05.",
    },
    {
      heading: "Evaluating output like a product surface",
      text: "TODO. A whole-book rubric scoring story, visual and book dimensions, with hard-gate failures that block publication. This is where character inconsistency actually gets caught before a parent sees it. SLOT 06.",
    },
    {
      heading: "Designing in code, because the team was two people",
      text: "TODO. Design-to-code directly in the repo, and the page-flip animation iterated V1 through V4. The honest version of this section explains what the approach cost as well as what it bought. SLOT 07.",
    },
  ],

  /*
   * Real exports, in the order the decisions above make their case. Two of
   * them are video: the page flip only argues in motion, and a still of an
   * animation argues nothing.
   *
   * Still missing: SLOT 02, the research visual. Nothing in the asset folder
   * shows the interview guide or a shadowing session, so that slot keeps its
   * labelled placeholder rather than borrowing an unrelated screenshot.
   */
  references: [
    {
      src: "/paper-tots/brand-mascot-poster.jpg",
      video: "/paper-tots/brand-mascot.mp4",
      alt: "Two Paper Tots mascots: a small potato wearing an open book as a hat, and a larger potato in round reading glasses, drifting together.",
      label:
        "Brand — the child and the parent as a pair, which is the positioning principle in one image: the child is a creative participant, the parent a guide.",
      wide: true,
    },
    {
      src: "/paper-tots/research.svg",
      alt: "Placeholder for the research visual.",
      label:
        "SLOT 02 · Deck slide 3 — the interview guide and a shadowing session. Still to export; no asset for this one yet.",
    },
    {
      src: "/paper-tots/staged-generation.png",
      alt: "The internal Story Lab: raw story inputs on the left, and on the right two generated characters, Charlie and Mama, each with a five-star rating and an optional reason field.",
      label:
        "Staged generation — characters arrive first, before a single story page is generated, and each one can be rated on its own.",
      wide: true,
    },
    {
      src: "/paper-tots/art-styles.png",
      alt: "A spreadsheet specifying four art styles — Cartoon, Whimsical, Minimal, Realistic — across primary medium, linework style, colour strategy and texture density, each with the same scene rendered as an example.",
      label:
        "The illustration prompt as a design system: four styles, each specified down to linework and texture density, with one scene rendered in every one of them.",
      wide: true,
    },
    {
      src: "/paper-tots/voice-tone.png",
      alt: "The content guidelines' tone-by-context section: four cards covering homepage and marketing, the creation flow, confirmation and purchase, and error and empty states.",
      label:
        "One voice, four tones. The voice stays fixed; the tone moves with where the parent is in the journey.",
      wide: true,
    },
    {
      src: "/paper-tots/voice-email.png",
      alt: "The order confirmation email: “Your book is being made right now. You'll get an email the moment it's ready to read, usually within 30 minutes.”",
      label:
        "The confirmation tone applied — name what happens next, and don't over-promise how long it takes.",
    },
    {
      src: "/paper-tots/evaluation.png",
      alt: "The Lab's references panel for a generated page: canonical characters and setting, and two generated character poses each scored “Eval: Pass, 97/100” against the written pose description it was held to.",
      label:
        "Evaluating output like a product surface — every pose is scored against a written spec, so a character that drifts is caught before a parent sees it.",
      wide: true,
    },
    {
      src: "/paper-tots/design-in-code.png",
      alt: "A component workshop listing the product's screens and shared components, showing four NavBar states: signed out, signed in, with top-right action, and on the create page.",
      label:
        "Designing in code: shared components and their states, built and reviewed in the repo rather than redrawn in a design file.",
    },
    {
      src: "/paper-tots/flip-diagnosis.png",
      alt: "A Claude Code thread titled “Book flip cover animation rendering issues”, diagnosing the 3D book as a camera-orientation problem rather than a flip-mechanics bug, and drafting the fix.",
      label:
        "Directing the fix in prose — the book was tipped away from the reader, which is a camera problem, not a flip problem.",
    },
    {
      src: "/paper-tots/book-flip-v1-poster.jpg",
      video: "/paper-tots/book-flip-v1.mp4",
      alt: "The first 3D book view: the open book lies nearly flat and tipped away, so the pages face the sky rather than the reader.",
      label:
        "V1 — the book as a hero object, tipped back like it is lying on a table. Fine as decoration, illegible as a book.",
    },
    {
      src: "/paper-tots/book-flip-v2-poster.jpg",
      video: "/paper-tots/book-flip-v2.mp4",
      alt: "The revised reader: the book faces the reader straight on, pages turning, with a “Love this page?” rating under the spread.",
      label:
        "V2 — upright and front-facing, the way you hold something you are actually reading. The rating rides along with each spread.",
    },
  ],

  learningsLabel: "What I'm watching for",
  learnings: [
    "TODO: what you're watching for, 1 of 3.",
    "TODO: 2 of 3.",
    "TODO: 3 of 3.",
  ],

  // OUT OF SCOPE per the copy doc — left as-is.
  closingLabel: "Where this stands",
  closingText:
    "Paper Tots is in active development. These decisions are grounded in user research and product judgment, but not yet validated with usage data, that part is still ahead.",
  cta: { href: "/", label: "Back to all work" },
};

export default function PaperTots() {
  return <CaseStudyPage data={data} />;
}
