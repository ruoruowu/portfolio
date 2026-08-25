import type { Metadata } from "next";
import CaseStudyPage, {
  type CaseStudyData,
} from "@/components/case-study/CaseStudyPage";
import { IconChat, IconHeart } from "@/components/case-study/icons";

export const metadata: Metadata = {
  title: "Expedia Group: Communications Strategy — Ruochen Wu",
  description:
    "Standardizing Expedia Group's in-app, push, and email communications strategy for 25M travelers.",
};

const data: CaseStudyData = {
  badge: "Shipped",
  badgeTone: "teal",
  title: "Expedia Group: Communications Strategy",
  roleLine:
    "Enhancing Expedia Group's communications to elevate the traveler experience across the journey, boosting trust and improving app retention.",
  roleChips: [
    "UX Designer",
    "Sep 2021 – Jan 2024",
    "Mais Qumsieh, Product Manager",
    "Nayeon Lee, UX Designer",
    "Grace Swanson, Content Designer",
  ],
  stats: [
    { value: "$15.6M", label: "annual gross profit" },
    { value: "2.78%", label: "increase to app downloads" },
  ],
  situation: {
    business: {
      icon: <IconChat />,
      heading: "Business problem",
      text: "Communication owners across Expedia Group had created content and visual patterns to suit ad-hoc, specific needs. Over time this made the comms experience disjointed and challenging to scale.",
    },
    user: {
      icon: <IconHeart />,
      heading: "Traveler problem",
      text: "Travelers needed the right message, at the right place, at the right time, to guide seamless trips and build brand loyalty, rather than a patchwork of inconsistent emails, pushes, and in-app messages.",
    },
  },
  quote:
    "Presenting the right message, at the right place, right time helps guide more seamless trips and bolsters brand loyalty.",
  decisions: [
    {
      heading: "Discover: auditing the comms ecosystem",
      text: "Before evolving the experience, the team audited what channels the communications surfaced on, what technology powered them, and what was actually being sent today, mapping a current-state ecosystem that had grown disjointed over years of ad-hoc ownership.",
    },
    {
      heading: "Define: building a communications governance model",
      text: "Card-sorting research showed travelers grouping communications into \"Shop,\" \"Trip,\" and \"Account\" buckets, sorted across four priority levels. That became a decision tree mapping priority to pattern: dark banners for the highest-priority alerts, floats for medium-priority status updates, messaging cards for lower-priority reminders, and embedded contextual copy for simple acknowledgements.",
    },
    {
      heading: "Design: monetizing purchase confirmation emails",
      text: "Purchase confirmation emails were the third-highest converting comm type, driving 13x the conversion of marketing campaigns. I explored what proportion of the email should carry business-oriented modules like app download or seat upgrade upsells, modularizing each section by job-to-be-done. Expedia Group estimated $6–9.5M in gross profit from optimizing these attach placements.",
    },
    {
      heading: "Design: fixing and expanding mobile push",
      text: "Push engagement correlates strongly with app retention. I researched OS and industry best practices, comparing iOS and Android behavior, landing-experience expectations, timing, and rich push capabilities, then used those findings to identify quick fixes (broken links, inconsistent landing pages) alongside longer-term opportunities to add and enhance pushes across the traveler journey.",
    },
  ],
  learnings: [
    "Design to influence — the Comms team owned the communications experience, not any single communication, so recommendations had to reach and persuade the right people to create change.",
    "Take initiative and iterate — with such an ambiguous project, it's crucial to take strong hypotheses forward rather than wait for perfect alignment.",
    "Design in systems — since this project didn't single out one line of business, visualizing the scale of the communications experience through journey maps and system diagrams helped make the case.",
  ],
  closingLabel: "Next case",
  closingText:
    "A parallel thread from the same year: designing the social layer that let travelers connect with friends and family.",
  cta: { href: "/case-studies/connected-profiles", label: "Connected Profiles" },
};

export default function Communications() {
  return <CaseStudyPage data={data} />;
}
