"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Note = { text: string; cta?: { label: string; href: string } };

const FEE = "/work/fee-opt-in-experimentation";

// A quiet, optional guide. Each note can hand you a relevant next step, so it
// actually helps you navigate, not just talk. Auto-opens on content pages.
const NOTES: Record<string, Note[]> = {
  home: [
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
  ],
  work: [
    {
      text: "The headline is the Fee Opt-In study, a behavioral A/B test that lifted opt-in from 75% to 92% without hurting conversion.",
      cta: { label: "Open it", href: FEE },
    },
    {
      text: "He leads design at Velora, merging Keela, Raisely, and Aplos into one system used across 102 countries.",
      cta: { label: "Read the story", href: "/about" },
    },
    {
      text: "The range is intentional: experimentation, design systems, and 0-to-1 features. He likes the messy early stages best.",
    },
  ],
  feeopt: [
    {
      text: "Allen's favorite. A behavioral A/B test that moved fee opt-in from 75% to 92% without hurting conversion.",
    },
    {
      text: "The insight: the default was already fine, so he redesigned the moment donors edit their choice. Decision design, not awareness.",
    },
    {
      text: "Visuals are blurred: this work is confidential from a former role. He's glad to walk you through the real screens.",
      cta: { label: "Email Allen", href: "mailto:allen@mooque.xyz" },
    },
  ],
  about: [
    {
      text: "Allen wanted to be a children's book illustrator, nearly became a photographer, then turned to design and stayed eight years.",
      cta: { label: "See the work", href: "/work" },
    },
    {
      text: "His line: 'AI can make the screens now. I'm here for the part it can't.' He means taste, trust, and judgment.",
    },
    {
      text: "Want to reach him directly?",
      cta: { label: "allen@mooque.xyz", href: "mailto:allen@mooque.xyz" },
    },
  ],
  writing: [
    {
      text: "Allen writes while working things out: design systems after an acquisition, adoption without authority, systems thinking.",
      cta: { label: "Back to the work", href: "/work" },
    },
  ],
  resume: [
    {
      text: "The formal résumé is here. Honestly, the Work tab says more about him than bullet points do.",
      cta: { label: "See the work", href: "/work" },
    },
  ],
};

const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
];

function poolFor(path: string): Note[] {
  if (path.startsWith("/work/fee-opt-in")) return NOTES.feeopt;
  if (path.startsWith("/work")) return NOTES.work;
  if (path.startsWith("/about")) return NOTES.about;
  if (path.startsWith("/writing")) return NOTES.writing;
  if (path.startsWith("/resume")) return NOTES.resume;
  return NOTES.home;
}

function isRelevant(path: string): boolean {
  return (
    path.startsWith("/work") ||
    path.startsWith("/about") ||
    path.startsWith("/writing") ||
    path.startsWith("/resume")
  );
}

function GuideLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function CapyCompanion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const explicit = useRef(false);

  useEffect(() => {
    setMounted(true);
    const pref = localStorage.getItem("guide-open");
    if (pref === null) {
      explicit.current = false;
      setOpen(isRelevant(window.location.pathname));
    } else {
      explicit.current = true;
      setOpen(pref === "1");
    }
  }, []);

  useEffect(() => {
    setIndex(0);
    if (!explicit.current) setOpen(isRelevant(pathname));
  }, [pathname]);

  // An auto-opened guide gets out of the way once the visitor is deep in the
  // page (it was overlapping footers on long scrolls). An explicit open stays
  // until they close it, and the toggle button always brings it back.
  useEffect(() => {
    if (!open || explicit.current) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, pathname]);

  const toggle = useCallback(() => {
    setOpen((o) => {
      const next = !o;
      explicit.current = true;
      localStorage.setItem("guide-open", next ? "1" : "0");
      return next;
    });
  }, []);

  if (!mounted) return null;

  const pool = poolFor(pathname);
  const note = pool[index % pool.length];

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            className="w-[17.5rem] rounded-xl border border-border bg-background/95 backdrop-blur-sm px-4 pt-3 pb-3 shadow-sm"
            role="status"
          >
            <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1.5">
              Guide
            </p>

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

            {note.cta && (
              <GuideLink
                href={note.cta.href}
                className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                {note.cta.label} <span aria-hidden>&rarr;</span>
              </GuideLink>
            )}

            {pool.length > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1" aria-hidden>
                  {pool.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-1 rounded-full transition-colors ${
                        i === index % pool.length ? "bg-foreground" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setIndex((i) => i + 1)}
                  className="inline-flex items-center min-h-[36px] text-[11px] tracking-wide text-muted hover:text-foreground transition-colors"
                >
                  Next &rarr;
                </button>
              </div>
            )}

            <div className="mt-3 flex items-center gap-3 border-t border-border pt-2.5">
              {NAV.map((n) => {
                const active = pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`text-[11px] tracking-wide transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
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
