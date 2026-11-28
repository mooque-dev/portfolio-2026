import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Figtree } from "next/font/google";
import Image from "next/image";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Jeppesen ForeFlight. Not in
// the sitemap, not in the nav, and kept out of search results on purpose.
// Same shape as /bluej: an opening picture, the work, a way to reach me, and
// a block of things that already run. The opening picture is the real split
// payment screen the headline is about, under a navy-to-sunset sky.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Jeppesen ForeFlight" },
  description:
    "A short path through Allen Kang's work on accounting, healthcare and data tools, design systems, and prototypes built with AI coding tools.",
  robots: { index: false, follow: false },
};

const fdisplay = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#FF791A", "--brand-on": "#001629", "--brand-ink": "#1D3A6B", "--brand-ink-dark": "#8FB3F0", "--hb": "linear-gradient(180deg, #0F1F3D 0%, #1D3A6B 70%, #6B3A5E 100%)", "--hf": "#ffffff", "--hm": "#F08A4B", "--hc": "#FF791A", "--hco": "#001629" } as CSSProperties;

export default function JeppesenPage() {
  return (
    <TailoredPage
      slug="jeppesen-foreflight"
      company="Jeppesen ForeFlight"
      style={BRAND}
      className={`themed theme-jeppesen-foreflight ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I redesigned split payments to follow tax rules in three countries.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on
                software for nonprofits (CRM, payments and accounting), and I prototype in code with AI tools when a mock can&rsquo;t answer the question.</>}
      hero={
        <Link
          href="/work/transaction-workflows"
          className="group relative block aspect-[3/2] overflow-hidden rounded-lg ring-1 ring-inset ring-white/15"
          style={{ backgroundColor: "#dde4d4" }}
        >
          <Image
            src="/case-studies/transaction-workflows/cover.jpg"
            alt="The New Transaction form, with one payment split into a donation and a revenue line"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 440px"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      }
      caption={<>The split payment form from{" "}
                <Link href="/work/transaction-workflows" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Transaction Workflows
                </Link>
                : one payment, recorded as the donation and the revenue it really was.</>}
      cases={["tw", "ak", "mj", "au", "or", "fe"]}
      contact={<>Thanks for reading. I&rsquo;d be glad to talk whenever it suits you.</>}
    />
  );
}
