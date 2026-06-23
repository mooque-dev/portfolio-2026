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

export default function WorkFilter({ projects }: { projects: ProjectSummary[] }) {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.type === active);

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

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, delay: i * 0.04 }}
            >
              <ProjectCard
                slug={project.slug}
                title={project.title}
                subtitle={project.subtitle}
                category={project.category}
                coverColor={project.coverColor}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
