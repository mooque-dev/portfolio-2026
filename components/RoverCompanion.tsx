/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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

export default function RoverCompanion() {
  const pathname = usePathname();
  const agentRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
          if (el) {
            el.addEventListener("click", () => {
              agent.play("Pleased");
              agent.speak(tipFor(window.location.pathname, true));
            });
          }
          setReady(true);
          window.setTimeout(() => {
            if (!cancelled) agent.play("GetAttention");
          }, 13000);
        });
      } catch {
        /* offline / blocked — fail quietly */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch page-specific help on navigation.
  useEffect(() => {
    const agent = agentRef.current;
    if (!agent || !ready) return;
    agent.stop();
    agent.play("Searching");
    agent.speak(tipFor(pathname, true));
  }, [pathname, ready]);

  function dismiss() {
    const agent = agentRef.current;
    if (agent) {
      agent.play("Hide");
      window.setTimeout(() => agent.hide(), 800);
    }
    setDismissed(true);
    localStorage.setItem("rover-dismissed", "1");
  }

  function bringBack() {
    localStorage.removeItem("rover-dismissed");
    window.location.reload();
  }

  if (dismissed) {
    return (
      <button
        onClick={bringBack}
        className="fixed bottom-3 right-3 z-[60] rounded-full border border-border bg-background/90 px-3 py-1.5 text-[11px] text-muted hover:text-foreground transition-colors print:hidden"
      >
        Bring back Rover
      </button>
    );
  }

  return (
    <button
      onClick={dismiss}
      aria-label="Hide Rover"
      className="fixed bottom-3 right-3 z-[60] rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] tracking-wide text-muted/70 hover:text-foreground transition-colors print:hidden"
    >
      hide Rover
    </button>
  );
}
