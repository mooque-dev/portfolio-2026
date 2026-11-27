import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Figtree } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Ashby, built on the
// shared frame (components/tailored/TailoredPage.tsx). It opens on a screen built with Orchid, the design system case.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Ashby" },
  description:
    "A short path through Allen Kang's work: a design system cut down to what teams use, complex desktop workflows, information architecture across merged products, and features owned end to end.",
  robots: { index: false, follow: false },
};

const fdisplay = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Figtree({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#473BCE", "--brand-on": "#FCFCFE", "--brand-ink": "#473BCE", "--brand-ink-dark": "#A79FF5", "--hb": "#F7F4EC", "--hf": "#141415", "--hb-d": "#F7F4EC", "--hf-d": "#141415", "--hm": "#473BCE", "--hc": "#473BCE", "--hco": "#FCFCFE" } as CSSProperties;

export default function AshbyPage() {
  return (
    <TailoredPage
      slug="ashby"
      company="Ashby"
      style={BRAND}
      className={`themed theme-ashby ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I design complex tools for people whose expertise isn&rsquo;t software.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years in: CRM, payments, healthcare and design systems, most recently at Aplos, now Velora. I prototype in code with AI tools like Cursor and Claude Code.</>}
      hero={
        <Link
          href="/work/orchid-design-system"
          className="group relative block aspect-[3/2] overflow-hidden rounded-lg"
          style={{ backgroundColor: "#e0d4e6" }}
        >
          <Image
            src="/case-studies/orchid-design-system/cover.jpg"
            alt="A dashboard built from Orchid components"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 440px"
            className="object-contain"
          />
        </Link>
      }
      caption={<>A screen built with{" "}
                <Link href="/work/orchid-design-system" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Orchid
                </Link>
                , the design system I pitched and led.</>}
      cases={["or", "tw", "ak", "au", "fe", "ar"]}
      hideBuilt
      work="rows"
      close="plain"
      contact={<>Thanks for reading. I&rsquo;d be glad to talk whenever it suits you.</>}
    />
  );
}
