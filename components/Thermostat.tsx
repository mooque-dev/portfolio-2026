"use client";

import { useState } from "react";
import Link from "next/link";

// The ecobee page's opening object: a smart thermostat, our own, with no
// company marks. Each setting is a way Allen works, and the big number is
// the proof, read the way a thermostat shows the temperature. Sized in
// container units, so the whole device scales with its column.
type Setting = { key: string; value: string; unit: string; proof: string; href: string; link: string };

const SETTINGS: Setting[] = [
  {
    key: "Research",
    value: "15",
    unit: "interviews",
    proof: "Fifteen interviews and three rounds of testing took Automation from nothing to a paid add-on.",
    href: "/work/automation-nonprofits",
    link: "Automation",
  },
  {
    key: "Systems",
    value: "340+",
    unit: "components",
    proof: "Grew Orchid into one library that three engineering teams build with.",
    href: "/work/orchid-design-system",
    link: "Orchid",
  },
  {
    key: "Build",
    value: "161",
    unit: "pull requests",
    proof: "ARND runs on iOS, Android and the web, designed and built with AI coding tools.",
    href: "/work/arnd",
    link: "ARND",
  },
  {
    key: "Test",
    value: "92%",
    unit: "fee opt-in",
    proof: "Prototyped three fixes in code, then A/B tested them: opt-in rose from 75% to 92%.",
    href: "/work/fee-opt-in-experimentation#try",
    link: "Fee Opt-In",
  },
];

export default function Thermostat() {
  const [sel, setSel] = useState(1);
  const s = SETTINGS[sel];

  return (
    <div className="th-wrap">
      <div className="th">
        <div className="th-face">
          <div className="th-top" aria-hidden>
            <span>Allen K.</span>
            <span>Toronto</span>
          </div>
          <div className="th-read">
            <span key={s.key} className="th-num">
              {s.value}
            </span>
            <span className="th-unit">{s.unit}</span>
          </div>
          <div className="th-modes" role="group" aria-label="Settings">
            {SETTINGS.map((x, i) => (
              <button key={x.key} type="button" aria-pressed={i === sel} onClick={() => setSel(i)}>
                {x.key}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-muted" aria-live="polite">
        {s.proof}{" "}
        <Link href={s.href} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
          {s.link}
        </Link>
      </p>
    </div>
  );
}
