"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/lib/useMounted";

type Note = { text: string; cta?: { label: string; href: string } };

const FEE = "/work/fee-opt-in-experimentation";

// A quiet, optional greeter. It lives on the home page only: one small card
// that can hand a first-time visitor a relevant next step. Every other page
// lets the work speak for itself.
const NOTES: Note[] = [
  {
    text: "Allen is a Product Design Lead who goes by mooque. Start with the work to see how he thinks.",
    cta: { label: "See the work", href: "/work" },
  },
  {
    text: "His view: design is really about how people feel. Eight years of it, across education, healthcare, and nonprofits.",
    cta: { label: "His story", href: "/about" },
  },
  {
    text: "In a hurry? The Fee Opt-In study is the one he's proudest of: opt-in went 75% to 92%.",
    cta: { label: "Open it", href: FEE },
  },
];

export default function CapyCompanion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const mounted = useMounted();
  // sessionStorage, deliberately: closing the guide keeps it closed for the
  // rest of the visit, and a fresh visit starts fresh.
  const [explicit, setExplicit] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("guide-open") !== null;
  });
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const pref = sessionStorage.getItem("guide-open");
    return pref === null ? window.location.pathname === "/" : pref === "1";
  });
  const [index, setIndex] = useState(0);

  // An auto-opened guide gets out of the way once the visitor is reading
  // (deep scroll); an explicit open stays until they close it.
  useEffect(() => {
    if (!open || explicit) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, explicit]);

  const toggle = useCallback(() => {
    setExplicit(true);
    setOpen((o) => {
      const next = !o;
      sessionStorage.setItem("guide-open", next ? "1" : "0");
      return next;
    });
  }, []);

  if (!mounted) return null;
  // Home only. The rest of the site stays quiet.
  if (pathname !== "/") return null;

  const note = NOTES[index % NOTES.length];

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            className="w-64 rounded-xl border border-border bg-background px-4 pt-3 pb-3 shadow-sm"
            role="status"
          >
            <p className="microlabel text-muted mb-1.5">Guide</p>

            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.15 }}
                className="text-[13px] leading-relaxed text-foreground"
              >
                {note.text}
              </motion.p>
            </AnimatePresence>

            <div className="mt-2.5 flex items-center justify-between">
              {note.cta ? (
                <Link
                  href={note.cta.href}
                  className="text-[12px] underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  {note.cta.label} <span aria-hidden>&rarr;</span>
                </Link>
              ) : (
                <span />
              )}
              <button
                onClick={() => setIndex((i) => i + 1)}
                className="inline-flex items-center min-h-[36px] text-[11px] tracking-wide text-muted hover:text-foreground transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-pressed={open}
        aria-label={open ? "Turn guide off" : "Turn guide on"}
        title={open ? "Guide on, click to turn off" : "Guide off, click to turn on"}
        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-colors ${
          open
            ? "border-foreground/15 bg-foreground text-background hover:bg-foreground/90"
            : "border-border bg-background/85 text-muted hover:text-foreground hover:border-foreground/40"
        }`}
      >
        <GuideIcon off={!open} />
      </button>
    </div>
  );
}

function GuideIcon({ off }: { off?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5h16a2.5 2.5 0 0 1 2.5 2.5v8.5a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4H4a2.5 2.5 0 0 1-2.5-2.5V6A2.5 2.5 0 0 1 4 3.5z" />
      {!off && (
        <g fill="var(--background)">
          <circle cx="8" cy="10.2" r="1.2" />
          <circle cx="12" cy="10.2" r="1.2" />
          <circle cx="16" cy="10.2" r="1.2" />
        </g>
      )}
      {off && (
        <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      )}
    </svg>
  );
}
