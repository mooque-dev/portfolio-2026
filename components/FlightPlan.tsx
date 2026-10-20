"use client";

import { useState } from "react";

// The Jeppesen ForeFlight page's opening picture: Allen's career drawn as a
// route on an enroute-style chart. Each job is a fix with a five-letter
// ident; Toronto sits under a compass rose; the last leg is dashed. Select a
// fix to read its data block. Our own chart, drawn from scratch, not theirs.
type Fix = { id: string; x: number; y: number; years: string; who: string; role: string; note: string; next?: boolean };

const FIXES: Fix[] = [
  { id: "ROSUL", x: 46, y: 300, years: "2018", who: "ROSSUL", role: "Junior UX/UI designer", note: "The first job designing software." },
  { id: "XPRLY", x: 112, y: 236, years: "2019", who: "Xperly", role: "Founding product designer", note: "The first product started from nothing." },
  { id: "MYJNY", x: 176, y: 272, years: "2019 to 2022", who: "MyJourney", role: "UX/UI designer, part-time", note: "Data-dense dashboards clinicians used to track cancer patients." },
  { id: "KEELA", x: 250, y: 186, years: "2021 to 2025", who: "Keela", role: "Product designer, then lead", note: "Automation from zero to one, and the Orchid design system pitched and built." },
  { id: "APLOS", x: 326, y: 130, years: "2025 to 2026", who: "Aplos (now Velora)", role: "Senior product designer", note: "Accounting and payments across three merged products, under tax rules in three countries." },
  { id: "NEXT", x: 404, y: 58, years: "Next leg", who: "Open to senior roles", role: "", note: "Wherever experts need better tools.", next: true },
];

export default function FlightPlan() {
  const [sel, setSel] = useState("APLOS");
  const f = FIXES.find((x) => x.id === sel)!;
  const route = FIXES.filter((x) => !x.next);
  const last = route[route.length - 1];
  const next = FIXES[FIXES.length - 1];

  return (
    <figure className="m-0 w-full max-w-[460px]">
      <div className="jf-chart overflow-hidden rounded-2xl">
        <svg viewBox="0 0 460 340" className="block h-auto w-full" role="group" aria-label="Career route, as a flight plan">
          {/* Graticule */}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 46} y1={0} x2={i * 46} y2={340} className="jf-grid" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 48} x2={460} y2={i * 48} className="jf-grid" />
          ))}
          {/* Other airways, for the sense of a chart */}
          <path d="M0 120 L150 160 L300 60 L460 90" className="jf-airway" />
          <path d="M20 340 L210 120 L300 340" className="jf-airway" />
          <text x="200" y="146" className="jf-small">V42</text>

          {/* Toronto under a compass rose, between Keela and Aplos */}
          <g transform="translate(300 222)">
            <circle r="58" className="jf-rose" />
            {Array.from({ length: 36 }, (_, i) => {
              const a = (i * 10 * Math.PI) / 180;
              const long = i % 9 === 0;
              const r1 = long ? 48 : 53;
              return <line key={i} x1={Math.sin(a) * r1} y1={-Math.cos(a) * r1} x2={Math.sin(a) * 58} y2={-Math.cos(a) * 58} className="jf-rose-tick" />;
            })}
            {["N", "E", "S", "W"].map((d, i) => (
              <text key={d} x={[0, 40, 0, -40][i]} y={[-38, 4, 46, 4][i]} textAnchor="middle" className="jf-small">{d}</text>
            ))}
            <rect x="-17" y="-9" width="34" height="18" rx="2" className="jf-box" />
            <text x="0" y="4" textAnchor="middle" className="jf-ident">YYZ</text>
          </g>

          {/* The route */}
          <polyline points={route.map((p) => `${p.x},${p.y}`).join(" ")} className="jf-route" />
          <line x1={last.x} y1={last.y} x2={next.x} y2={next.y} className="jf-route jf-next" />

          {FIXES.map((p) => {
            const on = p.id === sel;
            return (
              <g
                key={p.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${p.id}, ${p.who}, ${p.years}`}
                onClick={() => setSel(p.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(p.id))}
                className="jf-fix cursor-pointer outline-none"
              >
                <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
                {p.next ? (
                  <circle cx={p.x} cy={p.y} r="6" className={`jf-tri ${on ? "jf-on" : ""}`} strokeDasharray="2 2" />
                ) : (
                  <path d={`M${p.x} ${p.y - 7} L${p.x + 6.5} ${p.y + 5} L${p.x - 6.5} ${p.y + 5} Z`} className={`jf-tri ${on ? "jf-on" : ""}`} />
                )}
                <rect x={p.x + 10} y={p.y - 22} width={p.id.length * 8.4 + 10} height="17" rx="2" className={`jf-box ${on ? "jf-box-on" : ""}`} />
                <text x={p.x + 15} y={p.y - 9.5} className={`jf-ident ${on ? "jf-ident-on" : ""}`}>{p.id}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="jf-strip mt-3 rounded-xl px-4 py-3" aria-live="polite">
        <p className="m-0 flex items-baseline justify-between gap-3 font-mono text-[12.5px] tracking-[0.06em]">
          <span className="font-semibold">{f.id}</span>
          <span className="text-muted">{f.years}</span>
        </p>
        <p className="m-0 mt-1 text-[15px] font-semibold">
          {f.who}
          {f.role && <span className="font-normal text-muted"> · {f.role}</span>}
        </p>
        <p className="m-0 mt-0.5 text-[14px] leading-snug text-muted">{f.note}</p>
      </figcaption>
      <p className="m-0 mt-2 text-[12.5px] text-muted">Select a fix on the route to read it.</p>
    </figure>
  );
}
