import type { Metadata } from "next";
import CaseStudyPage, {
  type CaseStudyData,
} from "@/components/case-study/CaseStudyPage";
import { IconPeople, IconBulb } from "@/components/case-study/icons";

export const metadata: Metadata = {
  title: "Expedia Group: Connected Profiles — Ruochen Wu",
  description:
    "A 0-to-1 social feature connecting travelers with friends and family for shared travel discovery.",
};

const data: CaseStudyData = {
  badge: "Shipped",
  badgeTone: "teal",
  title: "Expedia Group: Connected Profiles",
  roleLine:
    "Connecting travelers with their family and friends, enabling travel sharing and engagement, from first research to engineering handoff.",
  roleChips: ["UX Designer", "Jan 2024 – Sep 2024", "0-to-1"],
  stats: [
    { value: "2x / 3x", label: "increase in hotel saves and conversion, respectively" },
    { value: "$7M", label: "gross booking value via affiliate links" },
  ],
  situation: {
    business: {
      icon: <IconPeople />,
      heading: "Business problem",
      text: "70% of bookings have two or more travelers, but Expedia had no established, trusted network of online friends and family, leaving the network effect on app downloads and retention untapped.",
    },
    user: {
      icon: <IconBulb />,
      heading: "Traveler problem",
      text: "Travelers struggled to find inspiration from, and share experiences with, their friends and like-minded community, despite already using SMS, Messenger, and WhatsApp for exactly that.",
    },
  },
  quote:
    "Connected Profile introduces the multiplayer experience of collaborative travel discovery, shopping, and trip engagement.",
  decisions: [
    {
      heading: "Discovery: four personas, three profile concepts",
      text: "Different personas wanted different public profiles: connecting with the wider community called for something closer to a social media profile, while a profile shared with close family could include personal trip details. I explored three directions, a data dashboard, a travel-collections view, and a highlight reel, each testing a different balance of privacy and shareability.",
    },
    {
      heading: "Starting small: profile picture upload",
      text: "Expedia only collected a name and contact information at the time, so the first step of personalization was letting users add a photo. I designed the end-to-end upload flow for mobile, web, and mobile web, working through pixel constraints, media formats, and device variants, and submitted the component into the design system.",
    },
    {
      heading: "Surfacing a feature buried three steps deep",
      text: "The connected-profile experience lived three steps into the account page, which only one in six users visited monthly. I added incremental onboarding and entry points across the home page, trips page, notifications inbox, and transactional email, paired with privacy-first onboarding that let travelers opt out of discoverability and control which trips were visible.",
    },
    {
      heading: "Aligning visuals and handing off to engineering",
      text: "To keep the flow consistent with the rest of the app, I consulted the onboarding and design system teams for their frameworks and critiques before finalizing the public profile. Engineers were looped in early to confirm technical feasibility, with detailed documentation of modular states and edge cases following as the flow matured.",
    },
  ],
  learnings: [
    "Welcome tough conversations — even heads-down in execution, hold space for conversations about how design hand-offs connect to mid- and long-term plans.",
    "Identify compelling and crisp user needs — even within an MVP, users need clear incentive to do the work of adding connections.",
    "Invest for long-term success early on — building a multiplayer foundation and a real network effect takes a sizable, early investment in changing habits.",
  ],
  closingLabel: "Next case",
  closingText:
    "From a large cross-functional team to a team of two: the most recent project, still in progress.",
  cta: { href: "/case-studies/paper-tots", label: "Paper Tots" },
};

export default function ConnectedProfiles() {
  return <CaseStudyPage data={data} />;
}
