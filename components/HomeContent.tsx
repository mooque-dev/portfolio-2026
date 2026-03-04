"use client";

import dynamic from "next/dynamic";
import { useLayout, LayoutMode } from "./LayoutProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReactNode, useMemo } from "react";

const HomeEditorial = dynamic(() => import("./HomeEditorial"));
const HomeIndex = dynamic(() => import("./HomeIndex"));
const HomeMagazine = dynamic(() => import("./HomeMagazine"));
const HomeMinimal = dynamic(() => import("./HomeMinimal"));
const HomeBento = dynamic(() => import("./HomeBento"));
const HomeTimeline = dynamic(() => import("./HomeTimeline"));
const HomeDense = dynamic(() => import("./HomeDense"));

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor: string;
  featured: boolean;
  role: string;
  timeline: string;
}

interface Writing {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface Props {
  allProjects: Project[];
  recentWriting: Writing[];
}

function LayoutShell({
  layoutKey,
  reduced,
  children,
}: {
  layoutKey: string;
  reduced: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      key={layoutKey}
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduced ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeContent({ allProjects, recentWriting }: Props) {
  const { layout } = useLayout();
  const prefersReducedMotion = useReducedMotion();

  const featured = useMemo(
    () => allProjects.filter((p) => p.featured),
    [allProjects]
  );

  let content: ReactNode;
  switch (layout) {
    case "index":
      content = <HomeIndex allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "magazine":
      content = <HomeMagazine allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "minimal":
      content = <HomeMinimal allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "bento":
      content = <HomeBento allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "timeline":
      content = <HomeTimeline allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "dense":
      content = <HomeDense allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    default:
      content = <HomeEditorial featured={featured} recentWriting={recentWriting} />;
  }

  return (
    <AnimatePresence mode="wait">
      <LayoutShell key={layout} layoutKey={layout} reduced={prefersReducedMotion}>
        {content}
      </LayoutShell>
    </AnimatePresence>
  );
}
