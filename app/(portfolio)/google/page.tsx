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
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto, ready to move to Mountain View. For eight years I&rsquo;ve designed for people who&rsquo;d rather not think about software, the last five on payments: split transactions, checkout fees, and one design system for three merged products, 340+ one-off components cut to 70. This summer I was on stage in a forty-person musical that ran its schedule and split its bills on tools I built.</>}
      hero={<><ComponentAudit /></>}
      caption={<>Step through it: the audit, the system, the rules.</>}
      cases={["or", "tw", "fe", "ak", "ar", "yu"]}
      built="rules"
      fit={[
        { ask: "One system across surfaces", proof: <>Orchid replaced three products&rsquo; separate components with 70 shared ones, and three engineering teams adopted it. ARND runs one set of tokens across iOS, Android and web, in five themes, light and dark.</> },
        { ask: "Reusable frameworks", proof: <>Tokens first, Storybook as the source of truth, visual regression checks on every pull request, and contribution reviews answered within 48 hours so teams keep proposing.</> },
        { ask: "AI that works inside the system", proof: <>On ARND the design rules are written in files my AI coding tools read before they build, and tests run on every push to flag the patterns that broke before. 160+ merged pull requests that way.</> },
        { ask: "A case leaders can act on", proof: <>Earlier design system efforts had stalled without engineers. I surveyed five departments, put the cost in their own words in front of leadership, and came back with two dedicated front-end engineers.</> },
        { ask: "Usable by everyone", proof: <>ARND caps how far each kind of text can grow so large type never breaks a screen, and every animation stands down when Reduce Motion is on.</> },
      ]}
      contact={<>I&rsquo;d like to help paying feel like one product, wherever someone pays.</>}
    />
  );
}
