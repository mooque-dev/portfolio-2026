import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter_Tight } from "next/font/google";
import ClaimChart from "@/components/ClaimChart";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Stilta, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a claim chart matching each claim element to its evidence.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Stilta" },
  description:
    "A short path through Allen Kang's work: tools for experts, experiments, building from zero, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#000000", "--brand-on": "#ffffff", "--brand-ink": "#000000", "--brand-ink-dark": "#ffffff", "--hb": "radial-gradient(70% 80% at 30% 20%, #2B3A3F 0%, #121819 60%, #0B0F10 100%)", "--hf": "#ffffff", "--hm": "#9FB8BC", "--hc": "#ffffff", "--hco": "#000000" } as CSSProperties;

export default function StiltaPage() {
  return (
    <TailoredPage
      slug="stilta"
      company="Stilta"
      style={BRAND}
      className={`themed theme-stilta ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design tools for work that has to hold up.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on accounting and payments tools built with the experts who use them, and I build from zero with Claude Code.</>}
      hero={<><ClaimChart /></>}
      caption={<>Each element cites the work that proves it.</>}
      cases={["tw", "fe", "ar", "ak", "or", "au"]}
      built="rules"
      contact={<>I&rsquo;d like to help build AI that experts will sign their name under.</>}
    />
  );
}
