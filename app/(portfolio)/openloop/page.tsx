import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Archivo, Inter } from "next/font/google";
import TokenCard from "@/components/TokenCard";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for OpenLoop. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is one
// component in three brands, with the token tiers behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for OpenLoop" },
  description:
    "A short path through Allen Kang's work: design systems, healthcare, research, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Archivo({ subsets: ["latin"], display: "swap", variable: "--bd-display", style: ["normal", "italic"] });
const ftext = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#E6004A", "--brand-on": "#ffffff", "--brand-ink": "#C4003F", "--brand-ink-dark": "#FF6B93", "--hb": "linear-gradient(160deg, #0E0008 0%, #3A0122 55%, #8A0248 100%)", "--hf": "#ffffff", "--hb-d": "linear-gradient(160deg, #0E0008 0%, #3A0122 55%, #8A0248 100%)", "--hf-d": "#ffffff", "--hm": "#E6004A", "--hc": "linear-gradient(90deg, #FF4276, #D40530)", "--hco": "#ffffff" } as CSSProperties;

export default function OpenLoopPage() {
  return (
    <TailoredPage
      slug="openloop"
      company="OpenLoop"
      style={BRAND}
      className={`themed theme-openloop ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I build design systems people <span className="sig-em">don&rsquo;t have to think about</span>.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, where I grew one design system to 340+ components across three teams. On my own app, the design rules live in a file my AI coding tools read before they build.</>}
      hero={<><TokenCard /></>}
      caption={<>Switch the brand. Only the last column changes.</>}
      cases={["or", "mj", "ak", "fe", "ar", "au"]}
      built="rules"
      contact={<>I&rsquo;d like to build the system a care team never has to think about.</>}
    />
  );
}
