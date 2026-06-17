"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import FadeIn from "./FadeIn";
import type { ProjectSummary } from "@/lib/types";

type Filter = "all" | "work" | "personal";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
];

export default function WorkFilter({ projects }: { projects: ProjectSummary[] }) {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.type === active);

  return (
    <>
      <div className="flex items-center gap-2 mt-10 flex-wrap">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors ${
              active === value
                ? "bg-foreground text-background"
                : "text-muted/70 border border-border hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {filtered.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.08}>
            <ProjectCard
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              category={project.category}
              coverColor={project.coverColor}
            />
          </FadeIn>
        ))}
      </div>
    </>
  );
}
