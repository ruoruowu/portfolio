import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GatePreview from "./GatePreview";

/**
 * A bench for comparing the three gate animations side by side before one is
 * chosen. Not part of the portfolio: it is off in production unless GATE_LAB
 * is set, so a deployed site never carries it, and it is noindex regardless.
 */
const enabled =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.GATE_LAB === "1";

export const metadata: Metadata = {
  title: "Gate preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  if (!enabled) notFound();
  return <GatePreview />;
}
