import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Figtree } from "next/font/google";
import BoardingPass from "@/components/BoardingPass";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Jeppesen ForeFlight. Not in
// the sitemap, not in the nav, and kept out of search results on purpose.
// Same shape as /bluej: an opening picture, the work, a way to reach me, and
// a block of things that already run. The opening object is a boarding pass,
// the way the Mastercard and Float pages open with a card, under a
// navy-to-sunset sky.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Jeppesen ForeFlight" },
  description:
    "A short path through Allen Kang's work on accounting, healthcare and data tools, design systems, and building in code.",
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
      headline={<>I design the parts of software where the data has to be right, and I build them in code.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on
                accounting and payments tools, and I prototype in code when a mock can&rsquo;t answer the question.</>}
      hero={<><BoardingPass /></>}
      caption={<>Seat 8Y for eight years designing. Gate PR #162 is my next pull request on{" "}
                <Link href="/work/arnd" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  ARND
                </Link>
                .</>}
      cases={["tw", "ak", "mj", "au", "or", "fe"]}
      contact={<>I&rsquo;d like to work on tools where getting it right matters.</>}
    />
  );
}
