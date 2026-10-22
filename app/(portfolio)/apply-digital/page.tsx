import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Archivo, Wix_Madefor_Text, Kode_Mono } from "next/font/google";
import TokenCard from "@/components/TokenCard";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for APPLY. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is one
// product card in three brands, with the token tiers behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for APPLY" },
  description:
    "A short path through Allen Kang's work: design systems, craft, building with AI, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Archivo({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Wix_Madefor_Text({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = Kode_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-mono" });
const BRAND = { "--brand": "#282A33", "--brand-on": "#ffffff", "--brand-ink": "#B83500", "--brand-ink-dark": "#FF7A45", "--hb": "#FCFCFA", "--hf": "#1A1B1C", "--hb-d": "#FCFCFA", "--hf-d": "#1A1B1C", "--hm": "#FF4A08", "--hc": "#282A33", "--hco": "#ffffff" } as CSSProperties;

export default function ApplyDigitalPage() {
  return (
    <TailoredPage
      slug="apply-digital"
      company="APPLY"
      style={BRAND}
      className={`themed theme-apply-digital ${fdisplay.variable} ${ftext.variable} ${fmono.variable}`}
      headline={<>I set the bar for how a product looks, then build the system that <span className="sig-brace">keeps it there</span>.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto with a graphic design degree. Eight years designing, the last five on B2B software, where I grew one design system to 340+ components across three teams and mentored three designers. These days I work with Claude from first concept to running code.</>}
      hero={<><TokenCard preset="product" /></>}
      caption={<>Switch the brand. Only the global tier changes.</>}
      cases={["or", "fe", "ar", "au", "tw", "yu"]}
      built="rules"
      contact={<>I&rsquo;d like to help brands ship work that looks as good live as it did in the deck.</>}
    />
  );
}
