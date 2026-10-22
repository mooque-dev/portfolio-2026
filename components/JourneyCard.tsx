"use client";

import { useState } from "react";
import Link from "next/link";

// The Autodesk page's opening object: a store card that walks a buyer's
// journey. Each step shows the work that moved that step, with its number.
// Our own card: no Autodesk marks. Follows the page's colours.
const STEPS = [
  { key: "Discover", value: "161", unit: "pull requests", line: "ARND, a map-first discovery app for small live shows, designed and built with AI coding tools.", href: "/work/arnd", link: "ARND" },
  { key: "Checkout", value: "92%", unit: "fee opt-in", line: "Prototyped three fixes to a checkout in code and A/B tested them: up from 75%.", href: "/work/fee-opt-in-experimentation", link: "Fee Opt-In" },
  { key: "Subscribe", value: "+13%", unit: "ARR", line: "A no-code builder that became a paid add-on, used by 30% of 355 organizations.", href: "/work/automation-nonprofits", link: "Automation" },
  { key: "After purchase", value: "−70%", unit: "support tickets", line: "Redesigned how split payments are recorded, so customers stopped writing in.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
];

export default function JourneyCard() {
  const [i, setI] = useState(1);
  const s = STEPS[i];
  return (
    <div className="jc">
      <div className="jc-top">
        <p className="jc-name">Allen Kang</p>
        <p className="jc-sub">Senior experience designer &middot; Toronto</p>
      </div>
      <div className="jc-tabs" role="group" aria-label="Journey step">
        {STEPS.map((x, n) => (
          <button key={x.key} type="button" aria-pressed={n === i} onClick={() => setI(n)}>
            {x.key}
          </button>
        ))}
      </div>
      <div className="jc-body" aria-live="polite">
        <p className="jc-val">
          {s.value} <span>{s.unit}</span>
        </p>
        <p className="jc-line">{s.line}</p>
      </div>
      <Link href={s.href} className="jc-cta">
        See {s.link}
      </Link>
    </div>
  );
}
