import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Manrope } from "next/font/google";
import RegistryTable from "@/components/RegistryTable";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Signal 1, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// the work as a registry: what runs, its status and what it changed.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Signal 1" },
  description:
    "A short path through Allen Kang's work: healthcare dashboards, enterprise workflows, design systems, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Manrope({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Manrope({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#132661", "--brand-on": "#ffffff", "--brand-ink": "#132661", "--brand-ink-dark": "#9DB0FF", "--hb": "linear-gradient(160deg, #141A47 0%, #1F2766 100%)", "--hf": "#ffffff", "--hm": "#FF5A2C", "--hc": "#ffffff", "--hco": "#132661" } as CSSProperties;

export default function Signal1Page() {
  return (
    <TailoredPage
      slug="signal1"
      company="Signal 1"
      style={BRAND}
      className={`themed theme-signal1 ${fdisplay.variable} ${ftext.variable}`}
      headline={<><span className="sig-chevron" aria-hidden />I design clear tools for work that can&rsquo;t go wrong.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, including dashboards clinicians used to track patients through treatment. I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><RegistryTable /></>}
      caption={<>Each entry opens its case study.</>}
      cases={["mj", "ak", "or", "au", "fe", "ar"]}
      contact={<>I&rsquo;d like to help health systems trust the AI they run.</>}
    />
  );
}
