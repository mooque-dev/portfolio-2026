import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PaymentCard from "@/components/PaymentCard";
import { RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import { getProject } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import Arrow from "@/components/Arrow";
import FeeSliderDemo from "@/components/FeeSliderDemo";
import TwoWorlds from "@/components/TwoWorlds";
import LockedNote from "@/components/LockedNote";

// A tailored, unlisted view of the portfolio for one reviewer. Not in the
// sitemap, not in the nav, and kept out of search results on purpose.
export const metadata: Metadata = {
  title: "Allen Kang for Mastercard",
  description:
    "A shorter path through Allen Kang's work, ordered for a team that designs around money, data, and trust.",
  robots: { index: false, follow: false },
};

// Trust, safety and quality: what a payments team protects, each shown in
// one piece of shipped work. Security is not claimed; none of the work was.
const pillars = [
  {
    label: "Trust",
    title: "Show the work, not just the answer.",
    body: "On Aplos × Keela I showed every data mapping and the sync status instead of hiding them behind defaults, because finance teams had been burned by silent syncs.",
    slug: "aplos-keela-integration",
    link: "Aplos × Keela",
  },
  {
    label: "Safety",
    title: "Build confidence before capability.",
    body: "The top fear was emailing all 5,000 donors by accident, so a preview of exactly who a workflow will touch comes before anything goes live.",
    slug: "automation-nonprofits",
    link: "Automation",
  },
  {
    label: "Quality",
    title: "Surface errors while they are cheap.",
    body: "On Transaction Workflows, validation runs continuously, so a miscategorized transaction shows up now instead of at the final report.",
    slug: "transaction-workflows",
    link: "Transaction Workflows",
  },
];

// The deep dives answer what this team asks about: work from zero to one, and
// finding a way through an unfamiliar, technical domain.
const deepDives = [
  {
    slug: "automation-nonprofits",
    label: "0 to 1",
    why: "A product area that didn't exist, handed to me a month into the job: from fifteen interviews to a paid add-on in five months, 30% adoption and a 13% ARR lift.",
  },
  {
    slug: "transaction-workflows",
    label: "Ambiguity",
    why: "Learning accounting rules in three countries and a backend nobody had mapped, then cutting categorization tickets by 70%.",
  },
];

// Everything else worth a look, each with why it's here. Whether a dashboard
// shipped is said up front so nobody has to dig for it.
const more = [
  { slug: "aplos-keela-integration", why: "Making a data sync trustworthy by showing the mapping." },
  { slug: "orchid-design-system", why: "Getting three teams onto one system without authority." },
  { slug: "keela-contacts", why: "Shipped at Keela in 2024. Rebuilt as a working version." },
  { slug: "care-pathway-dashboards", why: "A redesign that never shipped. Rebuilt as a working version." },
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

const linkClass = "inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:opacity-70 transition-opacity";

// Every section opens the same way: a numbered label, one sentence that says
// what the section proves, and an optional line of context. Same rule above,
// same spacing, so the page reads as one document.
function Section({
  id,
  num,
  label,
  title,
  lede,
  children,
}: {
  id: string;
  num: string;
  label: string;
  title: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border pt-10 md:pt-12 mt-20 md:mt-24">
      <p className="microlabel text-muted">
        <span className="tabular-nums">{num}</span>
        <span aria-hidden> · </span>
        {label}
      </p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
        {title}
      </h2>
      {lede && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted">{lede}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

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
  const [deepProjects, moreProjects, builtProjects] = await Promise.all([load(deepDives), load(more), load(built)]);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="microlabel text-muted">Prepared for Mastercard</p>
          <h1 className="mt-5 max-w-3xl text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            Making high-stakes numbers easy to trust.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I&rsquo;m Allen. I like the unglamorous parts of software: the screen where an accountant decides how to
            file a payment, the moment a donor changes their mind about a fee, the sync that has to be right or
            someone&rsquo;s books are wrong. I&rsquo;ve spent eight years designing, the last five on payments, in
            nonprofit and healthcare software. This page is the short version.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/allen-kang-resume-mastercard.pdf"
              download
              className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-80 transition-opacity"
            >
              Download résumé
            </a>
            <a
              href="mailto:allensmkang@gmail.com"
              className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </FadeIn>

        <Section
          id="mc-numbers"
          num="01"
          label="Results"
          title="Numbers I can stand behind."
          lede="Every figure is on my résumé, and each line opens the case behind it."
        >
          <PaymentCard lines={RESULTS} total={RESULTS_TOTAL} />
        </Section>

        <Section
          id="mc-pillars"
          num="02"
          label="Trust, safety and quality"
          title="What a payments team protects, shown in work that shipped."
        >
          <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {pillars.map((p) => (
              <li key={p.label} className="flex flex-col border-t border-foreground/80 pt-5">
                <p className="microlabel text-muted">{p.label}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.body}</p>
                <Link href={`/work/${p.slug}`} className={`mt-5 self-start ${linkClass}`}>
                  {p.link} <Arrow />
                </Link>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="mc-try"
          num="03"
          label="One decision, up close"
          title="Design the decision, not the default."
          lede="A new fee box had lifted opt-in to 82%, and everyone wanted to ship it. I asked the team to pause: donors who clicked Edit were being nudged to the minimum. We tested three fixes against the control, and the slider reached 92% with conversion steady."
        >
          <p className="max-w-[60ch] text-[15px] leading-relaxed">
            A white-labelled rebuild of the checkout, after my MagicPatterns prototype. Pick a fallback, click Edit
            on the fee, and compare what you chose with what donors did.
          </p>
          <div className="mt-8">
            <FeeSliderDemo />
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <Link href="/work/fee-opt-in-experimentation" className={linkClass}>
              Read the full case <Arrow />
            </Link>
            <LockedNote href="/work/fee-opt-in-experimentation" />
            <span className="text-muted">The product is confidential, so the case asks for a password. Ask me for it.</span>
          </p>
        </Section>

        <Section
          id="mc-worlds"
          num="04"
          label="How I work"
          title="You know two circles that overlap. Most of my work happens in the overlap."
        >
          <TwoWorlds />
          <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-8">
            <h3 className="text-[15px] font-semibold">What a normal week looked like</h3>
            <ul className="m-0 list-none p-0">
              {week.map((w) => (
                <li key={w} className="border-t border-border py-3.5 text-[16px] leading-relaxed first:border-t-0 first:pt-0">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="mc-work"
          num="05"
          label="Selected work"
          title="If we had thirty minutes, I'd walk you through these two."
        >
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {deepProjects.map(({ p, why, label }) => (
              <div key={p.slug} className="min-w-0">
                <p className="microlabel mb-3 text-muted">Deep dive · {label}</p>
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
                <p className="mt-3 text-[15px] leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-16 text-[15px] font-semibold">Also worth a look</h3>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {moreProjects.map(({ p, why }) => (
              <div key={p.slug} className="min-w-0">
                <ProjectCard
                  slug={p.slug}
                  title={p.frontmatter.title}
                  subtitle={p.frontmatter.subtitle}
                  category={p.frontmatter.category}
                  coverColor={p.frontmatter.coverColor}
                  coverImage={p.frontmatter.coverImage}
                  compact
                />
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{why}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="mc-built"
          num="06"
          label="Outside work"
          title="Things I built that real people use."
          lede="Shipping my own products teaches me things a Figma file never will."
        >
          <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {builtProjects.map(({ p, line }) => (
              <li key={p.slug} className="flex flex-col border-t border-foreground/80 pt-5">
                <h3 className="text-xl font-semibold leading-snug">{p.frontmatter.title.split(":")[0]}</h3>
                <p className="mt-1 text-[13px] text-muted">{p.frontmatter.role}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{line}</p>
                <Link href={`/work/${p.slug}`} className={`mt-5 self-start ${linkClass}`}>
                  Read the case <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <section
          aria-labelledby="mc-contact"
          className="mt-20 md:mt-24 border-t border-border pt-10 md:pt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <h2 id="mc-contact" className="text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
              I&rsquo;d like to talk about the numbers behind your numbers.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Link href="/work" className="underline underline-offset-4 hover:text-foreground transition-colors">
                See all the work
              </Link>
              , or the side projects in the{" "}
              <Link href="/playground" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Playground
              </Link>
              .
            </p>
          </div>
          <a
            href="mailto:allensmkang@gmail.com"
            className="inline-flex h-10 items-center self-start rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-80 transition-opacity md:self-auto"
          >
            allensmkang@gmail.com
          </a>
        </section>
        <p className="mt-10 text-xs text-muted">
          An independent portfolio page. Not affiliated with or endorsed by Mastercard.
        </p>
      </div>
    </article>
  );
}
