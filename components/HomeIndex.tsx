"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

export default function HomeIndex({ allProjects, recentWriting }: Props) {
  const col1 = allProjects.filter((_, i) => i % 2 === 0);
  const col2 = allProjects.filter((_, i) => i % 2 === 1);

  return (
    <section className="pt-28 md:pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Masthead */}
        <FadeIn>
          <div className="border-b-2 border-foreground pb-3 mb-1">
            <div className="flex items-end justify-between">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
                Allen Kang
              </h1>
              <p className="text-xs text-muted hidden md:block">Product Design Lead &middot; Toronto</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted uppercase tracking-widest py-1.5 border-b border-border">
            <span>Portfolio &middot; Selected Work &middot; Writing</span>
            <span>Est. 2018</span>
          </div>
        </FadeIn>

        {/* Headline + subhead */}
        <FadeIn delay={0.05}>
          <div className="mt-6 md:grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                The systems and craft behind products that work
              </h2>
            </div>
            <div className="md:col-span-4 mt-3 md:mt-0">
              <p className="text-sm text-muted leading-relaxed">
                Optimist, systems-builder, experience-maker. Eight years designing mission-driven products for people the industry usually designs around.
              </p>
            </div>
          </div>
        </FadeIn>

        <hr className="my-6 border-border" />

        {/* Two-column project layout */}
        <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-0 md:divide-x md:divide-border">
          {/* Left column */}
          <div>
            {col1.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.04}>
                <Link href={`/work/${project.slug}`} className="group block py-4 border-b border-border">
                  <div className="flex items-start gap-3">
                    <div
                      className="cover-tinted w-16 h-16 md:w-20 md:h-20 rounded-sm shrink-0"
                      style={{ backgroundColor: project.coverColor }}
                      role="img"
                      aria-label={`Cover for ${project.title}`}
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] tracking-widest uppercase text-muted">
                        {project.category}
                      </span>
                      <h3 className="text-[15px] font-bold leading-snug mt-0.5 group-hover:opacity-60 transition-opacity">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Right column */}
          <div className="md:pl-8">
            {col2.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.04 + 0.08}>
                <Link href={`/work/${project.slug}`} className="group block py-4 border-b border-border">
                  <div className="flex items-start gap-3">
                    <div
                      className="cover-tinted w-16 h-16 md:w-20 md:h-20 rounded-sm shrink-0"
                      style={{ backgroundColor: project.coverColor }}
                      role="img"
                      aria-label={`Cover for ${project.title}`}
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] tracking-widest uppercase text-muted">
                        {project.category}
                      </span>
                      <h3 className="text-[15px] font-bold leading-snug mt-0.5 group-hover:opacity-60 transition-opacity">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed line-clamp-2">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}

            {/* Writing sidebar */}
            {recentWriting.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="mt-4 pt-4 border-t border-foreground/20">
                  <p className="text-[9px] tracking-widest uppercase text-muted mb-3">
                    Opinion &amp; Analysis
                  </p>
                  {recentWriting.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/writing/${post.slug}`}
                      className="group block py-2.5 border-b border-border last:border-b-0"
                    >
                      <h4 className="text-sm font-bold leading-snug group-hover:opacity-60 transition-opacity">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-muted mt-0.5 line-clamp-1">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>

        {/* Footer strip */}
        <FadeIn delay={0.25}>
          <div className="mt-8 pt-4 border-t-2 border-foreground flex flex-wrap items-center justify-between gap-4 text-[10px] text-muted uppercase tracking-widest">
            <div className="flex gap-4">
              <Link href="/work" className="hover:text-foreground transition-colors">All Work</Link>
              <Link href="/writing" className="hover:text-foreground transition-colors">Writing</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/resume" className="hover:text-foreground transition-colors">Resume</Link>
            </div>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
