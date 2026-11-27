import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Plooto, built on the
// shared frame (components/tailored/TailoredPage.tsx). It opens on the real split payment form from Transaction Workflows.
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
      headline={<>I design complex tools for people whose expertise isn&rsquo;t software.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years in: CRM, payments, healthcare and design systems, most recently at Aplos, now Velora. I prototype in code with AI tools like Cursor and Claude Code.</>}
      hero={
        <Link
          href="/work/transaction-workflows"
          className="group relative block aspect-[3/2] overflow-hidden rounded-lg"
          style={{ backgroundColor: "#dde4d4" }}
        >
          <Image
            src="/case-studies/transaction-workflows/cover.jpg"
            alt="The New Transaction form, with one payment split into a donation and a revenue line"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 440px"
            className="object-contain"
          />
        </Link>
      }
      caption={<>The split payment form from{" "}
                <Link href="/work/transaction-workflows" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Transaction Workflows
                </Link>
                : one payment, recorded as the donation and the revenue it really was.</>}
      cases={["tw", "fe", "or", "ak", "au", "ar"]}
      contact={<>Thanks for reading. I&rsquo;d be glad to talk whenever it suits you.</>}
    />
  );
}
