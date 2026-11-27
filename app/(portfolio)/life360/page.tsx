import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Outfit, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Life360, built on the
// shared frame (components/tailored/TailoredPage.tsx). It opens on the
// three checkout versions from the Fee Opt-In test, the same picture the
// case study uses, and links straight to the case.
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
      headline={<>I ran an A/B test that took fee opt&#8209;in from 75% to 92%.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on payments: checkout fees, split transactions, and one design system for three merged products. I prototype in code with AI tools like Cursor and Claude Code.</>}
      hero={
        <Link
          href="/work/fee-opt-in-experimentation"
          className="group relative block aspect-[16/9] overflow-hidden rounded-lg"
          style={{ backgroundColor: "#efeae3" }}
        >
          <Image
            src="/case-studies/fee-opt-in/02-variants.jpg"
            alt="Three phone checkouts with the fee editor open: a slider, four amount buttons, and a dropdown"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 440px"
            className="object-contain"
          />
        </Link>
      }
      caption={<>The three versions I tested in{" "}
                <Link href="/work/fee-opt-in-experimentation" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Fee Opt-In
                </Link>
                . The slider shipped.</>}
      cases={["fe", "tw", "ar", "au", "or", "ak"]}
      titles={{ fit: <>What the role asks for</> }}
      fit={[
        { ask: "Experiments", proof: <>The first Fee Opt-In launch reached 82%. I asked to pause it, wrote one hypothesis, and designed three versions to run against the control in Pendo.</> },
        { ask: "Metrics", proof: <>Opt-in was the number to move. Conversion and average gift size were the two not to break. The slider reached 92%, past the 90% benchmark, and both held.</> },
        { ask: "Prototypes", proof: <>I built the fee flow as working prototypes in Cursor and MagicPatterns, so PMs and engineers could change defaults and thresholds before anything shipped.</> },
        { ask: "Animation", proof: <>ARND, my live-music app, has one spring for every press and one pulse for every changing number, and both turn off under Reduce Motion. Built with AI coding tools, 160+ merged pull requests.</> },
        { ask: "Paid features", proof: <>Automation went from first interview to a paid add-on: 30% of 355 organizations use it, and it contributed to a 13% ARR increase.</> },
      ]}
      hideBuilt
      contact={<>Thanks for reading. I&rsquo;d be glad to talk whenever it suits you.</>}
    />
  );
}
