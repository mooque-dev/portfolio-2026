"use client";

import dynamic from "next/dynamic";
import { useLayout, LayoutMode } from "./LayoutProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

const HomeReader = dynamic(() => import("./HomeReader"));
const HomeGallery = dynamic(() => import("./HomeGallery"));
const HomeIndex = dynamic(() => import("./HomeIndex"));

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
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

  let content: ReactNode;
  switch (layout) {
    case "gallery":
      content = <HomeGallery allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "index":
      content = <HomeIndex allProjects={allProjects} recentWriting={recentWriting} />;
      break;
    case "reader":
    default:
      content = <HomeReader allProjects={allProjects} recentWriting={recentWriting} />;
  }

  return (
    <AnimatePresence mode="wait">
      <LayoutShell key={layout} layoutKey={layout} reduced={prefersReducedMotion}>
        {content}
      </LayoutShell>
    </AnimatePresence>
  );
}
