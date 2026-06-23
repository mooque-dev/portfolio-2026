"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectSummary } from "@/lib/types";

type Filter = "all" | "work" | "personal";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
];

function ProjectGrid({ projects, startIndex = 0 }: { projects: ProjectSummary[]; startIndex?: number }) {
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      <AnimatePresence mode="popLayout">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, delay: (startIndex + i) * 0.04 }}
          >
            <ProjectCard
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              category={project.category}
              coverColor={project.coverColor}
              coverImage={project.coverImage}
              wip={project.wip}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WorkFilter({ projects }: { projects: ProjectSummary[] }) {
  const [active, setActive] = useState<Filter>("all");

  const workProjects = projects.filter((p) => p.type === "work");
  const personalProjects = projects.filter((p) => p.type === "personal");
  const filtered = active === "all" ? projects : projects.filter((p) => p.type === active);

  return (
    <>
      <LayoutGroup>
        <div className="flex items-center gap-2 mt-10 flex-wrap">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`relative px-4 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors ${
                active === value
                  ? "text-background"
                  : "text-muted/70 border border-border hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {active === value && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {active === "all" ? (
        <div className="mt-12 space-y-16">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-muted/50 mb-8">
              Professional Work
            </p>
            <ProjectGrid projects={workProjects} startIndex={0} />
          </div>
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-muted/50 mb-8 border-t border-border pt-16">
              Side Projects &amp; Archive
            </p>
            <ProjectGrid projects={personalProjects} startIndex={workProjects.length} />
          </div>
        </div>
      ) : (
        <div className="mt-12">
          <ProjectGrid projects={filtered} />
        </div>
      )}
    </>
  );
}
