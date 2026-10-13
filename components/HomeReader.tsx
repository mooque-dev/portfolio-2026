"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import CarePathwayMini from "@/components/CarePathwayMini";
import type { ProjectSummary } from "@/lib/types";
import TryTag from "@/components/TryTag";
import { WORLDS, OFF_CLOCK, RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import ResultsReceipt from "@/components/ResultsReceipt";
import Arrow from "@/components/Arrow";
import OffClock from "@/components/OffClock";
import CurtainCall from "@/components/CurtainCall";
import AudienceIntro from "@/components/AudienceIntro";
import WorkWall from "@/components/WorkWall";

interface Props {
  allProjects: ProjectSummary[];
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
const DATAVIZ = ["care-pathway-dashboards", "keela-contacts"];
const BUILT = ["arnd", "torontoyuwol", "forkestrate"];

// Lists on home follow the same order as the Work page: by shelf (work,
// experiments, side projects), then by each project's order number.
const SHELF = { work: 0, experiment: 1, personal: 2 };
const pick = (all: ProjectSummary[], slugs: string[]) =>
  all.filter((p) => slugs.includes(p.slug)).sort((a, b) => SHELF[a.type] - SHELF[b.type]);

const hrefOf = (p: ProjectSummary) => p.href ?? `/work/${p.slug}`;

function CaseRow({ project }: { project: ProjectSummary }) {
  return (
    <li>
      <Link
        href={hrefOf(project)}
        className="group grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center py-7 border-b border-border"
      >
        <div
          className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={`object-contain object-center transition-transform duration-500 ${
                project.wip ? "blur-lg brightness-75" : "group-hover:scale-[1.03]"
              }`}
            />
          )}
          {project.wip && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2.5 py-1 microlabel text-white/85">
              Confidential visuals
            </span>
          )}
          {project.tryTag && <TryTag kind={project.tryTag} className="absolute left-2.5 top-2.5 z-10" />}
        </div>
        <div className="min-w-0">
          <p className="microlabel text-muted">
            {[project.company, project.role, project.timeline].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-semibold text-xl md:text-[22px] leading-snug group-hover:opacity-70 transition-opacity text-balance">
            {project.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
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
    <Link href={hrefOf(project)} className="group block min-w-0">
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
        {project.tryTag && <TryTag kind={project.tryTag} className="absolute left-2.5 top-2.5 z-10" />}
      </div>
      <p className="mt-3 microlabel text-muted">{project.category}</p>
      <h3 className="mt-1 font-semibold text-[17px] leading-snug group-hover:opacity-70 transition-opacity">
        {project.title.split(":")[0]}
      </h3>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted line-clamp-3">{project.subtitle}</p>
    </Link>
  );
}

export default function HomeReader({ allProjects }: Props) {
  const selected = pick(allProjects, SELECTED);
  const built = pick(allProjects, BUILT);
  const dataviz = pick(allProjects, DATAVIZ);

  return (
    <section className="pt-32 md:pt-48 pb-4">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <AudienceIntro />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[16px]">
            <a href="/allen-kang-resume.pdf" className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity">
              Résumé
            </a>
            <a href="mailto:allensmkang@gmail.com" className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity">
              allensmkang@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity"
            >
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
            <span className="inline-flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full bg-[#2fa84f]" aria-hidden />
              Open to senior and staff roles
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Full bleed, outside the text column: the work as one wall. */}
      <div className="mt-20 md:mt-28">
        <WorkWall projects={[...selected, ...dataviz, ...built]} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <FadeIn delay={0.08}>
          <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-[300px_minmax(0,1fr)] md:items-center md:gap-14">
            <ResultsReceipt lines={RESULTS} total={RESULTS_TOTAL} />
            <figure className="m-0 min-w-0">
              <blockquote className="m-0 text-xl md:text-2xl leading-snug font-medium tracking-[-0.01em] text-balance">
                &ldquo;Allen has this rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking without missing a beat.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[13.5px] text-muted">
                <span className="text-foreground font-medium">Natalie Freckleton</span> · Director of Product Management
                <Link href="/about#colleagues" className="mt-2 block w-fit underline underline-offset-4 hover:text-foreground">
                  Four more colleagues <Arrow />
                </Link>
              </figcaption>
            </figure>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-16">
            <h2 className="microlabel text-muted">Try a redesign</h2>
            <p className="mt-2 mb-5 text-[14.5px] text-muted max-w-2xl">
              A live slice of my cancer care redesign. Pick a stage.
            </p>
            <CarePathwayMini />
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="microlabel text-muted">Selected work</h2>
              <Link href="/work" className="text-xs text-muted hover:text-foreground transition-colors">
                All work <Arrow />
              </Link>
            </div>
            <ol className="mt-2">
              {selected.map((p) => (
                <CaseRow key={p.slug} project={p} />
              ))}
            </ol>
          </div>
        </FadeIn>

        {dataviz.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-20">
              <h2 className="microlabel text-muted">Data visualization, interactive</h2>
              <p className="mt-2 text-[14.5px] text-muted max-w-2xl">
                Dashboards I designed, rebuilt as working versions.
              </p>
              <ol className="mt-2">
                {dataviz.map((p) => (
                  <CaseRow key={p.slug} project={p} />
                ))}
              </ol>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.16}>
          <div className="mt-20">
            <h2 id="two-worlds" className="microlabel text-muted scroll-mt-28">Between two worlds</h2>
            <p className="mt-3 font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m a builder and a translator. Most of my work happens where two sides don&rsquo;t share a language yet.
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {WORLDS.map((w) => (
                <div key={w.a} className="border-t border-border pt-5 min-w-0">
                  <p className="text-[15px] font-semibold">
                    {w.a} <span className="text-muted font-normal" aria-hidden>&harr;</span>
                    <span className="sr-only"> and </span> {w.b}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.text}</p>
                  <Link href={w.href} className="mt-2 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {w.link} <Arrow />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>


        {built.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="mt-20">
              <div className="flex items-baseline justify-between">
                <h2 className="microlabel text-muted">Built end to end</h2>
                <Link href="/playground" className="text-xs text-muted hover:text-foreground transition-colors">
                  Playground <Arrow />
                </Link>
              </div>
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

        <FadeIn delay={0.2}>
          <div className="mt-20">
            <h2 className="microlabel text-muted">Off the clock</h2>
            <p className="mt-3 font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m an optimist. Optimism is a design tool: it&rsquo;s how you get people to believe a better version is possible, then go build it.
            </p>
            <OffClock items={OFF_CLOCK} />
            <Link href="/about" className="mt-6 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
              More about me <Arrow />
            </Link>
          </div>
        </FadeIn>

        <CurtainCall />
      </div>
    </section>
  );
}
