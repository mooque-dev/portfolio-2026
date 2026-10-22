import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter_Tight } from "next/font/google";
import CommandK from "@/components/CommandK";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Stripe. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is
// a command palette that searches the work.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Stripe" },
  description:
    "A short path through Allen Kang's work: workflow automation, data syncs, internal tools, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#533AFD", "--brand-on": "#ffffff", "--brand-ink": "#533AFD", "--brand-ink-dark": "#A9A3FF", "--hb": "#FFFFFF", "--hf": "#061B31", "--hb-d": "#FFFFFF", "--hf-d": "#061B31", "--hm": "#0A2540", "--hc": "#533AFD", "--hco": "#ffffff" } as CSSProperties;

export default function StripePage() {
  return (
    <TailoredPage
      slug="stripe"
      company="Stripe"
      style={BRAND}
      className={`themed theme-stripe ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design the tools<span className="sig-tone"> the people behind the product use every day.</span></>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, including workflow automation, data syncs and the internal tools a forty-person company ran on. I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><CommandK /></>}
      caption={<>Type to search the work. Arrow keys and Enter work too.</>}
      cases={["au", "ak", "yu", "or", "tw", "fe"]}
      contact={<>I&rsquo;d like to give internal users the care customers get.</>}
    />
  );
}
