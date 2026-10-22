import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Archivo, Wix_Madefor_Text, Kode_Mono } from "next/font/google";
import { Statement, type StatementLine } from "@/components/PaymentCard";
import TokenCard from "@/components/TokenCard";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for APPLY. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Same
// shape as the other tailored pages: an opening object, the work, a way to
// reach me, and a block of things that already run. The object is one
// product card in three brands, with the token tiers behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for APPLY" },
  description:
    "A short path through Allen Kang's work: design systems, craft, building with AI, and things that already run.",
  robots: { index: false, follow: false },
};

const STATEMENT: StatementLine[] = [
  {
    tag: "Design system",
    title: "Orchid design system",
    line: "I pitched it with surveys from five departments, earned two dedicated front-end engineers, and got three teams onto one system.",
    value: "340+ components",
    note: "merged into one library three teams use",
    href: "/work/orchid-design-system",
  },
  {
    tag: "Experiment",
    title: "Fee Opt-In",
    line: "I paused a launch that looked like a win, prototyped three fixes in code, then A/B tested them. Has a checkout you can play with.",
    value: "75→92%",
    note: "donors who chose to cover the fee",
    href: "/work/fee-opt-in-experimentation",
  },
  {
    tag: "Side project",
    title: "ARND",
    line: "A map-first app for Toronto's small live shows that I designed and built end to end.",
    value: "161 pull requests",
    note: "merged since April, in public beta",
    href: "/work/arnd",
  },
  {
    tag: "0 to 1",
    title: "Automation for Nonprofits",
    line: "Fifteen interviews and three rounds of prototype testing, from a product area that didn't exist to a paid add-on in five months.",
    value: "+13% ARR",
    note: "for the product, with 30% of 355 organizations using it",
    href: "/work/automation-nonprofits",
  },
  {
    tag: "Accounting",
    title: "Transaction Workflows",
    line: "One payment can be a donation, a gift and a ticket at once. I sat with accountants until that made sense, then redesigned how it's recorded under three countries' tax rules.",
    value: "-70% tickets",
    note: "fewer categorization support tickets, first month",
    href: "/work/transaction-workflows",
  },
  {
    tag: "Side project",
    title: "Toronto Yuwol",
    line: "Scheduling, attendance and a bill splitter for a forty-person company putting on a musical.",
    value: "10 months",
    note: "used daily through the run",
    href: "/work/torontoyuwol",
  },
];

const BUILT: { label: string; text: string; links: { href: string; name: string; external?: boolean }[] }[] = [
  {
    label: "On my own",
    text: "ARND, a map-first React Native app for Toronto's small live shows, built with AI coding tools that read its design rules before they write a line. Five themes in light and dark, 161 merged pull requests, in public beta.",
    links: [
      { href: "https://arnd.app", name: "arnd.app", external: true },
      { href: "/work/arnd", name: "The case" },
    ],
  },
  {
    label: "At work",
    text: "Fee Opt-In was prototyped in code with Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it before anything shipped.",
    links: [{ href: "/work/fee-opt-in-experimentation#try", name: "Play with the checkout" }],
  },
  {
    label: "Designing for AI",
    text: "Forkestrate, an AI cooking app I co-founded with a PM and two engineers, from zero to MVP in under three months, where I learned to design for AI before it reached my day job.",
    links: [{ href: "/work/forkestrate", name: "The case" }],
  },
];


const fdisplay = Archivo({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Wix_Madefor_Text({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const fmono = Kode_Mono({ subsets: ["latin"], display: "swap", variable: "--bd-mono" });
const BRAND = { "--brand": "#282A33", "--brand-on": "#ffffff", "--brand-ink": "#B83500", "--brand-ink-dark": "#FF7A45", "--hb": "#FCFCFA", "--hf": "#1A1B1C", "--hb-d": "#FCFCFA", "--hf-d": "#1A1B1C", "--hm": "#FF4A08", "--hc": "#282A33", "--hco": "#ffffff" } as CSSProperties;

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 mt-20 md:mt-28">
      <h2 id={`${id}-title`} className="text-lg md:text-xl font-medium tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ApplyDigitalPage() {
  return (
    <article style={BRAND} className={`brand-page themed theme-apply-digital ${fdisplay.variable} ${ftext.variable} ${fmono.variable} relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="brand-hero">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                I set the bar for how a product looks, then build the system that <span className="sig-brace">keeps it there</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a product designer in Toronto with a graphic design degree. Eight years designing, the last five on B2B software, where I grew one design system to 340+ components across three teams and mentored three designers. These days I work with Claude from first concept to running code.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/allen-kang-resume-apply-digital-lead.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} brand-cta gap-1.5`}
                >
                  Résumé (PDF) <Arrow dir="up-right" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a href="#ad-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="min-w-0 sig-obj">
              <TokenCard preset="product" />
              <p className="mt-3 text-[14px] text-muted">Switch the brand. Only the global tier changes.</p>
            </div>
          </div>
        </FadeIn>
        </div>

        <Block id="ad-work" title="Selected work">
          <Statement lines={STATEMENT} />
          <p className="mt-4 text-[14px]">
            <Link href="/work" className={`text-muted ${link}`}>
              All work <Arrow />
            </Link>
          </p>
        </Block>

        <section aria-label="Built in code" className="mt-20 md:mt-28 grid max-w-2xl gap-5">
          {BUILT.slice(0, 2).map((b) => (
            <p key={b.label} className="text-[16px] leading-relaxed text-muted">
              {b.text}{" "}
              {b.links.map((l, i) => (
                <span key={l.href}>
                  {i ? " \u00b7 " : ""}
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                      {l.name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                      {l.name}
                    </Link>
                  )}
                </span>
              ))}
            </p>
          ))}
        </section>

        <section
          aria-labelledby="ad-contact"
          className="brand-foot mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="ad-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to help brands ship work that looks as good live as it did in the deck.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} brand-cta`}>
              allensmkang@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} border border-border hover:border-foreground/40`}
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by APPLY.</p>
      </div>
    </article>
  );
}
