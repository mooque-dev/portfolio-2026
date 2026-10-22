import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Newsreader, Inter } from "next/font/google";
import Brief from "@/components/Brief";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Harvey. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is a short
// statement on pleading paper, each claim citing the case behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Harvey" },
  description:
    "A short path through Allen Kang's work: tools for experts, experiments, design systems, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Newsreader({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#0F0E0D", "--brand-on": "#FAFAF9", "--brand-ink": "#1F1D1A", "--brand-ink-dark": "#E9E3D8", "--hb": "#FAFAF9", "--hf": "#0F0E0D", "--hb-d": "#FAFAF9", "--hf-d": "#0F0E0D", "--hm": "#B89B6E", "--hc": "#0F0E0D", "--hco": "#FAFAF9" } as CSSProperties;

export default function HarveyPage() {
  return (
    <TailoredPage
      slug="harvey"
      company="Harvey"
      style={BRAND}
      className={`themed theme-harvey ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design for people who check everything twice.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on payments and finance tools built with the accountants who use them, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><Brief /></>}
      caption={<>Every claim cites the work behind it.</>}
      cases={["tw", "ak", "fe", "or", "au", "ar"]}
      contact={<>I&rsquo;d like to design for the people who read the fine print.</>}
    />
  );
}
