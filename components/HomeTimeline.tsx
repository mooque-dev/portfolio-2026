"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

interface TimelineEntry {
  type: "project" | "writing" | "milestone";
  year: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  coverColor?: string;
  role?: string;
}

function buildTimeline(projects: ProjectSummary[], writing: WritingSummary[]): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  entries.push({
    type: "milestone",
    year: "2023–Present",
    title: "Product Design Lead — Velora (Keela · Raisely · Aplos)",
    description: "Merging three nonprofit products into one connected system used by 85,600+ campaigns across 102 countries. Built Orchid — consolidating 340+ components into 86 shared primitives. Merged three product teams into one design culture. Shipped a 0→1 automation platform with 45% adoption.",
    href: "/about",
  });

  for (const p of projects) {
    const yearMatch = p.timeline.match(/\d{4}/);
    entries.push({
      type: "project",
      year: yearMatch ? yearMatch[0] : "",
      title: p.title,
      description: p.subtitle,
      href: `/work/${p.slug}`,
      category: p.category,
      coverColor: p.coverColor,
      role: p.role,
    });
  }

  for (const w of writing) {
    const d = new Date(w.date + "T00:00:00");
    entries.push({
      type: "writing",
      year: d.getFullYear().toString(),
      title: w.title,
      description: w.excerpt,
      href: `/writing/${w.slug}`,
    });
  }

  return entries;
}

export default function HomeTimeline({ allProjects, recentWriting }: Props) {
  const entries = buildTimeline(allProjects, recentWriting);

  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          {/* Header */}
          <FadeIn>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Allen Kang
            </h1>
            <p className="mt-3 text-lg text-muted leading-relaxed max-w-lg">
              Fine Arts graduate turned design leader. 7+ years of building products, systems, and the teams behind them.
            </p>
          </FadeIn>

          {/* Timeline */}
          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

            {entries.map((entry, i) => (
              <FadeIn key={`${entry.type}-${i}`} delay={i * 0.04}>
                <div className="relative pl-8 md:pl-10 pb-10 last:pb-0">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 md:left-1 top-1.5 w-[15px] h-[15px] md:w-[17px] md:h-[17px] rounded-full border-2 ${
                      entry.type === "milestone"
                        ? "bg-foreground border-foreground"
                        : entry.type === "project"
                        ? "bg-background border-foreground"
                        : "bg-background border-muted"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Year label */}
                  <span className="text-[10px] tracking-widest uppercase text-muted">
                    {entry.year}
                    {entry.type === "writing" && " — Essay"}
                    {entry.type === "milestone" && " — Career"}
                  </span>

                  {entry.type === "milestone" ? (
                    <div className="mt-1.5">
                      <h2 className="font-serif text-lg font-semibold leading-snug">
                        {entry.title}
                      </h2>
                      <p className="text-sm text-muted mt-1">{entry.description}</p>
                      <Link
                        href={entry.href}
                        className="text-xs text-muted hover:text-foreground transition-colors mt-2 inline-block"
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  ) : (
                    <Link href={entry.href} className="group block mt-1.5">
                      {entry.type === "project" && entry.category && (
                        <span className="inline-block bg-foreground text-background text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium mb-1.5">
                          {entry.category}
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-semibold leading-snug group-hover:opacity-60 transition-opacity">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted mt-1 leading-relaxed">
                        {entry.description}
                      </p>
                      {entry.type === "project" && entry.coverColor && (
                        <div
                          className="cover-tinted mt-3 h-2 rounded-full w-24"
                          style={{ backgroundColor: entry.coverColor }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Footer links */}
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t border-border flex gap-6 text-sm">
              <Link href="/work" className="text-muted hover:text-foreground transition-colors">
                All work
              </Link>
              <Link href="/writing" className="text-muted hover:text-foreground transition-colors">
                All writing
              </Link>
              <Link href="/resume" className="text-muted hover:text-foreground transition-colors">
                Resume
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
