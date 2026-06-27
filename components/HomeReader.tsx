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

function ProjectRow({ project, n }: { project: ProjectSummary; n: number }) {
  return (
    <li>
      <Link
        href={`/work/${project.slug}`}
        className="group flex items-center gap-4 py-4 border-b border-border"
      >
        <div
          className="relative w-24 h-16 md:w-28 md:h-[4.5rem] shrink-0 overflow-hidden rounded-sm"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="120px"
              className={`object-cover object-center transition-transform duration-500 group-hover:scale-[1.04] ${
                project.wip ? "blur-md brightness-75" : ""
              }`}
            />
          )}
          {project.wip && (
            <span className="absolute bottom-1 left-1.5 text-[8px] tracking-[0.18em] uppercase text-white/70">
              Confidential
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-light text-[15px] md:text-base leading-snug truncate group-hover:opacity-60 transition-opacity">
              <span className="text-muted tabular-nums mr-2">
                {String(n).padStart(2, "0")}
              </span>
              {project.title}
            </h3>
            <span className="text-xs text-muted shrink-0 hidden sm:block">
              {project.timeline}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-snug text-muted line-clamp-1">
            {project.subtitle}
          </p>
        </div>
      </Link>
    </li>
  );
}

function FeatureCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-border hover:border-foreground/30 transition-colors"
    >
      <div
        className="relative aspect-[16/7] md:aspect-[16/6]"
        style={{ backgroundColor: project.coverColor }}
      >
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className={`object-cover object-center ${
              project.wip
                ? "blur-lg brightness-[0.7]"
                : "transition-transform duration-500 group-hover:scale-[1.03]"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        {project.featuredStat && (
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
            <div className="text-4xl md:text-5xl font-light tabular-nums leading-none">
              {project.featuredStat}
            </div>
            {project.featuredStatLabel && (
              <div className="mt-2 text-[11px] tracking-[0.14em] uppercase text-white/75">
                {project.featuredStatLabel}
              </div>
            )}
          </div>
        )}
        {project.wip && (
          <span className="absolute top-3 right-3 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[9px] tracking-[0.18em] uppercase text-white/80">
            Confidential
          </span>
        )}
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase text-muted mb-2">
          <span>{project.category}</span>
          <span aria-hidden>&middot;</span>
          <span>{project.timeline}</span>
        </div>
        <h3 className="font-serif text-lg md:text-xl leading-snug">{project.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted line-clamp-2">
          {project.subtitle}
        </p>
        <span className="mt-3.5 inline-flex items-center gap-1 text-[12px] font-medium underline-offset-4 group-hover:underline">
          Read the case study <span aria-hidden>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

export default function HomeReader({ allProjects, recentWriting }: Props) {
  const featured = allProjects.filter((p) => p.featured);
  const work = featured.filter((p) => p.type === "work");
  const personal = featured.filter((p) => p.type === "personal");
  const experiments = featured.filter((p) => p.type === "experiment");

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* Hero */}
          <FadeIn>
            <h1 className="text-[26px] md:text-[34px] leading-[1.3] font-light tracking-[-0.01em] text-balance">
              Product Design Lead — optimist, systems-builder, and
              experience-maker. Eight years designing mission-driven products
              for the people most software forgets.
            </h1>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-5 inline-flex items-center gap-2 text-[12px] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Staff &amp; Principal roles
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/resume" className="hover:text-foreground transition-colors">
                Résumé
              </Link>
              <a
                href="https://www.linkedin.com/in/mooque/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn<span className="sr-only"> (opens in new tab)</span>
              </a>
              <a href="mailto:allen@mooque.xyz" className="hover:text-foreground transition-colors">
                Email
              </a>
            </div>
          </FadeIn>

          {/* Projects — now with thumbnails + a one-line result */}
          <FadeIn delay={0.18}>
            <div className="mt-16">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-sm tracking-wide">Work</h2>
                <Link
                  href="/work"
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  All
                </Link>
              </div>
              {work[0] && <FeatureCard project={work[0]} />}
              {work.length > 1 && (
                <ol className="space-y-0 mt-2">
                  {work.slice(1).map((p, i) => (
                    <ProjectRow key={p.slug} project={p} n={i + 2} />
                  ))}
                </ol>
              )}

              {personal.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-sm tracking-wide mb-6">Personal</h2>
                  <ol className="space-y-0">
                    {personal.map((p, i) => (
                      <ProjectRow key={p.slug} project={p} n={work.length + i + 1} />
                    ))}
                  </ol>
                </div>
              )}

              {experiments.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-sm tracking-wide mb-6">Experiments</h2>
                  <ol className="space-y-0">
                    {experiments.map((p, i) => (
                      <ProjectRow
                        key={p.slug}
                        project={p}
                        n={work.length + personal.length + i + 1}
                      />
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Writing */}
          {recentWriting.length > 0 && (
            <FadeIn delay={0.22}>
              <div className="mt-16">
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-sm tracking-wide">Writing</h2>
                  <Link
                    href="/writing"
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    All
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
                    <time
                      dateTime={post.date}
                      className="text-xs text-muted shrink-0 ml-4 hidden sm:block"
                    >
                      {formatDate(post.date)}
                    </time>
                  </Link>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Colophon */}
          <FadeIn delay={0.26}>
            <p className="mt-16 text-xs text-muted leading-relaxed">
              Fine Arts kid. Graphic Design grad. Avid runner, music enthusiast,
              and an amateur musical act.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
