"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { formatDate } from "@/lib/utils";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

export default function HomeIndex({ allProjects, recentWriting }: Props) {
  const hero = allProjects[0];
  const rest = allProjects.slice(1);

  return (
    <>
      {/* Featured Project — Untapped-style hero */}
      <section className="pt-28 md:pt-32 px-6" aria-label="Featured project">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-xs tracking-widest uppercase text-muted mb-2">
              Featured Project
            </p>
            <Link
              href={`/work/${hero.slug}`}
              className="group block"
            >
              <h2 className="font-serif text-lg md:text-xl font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                {hero.title}
              </h2>
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Cover image */}
              <Link
                href={`/work/${hero.slug}`}
                className="md:col-span-7 block group"
                aria-label={`View ${hero.title} case study`}
              >
                <div
                  className="cover-tinted aspect-[4/3] md:aspect-[3/2] rounded-sm"
                  style={{ backgroundColor: hero.coverColor }}
                  role="img"
                  aria-label={`Cover for ${hero.title}`}
                />
              </Link>

              {/* Metadata sidebar */}
              <div className="md:col-span-5 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-muted">{hero.role}</span>
                    <span className="inline-block bg-foreground text-background text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium">
                      {hero.category}
                    </span>
                    <span className="text-sm text-muted">{hero.timeline}</span>
                  </div>

                  <p className="mt-8 font-serif text-xl md:text-2xl leading-snug font-medium">
                    {hero.subtitle}
                  </p>
                </div>

                <Link
                  href={`/work/${hero.slug}`}
                  className="inline-flex items-center gap-1 mt-8 text-sm hover:opacity-70 transition-opacity"
                >
                  Read case study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M5 3l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="mt-16 mb-8 border-border" />
      </div>

      {/* Project Index */}
      <section className="px-6 pb-16" aria-label="All projects">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-muted uppercase tracking-widest">
                Sort by:
              </span>
              <div className="flex gap-2">
                {["Category", "Timeline"].map((label) => (
                  <span
                    key={label}
                    className="text-xs border border-border rounded-full px-3 py-1 text-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Table header — desktop only */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 border-b border-border text-xs text-muted uppercase tracking-widest">
            <div className="col-span-5">Project</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2 text-right">Timeline</div>
          </div>

          {/* Rows */}
          {rest.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.04}>
              <Link
                href={`/work/${project.slug}`}
                className="group block border-b border-border"
              >
                <div className="md:grid md:grid-cols-12 gap-4 py-4 md:py-3.5 items-baseline">
                  <div className="col-span-5">
                    <h3 className="font-serif text-[15px] font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted mt-1 md:hidden">
                      {project.role}
                    </p>
                  </div>
                  <div className="hidden md:block col-span-2 text-sm text-muted">
                    {project.role}
                  </div>
                  <div className="hidden md:block col-span-3">
                    <span className="inline-block bg-foreground text-background text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="hidden md:block col-span-2 text-sm text-muted text-right">
                    {project.timeline}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-border" />
      </div>

      {/* Writing Section */}
      {recentWriting.length > 0 && (
        <section className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-xs tracking-widest uppercase text-muted">
                  Writing
                </p>
                <Link
                  href="/writing"
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  View all
                </Link>
              </div>
            </FadeIn>

            {recentWriting.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.04}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block border-b border-border"
                >
                  <div className="md:grid md:grid-cols-12 gap-4 py-4 md:py-3.5 items-baseline">
                    <h3 className="col-span-8 font-serif text-[15px] font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h3>
                    <p className="hidden md:block col-span-4 text-sm text-muted text-right">
                      {formatDate(post.date)}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* About teaser — compact */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto md:grid md:grid-cols-12 gap-8">
          <div className="col-span-7">
            <FadeIn>
              <p className="font-serif text-xl md:text-2xl leading-snug font-medium">
                I&apos;m a design leader with a Fine Arts background —
                seven years building products, systems, and the teams behind
                them. I care about the craft as much as the outcome.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-6 text-sm hover:opacity-70 transition-opacity"
              >
                About me
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 3l4 4-4 4" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
