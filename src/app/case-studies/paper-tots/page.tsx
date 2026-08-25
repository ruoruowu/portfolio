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

const data: CaseStudyData = {
  badge: "In active development",
  badgeTone: "coral",
  title: "Paper Tots",
  roleLine:
    "AI-generated children's books that turn a kid's own idea into an illustrated story, built solo end-to-end with a lean engineering team.",
  roleChips: [
    "Solo founding designer",
    "Research & product strategy",
    "Two-person engineering team",
    "No PM",
  ],
  situation: {
    business: {
      icon: <IconTrend />,
      heading: "Business problem",
      text: "Personalized children's media is either templated print-on-demand, which barely uses the kid's own idea, or bespoke and too costly to produce at consumer scale. There wasn't a good option in between.",
    },
    user: {
      icon: <IconBulb />,
      heading: "User problem",
      text: "Parents want to spark a kid's imagination and watch their own idea become something real. Most story-generation tools produce output that's technically personalized but emotionally forgettable.",
    },
  },
  quote:
    "The idea has to still feel like the kid's, even after it's been through a model.",
  decisions: [
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
  ],
  closingLabel: "Where this stands",
  closingText:
    "Paper Tots is in active development. These decisions are grounded in user research and product judgment, but not yet validated with usage data, that part is still ahead.",
  cta: { href: "/", label: "Back to all work" },
};

export default function PaperTots() {
  return <CaseStudyPage data={data} />;
}
