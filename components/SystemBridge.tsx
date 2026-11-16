"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./system-bridge.css";

// The Google page's opening object: a bridge. For each project, the top is
// what the system had to handle, the bottom is the one screen people saw, and
// the arch between them is the design work. Every chip is a fact from the
// case study it links to. Our own drawing; no company marks.
const STEPS = [
  {
    key: "Payments", href: "/work/transaction-workflows", link: "Transaction Workflows",
    under: ["one payment, three meanings", "donation", "in-kind gift", "value received", "gala ticket", "Canada", "US", "Australia", "~500 support tickets a quarter"],
    img: "/case-studies/transaction-workflows/cover.jpg", alt: "The new transaction form: one payment split into its parts, each with its own type", color: "#dde4d4",
    value: "−70%", unit: "categorization support tickets, first month",
  },
  {
    key: "Design system", href: "/work/orchid-design-system", link: "Orchid",
    under: ["340+ one-off components", "three merged products", "nine dropdowns", "values set by hand", "decimal spacing", "bugs found by customers", "three engineering teams"],
    img: "/case-studies/orchid-design-system/untitled-9.png", alt: "The Orchid library in Storybook, with the sidebar component and its controls", color: "#e0d4e6",
    value: "70", unit: "shared components, adopted by all three products",
  },
  {
    key: "Checkout", href: "/work/fee-opt-in-experimentation", link: "Fee Opt-In",
    under: ["processing fees", "who covers them", "a leak in the fallback flow", "12–20% of donors click Edit", "four variations", "conversion must hold"],
    img: "/case-studies/fee-opt-in/cover.jpg", alt: "Three checkout variations for covering the processing fee: a slider, buttons and a dropdown", color: "#e8e0cf",
    value: "75% → 92%", unit: "of donors chose to cover the fee",
  },
] as const;

export default function SystemBridge() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="sb">
      <div className="sb-tabs" role="tablist" aria-label="Three systems I made easy to use">
        {STEPS.map((t, k) => (
          <button key={t.key} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)}>{t.key}</button>
        ))}
      </div>
      <div className="sb-body" role="tabpanel" aria-label={s.key}>
        <p className="sb-label">What the system had to handle</p>
        <ul className="sb-under" key={`u-${i}`}>
          {s.under.map((c, k) => <li key={c} style={{ ["--d" as string]: `${k * 35}ms` }}>{c}</li>)}
        </ul>
        <svg className="sb-arch" viewBox="0 0 400 46" preserveAspectRatio="none" aria-hidden>
          <path d="M0 44 Q200 -6 400 44" />
          {[60, 120, 200, 280, 340].map((x) => <line key={x} x1={x} x2={x} y1={x === 200 ? 19 : x === 120 || x === 280 ? 24 : 34} y2="44" />)}
          <line x1="0" x2="400" y1="44" y2="44" />
        </svg>
        <p className="sb-label">What people saw</p>
        <div className="sb-shot" style={{ background: s.color }}>
          <Image key={s.img} src={s.img} alt={s.alt} fill sizes="(max-width: 1023px) 92vw, 440px" style={{ objectFit: "cover", objectPosition: "50% 0%" }} priority={i === 0} />
        </div>
        <div className="sb-foot" aria-live="polite">
          <p className="sb-num"><b>{s.value}</b> {s.unit}</p>
          <Link href={s.href} className="sb-link">{s.link} &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
