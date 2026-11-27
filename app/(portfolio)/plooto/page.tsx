import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import BillRun from "@/components/BillRun";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Plooto, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// one made-up bill stepped through the three moments that decide trust in a payment: the approval, the catch before money moves, and the confirmation, each tied to the case where the same rule was used.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Plooto" },
  description:
    "A short path through Allen Kang's work: split transactions redesigned with the people who do the books at nonprofits, an A/B test that took fee opt-in from 75% to 92%, and one design system for three merged products.",
  robots: { index: false, follow: false },
};

const fdisplay = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Nunito_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#173BD9", "--brand-on": "#ffffff", "--brand-ink": "#173BD9", "--brand-ink-dark": "#93A6F7", "--hb": "#F5F7FF", "--hf": "#001234", "--hb-d": "#F5F7FF", "--hf-d": "#001234", "--hm": "#173BD9", "--hc": "#173BD9", "--hco": "#ffffff" } as CSSProperties;

export default function PlootoPage() {
  return (
    <TailoredPage
      slug="plooto"
      company="Plooto"
      style={BRAND}
      className={`themed theme-plooto ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I redesigned split transactions<span className="sig-tone"> and cut categorization tickets by 70%.</span></>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on payments and finance tools: split transactions, checkout fees, and one design system for three merged products. I learn the rules from the people who do the books, some of them accountants, and I build working prototypes with AI coding tools when a mock can&rsquo;t settle it.</>}
      hero={<><BillRun /></>}
      caption={<>One bill on its way out, sketched from the outside. Step through it.</>}
      cases={["tw", "fe", "or", "ak", "au", "ar"]}
      contact={<>If the bill above gets an approval wrong, I&rsquo;d like to hear how your customers really pay.</>}
    />
  );
}
