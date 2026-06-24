"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// A quiet, optional guide. Default closed so it never interrupts; one tasteful
// affordance in the corner. The notes are contextual to the current section.
const NOTES: Record<string, string[]> = {
  home: [
    "Allen is a Product Design Lead who goes by mooque. Start with Work to see how he thinks, or About for the short version of how he got here.",
    "His view: design is really about how people feel. Eight years of it, across education, healthcare, and nonprofits.",
    "In a hurry? The Fee Opt-In study under Work is the one he's proudest of.",
  ],
  work: [
    "The headline here is the Fee Opt-In study, a behavioral A/B test that lifted opt-in from 75% to 92% without hurting conversion.",
    "He leads design at Velora, merging three nonprofit products (Keela, Raisely, Aplos) into one system used across 102 countries.",
    "The range is intentional: experimentation, design systems, and 0-to-1 features. He likes the messy early stages best.",
  ],
  feeopt: [
    "Allen's favorite. A behavioral A/B test that moved fee opt-in from 75% to 92% without hurting conversion.",
    "The insight: the default was already fine, so he redesigned the moment donors edit their choice. Decision design, not awareness.",
  ],
  about: [
    "Allen wanted to be a children's book illustrator, nearly became a photographer, then turned to design and stayed eight years.",
    "His line: 'AI can make the screens now. I'm here for the part it can't.' He means taste, trust, and judgment.",
  ],
  writing: [
    "Allen writes while working things out: design systems after an acquisition, adoption without authority, systems thinking.",
  ],
  resume: [
    "The formal résumé is here. Honestly, the Work tab says more about him than bullet points do.",
  ],
};

function poolFor(path: string): string[] {
  if (path.startsWith("/work/fee-opt-in")) return NOTES.feeopt;
  if (path.startsWith("/work")) return NOTES.work;
  if (path.startsWith("/about")) return NOTES.about;
  if (path.startsWith("/writing")) return NOTES.writing;
  if (path.startsWith("/resume")) return NOTES.resume;
  return NOTES.home;
}

export default function CapyCompanion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    setOpen(localStorage.getItem("guide-open") === "1");
  }, []);

  // Reset to the first note for the section whenever the route changes.
  useEffect(() => {
    setIndex(0);
  }, [pathname]);

  const setOpenPersisted = useCallback((next: boolean) => {
    setOpen(next);
    localStorage.setItem("guide-open", next ? "1" : "0");
  }, []);

  if (!mounted) return null;

  const pool = poolFor(pathname);
  const note = pool[index % pool.length];

  const pill =
    "rounded-full border border-border bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] tracking-wide text-muted hover:text-foreground hover:border-foreground/40 transition-colors";

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            className="w-[17rem] rounded-xl border border-border bg-background/95 backdrop-blur-sm px-4 pt-3 pb-2.5 shadow-sm"
            role="status"
          >
            <p className="text-[9px] tracking-[0.2em] uppercase text-muted/70 mb-1.5">
              Guide
            </p>
            <p className="text-[13px] leading-relaxed text-foreground">{note}</p>
            {pool.length > 1 && (
              <button
                onClick={() => setIndex((i) => i + 1)}
                className="mt-2.5 text-[11px] tracking-wide text-muted hover:text-foreground transition-colors"
              >
                More &rarr;
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpenPersisted(!open)}
        className={pill}
        aria-expanded={open}
        aria-label={open ? "Hide guide" : "Show guide"}
      >
        {open ? "Hide" : "Show"}
      </button>
    </div>
  );
}
