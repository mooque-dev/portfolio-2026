import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter_Tight, Caveat } from "next/font/google";
import ShiftWeek from "@/components/ShiftWeek";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for 7shifts. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Built on the
// shared frame (components/tailored/TailoredPage.tsx): an opening object, the work, a way to
// reach me, and a block of things that already run. The object is a week on
// the schedule, each shift a way of working that links to its proof.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for 7shifts" },
  description:
    "A short path through Allen Kang's work: research, prototypes, shipping with AI, and tools a team used daily.",
  robots: { index: false, follow: false },
};

const fdisplay = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fhand = Caveat({ subsets: ["latin"], display: "swap", variable: "--bd-hand" });
const BRAND = { "--brand": "#3459D8", "--brand-on": "#ffffff", "--brand-ink": "#B84800", "--brand-ink-dark": "#FF8A3D", "--hb": "#F1F0EC", "--hf": "#000000", "--hb-d": "#F1F0EC", "--hf-d": "#000000", "--hm": "#FF6808", "--hc": "#3459D8", "--hco": "#ffffff" } as CSSProperties;

export default function SevenShiftsPage() {
  return (
    <TailoredPage
      slug="7shifts"
      company="7shifts"
      style={BRAND}
      className={`themed theme-7shifts ${fdisplay.variable} ${ftext.variable} ${fhand.variable}`}
      headline={<>I built the scheduling tools a forty-person company <span className="sig-scribble">used daily for ten months</span>.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto who grew up around cooks. Eight years designing, the last five on B2B software, and I build working prototypes with AI coding tools like Claude.</>}
      hero={<><ShiftWeek /></>}
      caption={<>The times are made up. Every shift links to real work.</>}
      cases={["tw", "au", "yu", "fe", "or", "ar"]}
      contact={<>If you want to see the Yuwol scheduling tool in use, I can show you.</>}
    />
  );
}
