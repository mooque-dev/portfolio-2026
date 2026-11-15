"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// The Google page's opening object: Orchid's story in three steps, each with
// the real artefact behind it. Audit shows the board where I catalogued one
// component's variations; Orchid shows the shared library in Storybook; Rules
// shows ARND's live design system page, the rules my AI coding tools read.
// Styled like a tonal surface with a segmented control; no company marks.
// Sized in container units.
const STEPS = [
  { key: "Audit", tone: "a", value: "340+", unit: "one-off components", line: "Three merged products. This board is one component, the dropdown, in nine variations.", img: "/case-studies/orchid-design-system/untitled-11.png", alt: "My audit board: the dropdown's nine variations, A to I, mapped across the product's screens", pos: "0% 0%", zoom: 2.3, href: "/work/orchid-design-system", link: "Orchid" },
  { key: "Orchid", tone: "b", value: "70", unit: "shared components", line: "Built on tokens with each team, living in Storybook, adopted by three engineering teams.", img: "/case-studies/orchid-design-system/untitled-9.png", alt: "The Orchid library in Storybook, with the sidebar component and its controls", pos: "0% 0%", zoom: 1, href: "/work/orchid-design-system", link: "Orchid" },
  { key: "Rules", tone: "c", value: "160+", unit: "pull requests", line: "On ARND, the design rules live in files my AI coding tools read, and tests flag it when the code drifts.", img: "/case-studies/arnd/site-design.jpg", alt: "ARND's design system page: how ARND looks, and when, with its colour tokens", pos: "0% 0%", zoom: 1, href: "/work/arnd", link: "ARND" },
] as const;

export default function ComponentAudit() {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div className="ca-wrap">
      <div className={`ca ca-${s.tone}`}>
        <div className="ca-tabs" role="tablist" aria-label="Orchid in three steps">
          {STEPS.map((t, i) => (
            <button key={t.key} type="button" role="tab" aria-selected={i === step} className={i === step ? "on" : ""} onClick={() => setStep(i)}>
              <span aria-hidden>{i + 1}</span>
              {t.key}
            </button>
          ))}
        </div>
        <div className="ca-stage" role="tabpanel" aria-label={`${s.value} ${s.unit}`}>
          <Image key={s.img} src={s.img} alt={s.alt} fill sizes={s.zoom > 1 ? "1200px" : "(max-width: 1023px) 92vw, 460px"} quality={90} style={{ objectFit: "cover", objectPosition: s.pos, transform: `scale(${s.zoom})`, transformOrigin: "0% 0%" }} priority={step === 0} />
        </div>
        <div className="ca-foot" aria-live="polite">
          <p className="ca-num"><b>{s.value}</b> {s.unit}</p>
          <p className="ca-line">{s.line} <Link href={s.href}>{s.link}</Link></p>
        </div>
      </div>
    </div>
  );
}
