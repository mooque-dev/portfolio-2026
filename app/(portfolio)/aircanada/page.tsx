import type { Metadata } from "next";
import Link from "next/link";
import ResultsReceipt from "@/components/ResultsReceipt";
import { RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import { getProject } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for one role: Product Manager,
// Digital Product (flight shopping, trip servicing and payments). Not in the
// sitemap or the nav, and kept out of search results on purpose. Every claim
// here is on the résumé or in a case study; gaps are left out, not invented.
export const metadata: Metadata = {
  title: "Allen Kang for Air Canada",
  description:
    "Allen Kang's work, mapped to a Product Manager role on flight shopping, trip servicing and payments.",
  robots: { index: false, follow: false },
};

// The role, line by line, against the closest real evidence.
const fit: { need: string; evidence: string; href: string; link: string }[] = [
  {
    need: "Payments portfolio, web and mobile",
    evidence:
      "Split transactions, so one payment can be a ticket, a donation and an in-kind gift at once, compliant across Canadian, US and Australian tax rules. And the fee step at checkout, where opt-in went from 75% to 92%.",
    href: "/work/transaction-workflows",
    link: "Transaction Workflows",
  },
  {
    need: "Define, prioritize and ship end to end",
    evidence:
      "Stepped in as product manager at Keela to ship Pipelines, owning scope, requirements and release, then set up the launch process the team used after it. Shipped split transactions in phases inside a no-refactor constraint.",
    href: "/resume",
    link: "Résumé",
  },
  {
    need: "API requirements and robust schemas",
    evidence:
      "Defined integration requirements alongside engineers: data import and export, schema translation and editable data mapping between two merged products' data models. On my own app, I designed the database, its access rules and the server functions the frontend calls.",
    href: "/work/aplos-keela-integration",
    link: "Aplos × Keela",
  },
  {
    need: "Metrics and analytics to find what to fix",
    evidence:
      "Ran a four-variation A/B test measured in Pendo. Made the case for split transactions from roadmap votes (40 of 72 new orgs) and about 500 support tickets a quarter, then cut those tickets 70%.",
    href: "/work/fee-opt-in-experimentation",
    link: "Fee Opt-In",
  },
  {
    need: "Lead through influence across teams",
    evidence:
      "Got three engineering teams that didn't choose each other onto one design system, Orchid, with no authority over most of them. Ran the first joint reviews between the merged engineering teams.",
    href: "/work/orchid-design-system",
    link: "Orchid",
  },
  {
    need: "Product discovery",
    evidence:
      "Sat with 8 accountants during real tax preparation, interviewed 15 operations managers and 12 finance managers, and tested prototypes with 8 organizations before committing engineering time.",
    href: "/work/automation-nonprofits",
    link: "Automation",
  },
  {
    need: "Vision, roadmap and data for stakeholders",
    evidence:
      "Pitched Orchid to leadership with surveys from five departments and earned two dedicated engineers. Presented the integration framework to the executive team.",
    href: "/work/orchid-design-system",
    link: "Orchid",
  },
  {
    need: "Agile delivery across teams",
    evidence:
      "Worked inside Scrum teams through sprint planning, refinement and reviews, in both Jira and Linear. Automation's three rounds of testing each became prioritized work in Linear.",
    href: "/work/automation-nonprofits",
    link: "Automation",
  },
  {
    need: "Lead product owners and analysts",
    evidence:
      "Directed product owners and business analysts on requirements at Forkable, MyJourney and Keela. Mentored three designers across Keela and Aplos.",
    href: "/resume",
    link: "Résumé",
  },
  {
    need: "Production operations and incidents",
    evidence:
      "I run my own products in production, with health checks and crash reporting. Three real incidents, and what changed after each, are below.",
    href: "#incidents",
    link: "Incidents",
  },
  {
    need: "Coding (a plus)",
    evidence:
      "Build and ship my own products: ARND, a live-music app in public beta, and the tools a 40-person musical company runs on every day.",
    href: "/work/arnd",
    link: "ARND",
  },
  {
    need: "Bilingual (a preference)",
    evidence: "English and Korean. Some French, informal for now, and I'm working on it.",
    href: "/about",
    link: "About",
  },
];

// Real incidents on ARND, my own app, from its commit history and runbooks.
const incidents = [
  {
    when: "September 2026",
    title: "The catalog went down after a green health check",
    what: "The database behind ARND paused for inactivity within a day of a passing keep-alive check, so the app had no shows. Worse, the feed told people to check their wifi.",
    fix: "Restored the database, then made the check daily across three surfaces (reads, sign-in and server functions), added a second independent pinger and a public health check, and made the app say plainly when an outage is on our side.",
  },
  {
    when: "August 2026",
    title: "A new front page that never appeared",
    what: "I shipped a routing rule to put a new landing page at the root of arnd.app, and the old app page kept loading. The host serves files on disk before it checks routing rules, and the app's own entry file sat exactly at the root.",
    fix: "Renamed the app's entry file so nothing sits at the root, pointed every other route at it, and made the build fail loudly if the rename ever breaks. Then wrote the rule down so nobody simplifies it away.",
  },
  {
    when: "June 2026",
    title: "Every deploy failed after a testing upgrade",
    what: "Adding the test framework introduced a dependency conflict that the clean install on the host refused, so no new version could ship.",
    fix: "Pinned how the host resolves those dependencies in the repo itself, so local and production installs behave the same, and documented it for the next person.",
  },
];

const principles = [
  {
    title: "Find the moment the plan changes.",
    body: "The fee opt-in leak wasn't in the main flow. It was after donors clicked Edit. Trip servicing lives in moments like that: the change, the refund, the seat that's gone.",
    slug: "fee-opt-in-experimentation",
    link: "Fee Opt-In",
  },
  {
    title: "Pause a win that hides a leak.",
    body: "A redesign had already lifted opt-in from 75% to 82%. I argued to hold the rollout, tested three new variants against the control, and shipped the one that reached 92% with conversion steady.",
    slug: "fee-opt-in-experimentation",
    link: "Fee Opt-In",
  },
  {
    title: "Write requirements engineers can build on.",
    body: "Before any screens, the PM, the engineering lead and I agreed what we couldn't do: no backend refactor, no breaking the data model behind reporting. Then we shipped in phases.",
    slug: "transaction-workflows",
    link: "Transaction Workflows",
  },
  {
    title: "Earn adoption, don't mandate it.",
    body: "Heavy governance stopped contributions to Orchid, so I replaced it with 48-hour async reviews. Teams adopted it because it was faster, not because it was required.",
    slug: "orchid-design-system",
    link: "Orchid",
  },
];

const spine = [
  "transaction-workflows",
  "fee-opt-in-experimentation",
  "aplos-keela-integration",
  "orchid-design-system",
  "automation-nonprofits",
];

const built = [
  {
    slug: "arnd",
    line: "Designed and built solo: the data model, the API, the app, and the App Store work. In public beta.",
  },
  {
    slug: "torontoyuwol",
    line: "Scheduling, a bilingual script reader and a bill splitter, used daily by a 40-person company. Weekly releases from direct feedback.",
  },
];

export default async function AirCanadaPage() {
  const load = (slugs: string[]) =>
    Promise.all(slugs.map((s) => getProject(s))).then((ps) => ps.filter((p) => p !== null));
  const [spineProjects, builtProjects] = await Promise.all([load(spine), load(built.map((b) => b.slug))]);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="microlabel text-muted">Prepared for Air Canada · Product Manager, Digital Product</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mt-5 leading-[1.05] max-w-4xl text-balance">
            I ship the flows where money moves and plans change.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
            I&rsquo;m Allen. For seven years I&rsquo;ve worked between product,
            design and engineering on payment-heavy software: checkout, split
            payments, and data synced between merged products. I stepped in as
            product manager to ship a feature at Keela, ran experiments measured
            in analytics, and build and run products of my own. This page maps
            that to your role, line by line.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/allen-kang-resume-pm.pdf"
              download
              className="inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Download résumé
            </a>
            <a
              href="mailto:allensmkang@gmail.com"
              className="inline-flex items-center h-10 px-5 rounded-full border border-border text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-10 px-5 rounded-full border border-border text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mt-20 border-t border-border pt-12" aria-labelledby="ac-fit">
            <h2 id="ac-fit" className="microlabel text-muted">
              Your role, and my closest evidence
            </h2>
            <dl className="mt-8">
              {fit.map((f) => (
                <div
                  key={f.need}
                  className="grid gap-x-10 gap-y-2 border-t border-border py-6 md:grid-cols-[280px_minmax(0,1fr)_auto] md:items-baseline"
                >
                  <dt className="text-[15px] font-semibold">{f.need}</dt>
                  <dd className="m-0 text-[15px] leading-relaxed text-muted max-w-2xl">{f.evidence}</dd>
                  <dd className="m-0">
                    <Link
                      href={f.href}
                      className="whitespace-nowrap text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      {f.link} <Arrow />
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </FadeIn>

        <FadeIn delay={0.12}>
          <section className="mt-24" aria-labelledby="ac-numbers">
            <h2 id="ac-numbers" className="microlabel text-muted">
              Outcomes I can stand behind
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-[300px_minmax(0,1fr)] md:items-start">
              <ResultsReceipt lines={RESULTS} total={RESULTS_TOTAL} />
              <div className="md:pt-8 max-w-xl">
                <p className="font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug text-balance">
                  Printed the way a payment prints, because most of this work is
                  about money moving correctly.
                </p>
                <p className="mt-4 text-[15px] text-muted leading-relaxed">
                  Every number is on my résumé, and every line opens the case
                  behind it.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.15}>
          <section className="mt-24" aria-labelledby="ac-principles">
            <h2 id="ac-principles" className="microlabel text-muted">
              How I&rsquo;d work as your product manager
            </h2>
            <ol className="mt-8 grid gap-10 md:grid-cols-2">
              {principles.map((p, i) => (
                <li key={p.title} className="border-t border-border pt-6">
                  <span className="microlabel text-muted tabular-nums">0{i + 1}</span>
                  <h3 className="font-semibold text-2xl mt-2 leading-snug">{p.title}</h3>
                  <p className="mt-3 text-[15px] text-muted leading-relaxed">{p.body}</p>
                  <Link
                    href={`/work/${p.slug}`}
                    className="mt-4 inline-flex text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Read the case study: {p.link} <Arrow />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>

        <FadeIn delay={0.18}>
          <section id="incidents" className="mt-24 scroll-mt-28" aria-labelledby="ac-incidents">
            <h2 id="ac-incidents" className="microlabel text-muted">
              Incidents I&rsquo;ve run, on my own product
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
              Each one, written the way I&rsquo;d write the post-incident note:
              what broke, why, and what changed so it can&rsquo;t happen quietly again.
            </p>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {incidents.map((x) => (
                <li key={x.title} className="border-t border-border pt-5">
                  <p className="microlabel text-muted">{x.when}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{x.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{x.what}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed">
                    <span className="font-semibold">What changed: </span>
                    {x.fix}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mt-24" aria-labelledby="ac-work">
            <h2 id="ac-work" className="microlabel text-muted">
              The case studies, in the order I&rsquo;d walk you through them
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {spineProjects.map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.frontmatter.title}
                  subtitle={p.frontmatter.subtitle}
                  category={p.frontmatter.category}
                  coverColor={p.frontmatter.coverColor}
                  coverImage={p.frontmatter.coverImage}
                  wip={p.frontmatter.wip}
                  featuredStat={p.frontmatter.featuredStat}
                  featuredStatLabel={p.frontmatter.featuredStatLabel}
                />
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.25}>
          <section className="mt-24" aria-labelledby="ac-built">
            <h2 id="ac-built" className="microlabel text-muted">
              Products I run myself
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
              I write the code too, so I know what an API contract, a slow
              endpoint and a bug report from a real user feel like from the
              other side.
            </p>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {builtProjects.map((p) => (
                <div key={p.slug}>
                  <ProjectCard
                    slug={p.slug}
                    title={p.frontmatter.title}
                    subtitle={p.frontmatter.subtitle}
                    category={p.frontmatter.category}
                    coverColor={p.frontmatter.coverColor}
                    coverImage={p.frontmatter.coverImage}
                    compact
                  />
                  <p className="mt-2 text-[13px] text-muted leading-[1.65]">
                    {built.find((b) => b.slug === p.slug)?.line}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="mt-24 border-t border-border pt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl leading-snug">
                I&rsquo;d like to talk about the moment a trip changes.
              </h2>
              <p className="mt-3 text-[15px] text-muted leading-relaxed">
                The full portfolio is at{" "}
                <Link href="/work" className="underline underline-offset-4">
                  /work
                </Link>
                .
              </p>
            </div>
            <a
              href="mailto:allensmkang@gmail.com"
              className="inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity self-start md:self-auto"
            >
              allensmkang@gmail.com
            </a>
          </section>
          <p className="mt-10 text-xs text-muted">
            An independent portfolio page. Not affiliated with or endorsed by Air Canada.
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
