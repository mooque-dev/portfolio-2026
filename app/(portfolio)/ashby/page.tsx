import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Figtree } from "next/font/google";
import SpecDoc from "@/components/SpecDoc";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Ashby, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a one-page spec on booking a final round, sketched from the outside: problem, decision, what changes, each redrawing a small schedule grid, with the decision tied to the case where the same rule was used.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Ashby" },
  description:
    "A short path through Allen Kang's work: a design system cut down to what teams use, complex desktop workflows, information architecture across merged products, and features owned end to end.",
  robots: { index: false, follow: false },
};

const fdisplay = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#473BCE", "--brand-on": "#FCFCFE", "--brand-ink": "#473BCE", "--brand-ink-dark": "#A79FF5", "--hb": "#FCFCFE", "--hf": "#141415", "--hb-d": "#FCFCFE", "--hf-d": "#141415", "--hm": "#473BCE", "--hc": "#473BCE", "--hco": "#FCFCFE" } as CSSProperties;

export default function AshbyPage() {
  return (
    <TailoredPage
      slug="ashby"
      company="Ashby"
      style={BRAND}
      className={`themed theme-ashby ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I designed across three products merging into one,<span className="sig-tone"> and stepped in as PM when a project needed one.</span></>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on payments, finance and CRM tools, owning features from the first question to release. I prototype in code with AI tools when a mock can&rsquo;t settle it.</>}
      hero={<><SpecDoc /></>}
      caption={<>A short spec I wrote from the outside on one recruiting task. Step through it.</>}
      cases={["or", "tw", "ak", "au", "fe", "ar"]}
      contact={<>If the spec above gets scheduling wrong somewhere, I&rsquo;d like to know where.</>}
    />
  );
}
