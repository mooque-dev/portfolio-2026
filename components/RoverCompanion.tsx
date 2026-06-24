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

function tipFor(path: string, onboarded: boolean): string {
  if (!onboarded)
    return "Woof! I'm Rover. Looking for something on Allen's site? I can fetch it. Try Work for his projects, or About to meet him.";
  if (path.startsWith("/work/fee-opt-in"))
    return "Good find! This is the one Allen's proudest of — a behavioral A/B test that moved fee opt-in from 75% to 92%.";
  if (path.startsWith("/work"))
    return "Sniff around — these are Allen's projects. The standout is the Fee Opt-In case study: opt-in went 75% to 92%.";
  if (path.startsWith("/about"))
    return "This is Allen — wanted to be a children's book illustrator, almost became a photographer, ended up in design. Good story, keep reading.";
  if (path.startsWith("/writing"))
    return "Allen writes about systems, design after an acquisition, and getting adoption without authority. Fetch one and dig in.";
  if (path.startsWith("/resume"))
    return "The formal résumé is right here. Between us, though — the Work tab says more about him.";
  return "Welcome! I'm Rover, here to help you find your way around Allen's site. Start with Work, or click me anytime for a tip.";
}

// Rover's own animation set, mapped to context.
function animFor(path: string): string {
  if (path.startsWith("/work/fee-opt-in")) return "Congratulate";
  if (path.startsWith("/writing")) return "Books";
  if (path.startsWith("/about")) return "Pleased";
  if (path.startsWith("/work")) return "Searching";
  return "Searching";
}

export default function RoverCompanion() {
  const pathname = usePathname();
  const agentRef = useRef<any>(null);
  const idleTimer = useRef<number | null>(null);
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

  // Boot the agent.
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
          const onboarded = localStorage.getItem("rover-onboarded") === "1";
          agent.speak(tipFor(window.location.pathname, onboarded));
          localStorage.setItem("rover-onboarded", "1");
          const el = document.querySelector(".clippy");
          el?.addEventListener("click", () => {
            agent.play("Pleased");
            agent.speak(tipFor(window.location.pathname, true));
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

  // Contextual help + animation on navigation.
  useEffect(() => {
    const agent = agentRef.current;
    if (!agent || !ready || napping) return;
    agent.stop();
    agent.play(animFor(pathname));
    agent.speak(tipFor(pathname, true));
    resetIdle();
  }, [pathname, ready, napping, resetIdle]);

  function wake() {
    const agent = agentRef.current;
    if (!agent) return;
    setNapping(false);
    agent.show();
    agent.play("Greet");
    agent.speak(tipFor(window.location.pathname, true));
    resetIdle();
  }
  function toggleSound() {
    setSound((s) => !s); // the effect below applies the mute state
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

  // Keep mute in sync whenever the toggle changes.
  useEffect(() => {
    applyMute(!sound);
  }, [sound, ready, applyMute]);

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
        <button onClick={toggleSound} className={btn} aria-pressed={sound}>
          sound: {sound ? "on" : "off"}
        </button>
      )}
      <button onClick={dismiss} className={btn} aria-label="Hide Rover">
        hide
      </button>
    </div>
  );
}
