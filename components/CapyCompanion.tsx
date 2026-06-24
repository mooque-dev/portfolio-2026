"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const IDLE_MS = 60000;

type Frame = "idle" | "blink" | "talk" | "happy";

const TIPS: Record<string, string[]> = {
  home: [
    "Hi! I'm Capy, Allen's guide around here. He's a Product Design Lead — goes by mooque. Want the tour?",
    "Allen's an optimist: he thinks design is really about how people feel. The Work tab is where you see what that means.",
    "New here? The fastest way to get Allen is the About page — there's a good origin story. Or click me again for more.",
    "Fun fact: he's training toward a half-marathon and performing in a 40-person musical this August.",
  ],
  work: [
    "These are Allen's projects. The headline is the Fee Opt-In study — a behavioral A/B test, opt-in 75% to 92%.",
    "He leads design at Velora, merging three nonprofit products (Keela, Raisely, Aplos) into one system — 85,600+ campaigns across 102 countries.",
    "Notice the range: experimentation, design systems, 0-to-1 features. Allen likes the messy early stages best.",
    "Want the one he's proudest of? Open the Fee Opt-In case study.",
  ],
  feeopt: [
    "Great pick — Allen's favorite. A behavioral A/B test that moved fee opt-in from 75% to 92% without hurting conversion.",
    "The clever part: the default was already fine. He redesigned the moment donors edit their choice. Decision design, not awareness.",
    "He prototyped it in Cursor and MagicPatterns before committing in Figma — AI-assisted, but the judgment is all his.",
  ],
  about: [
    "This is Allen — wanted to be a children's book illustrator, almost became a photographer, then someone stole his camera gear and he turned to design.",
    "Eight years of mission-driven work: education, healthcare, nonprofits — building for people most software forgets.",
    "His line: 'AI can make the screens now. I'm here for the part it can't.' He means taste, trust, and a good experience.",
  ],
  writing: [
    "Allen writes while figuring things out — design systems after an acquisition, systems thinking, adoption without authority.",
    "Good place to start: how he got a design system adopted through craft, not a mandate.",
  ],
  resume: [
    "The formal résumé's right here. Honestly though, the Work tab says more about him than bullet points do.",
    "Short version: Product Design Lead at Velora, eight years, Fine Arts background, systems plus experimentation.",
  ],
};

function poolFor(path: string): string[] {
  if (path.startsWith("/work/fee-opt-in")) return TIPS.feeopt;
  if (path.startsWith("/work")) return TIPS.work;
  if (path.startsWith("/about")) return TIPS.about;
  if (path.startsWith("/writing")) return TIPS.writing;
  if (path.startsWith("/resume")) return TIPS.resume;
  return TIPS.home;
}

export default function CapyCompanion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [napping, setNapping] = useState(false);
  const [frame, setFrame] = useState<Frame>("idle");
  const [bubble, setBubble] = useState<string | null>(null);

  const tipIndex = useRef(0);
  const idleT = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const talking = useRef(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem("capy-dismissed") === "1");
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.forEach((t) => window.clearInterval(t));
    timers.current = [];
  }, []);

  const resetIdle = useCallback(() => {
    if (idleT.current) window.clearTimeout(idleT.current);
    idleT.current = window.setTimeout(() => {
      setNapping(true);
      setBubble(null);
      setFrame("blink");
    }, IDLE_MS);
  }, []);

  const speak = useCallback(
    (text: string, mood: "talk" | "happy" = "talk") => {
      clearTimers();
      setNapping(false);
      setBubble(text);
      talking.current = true;
      const dur = Math.min(6000, 1300 + text.length * 42);
      const iv = window.setInterval(() => {
        setFrame((f) => (f === "talk" ? (mood === "happy" ? "happy" : "idle") : "talk"));
      }, 230);
      const stop = window.setTimeout(() => {
        window.clearInterval(iv);
        talking.current = false;
        setFrame("idle");
      }, dur);
      const hide = window.setTimeout(() => setBubble(null), dur + 3400);
      timers.current.push(iv as unknown as number, stop, hide);
      resetIdle();
    },
    [clearTimers, resetIdle]
  );

  // Blink while idle.
  useEffect(() => {
    if (reduced || napping || !mounted || dismissed) return;
    const id = window.setInterval(() => {
      if (talking.current) return;
      setFrame("blink");
      window.setTimeout(() => {
        if (!talking.current) setFrame("idle");
      }, 150);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced, napping, mounted, dismissed]);

  // Greet shortly after mount.
  useEffect(() => {
    if (!mounted || dismissed) return;
    const t = window.setTimeout(() => speak(poolFor(window.location.pathname)[0], "happy"), 900);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, dismissed]);

  // Contextual help on navigation.
  useEffect(() => {
    if (!mounted || dismissed) return;
    tipIndex.current = 0;
    speak(poolFor(pathname)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  function onPet() {
    if (napping) {
      setNapping(false);
      setFrame("idle");
      speak(poolFor(window.location.pathname)[0], "happy");
      return;
    }
    const p = poolFor(window.location.pathname);
    tipIndex.current = (tipIndex.current + 1) % p.length;
    speak(p[tipIndex.current], tipIndex.current % 2 ? "happy" : "talk");
  }
  function dismiss() {
    clearTimers();
    if (idleT.current) window.clearTimeout(idleT.current);
    setDismissed(true);
    setBubble(null);
    localStorage.setItem("capy-dismissed", "1");
  }
  function bringBack() {
    localStorage.removeItem("capy-dismissed");
    setDismissed(false);
    setNapping(false);
    setFrame("idle");
    speak(poolFor(window.location.pathname)[0], "happy");
  }

  if (!mounted) return null;

  const btn =
    "rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] tracking-wide text-muted/80 hover:text-foreground hover:border-foreground/40 transition-colors";

  if (dismissed) {
    return (
      <button onClick={bringBack} className={`fixed bottom-3 right-3 z-[60] ${btn} print:hidden`}>
        Bring back Capy
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 z-[60] flex flex-col items-end gap-1.5 print:hidden">
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="max-w-[15rem] rounded-2xl rounded-br-sm border border-border bg-background/95 backdrop-blur-sm px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground shadow-lg"
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.img
          src={`/mascot/capy/${frame}.png`}
          alt="Capy — Allen's capybara guide"
          width={104}
          height={104}
          onClick={onPet}
          role="button"
          tabIndex={0}
          aria-label="Capy — click for a tip"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPet();
            }
          }}
          className="w-[104px] h-[104px] cursor-pointer select-none drop-shadow-sm"
          draggable={false}
          animate={reduced || napping ? { y: 0 } : { y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {napping && (
          <motion.span
            aria-hidden
            className="absolute -top-1 right-2 text-[13px] text-muted/70 font-serif"
            animate={reduced ? {} : { y: [-2, -10], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            z
          </motion.span>
        )}
      </div>

      <button onClick={dismiss} className={btn} aria-label="Hide Capy">
        hide
      </button>
    </div>
  );
}
