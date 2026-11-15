import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Newsreader, Instrument_Sans, Courier_Prime } from "next/font/google";
import ScriptPage from "@/components/ScriptPage";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Premise, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// one page of a script: each scene is a piece of my work, my line reads in English or Korean, and the pencil note in the margin is the proof with the case behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Premise" },
  description:
    "A short path through Allen Kang's work: research with real people, rough ideas taken to shipped products, and the tools a bilingual musical company ran on.",
  robots: { index: false, follow: false },
};

const fdisplay = Newsreader({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = Courier_Prime({ subsets: ["latin"], display: "swap", variable: "--bd-mono", weight: ["400", "700"] });
const BRAND = { "--brand": "#24201B", "--brand-on": "#FBF8F2", "--brand-ink": "#24201B", "--brand-ink-dark": "#F3ECDF", "--hb": "#F3ECDF", "--hf": "#24201B", "--hb-d": "#F3ECDF", "--hf-d": "#24201B", "--hm": "#9A3A26", "--hc": "#24201B", "--hco": "#FBF8F2" } as CSSProperties;

export default function PremisePage() {
  return (
    <TailoredPage
      slug="premise"
      company="Premise"
      style={BRAND}
      className={`themed theme-premise ${fdisplay.variable} ${ftext.variable} ${fmono.variable}`}
      headline={<>I design tools for people making something together.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto, glad to work Pacific hours. Eight years designing, from interviews and journey maps to prototypes and release. A forty-person amateur musical ran for ten months on tools I built: the schedule, a script reader in Korean and English, and the shared costs. I prototype in code with Claude Code and Cursor.</>}
      hero={<><ScriptPage /></>}
      caption={<>Pick a scene, then switch the language. The note in the margin opens the case.</>}
      cases={["yu", "au", "ar", "fk", "or", "tw"]}
      contact={<>I&rsquo;d like to help writers and studios spend less time chasing versions and more time on the story.</>}
    />
  );
}
