import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter } from "next/font/google";
import JourneyCard from "@/components/JourneyCard";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Autodesk, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a store card that walks a buyer's journey, each step with the work that moved it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Autodesk" },
  description:
    "A short path through Allen Kang's work: checkout experiments, adoption, research, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#000000", "--brand-on": "#ffffff", "--brand-ink": "#000000", "--brand-ink-dark": "#FFFF00", "--hb": "#000000", "--hf": "#ffffff", "--hm": "#FFFF00", "--hc": "#ffffff", "--hco": "#000000" } as CSSProperties;

export default function AutodeskPage() {
  return (
    <TailoredPage
      slug="autodesk"
      company="Autodesk"
      style={BRAND}
      className={`themed theme-autodesk ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I make the path from curious to customer <span className="sig-accent">feel short</span>.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on payments and finance tools, where I ran the experiments that decided what shipped. I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><JourneyCard /></>}
      caption={<>Pick a step. Each one opens the work that moved it.</>}
      cases={["fe", "au", "tw", "or", "ak", "ar"]}
      contact={<>I&rsquo;d like to help makers find, buy and keep the right tool.</>}
    />
  );
}
