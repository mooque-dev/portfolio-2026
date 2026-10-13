import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PaymentCard, { Statement, type StatementLine } from "@/components/PaymentCard";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";
import TwoWorlds from "@/components/TwoWorlds";

// A tailored, unlisted view of the portfolio for one reviewer. Not in the
// sitemap, not in the nav, and kept out of search results on purpose.
export const metadata: Metadata = {
  title: "Allen Kang for Mastercard",
  description:
    "A shorter path through Allen Kang's work, ordered for a team that designs around money, data, and trust.",
  robots: { index: false, follow: false },
};

// Kept short on purpose: who I am, how I work, and one line per case that
// leads to the detail. The case pages carry the story; this page points.
// Every number is on the résumé. Tags name what a payments team protects
// (trust, safety, quality) and what this team asked about (0 to 1, ambiguity).
const STATEMENT: StatementLine[] = [
  {
    tag: "0 to 1 · Safety",
    title: "Automation for Nonprofits",
    line: "From a product area that didn't exist to a paid add-on in five months, with 30% adoption.",
    value: "+13% ARR",
    href: "/work/automation-nonprofits",
  },
  {
    tag: "Ambiguity · Quality",
    title: "Transaction Workflows",
    line: "Accounting rules in three countries, with errors caught while they're cheap.",
    value: "-70% tickets",
    href: "/work/transaction-workflows",
  },
  {
    tag: "Trust",
    title: "Aplos × Keela",
    line: "The first feature two merged companies shipped: a sync that shows every mapping.",
    value: "1st joint launch",
    href: "/work/aplos-keela-integration",
  },
  {
    tag: "Experiment",
    title: "Fee Opt-In",
    line: "I paused a win to fix a leak, then tested the fix. Has a checkout you can play with.",
    value: "75→92%",
    href: "/work/fee-opt-in-experimentation",
  },
  {
    tag: "Systems",
    title: "Orchid design system",
    line: "Three teams onto one system, without the authority to make them.",
    value: "340+ components",
    href: "/work/orchid-design-system",
  },
];

const OWN = [
  { slug: "forkestrate", name: "Forkestrate" },
  { slug: "arnd", name: "ARND" },
  { slug: "torontoyuwol", name: "Toronto Yuwol" },
];

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";

// One header pattern for every block: a quiet label and one sentence.
function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 mt-24 md:mt-32">
      <p className="microlabel text-muted">{label}</p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function MastercardPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                Making high-stakes numbers easy to trust.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a senior product designer. Eight years designing, the last five on payments: the
                screens where money moves and the records have to be right.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/allen-kang-resume-mastercard.pdf" download className={`${pill} bg-foreground text-background hover:opacity-80`}>
                  Download résumé
                </a>
                <a href="#mc-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="min-w-0 max-w-[400px]">
              <PaymentCard />
            </div>
          </div>
        </FadeIn>

        <Block id="mc-worlds" label="How I work" title="You know two circles that overlap. Most of my work happens in the overlap.">
          <TwoWorlds />
        </Block>

        <Block id="mc-work" label="The work" title="Five cases, one line each. Open the one you care about.">
          <Statement
            lines={STATEMENT}
            footer={
              <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
                <span>Built on my own:</span>
                {OWN.map((o, i) => (
                  <span key={o.slug}>
                    <Link href={`/work/${o.slug}`} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                      {o.name}
                    </Link>
                    {i < OWN.length - 1 ? "," : ""}
                  </span>
                ))}
                <span aria-hidden>·</span>
                <Link href="/work" className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  All work <Arrow />
                </Link>
              </p>
            }
          />
        </Block>

        <section
          aria-labelledby="mc-contact"
          className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="mc-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to talk about the numbers behind your numbers.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} bg-foreground text-background hover:opacity-80`}>
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
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by Mastercard.</p>
      </div>
    </article>
  );
}
