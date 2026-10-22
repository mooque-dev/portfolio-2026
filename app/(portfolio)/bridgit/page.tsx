import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DM_Sans, DM_Mono } from "next/font/google";
import SiteSign from "@/components/SiteSign";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Bridgit. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is the sign
// that goes up in front of a construction site, over a faint blueprint grid.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Bridgit" },
  description:
    "A short path through Allen Kang's work on data-heavy B2B tools, design systems and building with AI.",
  robots: { index: false, follow: false },
};

const fdisplay = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = DM_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-mono", weight: ["400", "500"] });
const BRAND = { "--brand": "#09333A", "--brand-on": "#ffffff", "--brand-ink": "#0A6E70", "--brand-ink-dark": "#3CC6C8", "--hb": "#09333A", "--hf": "#ffffff", "--hm": "#3CC6C8", "--hc": "#F7F7F6", "--hco": "#09333A" } as CSSProperties;

export default function BridgitPage() {
  return (
    <TailoredPage
      slug="bridgit"
      company="Bridgit"
      style={BRAND}
      className={`themed theme-bridgit ${fdisplay.variable} ${ftext.variable} ${fmono.variable}`}
      headline={<>I make complicated, data-heavy work feel manageable, and I build my own prototypes.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years in B2B software, the last five on accounting and payments tools, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><SiteSign />
              <p className="mt-2 text-[14px] text-muted">Every number on the sign is on my résumé.</p></>}
      cases={["tw", "au", "or", "fe", "ar", "yu"]}
      contact={<>I&rsquo;d like to help construction teams plan with less guesswork.</>}
    />
  );
}
