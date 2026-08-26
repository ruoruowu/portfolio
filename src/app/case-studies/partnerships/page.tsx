import type { Metadata } from "next";
import CaseStudyPage, {
  type CaseStudyData,
} from "@/components/case-study/CaseStudyPage";
import { IconTrend, IconHeart } from "@/components/case-study/icons";

export const metadata: Metadata = {
  title: "Expedia Group: Partnerships — Ruochen Wu",
  description:
    "Optimizing corporate partnership booking experiences for 200+ brands across Expedia Group.",
};

const data: CaseStudyData = {
  badge: "Shipped",
  badgeTone: "teal",
  heroImage: {
    src: "/partnerships/header.png",
    alt: "Expedia partnership experiences on phone, laptop, and tablet: a United membership prompt, a Comet by Perplexity One Key upgrade page, and a coupon-applied hotel search.",
  },
  title: "Expedia Group: Partnerships",
  roleLine:
    "Expedia Group has 200+ corporate partners with co-branded shopping experiences. I redesigned the end-to-end partnership flow to grow users and improve conversion.",
  roleChips: [
    "UI/UX Designer",
    "Jan 2025 – Jan 2026",
    "4 product managers",
    "2 UX, 1 content, 1 research",
    "4 FE, 6 BE, 2 TPM",
  ],
  stats: [
    { value: "200+", label: "corporate partners across Expedia Group impacted" },
    { value: "$8.2M", label: "annualized gross profit" },
  ],
  situation: {
    business: {
      icon: <IconTrend />,
      heading: "Business problem",
      text: "EG already had 200+ partnerships across coupon, cashback, and loyalty types, but paid search was an expensive way to attract new travelers, and travelers from partner sites were dropping off before booking.",
    },
    user: {
      icon: <IconHeart />,
      heading: "Traveler problem",
      text: "Deal-savvy travelers needed confidence and delight that a partner offer had actually applied, and clearer paths to discover the growing set of partnership offerings across the app.",
    },
  },
  quote:
    "Persistence forges alignment — regular sharing of demos and offline follow-up helped get on contingency teams' priority lists.",
  decisions: [
    {
      heading: "Ticketmaster: designing iteratively as the timeline moved",
      text: "The design challenge was converting an event booker into an Expedia trip booking, positioned to yield $4M in bookings during 2026. I designed a first iteration for a one-quarter deadline, then contracting extended the timeline three quarters, giving room for a crawl (fast production, baseline deal clarity), a walk (improved visual design), and a run (seamless integration into the home page search flow).",
    },
    {
      heading: "Extending loyalty value through Perplexity and Condé Nast",
      text: "EG partnered with Perplexity's and Condé Nast's paid subscriber groups to extend travel offerings to their programs. EG wanted One Key members to engage with partners beyond a one-time booking, while partner-brand customers often found EG's loyalty tiers unfamiliar. I designed landing experiences, like one from Perplexity's Comet browser, that informed and excited users about the loyalty tier upgrade.",
    },
    {
      heading: "Scaling landing pages with patterns and AI",
      text: "Partner campaigns converted well individually, but 200+ inconsistent landing pages lowered traveler trust and were slow to produce. I refined the visual identity and information hierarchy into reusable patterns, then during a multi-day hackathon, co-created an AI tool with two designers and four engineers that let business partners launch publishable landing pages in minutes, cutting launch time by an estimated 80%.",
    },
    {
      heading: "Designing for exception cases in deal-based shopping",
      text: "Reassurance visuals across key shopping touchpoints tested a 2% conversion gain, but the flow carried real business and legal nuance, like travelers not being able to combine cashback and coupons. I aligned Pay Now as the default path across Home, Shopping, and Checkout teams, keeping coupon messaging subtle rather than competing with the primary CTA, and designed conditional offer tiers that encouraged higher-value bookings without overcomplicating the pricing math.",
    },
  ],
  references: [
    {
      src: "/partnerships/home cover.png",
      alt: "Partner logo stack and home cover",
      label: "Home page alignment with partner brand treatments and search entry points.",
      wide: true,
    },
    {
      src: "/partnerships/Web layout standardization.png",
      alt: "Web layout standardization reference",
      label: "Standardized web patterns for offer clarity and consistent search behavior.",
    },
    {
      src: "/partnerships/AI web builder.png",
      alt: "AI landing page builder reference",
      label: "AI-assisted partner landing page builder for faster launch cycles.",
    },
    {
      src: "/partnerships/End to end shopping flow.png",
      alt: "End to end shopping flow reference",
      label: "End-to-end booking flow showing offer reveal, checkout, and trust moments.",
    },
    {
      src: "/partnerships/Ticketmastser walk.png",
      alt: "Ticketmaster walk reference",
      label: "Ticketmaster path: iterative walk design for improving conversion confidence.",
    },
    {
      src: "/partnerships/Ticketmastser run.png",
      alt: "Ticketmaster run reference",
      label: "Ticketmaster run: final integrated flight and event shopping experience.",
    },
  ],
  learnings: [
    "Persistence forges alignment — regular sharing of video demos and offline follow-up helped our team get on contingency teams' priority lists.",
    "Tech tradeoffs — create a flexible design set with features adjusting to release timeline against engineering estimations.",
    "Fluctuations amid business negotiations — until a contract is signed, timelines and priorities can evolve, so design with agility.",
    "AI as an expeditor — meaningfully investing in lean AI solutions redirects time to more impactful tasks.",
  ],
  closingLabel: "Next case",
  closingText:
    "This flow now feeds directly into how Expedia Group communicates with travelers post-booking.",
  cta: { href: "/case-studies/communications", label: "Communications Strategy" },
};

export default function Partnerships() {
  return <CaseStudyPage data={data} />;
}
