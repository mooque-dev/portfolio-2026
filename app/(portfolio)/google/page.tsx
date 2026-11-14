import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter_Tight, Inter } from "next/font/google";
import ComponentAudit from "@/components/ComponentAudit";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Google, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// Orchid in three steps: 340 uneven one-offs, the 70 shared components they became, and the rules ARND's AI coding tools read.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Google" },
  description:
    "A short path through Allen Kang's work: a design system three teams adopted, payment flows, and an app built with AI coding tools.",
  robots: { index: false, follow: false },
};

const fdisplay = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#1F1F1F", "--brand-on": "#ffffff", "--brand-ink": "#1F1F1F", "--brand-ink-dark": "#E8E8E4", "--hb": "#FBFBF9", "--hf": "#1F1F1F", "--hb-d": "#161615", "--hf-d": "#F2F2EF", "--hm": "#3D5A80", "--hc": "#1F1F1F", "--hco": "#ffffff" } as CSSProperties;

export default function GooglePage() {
  return (
    <TailoredPage
      slug="google"
      company="Google"
      style={BRAND}
      className={`themed theme-google ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I build design systems teams choose to use, and AI can follow.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto, ready to move to Mountain View. Eight years designing, the last five on payments: split transactions, checkout fees, and the design system behind three merged products, where I cut 340+ one-off components down to 70 shared ones. On my own app, the design rules live in files my AI coding tools read before they build.</>}
      hero={<><ComponentAudit /></>}
      caption={<>Step through it: the audit, the system, the rules.</>}
      cases={["or", "fe", "tw", "ak", "ar", "au"]}
      contact={<>I&rsquo;d like to help paying feel like one product, wherever someone pays.</>}
    />
  );
}
