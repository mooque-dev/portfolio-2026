"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Frame = "idle" | "blink" | "sing";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
];

type Msg = { text: string; cta?: { href: string; label: string } };

function messageFor(path: string, onboarded: boolean): Msg {
  if (!onboarded)
    return {
      text: "Hey — I'm Allen, though most people call me mooque. New here? I can point you somewhere good.",
      cta: { href: "/about", label: "Who's this guy?" },
    };
  if (path.startsWith("/work/fee-opt-in"))
    return { text: "This is the one I'm proudest of — a behavioral A/B test that moved fee opt-in from 75% to 92%." };
  if (path.startsWith("/work"))
    return {
      text: "These are the projects I'm proudest of. My favorite is the Fee Opt-In experiment — opt-in went 75% → 92%.",
      cta: { href: "/work/fee-opt-in-experimentation", label: "Show me that one" },
    };
  if (path.startsWith("/about"))
    return {
      text: "This is me — wanted to be a children's book illustrator, almost became a photographer, ended up in design.",
      cta: { href: "/writing", label: "What I write about" },
    };
  if (path.startsWith("/writing"))
    return {
      text: "Things I've written while figuring stuff out — systems, design after an acquisition, adoption without authority.",
      cta: { href: "/work", label: "Back to the work" },
    };
  if (path.startsWith("/resume"))
    return {
      text: "The formal version lives here. Honestly though, the work says more than the résumé does.",
      cta: { href: "/work", label: "See the work" },
    };
  return {
    text: "Welcome — I'm mooque. Want a quick tour, or just wander?",
    cta: { href: "/work", label: "Start with the work" },
  };
}

export default function MooqueCompanion() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [onboarded, setOnboarded] = useState(true);
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [frame, setFrame] = useState<Frame>("idle");

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem("mooque-dismissed") === "1");
    setOnboarded(localStorage.getItem("mooque-onboarded") === "1");
  }, []);

  // Frame animation: talk while open; idle blink + occasional sing otherwise.
  useEffect(() => {
    if (reduced) {
      setFrame("idle");
      return;
    }
    if (open) {
      const id = setInterval(() => setFrame((f) => (f === "sing" ? "idle" : "sing")), 320);
      return () => clearInterval(id);
    }
    setFrame("idle");
    const blink = setInterval(() => {
      setFrame("blink");
      setTimeout(() => setFrame("idle"), 150);
    }, 4200);
    const sing = setInterval(() => {
      setFrame("sing");
      setTimeout(() => setFrame("idle"), 650);
    }, 15000);
    return () => {
      clearInterval(blink);
      clearInterval(sing);
    };
  }, [open, reduced]);

  // Curiosity nudge: a soft teaser if they haven't engaged.
  useEffect(() => {
    if (!mounted || dismissed || open) return;
    setNudge(false);
    const show = setTimeout(() => setNudge(true), 9000);
    const hide = setTimeout(() => setNudge(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [mounted, dismissed, open, pathname]);

  if (!mounted || dismissed) return null;

  const msg = messageFor(pathname, onboarded);

  function openPanel() {
    setOpen(true);
    setNudge(false);
    if (!onboarded) {
      setOnboarded(true);
      localStorage.setItem("mooque-onboarded", "1");
    }
  }
  function dismiss() {
    setOpen(false);
    setDismissed(true);
    localStorage.setItem("mooque-dismissed", "1");
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-end gap-3 print:hidden">
      {/* Avatar */}
      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Close mooque" : "Open mooque — a quick guide"}
        aria-expanded={open}
        className="relative shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        animate={reduced ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={`/mascot/mooque-${frame}.png`}
          alt="Pixel-art avatar of Allen Kang (mooque)"
          width={68}
          height={68}
          className="rounded-[14px] border border-border shadow-sm select-none"
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
        {!onboarded && !open && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-foreground" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {(open || nudge) && (
          <motion.div
            key={open ? "panel" : "nudge"}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="mb-1 max-w-[17rem] rounded-2xl rounded-bl-sm border border-border bg-background/95 backdrop-blur-sm p-3.5 shadow-lg"
          >
            {open ? (
              <div>
                <p className="text-[13.5px] leading-relaxed text-foreground">{msg.text}</p>
                {msg.cta && (
                  <Link
                    href={msg.cta.href}
                    onClick={() => setOpen(false)}
                    className="mt-2.5 inline-block text-[13px] font-medium underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                  >
                    {msg.cta.label} &rarr;
                  </Link>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {NAV.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-border px-2.5 py-1 text-[11px] tracking-wide text-muted hover:text-foreground hover:border-foreground/40 transition-colors"
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[11px] text-muted hover:text-foreground transition-colors"
                  >
                    Minimize
                  </button>
                  <button
                    onClick={dismiss}
                    className="text-[11px] text-muted/70 hover:text-foreground transition-colors"
                  >
                    Don&apos;t show again
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={openPanel} className="text-left text-[13px] text-foreground">
                psst — need a hand finding something?
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
