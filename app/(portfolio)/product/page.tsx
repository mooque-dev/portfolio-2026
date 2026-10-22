import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/Arrow";

// The product management view of the portfolio: the same work, told as
// problem, evidence, the call and the result. Unlisted and kept out of
// search, like the tailored pages. Every number is in the case studies.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang, product" },
  description: "Allen Kang's work told as product decisions: the problem, the evidence, the call and what happened.",
  robots: { index: false, follow: false },
};

type Decision = {
  where: string;
  title: string;
  stat: string;
  statLabel: string;
  rows: [string, string][];
  href: string;
};

const DECISIONS: Decision[] = [
  {
    where: "Aplos (now Velora) · 2025",
    title: "Fix the feature behind the churn, without a rewrite",
    stat: "−70%",
    statLabel: "categorization support tickets in the first month",
    rows: [
      ["Problem", "Nonprofits could record only one type per payment, but a gala ticket is part donation, part value received. Staff logged several records, receipts went wrong, and it was a top churn driver."],
      ["Evidence", "56% of newly onboarded organizations voted for it, about 500 support tickets a quarter traced back to it, and 8 accountants I sat with all kept a parallel spreadsheet."],
      ["The call", "Before designing, the PM, the engineering lead and I agreed what we couldn't do: no backend refactor, nothing that broke reporting. I pushed for a split that would extend to the next case, delivered in phases behind feature flags."],
      ["Result", "Manual adjustments fell 60% and the work supported $1.8M ARR in connected accounts, compliant across Canadian, US and Australian tax rules."],
    ],
    href: "/work/transaction-workflows",
  },
  {
    where: "Aplos (now Velora) · Raisely · 2026",
    title: "Hold a win that was hiding a leak",
    stat: "75→92%",
    statLabel: "donors choosing to cover the fee, A/B tested",
    rows: [
      ["Problem", "A redesigned fee box lifted opt-in from 75% to 82%. But the 12 to 20% of donors who clicked Edit landed in an older box that nudged them to the smallest fee."],
      ["Evidence", "Behaviour in that fallback, a 90% industry benchmark, and the fact that the leak sat exactly where donors change their mind."],
      ["The call", "I made the case to pause the rollout instead of shipping the 82%. I set the hypothesis and the guardrails (conversion and average gift must hold), then tested three variants against the control in Pendo, prototyped in code so the team could adjust the logic first."],
      ["Result", "The slider reached 92% with conversion and average gift steady, and shipped platform-wide the day the test closed. Mobile, where 60% of giving happens, is next."],
    ],
    href: "/work/fee-opt-in-experimentation",
  },
  {
    where: "Keela · 2021",
    title: "Find the real obstacle before building the feature",
    stat: "+13%",
    statLabel: "ARR, with 30% of 355 organizations using it",
    rows: [
      ["Problem", "Automation was the most requested feature and competitors were winning deals on it. It was first scoped at three weeks."],
      ["Evidence", "Fifteen interviews with operations managers. The top fear wasn't complexity: “What if I accidentally email all 5,000 of our donors?”"],
      ["The call", "With the PM and the lead designer, I made the case for more time to research and test. We set confidence as the goal, so preview mode came first, and moved some user stories to a second release to hold the date."],
      ["Result", "Three rounds of testing, each turned into prioritized work. It shipped as a paid add-on in about four months."],
    ],
    href: "/work/automation-nonprofits",
  },
];

const ARND: [string, string][] = [
  ["Curated listings over scraping", "Small venues post shows in a dozen places, and scraped data is wrong often enough to break trust. I chose a curated, community-submitted catalog for the beta, even though it grows more slowly."],
  ["A staged switch to live data", "The live catalog went behind a flag, so the app could fall back to known-good data while the real one proved itself."],
  ["An outage turned into a practice", "When the catalog went down behind a green health check, I added monitoring on three surfaces and honest error states, not just a fix."],
];

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";

export default function ProductPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <header className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            I find the problem, decide what to build, and ship it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I&rsquo;m Allen. Eight years on B2B software, the last five on payments and finance for nonprofits in Canada, the US and Australia.
            I stepped in as PM to ship Pipelines, and I build and run my own products with AI coding tools. Below are three decisions, told the
            way they happened.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/allen-kang-resume-product.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} gap-1.5 bg-foreground text-background hover:opacity-80`}
            >
              Résumé (PDF) <Arrow dir="up-right" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href="mailto:allensmkang@gmail.com" className={`${pill} border border-border hover:border-foreground/40`}>
              allensmkang@gmail.com
            </a>
          </div>
        </header>

        <div className="mt-20 md:mt-28 grid gap-16 md:gap-24">
          {DECISIONS.map((d) => (
            <section key={d.title} aria-labelledby={d.href} className="border-t border-border pt-8">
              <p className="text-[14px] text-muted">{d.where}</p>
              <div className="mt-2 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-12">
                <div className="min-w-0">
                  <h2 id={d.href} className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
                    {d.title}
                  </h2>
                  <dl className="mt-6 grid gap-4">
                    {d.rows.map(([k, v]) => (
                      <div key={k} className="grid gap-1 md:grid-cols-[110px_minmax(0,1fr)] md:gap-6">
                        <dt className="text-[14px] font-medium">{k}</dt>
                        <dd className="m-0 text-[16px] leading-relaxed text-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-[14px]">
                    <Link href={d.href} className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity">
                      The full case <Arrow />
                    </Link>
                  </p>
                </div>
                <div className="md:pt-1">
                  <p className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] tabular-nums">{d.stat}</p>
                  <p className="mt-2 text-[14px] leading-snug text-muted">{d.statLabel}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="pr-arnd" className="mt-20 md:mt-28 border-t border-border pt-8">
          <p className="text-[14px] text-muted">ARND · 2025 to now · founder</p>
          <div className="mt-2 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-12">
            <div className="min-w-0">
              <h2 id="pr-arnd" className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
                Owning a product end to end, on my own
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                A map-first app for Toronto&rsquo;s small live shows. I did the research with fans and performers, set the priorities, built it
                with AI coding tools and run it in production. It&rsquo;s in public beta, and the revenue plan is written, not live.
              </p>
              <dl className="mt-6 grid gap-4">
                {ARND.map(([k, v]) => (
                  <div key={k} className="grid gap-1 md:grid-cols-[210px_minmax(0,1fr)] md:gap-6">
                    <dt className="text-[14px] font-medium">{k}</dt>
                    <dd className="m-0 text-[16px] leading-relaxed text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
                <a href="https://arnd.app" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                  arnd.app<span className="sr-only"> (opens in new tab)</span>
                </a>
                <Link href="/work/arnd" className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity">
                  The full case <Arrow />
                </Link>
              </p>
            </div>
            <div className="md:pt-1">
              <p className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] tabular-nums">161</p>
              <p className="mt-2 text-[14px] leading-snug text-muted">merged pull requests, built solo</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="pr-contact" className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
          <h2 id="pr-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to own the problem, not just the screens.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} bg-foreground text-background hover:opacity-80`}>
              allensmkang@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/mooque/" target="_blank" rel="noopener noreferrer" className={`${pill} border border-border hover:border-foreground/40`}>
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
