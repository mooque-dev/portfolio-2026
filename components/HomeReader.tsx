"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { formatDate } from "@/lib/utils";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

// Curated to mirror the résumé: the professional stories first, in the order
// a reviewer would want them, then the work built end to end.
const SELECTED = [
  "aplos-keela-integration",
  "transaction-workflows",
  "orchid-design-system",
  "automation-nonprofits",
  "fee-opt-in-experimentation",
];
const BUILT = ["arnd", "torontoyuwol", "forkestrate"];

const IMPACT = [
  { value: "13%", label: "ARR increase from Automation, adopted by 30% of 355 organizations" },
  { value: "340+ → 86", label: "components consolidated into one library across three merged products" },
  { value: "75% → 92%", label: "donation fee opt-in in an A/B test, with conversion held steady" },
];

const pick = (all: ProjectSummary[], slugs: string[]) =>
  slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is ProjectSummary => !!p);

function CaseRow({ project }: { project: ProjectSummary }) {
  return (
    <li>
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center py-7 border-b border-border"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={`object-cover object-center transition-transform duration-500 ${
                project.wip ? "blur-lg brightness-75" : "group-hover:scale-[1.03]"
              }`}
            />
          )}
          {project.wip && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2.5 py-1 microlabel text-white/85">
              Confidential visuals
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="microlabel text-muted">
            {[project.company, project.role, project.timeline].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-serif text-xl md:text-[22px] leading-snug group-hover:opacity-70 transition-opacity text-balance">
            {project.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted line-clamp-3">
            {project.subtitle}
          </p>
          {project.featuredStat && (
            <p className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold tracking-tight">{project.featuredStat}</span>
              <span className="text-[13px] text-muted">{project.featuredStatLabel}</span>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

function BuiltCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block min-w-0">
      <div
        className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
        style={{ backgroundColor: project.coverColor }}
      >
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <p className="mt-3 microlabel text-muted">{project.category}</p>
      <h3 className="mt-1 font-serif text-[17px] leading-snug group-hover:opacity-70 transition-opacity">
        {project.title.split(":")[0]}
      </h3>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted line-clamp-2">{project.subtitle}</p>
    </Link>
  );
}

export default function HomeReader({ allProjects, recentWriting }: Props) {
  const selected = pick(allProjects, SELECTED);
  const built = pick(allProjects, BUILT);

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <p className="microlabel text-muted">Senior Product Designer · Toronto</p>
          <h1 className="mt-4 text-[26px] md:text-[44px] leading-[1.15] font-light tracking-[-0.015em] text-balance max-w-4xl">
            I design transaction-heavy products: donation and payment flows,
            multi-entity financial data, and the systems that keep them consistent.
          </h1>
          <p className="mt-5 text-[17px] md:text-lg leading-relaxed text-muted max-w-3xl">
            Eight years across nonprofit software and healthcare, most recently on a
            three-product suite merging into one. I use research to cut friction in
            dense, high-stakes flows, and I ship end to end.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/allen-kang-resume.pdf"
              className="inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Résumé (PDF)
            </a>
            <a
              href="mailto:allen@allenkang.com"
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
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
            <span className="text-sm text-muted">Open to senior and staff product design roles.</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <dl className="mt-14 grid gap-6 sm:grid-cols-3">
            {IMPACT.map((s) => (
              <div key={s.value} className="border-t-2 border-foreground pt-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl md:text-4xl font-semibold tracking-tight">{s.value}</span>
                  <span className="mt-2 block text-[13.5px] leading-snug text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="microlabel text-muted">Selected work</h2>
              <Link href="/work" className="text-xs text-muted hover:text-foreground transition-colors">
                All work &rarr;
              </Link>
            </div>
            <ol className="mt-2">
              {selected.map((p) => (
                <CaseRow key={p.slug} project={p} />
              ))}
            </ol>
          </div>
        </FadeIn>

        {built.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="mt-20">
              <h2 className="microlabel text-muted">Built end to end</h2>
              <p className="mt-2 text-[14.5px] text-muted max-w-2xl">
                Products I designed and shipped myself, from research to release.
              </p>
              <div className="mt-6 grid gap-8 sm:grid-cols-3">
                {built.map((p) => (
                  <BuiltCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {recentWriting.length > 0 && (
          <FadeIn delay={0.22}>
            <div className="mt-20 max-w-3xl">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="microlabel text-muted">Writing</h2>
                <Link href="/writing" className="text-xs text-muted hover:text-foreground transition-colors">
                  All &rarr;
                </Link>
              </div>
              {recentWriting.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-baseline justify-between py-4 border-b border-border"
                >
                  <span className="font-light text-[15px] md:text-base leading-snug group-hover:opacity-60 transition-opacity truncate min-w-0">
                    {post.title}
                  </span>
                  <time dateTime={post.date} className="text-xs text-muted shrink-0 ml-4 hidden sm:block">
                    {formatDate(post.date)}
                  </time>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
