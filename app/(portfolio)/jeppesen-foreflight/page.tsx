import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Statement, type StatementLine } from "@/components/PaymentCard";
import FlightPlan from "@/components/FlightPlan";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for Jeppesen ForeFlight. Not in
// the sitemap, not in the nav, and kept out of search results on purpose.
// Same shape as /bluej: an opening picture, the work, a way to reach me, and
// a block of things that already run. The picture is the career drawn as a
// flight plan on an enroute-style chart, under a navy-to-sunset sky.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Jeppesen ForeFlight" },
  description:
    "A short path through Allen Kang's work on expert tools: review and approval surfaces, auditable data, data-dense dashboards, and shipping in code.",
  robots: { index: false, follow: false },
};

// One line per case, each opening its page. Every number is on the résumé.
const STATEMENT: StatementLine[] = [
  {
    tag: "Expert review",
    title: "Transaction Workflows",
    line: "The screens where accountants categorize and correct transactions, under tax rules in Canada, the US and Australia, now checked as they work instead of at year end.",
    value: "-70% tickets",
    note: "fewer categorization support tickets, first month",
    href: "/work/transaction-workflows",
  },
  {
    tag: "Auditability",
    title: "Aplos × Keela",
    line: "Twelve interviews turned a data sync into a trust problem, so every field mapping became visible and checkable before anything moved.",
    value: "1st joint launch",
    note: "the first feature the merged companies shipped together",
    href: "/work/aplos-keela-integration",
  },
  {
    tag: "Automation",
    title: "Automation for Nonprofits",
    line: "A workflow builder where the fear was automation going wrong, so a preview shows exactly who it will touch before it runs.",
    value: "30% adoption",
    note: "across 355 organizations, and +13% ARR",
    href: "/work/automation-nonprofits",
  },
  {
    tag: "Data-dense",
    title: "MyJourney dashboards",
    line: "Dashboards clinicians used to track cancer patients through treatment, rebuilt as working redesigns you can filter and click.",
    value: "4 screens",
    note: "rebuilt as working software",
    href: "/case/care-pathway/index.html",
  },
  {
    tag: "Across teams",
    title: "Orchid design system",
    line: "Three engineering teams onto one system without the authority to make them, while mentoring two designers.",
    value: "340+ components",
    note: "merged into one library three teams use",
    href: "/work/orchid-design-system",
  },
  {
    tag: "Data, then decide",
    title: "Fee Opt-In",
    line: "I paused a launch that looked like a win, then A/B tested three fixes. Has a checkout you can play with.",
    value: "75→92%",
    note: "donors who chose to cover the fee",
    href: "/work/fee-opt-in-experimentation",
  },
];

const BUILT: { label: string; text: string; links: { href: string; name: string; external?: boolean }[] }[] = [
  {
    label: "Shipping code",
    text: "ARND, a map-first React Native app for Toronto's small live shows, designed and built with AI coding tools. 160+ merged pull requests since April, in public beta.",
    links: [
      { href: "https://arnd.app", name: "arnd.app", external: true },
      { href: "/work/arnd", name: "The case" },
    ],
  },
  {
    label: "At work",
    text: "Fee Opt-In was prototyped in code with Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it. The rebuilt checkout runs on phone, tablet and desktop.",
    links: [{ href: "/work/fee-opt-in-experimentation#try", name: "Play with the checkout" }],
  },
  {
    label: "Designing for AI",
    text: "Forkestrate, an AI cooking app I co-founded with a PM and two engineers, from zero to MVP in under three months, where I learned to design for AI before it reached my day job.",
    links: [{ href: "/work/forkestrate", name: "The case" }],
  },
];

const OWN = [
  { slug: "forkestrate", name: "Forkestrate" },
  { slug: "arnd", name: "ARND" },
  { slug: "torontoyuwol", name: "Toronto Yuwol" },
];

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";

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

export default function JeppesenPage() {
  return (
    <article className="relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="jf-sky" aria-hidden />
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                I design the screens where experts check the data, and I ship them in code.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on
                accounting, payments and healthcare tools, and these days I ship with AI coding tools, one pull request at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/allen-kang-resume-jeppesen-foreflight.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} gap-1.5 border border-border hover:border-foreground/40`}
                >
                  Résumé (PDF) <Arrow dir="up-right" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a href="#jf-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="min-w-0">
              <FlightPlan />
            </div>
          </div>
        </FadeIn>

        <Block id="jf-work" label="The work" title="Six projects built for experts, and what changed after each one shipped.">
          <Statement lines={STATEMENT} />
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted">
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
            <Link href="/work" className={`text-foreground ${link}`}>
              All work <Arrow />
            </Link>
          </p>
        </Block>

        <Block id="jf-code" label="In code" title="I don't hand off a file and wait. Most of what I'd show you already runs.">
          <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {BUILT.map((b) => (
              <li key={b.label} className="flex flex-col border-t border-foreground/80 pt-5">
                <p className="microlabel text-muted">{b.label}</p>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed">{b.text}</p>
                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {b.links.map((l) =>
                    l.external ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                        {l.name} <Arrow dir="up-right" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={link}>
                        {l.name} <Arrow />
                      </Link>
                    )
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <section
          aria-labelledby="jf-contact"
          className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="jf-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to build better tools for the people behind every flight.
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
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by Jeppesen ForeFlight.</p>
      </div>
    </article>
  );
}
