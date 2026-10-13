import type { Metadata } from "next";
import Link from "next/link";
import ResultsReceipt from "@/components/ResultsReceipt";
import { RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import { getProject } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for one reviewer. Not in the
// sitemap, not in the nav, and kept out of search results on purpose.
export const metadata: Metadata = {
  title: "Allen Kang for Mastercard",
  description:
    "A shorter path through Allen Kang's work, ordered for a team that designs around money, data, and trust.",
  robots: { index: false, follow: false },
};

// Section rule in the seal red: the page is prepared for Mastercard, not in
// their brand.
const RULE = "var(--seal)";

const principles = [
  {
    title: "Show the work, not just the answer.",
    body: "On Aplos × Keela I showed every data mapping and the sync status instead of hiding them behind defaults, because finance teams had been burned by silent syncs.",
    slug: "aplos-keela-integration",
    link: "Aplos × Keela",
  },
  {
    title: "Surface errors while they are cheap.",
    body: "On Transaction Workflows, validation runs continuously, so a miscategorized transaction shows up now instead of at the final report.",
    slug: "transaction-workflows",
    link: "Transaction Workflows",
  },
  {
    title: "Design the decision, not the default.",
    body: "A 75% to 82% win hid a leak after donors clicked Edit. I argued to pause, redesigned that moment, and the winner reached 92% with conversion steady.",
    slug: "fee-opt-in-experimentation",
    link: "Fee Opt-In",
  },
  {
    title: "Build confidence before capability.",
    body: "The top fear was emailing all 5,000 donors by accident, so a preview of exactly who a workflow will touch comes before anything goes live.",
    slug: "automation-nonprofits",
    link: "Automation",
  },
];

// Whether each dashboard shipped, said up front so nobody has to dig for it.
const dataviz = [
  { slug: "care-pathway-dashboards", status: "Redesign, not shipped. Rebuilt as a working version." },
  { slug: "keela-contacts", status: "Shipped at Keela in 2024. Rebuilt as a working version." },
];

// Two deep dives and three highlights, each with the reason it is here. The
// deep dives answer what this team asks about: work from zero to one, and
// finding a way through an unfamiliar, technical domain.
const deepDives = [
  {
    slug: "automation-nonprofits",
    label: "Deep dive · 0 to 1",
    why: "A product area that didn't exist, handed to me a month into the job: from fifteen interviews to a paid add-on in five months, 30% adoption and a 13% ARR lift.",
  },
  {
    slug: "transaction-workflows",
    label: "Deep dive · Ambiguity",
    why: "Learning accounting rules in three countries and a backend nobody had mapped, then cutting categorization tickets by 70%.",
  },
];
const highlights = [
  {
    slug: "fee-opt-in-experimentation",
    why: "A checkout experiment: opt-in from 75% to 92%, with conversion steady.",
  },
  {
    slug: "aplos-keela-integration",
    why: "Making a data sync trustworthy by showing the mapping.",
  },
  {
    slug: "orchid-design-system",
    why: "Getting three teams onto one system without authority.",
  },
];

// Things I made outside a job, each with people actually using it.
const built = [
  {
    slug: "forkestrate",
    line: "Co-founded with a PM and two engineers. Paste a recipe link or a cooking video and get steps you can follow at the stove. Zero to MVP in under three months.",
  },
  {
    slug: "arnd",
    line: "A map of Toronto's small live shows, designed and built on my own, from the database to App Store prep. In public beta. The hard part was deciding what to leave out.",
  },
  {
    slug: "torontoyuwol",
    line: "Scheduling, a Korean-English script reader and a bill splitter that a 40-person musical company used every day for ten months. Then I went on stage in the show.",
  },
];

// What the job actually looked like, in plain terms.
const week = [
  "Sitting with accountants while they reconciled, until their words made sense to me.",
  "Drawing how data really moves between systems, so engineers and I argued about the same picture.",
  "Agreeing with the PM and engineers on what we would not touch yet.",
  "Prototyping in code when a static mock couldn't answer the question.",
  "Rewriting my own design-system rules when the first version made people stop contributing.",
];

export default async function MastercardPage() {
  type Project = NonNullable<Awaited<ReturnType<typeof getProject>>>;
  const load = async <T extends { slug: string }>(items: T[]): Promise<(T & { p: Project })[]> => {
    const out: (T & { p: Project })[] = [];
    for (const i of items) {
      const p = await getProject(i.slug);
      if (p) out.push({ ...i, p });
    }
    return out;
  };
  const [datavizProjects, deepProjects, highlightProjects] = await Promise.all([
    load(dataviz),
    load(deepDives),
    load(highlights),
  ]);
  const builtProjects = (
    await Promise.all(built.map((b) => getProject(b.slug)))
  ).filter((p) => p !== null);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="microlabel text-muted">Prepared for Mastercard</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mt-5 leading-[1.05] max-w-3xl">
            Making high-stakes numbers easy to trust.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
            I&rsquo;m Allen. I like the unglamorous parts of software: the screen
            where an accountant decides how to file a payment, the moment a donor
            changes their mind about a fee, the sync that has to be right or
            someone&rsquo;s books are wrong. I&rsquo;ve spent eight years designing, the last five on payments, making
            those moments work in nonprofit and healthcare software. This page is
            the short version, picked for a team that works on money and trust.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/allen-kang-resume-mastercard.pdf"
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

        <div
          className="mt-16 h-[3px] w-full rounded-full"
          style={{ background: RULE }}
          aria-hidden="true"
        />

        <FadeIn delay={0.1}>
          <section className="mt-16" aria-labelledby="mc-numbers">
            <h2 id="mc-numbers" className="microlabel text-muted">
              Numbers I can stand behind
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

        <FadeIn delay={0.13}>
          <section className="mt-24 grid gap-12 md:grid-cols-2" aria-labelledby="mc-week">
            <div>
              <h2 id="mc-week" className="microlabel text-muted">
                What a normal week looked like
              </h2>
              <ul className="mt-6 space-y-4">
                {week.map((w) => (
                  <li key={w} className="border-t border-border pt-4 text-[16px] leading-relaxed">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="m-0 self-start rounded-lg bg-[var(--foreground)] text-[var(--background)] p-8 md:p-10">
              <p className="microlabel opacity-70">A call I&rsquo;d make again</p>
              <blockquote className="m-0 mt-4 font-serif text-2xl md:text-3xl leading-snug">
                A new fee box had lifted opt-in to 82%, and everyone wanted to ship it.
                I asked the team to pause.
              </blockquote>
              <p className="mt-4 text-[15px] leading-relaxed opacity-80">
                Donors who clicked Edit were being nudged to the minimum. We tested
                three fixes against the control, and the slider reached 92% with
                conversion steady.
              </p>
              <Link href="/work/fee-opt-in-experimentation" className="mt-5 inline-flex text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                Try the fee decision yourself <Arrow />
              </Link>
            </figure>
          </section>
        </FadeIn>

        <FadeIn delay={0.15}>
          <section className="mt-24" aria-labelledby="mc-principles">
            <h2 id="mc-principles" className="microlabel text-muted">
              Four rules I keep coming back to
            </h2>
            <ol className="mt-8 grid gap-10 md:grid-cols-2">
              {principles.map((p, i) => (
                <li key={p.title} className="border-t border-border pt-6">
                  <span className="microlabel text-muted tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="font-semibold text-2xl mt-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-muted leading-relaxed">
                    {p.body}
                  </p>
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
          <section className="mt-24" aria-labelledby="mc-viz">
            <h2 id="mc-viz" className="microlabel text-muted">
              Data visualization you can use, not just look at
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
              Two dashboards I designed, rebuilt as working versions: filter
              them, hover them, and see the decisions behind every chart.
            </p>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {datavizProjects.map(({ p, status }) => (
                <div key={p.slug}>
                  <ProjectCard
                    slug={p.slug}
                    title={p.frontmatter.title}
                    subtitle={p.frontmatter.subtitle}
                    category={p.frontmatter.category}
                    coverColor={p.frontmatter.coverColor}
                    coverImage={p.frontmatter.coverImage}
                    featuredStat={p.frontmatter.featuredStat}
                    featuredStatLabel={p.frontmatter.featuredStatLabel}
                  />
                  <p className="mt-2 text-[13px] font-medium">{status}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mt-24" aria-labelledby="mc-work">
            <h2 id="mc-work" className="microlabel text-muted">
              If we had thirty minutes: two deep dives and three highlights
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {deepProjects.map(({ p, why, label }) => (
                <div key={p.slug}>
                  <p className="microlabel text-[var(--seal)] mb-3">{label}</p>
                  <ProjectCard
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
                  <p className="mt-3 text-[14.5px] leading-relaxed">{why}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {highlightProjects.map(({ p, why }) => (
                <div key={p.slug}>
                  <p className="microlabel text-muted mb-3">Highlight</p>
                  <ProjectCard
                    slug={p.slug}
                    title={p.frontmatter.title}
                    subtitle={p.frontmatter.subtitle}
                    category={p.frontmatter.category}
                    coverColor={p.frontmatter.coverColor}
                    coverImage={p.frontmatter.coverImage}
                    wip={p.frontmatter.wip}
                    compact
                  />
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{why}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.25}>
          <section className="mt-24" aria-labelledby="mc-built">
            <h2 id="mc-built" className="microlabel text-muted">
              Things I built outside work
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
              Each one has real people using it, which teaches you things a Figma
              file never will.
            </p>
            <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {builtProjects.map((p) => {
                const line = built.find((b) => b.slug === p.slug)?.line;
                return (
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
                      {line}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>

        <div
          className="mt-24 h-[3px] w-full rounded-full"
          style={{ background: RULE }}
          aria-hidden="true"
        />

        <FadeIn delay={0.3}>
          <section className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl leading-snug">
                I&rsquo;d like to talk about the numbers behind your numbers.
              </h2>
              <p className="mt-3 text-[15px] text-muted leading-relaxed">
                <Link href="/work" className="underline underline-offset-4">
                  See all the work
                </Link>
                , or the side projects in the{" "}
                <Link href="/playground" className="underline underline-offset-4">
                  Playground
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
            An independent portfolio page. Not affiliated with or endorsed by
            Mastercard.
          </p>
        </FadeIn>
      </div>
    </article>
  );
}
