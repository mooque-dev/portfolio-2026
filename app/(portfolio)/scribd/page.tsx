import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Newsreader, Work_Sans } from "next/font/google";
import BookShelf from "@/components/BookShelf";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Scribd, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a shelf of book covers, one per case study, including the tests that lost.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Scribd" },
  description:
    "A short path through Allen Kang's work: experiments that moved numbers, ones that didn't, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Newsreader({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#16171B", "--brand-on": "#ffffff", "--brand-ink": "#201C14", "--brand-ink-dark": "#F9E04B", "--hb": "#FBF8F1", "--hf": "#201C14", "--hb-d": "#FBF8F1", "--hf-d": "#201C14", "--hm": "#F9E04B", "--hc": "#F9E04B", "--hco": "#16171B" } as CSSProperties;

export default function ScribdPage() {
  return (
    <TailoredPage
      slug="scribd"
      company="Scribd"
      style={BRAND}
      className={`themed theme-scribd ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design the moment a reader decides to stay.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, most recently on payments and paid add-ons. I run experiments, including the ones that lose, and design what comes next.</>}
      hero={<><BookShelf /></>}
      caption={<>Every cover opens a case study. One is the tests that lost.</>}
      cases={["fe", "au", "ar", "tw", "or", "yu"]}
      contact={<>I&rsquo;d like to help more readers find the book they can&rsquo;t put down.</>}
    />
  );
}
