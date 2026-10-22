import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Archivo, Schibsted_Grotesk, DM_Mono } from "next/font/google";
import TripLog from "@/components/TripLog";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Samsara. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is
// a trip report, each stop a job.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Samsara" },
  description:
    "A short path through Allen Kang's work: research with customers, web and mobile, shipping with AI, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Archivo({ subsets: ["latin"], display: "swap", variable: "--bd-display", axes: ["wdth"] });
const ftext = Schibsted_Grotesk({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = DM_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-mono", weight: ["400", "500"] });
const BRAND = { "--brand": "#FEAE0F", "--brand-on": "#1C1917", "--brand-ink": "#8F5A00", "--brand-ink-dark": "#FEAE0F", "--hb": "#1C1917", "--hf": "#F5F4F1", "--hm": "#FEAE0F", "--hc": "#FEAE0F", "--hco": "#1C1917" } as CSSProperties;

export default function SamsaraPage() {
  return (
    <TailoredPage
      slug="samsara"
      company="Samsara"
      style={BRAND}
      className={`themed theme-samsara ${fdisplay.variable} ${ftext.variable} ${fmono.variable}`}
      label="[ Product design · Toronto ]"
      headline={<>I design with the people doing the work, then ship it myself.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software. I run research with customers and ship to web and mobile with AI coding tools: 161 merged pull requests on my own app.</>}
      hero={<><TripLog /></>}
      caption={<>Every stop is a job, with what shipped there.</>}
      cases={["au", "yu", "ar", "fe", "tw", "or"]}
      contact={<>I&rsquo;d like to build for the people who keep everything moving.</>}
    />
  );
}
