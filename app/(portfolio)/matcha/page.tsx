import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { JetBrains_Mono } from "next/font/google";
import MatchCard from "@/components/MatchCard";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Matcha. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is
// a candidate card with the reasons it fits.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Matcha" },
  description:
    "A short path through Allen Kang's work: products started from zero, design systems, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#22C55E", "--brand-on": "#052E16", "--brand-ink": "#4A6E22", "--brand-ink-dark": "#A9D46E", "--hb": "#FFFFFF", "--hf": "#0A0A0A", "--hb-d": "#FFFFFF", "--hf-d": "#0A0A0A", "--hm": "#7FB23E", "--hc": "#22C55E", "--hco": "#052E16" } as CSSProperties;

export default function MatchaPage() {
  return (
    <TailoredPage
      slug="matcha"
      company="Matcha"
      style={BRAND}
      className={`themed theme-matcha ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I&rsquo;ve started products from nothing twice, and I&rsquo;d like a third.<span className="sig-cursor" aria-hidden /></>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing. I founded ARND, co-founded Forkestrate, and grew one design system to 340+ components across three teams.</>}
      hero={<><MatchCard /></>}
      caption={<>Every reason links to the work behind it.</>}
      cases={["ar", "or", "au", "fe", "tw", "yu"]}
      contact={<>I&rsquo;d like to make job hunting feel less like a full-time job.</>}
    />
  );
}
