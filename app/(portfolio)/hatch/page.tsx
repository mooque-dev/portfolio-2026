import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Albert_Sans } from "next/font/google";
import SleepRoutine from "@/components/SleepRoutine";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Hatch, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a bedside clock with an evening-to-morning routine: each step is a way of working with its proof, and the face warms at dawn.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Hatch" },
  description:
    "A short path through Allen Kang's work: research with real people, habit-shaping moments, design for patients and clinicians, and apps that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Albert_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Albert_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#0A1A34", "--brand-on": "#ffffff", "--brand-ink": "#0A1A34", "--brand-ink-dark": "#F3EFE7", "--hb": "#0A1A34", "--hf": "#F7F4EE", "--hb-d": "#0A1A34", "--hf-d": "#F7F4EE", "--hm": "#F2B36B", "--hc": "#FFFFFF", "--hco": "#0A1A34" } as CSSProperties;

export default function HatchPage() {
  return (
    <TailoredPage
      slug="hatch"
      company="Hatch"
      style={BRAND}
      className={`themed theme-hatch ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design the small routines people come back to.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto, glad to work Pacific hours. Eight years designing, from interviews and journeys to prototypes and release. I&rsquo;ve designed for patients and clinicians, nonprofit teams and accountants, and I build working prototypes in code with Claude and Cursor.</>}
      hero={<><SleepRoutine /></>}
      caption={<>Pick a time of night. Each step opens the case behind it.</>}
      cases={["au", "mj", "ar", "fe", "or", "tw"]}
      contact={<>I&rsquo;d like to help more people get the rest they keep putting off.</>}
    />
  );
}
