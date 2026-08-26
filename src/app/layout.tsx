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
        {/*
          Runs before any of the page below it is parsed, so scroll-triggered
          animations can safely hide their starting state without a flash of the
          finished one. Without JS the class never lands and every section
          renders fully drawn.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
