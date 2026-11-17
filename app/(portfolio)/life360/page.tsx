import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Outfit, DM_Sans } from "next/font/google";
import ExperimentWriteup from "@/components/ExperimentWriteup";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Life360, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// Fee Opt-In as an experiment write-up card: problem, hypothesis, variants, metrics, result and the next test, opening on the result.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Life360" },
  description:
    "A short path through Allen Kang's work: an A/B test that took fee opt-in from 75% to 92%, payments design that cut support tickets, motion with rules, and apps that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Outfit({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#762EEB", "--brand-on": "#ffffff", "--brand-ink": "#762EEB", "--brand-ink-dark": "#B79BFF", "--hb": "#F3EFE8", "--hf": "#130F0C", "--hb-d": "#F3EFE8", "--hf-d": "#130F0C", "--hm": "#762EEB", "--hc": "#762EEB", "--hco": "#ffffff" } as CSSProperties;

export default function Life360Page() {
  return (
    <TailoredPage
      slug="life360"
      company="Life360"
      style={BRAND}
      className={`themed theme-life360 ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design the decision, then <span className="sig-em">let the test decide</span>.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto, glad to work remote. Eight years designing, the last five on payments: checkout fees, split transactions, one design system for three merged products. My favourite result came from pausing a launch that already looked like a win. I prototype in code with AI tools like Cursor and Claude Code, and I care how things move.</>}
      hero={<><ExperimentWriteup /></>}
      caption={<>Step through the write-up. Every figure is from the real test; the small controls under Variants are recreations.</>}
      cases={["fe", "tw", "ar", "au", "or", "ak"]}
      fit={[
        { ask: "A hunch made testable", proof: <>The easy move on Fee Opt-In was to ship the 82%. I argued to pause, wrote one hypothesis, and designed three variants to run against the existing control in Pendo, each built ready to ship the day the test closed.</> },
        { ask: "More than one number", proof: <>Opt-in was the number to move. Conversion and average gift size were the ones not to break. The slider reached 92%, past the 90% benchmark, with both holding steady.</> },
        { ask: "Prototypes people can poke", proof: <>I built the fee flow as working prototypes in Cursor and MagicPatterns, so PMs and engineers could change defaults and thresholds and watch the outcome before anything shipped.</> },
        { ask: "Motion with rules", proof: <>ARND, my live-music app, uses one spring for every press and one breath for every changing number, and all of it stands down under Reduce Motion. Built with AI coding tools over 160+ merged pull requests.</> },
        { ask: "Revenue people choose", proof: <>Automation went from first interview to a paid add-on: 30% of 355 organizations use it, and it contributed to a 13% ARR increase. Split transactions cut categorization tickets by 70% in the first month.</> },
      ]}
      contact={<>I&rsquo;d like to make the moment someone decides to pay feel fair, and keep testing until it does.</>}
    />
  );
}
