"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { formatDate } from "@/lib/utils";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

export default function HomeReader({ allProjects, recentWriting }: Props) {
  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* Bio */}
          <FadeIn>
            <h1 className="text-[28px] md:text-[32px] leading-[1.35] font-light">
              Product designer and creative generalist. Eight years across
              education, healthcare, and nonprofits, from early-stage startup
              to post-acquisition.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 flex gap-6 text-sm text-muted">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <a
                href="https://www.linkedin.com/in/mooque/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn<span className="sr-only"> (opens in new tab)</span>
              </a>
              <a
                href="mailto:ncsstyco@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </FadeIn>

          {/* Projects — text only */}
          <FadeIn delay={0.15}>
            <div className="mt-20">
              <h2 className="text-sm tracking-wide mb-8">Selected Work</h2>
              <ol className="space-y-0">
                {allProjects.map((project, i) => (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="group flex items-baseline justify-between py-4 border-b border-border"
                    >
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className="text-xs text-muted tabular-nums shrink-0 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-light text-lg leading-snug group-hover:opacity-60 transition-opacity truncate">
                          {project.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted shrink-0 ml-4 hidden sm:block">
                        {project.timeline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          {/* Writing — text only */}
          {recentWriting.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-20">
                <div className="flex items-baseline justify-between mb-8">
                  <h2 className="text-sm tracking-wide">Writing</h2>
                  <Link href="/writing" className="text-xs text-muted hover:text-foreground transition-colors">
                    All
                  </Link>
                </div>
                {recentWriting.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/writing/${post.slug}`}
                    className="group flex items-baseline justify-between py-4 border-b border-border"
                  >
                    <span className="font-light text-lg leading-snug group-hover:opacity-60 transition-opacity truncate min-w-0">
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

          {/* Colophon */}
          <FadeIn delay={0.25}>
            <p className="mt-20 text-xs text-muted leading-relaxed">
              Fine Arts grad. Home cook. Six years into a Duolingo streak I keep meaning to trade for real French classes.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
