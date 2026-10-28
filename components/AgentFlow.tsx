"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// The Gumloop page's opening object: a small agent on a canvas, four steps
// wired top to bottom. Press Run and each step lights up in turn, the way a
// flow runs in a builder; every step opens the case behind it. With reduced
// motion the run finishes at once. Sized in container units.
type Step = { tone: string; kind: string; title: string; detail: string; value: string; href: string };

const STEPS: Step[] = [
  { tone: "pink", kind: "Listen", title: "Interview the people doing the work", detail: "15 interviews before Automation had a single screen", value: "15 interviews", href: "/work/automation-nonprofits" },
  { tone: "purple", kind: "Prototype", title: "Build it in code, then test it", detail: "The fee flow, A/B tested in four versions", value: "75→92% opt-in", href: "/work/fee-opt-in-experimentation" },
  { tone: "green", kind: "Systemize", title: "Turn what works into parts", detail: "Orchid, one library three teams chose", value: "340+ components", href: "/work/orchid-design-system" },
  { tone: "blue", kind: "Ship", title: "Ship it and keep shipping", detail: "ARND, designed and built with Claude and Cursor", value: "161 pull requests", href: "/work/arnd" },
];

export default function AgentFlow() {
  const [done, setDone] = useState(-1);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function run() {
    if (running) return;
    const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) { setDone(STEPS.length - 1); return; }
    setDone(-1);
    setRunning(true);
    let i = 0;
    const tick = () => {
      setDone(i);
      i += 1;
      if (i < STEPS.length) timer.current = setTimeout(tick, 650);
      else setRunning(false);
    };
    timer.current = setTimeout(tick, 250);
  }

  const finished = done === STEPS.length - 1 && !running;

  return (
    <div className="af-wrap">
      <div className="af">
        <div className="af-head">
          <span className="af-name">
            <span className="af-blob af-blob-purple" aria-hidden />
            Design agent
          </span>
          <button type="button" className="af-run" onClick={run} disabled={running} aria-live="polite">
            {running ? "Running" : finished ? "Run again" : "Run"}
          </button>
        </div>
        <ol className="af-steps">
          {STEPS.map((s, i) => (
            <li key={s.kind} className={`af-step${i <= done ? " is-done" : ""}${i === done && running ? " is-now" : ""}`}>
              <Link href={s.href} className="af-node">
                <span className={`af-blob af-blob-${s.tone}`} aria-hidden />
                <span className="af-text">
                  <span className="af-kind">{s.kind}</span>
                  <span className="af-title">{s.title}</span>
                  <span className="af-detail">{s.detail}</span>
                </span>
                <span className="af-val">{s.value}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p className="af-out" aria-live="polite">
          {finished ? (
            <>Output: a no-code workflow builder 30% of 355 organizations use.</>
          ) : (
            <>Output appears when the run finishes.</>
          )}
        </p>
      </div>
    </div>
  );
}
