/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const IDLE_MS = 60000;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.dataset.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`failed to load ${src}`));
    document.body.appendChild(s);
  });
}
function loadCss(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

// Rotating tips — Rover shares more as you keep clicking him.
const TIPS: Record<string, string[]> = {
  home: [
    "Woof! I'm Rover, Allen's guide around here. He's a Product Design Lead — goes by mooque. Want the tour?",
    "Allen's an optimist: he thinks design is really about how people feel. The Work tab is where you see what that means.",
    "New here? The fastest way to get Allen is the About page — there's a good origin story. Or click me again for more.",
    "Fun fact: he's training toward a half-marathon and performing in a 40-person musical this August. Busy human.",
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
function navAnim(path: string): string {
  if (path.startsWith("/work/fee-opt-in")) return "Congratulate";
  if (path.startsWith("/writing")) return "Books";
  if (path.startsWith("/about")) return "Pleased";
  return "Searching";
}
// Varied animations on click → varied sounds + motion.
const CLICK_ANIMS = [
  "Pleased",
  "Acknowledge",
  "Surprised",
  "LookUp",
  "GetAttention",
  "Thinking",
  "Congratulate",
];

export default function RoverCompanion() {
  const pathname = usePathname();
  const agentRef = useRef<any>(null);
  const idleTimer = useRef<number | null>(null);
  const tipIndex = useRef(0);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [napping, setNapping] = useState(false);
  const [sound, setSound] = useState(false); // muted by default

  const applyMute = useCallback((muted: boolean) => {
    const an = agentRef.current?._animator;
    if (!an) return;
    if (muted) an._playSound = function () {};
    else {
      try {
        delete an._playSound;
      } catch {
        /* noop */
      }
    }
  }, []);

  const nap = useCallback(() => {
    const agent = agentRef.current;
    if (!agent) return;
    agent.play("RestPose");
    window.setTimeout(() => agent.hide(), 600);
    setNapping(true);
  }, []);

  const resetIdle = useCallback(() => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(nap, IDLE_MS);
  }, [nap]);

  useEffect(() => {
    if (localStorage.getItem("rover-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        loadCss("/clippy/clippy.css");
        await loadScript("/clippy/jquery.min.js");
        await loadScript("/clippy/clippy.min.js");
        const w = window as any;
        if (!w.clippy) return;
        w.clippy.BASE_PATH = "/clippy/agents/";
        w.clippy.load("Rover", (agent: any) => {
          if (cancelled) return;
          agentRef.current = agent;
          applyMute(true);
          agent.show();
          agent.moveTo(
            Math.max(20, window.innerWidth - 180),
            Math.max(20, window.innerHeight - 220),
            0
          );
          agent.play("Greet");
          const pool = poolFor(window.location.pathname);
          agent.speak(pool[0]);
          const el = document.querySelector(".clippy");
          el?.addEventListener("click", () => {
            const p = poolFor(window.location.pathname);
            tipIndex.current = (tipIndex.current + 1) % p.length;
            agent.play(CLICK_ANIMS[Math.floor(Math.random() * CLICK_ANIMS.length)]);
            agent.speak(p[tipIndex.current]);
            resetIdle();
          });
          setReady(true);
          resetIdle();
        });
      } catch {
        /* offline / blocked — fail quietly */
      }
    })();
    return () => {
      cancelled = true;
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [applyMute, resetIdle]);

  // New page → reset rotation, give contextual animation + first tip.
  useEffect(() => {
    const agent = agentRef.current;
    if (!agent || !ready || napping) return;
    tipIndex.current = 0;
    agent.stop();
    agent.play(navAnim(pathname));
    agent.speak(poolFor(pathname)[0]);
    resetIdle();
  }, [pathname, ready, napping, resetIdle]);

  useEffect(() => {
    applyMute(!sound);
  }, [sound, ready, applyMute]);

  function wake() {
    const agent = agentRef.current;
    if (!agent) return;
    setNapping(false);
    agent.show();
    agent.play("Greet");
    agent.speak(poolFor(window.location.pathname)[0]);
    resetIdle();
  }
  function dismiss() {
    const agent = agentRef.current;
    if (agent) {
      agent.play("Hide");
      window.setTimeout(() => agent.hide(), 700);
    }
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    setDismissed(true);
    localStorage.setItem("rover-dismissed", "1");
  }
  function bringBack() {
    localStorage.removeItem("rover-dismissed");
    window.location.reload();
  }

  const btn =
    "rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] tracking-wide text-muted/80 hover:text-foreground hover:border-foreground/40 transition-colors";

  if (dismissed) {
    return (
      <button onClick={bringBack} className={`fixed bottom-3 right-3 z-[60] ${btn} print:hidden`}>
        Bring back Rover
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 z-[60] flex items-center gap-1.5 print:hidden">
      {napping ? (
        <button onClick={wake} className={btn}>
          wake Rover
        </button>
      ) : (
        <button onClick={() => setSound((s) => !s)} className={btn} aria-pressed={sound}>
          sound: {sound ? "on" : "off"}
        </button>
      )}
      <button onClick={dismiss} className={btn} aria-label="Hide Rover">
        hide
      </button>
    </div>
  );
}
