"use client";

import { useState } from "react";
import Link from "next/link";

// The 7shifts page's opening object: a week on the schedule. Each shift is a
// way Allen works, placed on an 8am to 6pm day; select one to see the case
// that shows it. Times are illustrative; the evidence is real.
type Shift = { day: string; start: number; end: number; short: string; label: string; tone: string; proof: string; href: string; link: string };

const SHIFTS: Shift[] = [
  { day: "Mon", start: 9, end: 12, short: "Research", label: "Research with the people using it", tone: "teal", proof: "Sat with accountants until their workflow made sense, then cut categorization tickets by 70%.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
  { day: "Tue", start: 10, end: 15, short: "Build with AI", label: "Explore and build with AI", tone: "violet", proof: "Builds with AI coding tools every day: ARND has 161 merged pull requests.", href: "/work/arnd", link: "ARND" },
  { day: "Wed", start: 9, end: 13, short: "Prototype", label: "Prototype in code", tone: "amber", proof: "Prototyped the Fee Opt-In checkout in code, so PMs and engineers could test the logic.", href: "/work/fee-opt-in-experimentation#try", link: "Fee Opt-In" },
  { day: "Thu", start: 11, end: 14, short: "Test", label: "Test with real users", tone: "blue", proof: "Three rounds of prototype testing took Automation from nothing to a paid add-on in five months.", href: "/work/automation-nonprofits", link: "Automation" },
  { day: "Fri", start: 9, end: 17, short: "Ship and watch", label: "Ship, then watch it get used", tone: "green", proof: "Shipped scheduling and attendance tools a forty-person company used daily for ten months.", href: "/work/torontoyuwol", link: "Toronto Yuwol" },
];

const FROM = 8;
const TO = 18;
const pct = (h: number) => ((h - FROM) / (TO - FROM)) * 100;
const time = (h: number) => (h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`);

export default function ShiftWeek() {
  const [sel, setSel] = useState(0);
  const s = SHIFTS[sel];
  const hours = SHIFTS.reduce((n, x) => n + (x.end - x.start), 0);

  return (
    <div className="sw w-full max-w-[460px]">
      <div className="sw-head">
        <div>
          <p className="sw-name">Allen K.</p>
          <p className="sw-sub">Product design · this week</p>
        </div>
        <p className="sw-hours">
          <b>{hours}</b> h scheduled
        </p>
      </div>
      <div className="sw-scale" aria-hidden>
        {[8, 10, 12, 14, 16, 18].map((h) => (
          <span key={h} style={{ left: `${pct(h)}%` }}>
            {time(h)}
          </span>
        ))}
      </div>
      <ol className="sw-days" aria-label="Shifts this week">
        {SHIFTS.map((x, i) => (
          <li key={x.day}>
            <span className="sw-day">{x.day}</span>
            <span className="sw-track">
              <button
                type="button"
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
                className={`sw-shift sw-${x.tone}`}
                style={{ left: `${pct(x.start)}%`, width: `${pct(x.end) - pct(x.start)}%` }}
                aria-label={`${x.day}, ${time(x.start)} to ${time(x.end)}: ${x.label}`}
              >
                {x.short}
              </button>
            </span>
          </li>
        ))}
      </ol>
      <div className="sw-detail" aria-live="polite">
        <p className="sw-when">
          {s.day} · {time(s.start)} to {time(s.end)}
        </p>
        <p className="sw-what">{s.label}</p>
        <p className="sw-proof">
          {s.proof}{" "}
          <Link href={s.href} className="underline underline-offset-4 hover:opacity-70 transition-opacity">
            {s.link}
          </Link>
        </p>
      </div>
    </div>
  );
}
