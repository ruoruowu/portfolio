import type { Metadata } from "next";
import { Gabarito, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/*
 * Runs before any of the page below it is parsed, so scroll-triggered
 * animations can safely hide their starting state without a flash of the
 * finished one. Without JS the class never lands and every section renders
 * fully drawn.
 *
 * The blueprint sequence lives here in full rather than in a React effect. The
 * attribute that puts Home into its drawn state is set by this script, so the
 * code that clears it has to be this script too — when removal depended on a
 * component mounting, a bundle that failed or arrived late left the page teal
 * for good. Nothing below needs React, hydration, or even the rest of the page.
 */
const HOLD = 520; // the finished drawing holds before colour starts arriving
const RESOLVE = 2600; // last block's delay (2220ms) plus its own transition
/*
 * Belt and braces. The two timers above always finish inside two seconds, so
 * this one should never be the one that fires — it is here so that no failure
 * above it can leave the sheet up permanently.
 */
const NEVER_LONGER_THAN = 20000;

const BOOT = `
document.documentElement.classList.add("js");
(function () {
  var r = document.documentElement;
  // A held blueprint outranks the reveal: if the visitor asked for the sheet to
  // stay up, restore it before paint and never run the timers below.
  try {
    if (sessionStorage.getItem("bp-lock") === "1") {
      r.setAttribute("data-bp", "locked");
      return;
    }
  } catch (e) {}
  var seen = false, reduce = false;
  try { seen = !!sessionStorage.getItem("bp-home"); } catch (e) {}
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  if (location.pathname !== "/" || seen || reduce) return;
  // Storage being unavailable is not a reason to withhold the drawing; it only
  // means this visitor may see it again next time.
  try { sessionStorage.setItem("bp-home", "1"); } catch (e) {}
  r.setAttribute("data-bp", "draft");
  var done = function () {
    if (r.getAttribute("data-bp") !== "locked") r.removeAttribute("data-bp");
  };
  setTimeout(function () {
    if (r.getAttribute("data-bp") === "draft") r.setAttribute("data-bp", "resolving");
  }, ${HOLD});
  setTimeout(done, ${HOLD + RESOLVE});
  setTimeout(done, ${NEVER_LONGER_THAN});
})();
`;

export const metadata: Metadata = {
  title: "Ruochen Wu — Portfolio",
  description:
    "Designer, researcher, and product leader. Intentional design, measurable impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
      /* The inline script below adds a class here before React hydrates. */
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        {children}
      </body>
    </html>
  );
}
