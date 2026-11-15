import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Nunito_Sans } from "next/font/google";
import PlanExplainer from "@/components/PlanExplainer";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Pawlicy Advisor, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a sample pet insurance plan: three terms that trip people up, each read as the policy wording or the plain version, with a sample vet bill that shows what the plan pays back. Made-up numbers, not Pawlicy's product.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Pawlicy Advisor" },
  description:
    "A short path through Allen Kang's work: hard rules made plain, a checkout moment tested until it moved, a design system three teams adopted, and apps that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#B9501C", "--brand-on": "#ffffff", "--brand-ink": "#B9501C", "--brand-ink-dark": "#F28A55", "--hb": "#FFFFFF", "--hf": "#403E3C", "--hb-d": "#FFFFFF", "--hf-d": "#403E3C", "--hm": "#B9501C", "--hc": "#B9501C", "--hco": "#ffffff" } as CSSProperties;

export default function PawlicyPage() {
  return (
    <TailoredPage
      slug="pawlicy"
      company="Pawlicy Advisor"
      style={BRAND}
      className={`themed theme-pawlicy ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I make the fine print <span className="sig-accent">plain enough</span> to decide on.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on payments and finance tools, where I learned tax rules from accountants and rebuilt them as steps anyone could get right. I test the moments where people decide, and I prototype in code with Claude Code and Cursor.</>}
      hero={<><PlanExplainer /></>}
      caption={<>A sample plan with made-up numbers, not a real quote. I did the same for tax rules in <Link href="/work/transaction-workflows" className="underline underline-offset-4">Transaction Workflows</Link>.</>}
      cases={["tw", "fe", "or", "ar", "au", "ak"]}
      contact={<>I&rsquo;d like to help more people say yes at the vet.</>}
    />
  );
}
