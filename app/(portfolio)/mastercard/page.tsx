import type { Metadata } from "next";
import Link from "next/link";
import ResultsReceipt from "@/components/ResultsReceipt";
import { RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import { getProject } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";

// A tailored, unlisted view of the portfolio for one reviewer. Not in the
// sitemap, not in the nav, and kept out of search results on purpose.
export const metadata: Metadata = {
  title: "Allen Kang for Mastercard",
  description:
    "A shorter path through Allen Kang's work, ordered for a team that designs around money, data, and trust.",
  robots: { index: false, follow: false },
};

const RULE =
  "linear-gradient(90deg, #EB001B 0%, #FF5F00 50%, #F79E1B 100%)";

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

const dataviz = ["care-pathway-dashboards", "keela-contacts"];

const spine = [
  "transaction-workflows",
  "aplos-keela-integration",
  "fee-opt-in-experimentation",
  "orchid-design-system",
  "automation-nonprofits",
];

const built = [
  {
    slug: "arnd",
    line: "A live map of real shows, served from a database I designed and secured. The hard part was deciding what the map should leave out.",
  },
  {
    slug: "schematic",
    line: "Eighteen psychological schemas turned into a poster system and a private, browser-only profile. Information design where the data is someone's inner life.",
  },
  {
    slug: "color-analysis",
    line: "Live camera data graded against your skin tone, run entirely on-device so nothing leaves the browser.",
  },
];

export default async function MastercardPage() {
  const spineProjects = (
    await Promise.all(spine.map((s) => getProject(s)))
  ).filter((p) => p !== null);
  const datavizProjects = (
    await Promise.all(dataviz.map((s) => getProject(s)))
  ).filter((p) => p !== null);
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
            I&rsquo;m Allen, a senior product designer with eight years of design
            experience. I design the screens where people reconcile, approve, and
            decide with money and data on the line: accountants closing out tax
            season, finance teams trusting a sync, donors changing their minds at
            checkout. This is a shorter path through my work, ordered for a team
            that designs around money, data, and trust.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/allen-kang-resume.pdf"
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
                <p className="font-serif text-2xl md:text-3xl leading-snug text-balance">
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
          <section className="mt-24" aria-labelledby="mc-principles">
            <h2 id="mc-principles" className="microlabel text-muted">
              How I design for data
            </h2>
            <ol className="mt-8 grid gap-10 md:grid-cols-2">
              {principles.map((p, i) => (
                <li key={p.title} className="border-t border-border pt-6">
                  <span className="microlabel text-muted tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-2xl mt-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-muted leading-relaxed">
                    {p.body}
                  </p>
                  <Link
                    href={`/work/${p.slug}`}
                    className="mt-4 inline-flex text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Read the case study: {p.link} &rarr;
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
              {datavizProjects.map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.frontmatter.title}
                  subtitle={p.frontmatter.subtitle}
                  category={p.frontmatter.category}
                  coverColor={p.frontmatter.coverColor}
                  coverImage={p.frontmatter.coverImage}
                  featuredStat={p.frontmatter.featuredStat}
                  featuredStatLabel={p.frontmatter.featuredStatLabel}
                />
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mt-24" aria-labelledby="mc-work">
            <h2 id="mc-work" className="microlabel text-muted">
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
          <section className="mt-24" aria-labelledby="mc-built">
            <h2 id="mc-built" className="microlabel text-muted">
              Data you can open and use, built end to end
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
              Three things I designed and built myself, so I know what latency,
              empty states, and bad data feel like outside a Figma frame.
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
                The full portfolio is at{" "}
                <Link href="/work" className="underline underline-offset-4">
                  allenkang.com/work
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
