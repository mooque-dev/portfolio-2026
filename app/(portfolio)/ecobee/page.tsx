import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Source_Serif_4, Figtree } from "next/font/google";
import Thermostat from "@/components/Thermostat";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for ecobee. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is a
// thermostat, each setting a way of working with its number as the proof.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for ecobee" },
  description:
    "A short path through Allen Kang's work: design systems, research, mobile, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Source_Serif_4({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#2D2926", "--brand-on": "#ffffff", "--brand-ink": "#2D2926", "--brand-ink-dark": "#EDCD3F", "--hb": "#FFFFFF", "--hf": "#2D2926", "--hb-d": "#FFFFFF", "--hf-d": "#2D2926", "--hm": "#EDCD3F", "--hc": "#FFFFFF", "--hco": "#2D2926" } as CSSProperties;

export default function EcobeePage() {
  return (
    <TailoredPage
      slug="ecobee"
      company="ecobee"
      style={BRAND}
      className={`themed theme-ecobee ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I make complicated systems feel calm to the people living with them.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, from first research to release, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><Thermostat /></>}
      cases={["or", "au", "ar", "fe", "tw", "yu"]}
      contact={<>I&rsquo;d like to make the technology in people&rsquo;s homes easier to live with.</>}
    />
  );
}
