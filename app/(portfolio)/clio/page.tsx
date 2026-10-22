import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Poppins, Source_Sans_3 } from "next/font/google";
import MatterFile from "@/components/MatterFile";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Clio. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is
// a matter file, with how three products became one.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Clio" },
  description:
    "A short path through Allen Kang's work: merged products, design systems, research, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Poppins({ subsets: ["latin"], display: "swap", variable: "--bd-display", weight: ["400", "500"] });
const ftext = Source_Sans_3({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#0069D1", "--brand-on": "#ffffff", "--brand-ink": "#0057AE", "--brand-ink-dark": "#6FB3FF", "--hb": "#04304C", "--hf": "#ffffff", "--hm": "#2F97FF", "--hc": "#0069D1", "--hco": "#ffffff" } as CSSProperties;

export default function ClioPage() {
  return (
    <TailoredPage
      slug="clio"
      company="Clio"
      style={BRAND}
      className={`themed theme-clio ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design the seams between products so people never notice them.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, most recently across three products merging into one suite, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><MatterFile preset="platform" /></>}
      caption={<>Every entry links to the work behind it.</>}
      cases={["ak", "tw", "or", "au", "fe", "ar"]}
      contact={<>I&rsquo;d like to help lawyers spend less time on software and more on their clients.</>}
    />
  );
}
