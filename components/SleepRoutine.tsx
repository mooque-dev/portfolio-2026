"use client";

import { useState } from "react";
import Link from "next/link";

// The Hatch page's opening object: a bedside clock with an evening-to-morning
// routine. Each step of the routine is a way I work, with its proof and the
// case behind it; the wake step warms the clock face like a sunrise. Sized in
// container units. With reduced motion the colours change without fading.
type Step = { time: string; phase: string; title: string; detail: string; value: string; href: string; tone: "dusk" | "night" | "deep" | "dawn" };

const STEPS: Step[] = [
  { time: "9:30", phase: "Wind down", title: "Start with the people", detail: "15 interviews and three rounds of testing before Automation shipped", value: "30% of 355 orgs", href: "/work/automation-nonprofits", tone: "dusk" },
  { time: "10:15", phase: "Fall asleep", title: "Make the next step easy", detail: "One calm moment in checkout, tested in four versions", value: "75→92% opt-in", href: "/work/fee-opt-in-experimentation", tone: "night" },
  { time: "2:00", phase: "Stay asleep", title: "Design for people under strain", detail: "Dashboards clinicians used to follow cancer patients through treatment", value: "4 screens rebuilt", href: "/case/care-pathway/index.html", tone: "deep" },
  { time: "6:45", phase: "Wake up", title: "Ship it on real devices", detail: "ARND, designed and built for iOS, Android and web", value: "161 pull requests", href: "/work/arnd", tone: "dawn" },
];

export default function SleepRoutine() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const [h, m] = s.time.split(":");

  return (
    <div className="sr-wrap">
      <div className={`sr sr-${s.tone}`}>
        <div className="sr-face" aria-live="polite">
          <span className="sr-phase">{s.phase}</span>
          <span className="sr-time">
            {h}<span className="sr-colon">:</span>{m}
            <span className="sr-ampm">{s.tone === "dawn" || s.tone === "deep" ? "am" : "pm"}</span>
          </span>
        </div>
        <div className="sr-steps" role="group" aria-label="Routine">
          {STEPS.map((x, k) => (
            <button key={x.phase} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
              <span className="sr-dot" aria-hidden />
              {x.phase}
            </button>
          ))}
        </div>
        <Link href={s.href} className="sr-card">
          <span className="sr-title">{s.title}</span>
          <span className="sr-detail">{s.detail}</span>
          <span className="sr-val">{s.value}</span>
        </Link>
      </div>
    </div>
  );
}
