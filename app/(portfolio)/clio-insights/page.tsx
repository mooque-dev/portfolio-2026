import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Poppins, Source_Sans_3 } from "next/font/google";
import MatterFile from "@/components/MatterFile";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Clio. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is
// a matter file holding a short before-and-after report.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Clio" },
  description:
    "A short path through Allen Kang's work: dashboards, data-heavy workflows, experiments, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Poppins({ subsets: ["latin"], display: "swap", variable: "--bd-display", weight: ["400", "500"] });
const ftext = Source_Sans_3({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#0069D1", "--brand-on": "#ffffff", "--brand-ink": "#0057AE", "--brand-ink-dark": "#6FB3FF", "--hb": "#04304C", "--hf": "#ffffff", "--hm": "#2F97FF", "--hc": "#0069D1", "--hco": "#ffffff" } as CSSProperties;

export default function ClioInsightsPage() {
  return (
    <TailoredPage
      slug="clio-insights"
      company="Clio"
      style={BRAND}
      className={`themed theme-clio-insights ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I turn piles of data into the one number someone needs today.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on accounting and CRM tools, where I led the reports and dashboards, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><MatterFile preset="insights" /></>}
      caption={<>Every bar links to the work behind it.</>}
      cases={["mj", "ak", "tw", "au", "fe", "or"]}
      contact={<>I&rsquo;d like to help lawyers spend less time on software and more on their clients.</>}
    />
  );
}
