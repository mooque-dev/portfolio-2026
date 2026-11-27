import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Manrope } from "next/font/google";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Nylas, built on the shared
// frame (components/tailored/TailoredPage.tsx). It opens on the Orchid
// design system, since the role owns a design language across products.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Nylas" },
  description:
    "A short path through Allen Kang's work: one design system for three merged products, an A/B test that took fee opt-in from 75% to 92%, and a product taken from first interview to a paid add-on.",
  robots: { index: false, follow: false },
};

const fdisplay = Manrope({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Manrope({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#2F56D9", "--brand-on": "#ffffff", "--brand-ink": "#2F56D9", "--brand-ink-dark": "#9DB3FF", "--hb": "var(--background)", "--hf": "var(--foreground)", "--hm": "#2F56D9", "--hc": "#2F56D9", "--hco": "#ffffff" } as CSSProperties;

export default function NylasPage() {
  return (
    <TailoredPage
      slug="nylas"
      company="Nylas"
      style={BRAND}
      className={`themed theme-nylas ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I cut 340+ components to 70 that three teams share.</>}
      lede={<>I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing tools for people whose expertise isn&rsquo;t software, the last five on payments and CRM. I build with AI coding tools like Claude Code every day.</>}
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
      cases={["or", "fe", "au", "ak", "yu", "ar"]}
      titles={{ fit: <>What the role asks for</> }}
      fit={[
        { ask: "A design language", proof: <>I pitched Orchid with surveys from five departments, earned two dedicated front-end engineers, and got three teams onto one system.</> },
        { ask: "Customer friction", proof: <>The first Fee Opt-In launch reached 82%. I asked to pause it, tested three versions against the control, and the slider took opt-in from 75% to 92% with conversion steady.</> },
        { ask: "New bets", proof: <>Automation started as a product area that didn&rsquo;t exist. Fifteen interviews and three rounds of prototype testing later it was a paid add-on: 30% of 355 organizations use it, and it contributed to a 13% ARR increase.</> },
        { ask: "Technical concepts", proof: <>On Aplos × Keela, twelve interviews with finance managers showed the data sync was a trust problem, so every field mapping became visible before anything moved.</> },
        { ask: "Scheduling", proof: <>I built scheduling, attendance and a bill splitter for a forty-person musical company. They used it daily for ten months.</> },
        { ask: "AI tools", proof: <>ARND, my live-music app, is built with AI coding tools: I direct, review and test the work. 160+ merged pull requests, in public beta.</> },
      ]}
      hideBuilt
      contact={<>Thanks for reading. I&rsquo;d be glad to talk whenever it suits you.</>}
    />
  );
}
