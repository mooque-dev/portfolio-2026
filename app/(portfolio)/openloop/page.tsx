import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Statement, type StatementLine } from "@/components/PaymentCard";
import TokenCard from "@/components/TokenCard";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for OpenLoop. Not in the
// sitemap, not in the nav, and kept out of search results on purpose. Same
// shape as the other tailored pages: an opening object, the work, a way to
// reach me, and a block of things that already run. The object is one
// component in three brands, with the token tiers behind it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for OpenLoop" },
  description:
    "A short path through Allen Kang's work: design systems, healthcare, research, and things that already run.",
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
    tag: "Healthcare",
    title: "MyJourney dashboards",
    line: "Dashboards clinicians used to track cancer patients through treatment, rebuilt as working redesigns you can filter and click.",
    value: "4 screens",
    note: "rebuilt as working software",
    href: "/case/care-pathway/index.html",
  },
  {
    tag: "Data sync",
    title: "Aplos × Keela",
    line: "Twelve interviews with finance managers turned a data sync into a trust problem, so every field mapping became visible before anything moved.",
    value: "1st joint launch",
    note: "the first feature the merged companies shipped together",
    href: "/work/aplos-keela-integration",
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

const OWN = [
  { slug: "forkestrate", name: "Forkestrate" },
  { slug: "arnd", name: "ARND" },
  { slug: "torontoyuwol", name: "Toronto Yuwol" },
];

const BRAND = { "--brand": "#E6004A", "--brand-on": "#ffffff", "--brand-ink": "#C4003F", "--brand-ink-dark": "#FF6B93" } as CSSProperties;

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";

function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 mt-24 md:mt-32">
      <p className="microlabel text-muted brand-label">{label}</p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function OpenLoopPage() {
  return (
    <article style={BRAND} className="brand-page relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="brand-glow" aria-hidden />
      <div className="ol-dots" aria-hidden />
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                I build design systems people <span className="brand-mark">don&rsquo;t have to think about</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on B2B software, where I grew one design system to 340+ components across three teams. On my own app, the design rules live in a file my AI coding tools read before they build.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/allen-kang-resume-openloop.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} brand-cta gap-1.5`}
                >
                  Résumé (PDF) <Arrow dir="up-right" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a href="#ol-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="min-w-0">
              <TokenCard />
              <p className="mt-3 text-[14px] text-muted">Switch the brand. Only the last column changes.</p>
            </div>
          </div>
        </FadeIn>

        <Block id="ol-work" label="The work" title="Six projects, and what changed after each one shipped.">
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

        <Block id="ol-code" label="Built, not just drawn" title="Most of what I'd show you already runs.">
          <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {BUILT.map((b) => (
              <li key={b.label} className="flex flex-col brand-rule border-t pt-5">
                <p className="microlabel text-muted brand-label">{b.label}</p>
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
          aria-labelledby="ol-contact"
          className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="ol-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to build the system a care team never has to think about.
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
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by OpenLoop.</p>
      </div>
    </article>
  );
}
