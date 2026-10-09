"use client";

import { useState } from "react";
import Link from "next/link";
import Arrow from "@/components/Arrow";

// A small, live slice of the care pathway redesign, so a visitor can try the
// data-visualization work before opening the case study. Illustrative data,
// matching the full case.
const STAGES = [
  { name: "Diagnosis", total: 12, late15: 3, late8: 3, late1: 4 },
  { name: "Neoadjuvant chemo", total: 67, late15: 9, late8: 11, late1: 14 },
  { name: "Surgery", total: 19, late15: 5, late8: 2, late1: 1 },
  { name: "Adjuvant chemo", total: 12, late15: 1, late8: 2, late1: 3 },
  { name: "Radiation", total: 65, late15: 12, late8: 16, late1: 20 },
];
const MAX = 70;
const BANDS = [
  { key: "late15", label: "15+ days late", color: "#0d366b", ink: "#ffffff" },
  { key: "late8", label: "8-14 days", color: "#256abf", ink: "#ffffff" },
  { key: "late1", label: "1-7 days", color: "#86b6ef", ink: "#0b0b0b" },
] as const;

export default function CarePathwayMini() {
  const [focus, setFocus] = useState<string | null>(null);
  const late = (s: (typeof STAGES)[number]) => s.late15 + s.late8 + s.late1;
  const shown = focus ? STAGES.find((s) => s.name === focus)! : null;
  const totalLate = STAGES.reduce((n, s) => n + late(s), 0);
  const total = STAGES.reduce((n, s) => n + s.total, 0);

  const summary = shown
    ? `${shown.name}: ${late(shown)} of ${shown.total} patients past target, ${shown.late15} of them by 15 days or more.`
    : `${totalLate} of ${total} patients in active treatment are past their target date.`;

  return (
    <div className="rounded-lg border border-border bg-[#fcfcfb] text-[#0b0b0b] p-5 md:p-7 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[15px] font-semibold">Where patients are waiting</p>
        <p className="text-[12px] text-[#52514e]">Illustrative data</p>
      </div>
      <p className="mt-1 text-[13.5px] text-[#52514e]" aria-live="polite">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Focus a treatment stage">
        {[null, ...STAGES.map((s) => s.name)].map((n) => (
          <button
            key={n ?? "all"}
            type="button"
            onClick={() => setFocus(n)}
            aria-pressed={focus === n}
            className={`rounded-full border px-3 py-1 text-[12.5px] transition-colors ${
              focus === n
                ? "border-[#0b0b0b] bg-[#0b0b0b] text-white"
                : "border-[#e6e5e0] bg-white text-[#52514e] hover:border-[#0b0b0b]/40"
            }`}
          >
            {n ?? "All stages"}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        {STAGES.map((s) => {
          const dim = focus && focus !== s.name;
          const onTrack = s.total - late(s);
          return (
            <div
              key={s.name}
              className={`grid grid-cols-[110px_minmax(0,1fr)_62px] md:grid-cols-[140px_minmax(0,1fr)_80px] items-center gap-3 transition-opacity ${dim ? "opacity-25" : ""}`}
            >
              <span className="text-[12.5px] md:text-[13px] truncate">{s.name}</span>
              <div className="flex h-5" role="img" aria-label={`${s.name}: ${late(s)} of ${s.total} late`}>
                {BANDS.map((b) => {
                  const v = s[b.key];
                  return v > 0 ? (
                    <span
                      key={b.key}
                      title={`${v} patients, ${b.label}`}
                      className="mr-[2px] flex items-center justify-center text-[11px] font-semibold"
                      style={{ width: `${(v / MAX) * 100}%`, background: b.color, color: b.ink }}
                    >
                      {v >= 6 ? v : ""}
                    </span>
                  ) : null;
                })}
                <span
                  title={`${onTrack} patients on track`}
                  className="rounded-r-[4px]"
                  style={{ width: `${(onTrack / MAX) * 100}%`, background: "#dcdbd5" }}
                />
              </div>
              <span className="text-right text-[12px] text-[#52514e] tabular-nums">
                {late(s)} of {s.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-[#52514e]">
        {BANDS.map((b) => (
          <span key={b.key} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: b.color }} />
            {b.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: "#dcdbd5" }} />
          On track
        </span>
        <Link href="/case/care-pathway/index.html" className="ml-auto text-[#0b0b0b] underline underline-offset-4">
          See the full redesign <Arrow />
        </Link>
      </div>
    </div>
  );
}
