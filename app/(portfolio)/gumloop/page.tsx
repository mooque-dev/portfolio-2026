import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import AgentFlow from "@/components/AgentFlow";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Gumloop, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a small agent on a builder canvas: four steps that light up when you press Run, each opening the case behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Gumloop" },
  description:
    "A short path through Allen Kang's work: a no-code workflow builder, prototypes in code, a design system, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Geist({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = Geist_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-mono" });
const BRAND = { "--brand": "#18181B", "--brand-on": "#ffffff", "--brand-ink": "#18181B", "--brand-ink-dark": "#FAFAFA", "--hb": "#F4F4F5", "--hf": "#18181B", "--hb-d": "#F4F4F5", "--hf-d": "#18181B", "--hm": "#7B3FE4", "--hc": "#18181B", "--hco": "#ffffff" } as CSSProperties;

export default function GumloopPage() {
  return (
    <TailoredPage
      slug="gumloop"
      company="Gumloop"
      style={BRAND}
      className={`themed theme-gumloop ${fdisplay.variable} ${ftext.variable} ${fmono.variable}`}
      headline={<>I design for experts whose job isn&rsquo;t software.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto, open to moving to Vancouver. Eight years designing, the last five on CRM and workflow tools, including a no-code automation builder built from zero. I prototype in code with Claude and Cursor when a mock can&rsquo;t answer the question.</>}
      hero={<><AgentFlow /></>}
      caption={<>Press Run. Every step opens the case behind it.</>}
      cases={["au", "ar", "or", "fe", "tw", "ak"]}
      contact={<>I&rsquo;d like to help more teams hand their busywork to agents they built themselves.</>}
    />
  );
}
