"use client";

import { useState } from "react";
import Link from "next/link";

// The Google page's opening object: Orchid's story in three steps. The audit
// shows 340 one-off components as uneven marks; Orchid shows the 70 shared
// components they became; Rules shows how ARND keeps a system honest when AI
// writes the code: the rules live in files the tools read, and tests catch
// drift. Neutral palette on purpose, no company colours. Sized in container
// units. With reduced motion the marks change without moving.
const STEPS = [
  { key: "Audit", value: "340+", unit: "one-off components", line: "Three merged products, each with its own buttons, colours and spacing.", href: "/work/orchid-design-system", link: "Orchid" },
  { key: "Orchid", value: "70", unit: "shared components", line: "Built on tokens with each team, then adopted by three engineering teams.", href: "/work/orchid-design-system", link: "Orchid" },
  { key: "Rules", value: "160+", unit: "pull requests", line: "On ARND, the design rules live in files my AI coding tools read, and tests fail when the code drifts.", href: "/work/arnd", link: "ARND" },
] as const;

const RULES = [
  ["accent", "one colour, every action"],
  ["press", "one spring curve, one component"],
  ["motion", "stands down under Reduce Motion"],
  ["themes", "five, on one set of tokens"],
  ["drift", "a test fails, the build stops"],
];

// A fixed, made-up spread of one-offs: sizes, shapes and greys that don't agree.
const ODD = Array.from({ length: 340 }, (_, i) => {
  const r = (i * 9301 + 49297) % 233280;
  return { s: 0.55 + (r % 5) * 0.12, round: r % 3 === 0 ? "50%" : r % 3 === 1 ? "18%" : "2px", tone: r % 6 };
});

export default function ComponentAudit() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="ca-wrap">
      <div className="ca">
        <div className="ca-tabs" role="tablist" aria-label="Orchid in three steps">
          {STEPS.map((t, i) => (
            <button key={t.key} type="button" role="tab" aria-selected={i === step} className={i === step ? "on" : ""} onClick={() => setStep(i)}>
              {t.key}
            </button>
          ))}
        </div>
        <div className="ca-stage" role="tabpanel" aria-label={`${s.value} ${s.unit}`}>
          {step === 0 && (
            <div className="ca-odd" aria-hidden>
              {ODD.map((d, i) => (
                <i key={i} className={`t${d.tone}`} style={{ transform: `scale(${d.s})`, borderRadius: d.round }} />
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="ca-set" aria-hidden>
              {Array.from({ length: 70 }, (_, i) => <i key={i} />)}
            </div>
          )}
          {step === 2 && (
            <dl className="ca-rules">
              {RULES.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
        </div>
        <div className="ca-foot" aria-live="polite">
          <p className="ca-num"><b>{s.value}</b> {s.unit}</p>
          <p className="ca-line">{s.line} <Link href={s.href}>{s.link}</Link></p>
        </div>
      </div>
    </div>
  );
}
