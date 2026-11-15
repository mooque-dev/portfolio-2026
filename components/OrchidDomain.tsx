"use client";

import { useState, type ReactNode } from "react";

// Components a nonprofit CRM, its reports and dashboards, its tables and its
// fund accounting need beyond the generic shadcn set. Proposed for Allen to
// confirm or remove; none is claimed as part of the original Orchid. Sample
// names and numbers are invented. Styled only through the --o-* tokens.

const I = ({ d, s = 16 }: { d: ReactNode; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const up = <path d="M4 10l4-4 4 4" />;
const down = <path d="M4 6l4 4 4-4" />;
const chevR = <path d="M6 4l4 4-4 4" />;
const usd = (n: number, d = 2) => `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

/* ---------- CRM ---------- */
export const DonorHeaderDemo = () => (
  <div className="n-donor">
    <span className="o-avatar n-av-lg">JP</span>
    <div className="n-donor-b">
      <p className="n-donor-n">Jamie Park</p>
      <p className="o-small">Monthly donor since 2021 · Toronto</p>
      <div className="ol-row" style={{ gap: 6, marginTop: 6 }}><span className="o-badge o-badge-2">Monthly</span><span className="o-badge o-badge-2">Volunteer</span></div>
    </div>
    <dl className="n-donor-s"><div><dt>Lifetime</dt><dd>{usd(4850, 0)}</dd></div><div><dt>Last gift</dt><dd>Nov 12</dd></div><div><dt>Gifts</dt><dd>38</dd></div></dl>
    <div className="ol-row n-donor-a"><button type="button" className="o-btn o-sm">Record gift</button><button type="button" className="o-btn o-btn-2 o-sm">Email</button></div>
  </div>
);
export const TimelineDemo = () => (
  <ol className="n-time">
    {[["gift", "Gave $50.00 to General fund", "Nov 12"], ["mail", "Opened the November newsletter", "Nov 4"], ["call", "Call with M. Osei: thanked for gala", "Oct 28"], ["note", "Prefers email, no phone after 6pm", "Oct 2"]].map(([k, t, d]) => (
      <li key={t}><span className={`n-dot n-dot-${k}`} aria-hidden /><div><p className="o-p">{t}</p><p className="o-small">{d}</p></div></li>
    ))}
  </ol>
);
export const HouseholdDemo = () => (
  <div className="n-house">
    <p className="o-small">Park household · combined giving {usd(7200, 0)}</p>
    {[["JP", "Jamie Park", "Primary contact"], ["SP", "Sam Park", "Spouse"], ["", "Park Family Fund", "Donor-advised fund"]].map(([a, n, r]) => (
      <div key={n} className="o-item"><span className={`o-avatar${a ? "" : " o-avatar-2"}`}>{a || <I d={<path d="M2.5 13.5h11M4 13.5V7l4-3 4 3v6.5" />} />}</span><div className="o-item-b"><p className="o-item-t">{n}</p><p className="o-small">{r}</p></div></div>
    ))}
  </div>
);
export function SegmentBuilderDemo() {
  const [rows, setRows] = useState([["Last gift", "is before", "Jan 1, 2026"], ["Lifetime giving", "is over", "$500"]]);
  return (
    <div className="ol-col">
      {rows.map((r, i) => (
        <div key={i} className="n-rule">
          <span className="n-rule-w">{i === 0 ? "Where" : "and"}</span>
          {r.map((c, k) => <span key={k} className="n-chip-f">{c}</span>)}
          <button type="button" className="o-icon-btn" aria-label="Remove rule" onClick={() => setRows(rows.filter((_, j) => j !== i))}><I d={<path d="M4 4l8 8M12 4l-8 8" />} /></button>
        </div>
      ))}
      <div className="ol-row"><button type="button" className="o-btn o-btn-3 o-sm" onClick={() => setRows([...rows, ["Fund", "is", "Youth programs"]])}>+ Add a rule</button><span className="o-small">{rows.length ? `${312 - rows.length * 87} donors match` : "All 4,120 donors"}</span></div>
    </div>
  );
}
export function PipelineDemo() {
  const cols: [string, [string, number][]][] = [["Identify", [["L. Haddad", 5000]]], ["Cultivate", [["A. Nguyen", 10000], ["Rivera Fdn.", 25000]]], ["Ask", [["M. Osei", 15000]]], ["Steward", [["J. Park", 2500]]]];
  return (
    <div className="n-pipe">
      {cols.map(([c, items]) => (
        <div key={c} className="n-pipe-c">
          <p className="n-pipe-h">{c} <span>{usd(items.reduce((a, [, v]) => a + v, 0), 0)}</span></p>
          {items.map(([n, v]) => <div key={n} className="n-pipe-card"><p className="o-item-t">{n}</p><p className="o-small">{usd(v, 0)} ask</p></div>)}
        </div>
      ))}
    </div>
  );
}
export function CommsPrefsDemo() {
  const [p, setP] = useState({ Email: true, Mail: true, Phone: false, Text: false });
  return (
    <div className="ol-col">
      {(Object.keys(p) as (keyof typeof p)[]).map((k) => (
        <label key={k} className="o-switch n-pref"><span className="n-pref-l">{k}</span><input type="checkbox" role="switch" checked={p[k]} onChange={() => setP({ ...p, [k]: !p[k] })} /><i aria-hidden /></label>
      ))}
      <p className="o-small">Consent recorded Oct 2, 2026, by J. Park online.</p>
    </div>
  );
}
export function MergeDemo() {
  const rows: [string, string, string][] = [["Name", "Jamie Park", "J. Park"], ["Email", "jamie@example.org", "jpark@example.org"], ["Phone", "416 555 0143", "Not set"]];
  const [pick, setPick] = useState<number[]>([0, 1, 0]);
  return (
    <div className="ol-col">
      <div className="n-merge">
        <span /><span className="o-small">Record A</span><span className="o-small">Record B</span>
        {rows.map(([f, a, b], i) => (
          <div key={f} className="n-merge-r">
            <span className="o-small">{f}</span>
            {[a, b].map((v, k) => <label key={k} className={`n-merge-v${pick[i] === k ? " on" : ""}`}><input type="radio" name={`m-${f}`} checked={pick[i] === k} onChange={() => setPick(pick.map((x, j) => (j === i ? k : x)))} /> {v}</label>)}
          </div>
        ))}
      </div>
      <div><button type="button" className="o-btn o-sm">Merge into one donor</button></div>
    </div>
  );
}
export const NoteDemo = () => (
  <div className="n-note">
    <span className="o-avatar o-avatar-2">MO</span>
    <div className="o-item-b"><p className="o-small"><b className="n-ink">M. Osei</b> · 2 days ago</p><p className="o-p">Thanked at the gala. <span className="n-mention">@Priya</span> can you send the impact report?</p></div>
  </div>
);
export function TaskListDemo() {
  const [done, setDone] = useState<string[]>([]);
  const tasks = [["Thank-you call to M. Osei", "Today", true], ["Send impact report to Rivera Fdn.", "Nov 18", false], ["Renew J. Park's card on file", "Nov 30", false]] as const;
  return (
    <ul className="n-tasks">
      {tasks.map(([t, d, due]) => (
        <li key={t} className={done.includes(t) ? "done" : ""}><label className="o-check"><input type="checkbox" checked={done.includes(t)} onChange={() => setDone(done.includes(t) ? done.filter((x) => x !== t) : [...done, t])} /> {t}</label><span className={`o-small${due ? " n-due" : ""}`}>{d}</span></li>
      ))}
    </ul>
  );
}

/* ---------- Dashboards and reporting ---------- */
export const KpiDemo = () => (
  <div className="n-kpis">
    {[["Raised this month", "$48,210", "+12%", true], ["New donors", "94", "+8", true], ["Retention", "61%", "-3 pts", false]].map(([k, v, d, good]) => (
      <div key={k as string} className="n-kpi"><p className="o-small">{k}</p><p className="n-kpi-v">{v}</p><p className={`n-delta ${good ? "up" : "down"}`}><I s={12} d={good ? up : down} /> {d} <span className="o-small">vs Oct</span></p></div>
    ))}
  </div>
);
export const GoalRingDemo = () => {
  const pct = 62, r = 34, c = 2 * Math.PI * r;
  return (
    <div className="ol-row" style={{ gap: 18 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" role="img" aria-label="62 percent of goal"><circle cx="44" cy="44" r={r} className="n-ring-bg" /><circle cx="44" cy="44" r={r} className="n-ring" strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 44 44)" /><text x="44" y="49" textAnchor="middle" className="n-ring-t">{pct}%</text></svg>
      <div><p className="o-item-t">Spring appeal</p><p className="o-small">$12,480 of $20,000 · 16 days left</p></div>
    </div>
  );
};
export const SparkStatDemo = () => {
  const pts = [12, 14, 11, 17, 16, 21, 19, 24];
  const path = pts.map((v, i) => `${i ? "L" : "M"}${i * 14} ${40 - (v - 10) * 2.4}`).join(" ");
  return (
    <div className="n-kpi n-spark"><div><p className="o-small">Online gifts per day</p><p className="n-kpi-v">24</p></div><svg width="100" height="44" viewBox="0 0 100 44" aria-hidden><path d={path} className="n-spark-l" /></svg></div>
  );
};
export const TrendDemo = () => {
  const a = [22, 26, 24, 31, 35, 33, 41, 46, 44, 52, 58, 64], b = [20, 21, 25, 24, 27, 29, 30, 33, 35, 36, 40, 45];
  const line = (d: number[]) => d.map((v, i) => `${i ? "L" : "M"}${24 + i * 24} ${120 - v * 1.6}`).join(" ");
  return (
    <figure className="o-chart">
      <figcaption className="ol-row o-small"><span className="n-key n-key-a" />This year <span className="n-key n-key-b" />Last year <span>· cumulative, $ thousands</span></figcaption>
      <svg viewBox="0 0 300 140" role="img" aria-label="Line chart: this year's cumulative giving ends at 64 thousand, ahead of last year's 45 thousand">
        {[0, 40, 80].map((t) => <g key={t}><line x1="20" x2="296" y1={120 - t * 1.6 * 0.75} y2={120 - t * 1.6 * 0.75} className="o-chart-grid" /></g>)}
        <path d={`${line(a)} L288 120 L24 120 Z`} className="n-area" />
        <path d={line(b)} className="n-line-b" /><path d={line(a)} className="n-line-a" />
        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => <text key={i} x={24 + i * 24} y="136" textAnchor="middle" className="o-chart-t">{m}</text>)}
      </svg>
    </figure>
  );
};
export const DonutDemo = () => {
  const parts = [["General", 52], ["Building", 23], ["Youth", 15], ["Relief", 10]] as const;
  const r = 32, c = 2 * Math.PI * r; let off = 0;
  return (
    <div className="ol-row" style={{ gap: 20 }}>
      <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="Giving by fund: General 52 percent, Building 23, Youth 15, Relief 10">
        {parts.map(([n, v], i) => { const seg = <circle key={n} cx="48" cy="48" r={r} className={`n-donut n-s${i}`} strokeDasharray={`${(v / 100) * c - 2} ${c}`} strokeDashoffset={-off} transform="rotate(-90 48 48)" />; off += (v / 100) * c; return seg; })}
      </svg>
      <ul className="n-legend">{parts.map(([n, v], i) => <li key={n}><span className={`n-key n-s${i}`} />{n}<b>{v}%</b></li>)}</ul>
    </div>
  );
};
export function DateRangeDemo() {
  const [p, setP] = useState("This fiscal year");
  return (
    <div className="ol-col">
      <div className="n-presets">{["Last 30 days", "This quarter", "This fiscal year", "Custom"].map((x) => <button key={x} type="button" aria-pressed={p === x} className={`o-choice${p === x ? " on" : ""}`} onClick={() => setP(x)}>{x}</button>)}</div>
      <p className="o-small">{p === "This fiscal year" ? "Jul 1, 2026 to Jun 30, 2027" : p === "This quarter" ? "Oct 1 to Dec 31, 2026" : p === "Last 30 days" ? "Oct 16 to Nov 15, 2026" : "Pick a start and end date"}</p>
    </div>
  );
}
export function FilterBarDemo() {
  const [f, setF] = useState(["Fund: General", "Over $100", "This quarter"]);
  return (
    <div className="ol-row" style={{ gap: 6 }}>
      {f.map((x) => <span key={x} className="n-fchip">{x}<button type="button" aria-label={`Remove ${x}`} onClick={() => setF(f.filter((y) => y !== x))}><I s={12} d={<path d="M4 4l8 8M12 4l-8 8" />} /></button></span>)}
      {f.length ? <button type="button" className="o-btn o-btn-3 o-sm" onClick={() => setF([])}>Clear all</button> : <button type="button" className="o-btn o-btn-2 o-sm" onClick={() => setF(["Fund: General"])}>+ Filter</button>}
    </div>
  );
}
export function ColumnPickerDemo() {
  const [cols, setCols] = useState([["Donor", true], ["Fund", true], ["Amount", true], ["Payment method", false], ["Campaign", false]] as [string, boolean][]);
  return (
    <div className="n-colpick">
      <p className="o-small">Columns in this report</p>
      {cols.map(([c, on], i) => <label key={c} className="o-check"><span className="n-grip" aria-hidden>⋮⋮</span><input type="checkbox" checked={on} onChange={() => setCols(cols.map((x, j) => (j === i ? [x[0], !x[1]] : x)))} /> {c}</label>)}
    </div>
  );
}
export function ExportDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="o-stage">
      <button type="button" className="o-btn o-btn-2" aria-expanded={open} onClick={() => setOpen(!open)}>Export</button>
      {open && <div className="o-layer o-menu" role="menu">{[["CSV", "For spreadsheets"], ["Excel", "With formatting"], ["PDF", "For the board packet"]].map(([t, d]) => <button key={t} type="button" role="menuitem" onClick={() => setOpen(false)}><b>{t}</b> <span className="o-small">{d}</span></button>)}</div>}
    </div>
  );
}
export const LeaderboardDemo = () => (
  <ol className="n-lead">
    {[["Priya S.", 4210], ["Team Riverside", 3880], ["Dev K.", 2105], ["The Osei family", 1450]].map(([n, v], i) => (
      <li key={n as string}><span className="n-rank">{i + 1}</span><span className="o-item-b">{n}</span><span className="n-lead-bar"><i style={{ width: `${((v as number) / 4210) * 100}%` }} /></span><b>{usd(v as number, 0)}</b></li>
    ))}
  </ol>
);
export const RetentionDemo = () => {
  const rows = [["2023", [100, 58, 47, 41]], ["2024", [100, 61, 50]], ["2025", [100, 64]], ["2026", [100]]] as const;
  return (
    <div className="o-tablewrap">
      <table className="n-cohort"><caption className="o-small">Share of each year&rsquo;s new donors still giving</caption>
        <thead><tr><th>Joined</th>{["Yr 1", "Yr 2", "Yr 3", "Yr 4"].map((y) => <th key={y}>{y}</th>)}</tr></thead>
        <tbody>{rows.map(([y, v]) => <tr key={y}><th>{y}</th>{[0, 1, 2, 3].map((k) => <td key={k} style={v[k] !== undefined ? { background: `color-mix(in srgb, var(--o-primary) ${Math.round(v[k] * 0.72)}%, #fff)`, color: v[k] >= 90 ? "var(--o-on)" : undefined } : undefined}>{v[k] !== undefined ? `${v[k]}%` : ""}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
};

/* ---------- Tables ---------- */
export function BulkBarDemo() {
  const [n, setN] = useState(3);
  return n ? (
    <div className="n-bulk" role="toolbar" aria-label="Bulk actions"><b>{n} selected</b><button type="button" className="o-btn o-btn-2 o-sm">Add tag</button><button type="button" className="o-btn o-btn-2 o-sm">Send receipts</button><button type="button" className="o-btn o-btn-3 o-sm" onClick={() => setN(0)}>Clear</button></div>
  ) : <button type="button" className="o-btn o-btn-2 o-sm" onClick={() => setN(3)}>Select 3 rows</button>;
}
export function InlineEditDemo() {
  const [v, setV] = useState("General");
  const [edit, setEdit] = useState(false);
  return (
    <div className="o-tablewrap">
      <table className="o-table"><thead><tr><th>Donor</th><th>Fund</th><th className="num">Amount</th></tr></thead>
        <tbody><tr><td>J. Park</td><td>{edit ? <span className="o-select n-cell-sel"><select autoFocus value={v} onChange={(e) => { setV(e.target.value); setEdit(false); }} onBlur={() => setEdit(false)}>{["General", "Building", "Youth", "Relief"].map((f) => <option key={f}>{f}</option>)}</select></span> : <button type="button" className="n-cell" onClick={() => setEdit(true)}>{v} <I s={12} d={<path d="M10.5 2.5l3 3L6 13H3v-3z" />} /></button>}</td><td className="num">$250.00</td></tr></tbody>
      </table>
    </div>
  );
}
export function GroupedRowsDemo() {
  const [open, setOpen] = useState<string[]>(["General"]);
  const groups = [["General", [["J. Park", 250], ["A. Nguyen", 500]]], ["Building", [["M. Osei", 1000]]]] as const;
  return (
    <div className="o-tablewrap">
      <table className="o-table"><tbody>
        {groups.map(([g, rows]) => [
          <tr key={g} className="n-group-r"><td><button type="button" className="n-cell" aria-expanded={open.includes(g)} onClick={() => setOpen(open.includes(g) ? open.filter((x) => x !== g) : [...open, g])}><I s={12} d={open.includes(g) ? down : chevR} /> {g} <span className="o-small">({rows.length})</span></button></td><td className="num"><b>{usd(rows.reduce((a, [, v]) => a + v, 0))}</b></td></tr>,
          ...(open.includes(g) ? rows.map(([n, v]) => <tr key={g + n}><td className="n-indent">{n}</td><td className="num">{usd(v)}</td></tr>) : []),
        ])}
      </tbody></table>
    </div>
  );
}
export const TotalsRowDemo = () => (
  <div className="o-tablewrap">
    <table className="o-table"><thead><tr><th>Fund</th><th className="num">Gifts</th><th className="num">Amount</th></tr></thead>
      <tbody>{[["General", 214, 31240], ["Building", 38, 18900], ["Youth", 61, 7425]].map(([f, g, a]) => <tr key={f}><td>{f}</td><td className="num">{g}</td><td className="num">{usd(a as number)}</td></tr>)}</tbody>
      <tfoot><tr className="n-total"><td>Total</td><td className="num">313</td><td className="num">{usd(57565)}</td></tr></tfoot>
    </table>
  </div>
);
export function ExpandRowDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="o-tablewrap">
      <table className="o-table"><tbody>
        <tr><td style={{ width: 28 }}><button type="button" className="o-icon-btn" aria-label="Show details" aria-expanded={open} onClick={() => setOpen(!open)}><I d={open ? down : chevR} /></button></td><td>M. Osei</td><td>Nov 9</td><td className="num">$1,000.00</td></tr>
        {open && <tr className="n-detail"><td /><td colSpan={3}><dl className="n-kv"><div><dt>Method</dt><dd>Card ending 4242</dd></div><div><dt>Campaign</dt><dd>Gala 2026</dd></div><div><dt>Receipt</dt><dd>Sent Nov 9</dd></div></dl></td></tr>}
      </tbody></table>
    </div>
  );
}
export function SavedViewsDemo() {
  const [v, setV] = useState(0);
  const views = [["All gifts", 1204], ["Recurring", 312], ["Over $1,000", 46], ["Needs receipt", 9]] as const;
  return <div className="o-tabs" role="tablist">{views.map(([n, c], i) => <button key={n} type="button" role="tab" aria-selected={v === i} className={v === i ? "on" : ""} onClick={() => setV(i)}>{n} <span className="o-small">{c}</span></button>)}<button type="button" className="o-icon-btn" aria-label="Save current view"><I d={<path d="M8 3v10M3 8h10" />} /></button></div>;
}
export function DensityDemo() {
  const [d, setD] = useState<"comfortable" | "compact">("compact");
  return (
    <div className="ol-col">
      <div className="o-bgroup" role="group" aria-label="Row density">{(["comfortable", "compact"] as const).map((k) => <button key={k} type="button" aria-pressed={d === k} className={d === k ? "on" : ""} onClick={() => setD(k)}>{k === "compact" ? "Compact" : "Comfortable"}</button>)}</div>
      <div className="o-tablewrap"><table className={`o-table${d === "compact" ? " n-compact" : ""}`}><tbody>{[["4010", "Donations, unrestricted", 31240], ["4020", "Donations, restricted", 18900], ["4100", "Grants", 25000]].map(([c, n, a]) => <tr key={c}><td className="n-code">{c}</td><td>{n}</td><td className="num">{usd(a as number)}</td></tr>)}</tbody></table></div>
    </div>
  );
}
export const StickyTableDemo = () => (
  <div className="n-sticky">
    <table className="o-table"><thead><tr><th>Donor</th>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => <th key={m} className="num">{m}</th>)}</tr></thead>
      <tbody>{["J. Park", "M. Osei", "R. Silva", "A. Nguyen", "L. Haddad", "P. Singh"].map((n, r) => <tr key={n}><th>{n}</th>{Array.from({ length: 8 }, (_, k) => <td key={k} className="num">{usd(((r + 2) * (k + 3) * 7) % 400 + 25, 0)}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

/* ---------- Accounting ---------- */
export function CurrencyInputDemo() {
  const [cur, setCur] = useState("CAD");
  return (
    <label className="o-field"><span>Amount received</span>
      <span className="o-igroup"><span className="o-iadd">{cur === "EUR" ? "€" : cur === "GBP" ? "£" : "$"}</span><input defaultValue="1,250.00" inputMode="decimal" className="n-num" /><span className="o-select n-cur"><select aria-label="Currency" value={cur} onChange={(e) => setCur(e.target.value)}>{["CAD", "USD", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</select></span></span>
      <em>{cur === "CAD" ? "Recorded in CAD." : `Converted to CAD at the day's rate when saved.`}</em>
    </label>
  );
}
export function AccountPickerDemo() {
  const [sel, setSel] = useState("4010");
  const tree = [["4000", "Revenue", 0], ["4010", "Donations, unrestricted", 1], ["4020", "Donations, restricted", 1], ["4100", "Grants", 1], ["5000", "Expenses", 0], ["5100", "Program costs", 1], ["5200", "Fundraising costs", 1]] as const;
  return (
    <div className="n-tree" role="listbox" aria-label="Account">
      {tree.map(([c, n, lvl]) => lvl === 0
        ? <p key={c} className="n-tree-h"><span className="n-code">{c}</span> {n}</p>
        : <button key={c} type="button" role="option" aria-selected={sel === c} className={sel === c ? "on" : ""} onClick={() => setSel(c)}><span className="n-code">{c}</span> {n}</button>)}
    </div>
  );
}
export function SplitDemo() {
  const total = 500;
  const [rows, setRows] = useState([["Donation", 400], ["Event ticket", 100]] as [string, number][]);
  const used = rows.reduce((a, [, v]) => a + v, 0);
  const left = total - used;
  return (
    <div className="ol-col">
      <p className="o-small">One payment of <b className="n-ink">{usd(total)}</b>, split by what it was for</p>
      {rows.map(([t, v], i) => (
        <div key={i} className="n-split">
          <span>{t}</span>
          <span className="o-igroup n-split-in"><span className="o-iadd">$</span><input inputMode="decimal" aria-label={`${t} amount`} value={v} onChange={(e) => setRows(rows.map((r, j) => (j === i ? [r[0], Number(e.target.value.replace(/[^\d.]/g, "")) || 0] : r)))} /></span>
        </div>
      ))}
      <p className={`n-left ${left === 0 ? "ok" : "bad"}`} aria-live="polite">{left === 0 ? "Fully allocated" : left > 0 ? `${usd(left)} left to allocate` : `${usd(-left)} over the payment`}</p>
    </div>
  );
}
export const JournalDemo = () => {
  const lines = [["1010", "Bank, operating", 1250, 0], ["4010", "Donations, unrestricted", 0, 1000], ["4300", "Event revenue", 0, 250]] as const;
  const dr = lines.reduce((a, l) => a + l[2], 0), cr = lines.reduce((a, l) => a + l[3], 0);
  return (
    <div className="o-tablewrap">
      <table className="o-table"><thead><tr><th>Account</th><th className="num">Debit</th><th className="num">Credit</th></tr></thead>
        <tbody>{lines.map(([c, n, d, k]) => <tr key={c}><td><span className="n-code">{c}</span> {n}</td><td className="num">{d ? usd(d) : ""}</td><td className="num">{k ? usd(k) : ""}</td></tr>)}</tbody>
        <tfoot><tr className="n-total"><td>{dr === cr ? <span className="n-ok"><I s={14} d={<path d="M3.5 8.5l3 3 6-7" />} /> Balanced</span> : "Out of balance"}</td><td className="num">{usd(dr)}</td><td className="num">{usd(cr)}</td></tr></tfoot>
      </table>
    </div>
  );
};
export const ReceiptDemo = () => (
  <div className="n-receipt">
    <div className="ol-row" style={{ justifyContent: "space-between" }}><p className="o-item-t">Official donation receipt</p><span className="o-small">No. 2026-01204</span></div>
    <dl className="n-kv n-kv-col"><div><dt>Received from</dt><dd>Jamie Park</dd></div><div><dt>Date received</dt><dd>Nov 12, 2026</dd></div><div><dt>Amount of gift</dt><dd>$250.00</dd></div><div><dt>Advantage</dt><dd>$40.00</dd></div><div className="n-kv-strong"><dt>Eligible amount</dt><dd>$210.00</dd></div></dl>
    <p className="o-small">Sample layout. Required wording depends on the country.</p>
  </div>
);
export function ReconcileDemo() {
  const [matched, setMatched] = useState(false);
  return (
    <div className="ol-col">
      <div className="n-recon">
        <div className="n-recon-c"><p className="o-small">Bank line</p><p className="o-item-t">STRIPE PAYOUT 1109</p><p className="n-num">$1,184.20</p></div>
        <span className={`n-recon-link${matched ? " on" : ""}`} aria-hidden><I d={matched ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M3 8h10M9 4l4 4-4 4" />} /></span>
        <div className="n-recon-c"><p className="o-small">In the books</p><p className="o-item-t">12 online gifts, Nov 9</p><p className="n-num">$1,184.20</p></div>
      </div>
      <div className="ol-row"><button type="button" className="o-btn o-sm" disabled={matched} onClick={() => setMatched(true)}>{matched ? "Matched" : "Match"}</button>{!matched && <span className="o-small">Amounts agree to the cent.</span>}</div>
    </div>
  );
}
export const PeriodStatusDemo = () => (
  <ul className="n-periods">
    {[["September", "Closed", "c"], ["October", "In review", "r"], ["November", "Open", "o"]].map(([m, s, k]) => (
      <li key={m}><span>{m} 2026</span><span className={`n-pstat n-p-${k}`}>{k === "c" && <I s={12} d={<><rect x="3.5" y="7" width="9" height="6.5" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" /></>} />}{s}</span></li>
    ))}
  </ul>
);
export const BudgetDemo = () => (
  <div className="ol-col">
    {[["Program costs", 42000, 50000], ["Fundraising costs", 13800, 12000], ["Admin", 7100, 9000]].map(([n, a, b]) => {
      const over = (a as number) > (b as number);
      return (
        <div key={n as string} className="n-budget">
          <div className="ol-row" style={{ justifyContent: "space-between" }}><span className="o-p">{n}</span><span className={`o-small${over ? " n-due" : ""}`}>{usd(a as number, 0)} of {usd(b as number, 0)}{over ? ", over" : ""}</span></div>
          <div className="n-bar"><i className={over ? "over" : ""} style={{ width: `${Math.min(100, ((a as number) / (b as number)) * 100)}%` }} /></div>
        </div>
      );
    })}
  </div>
);
export const LedgerDemo = () => {
  let bal = 8200;
  const rows = [["Nov 1", "Opening balance", 0], ["Nov 3", "Online gifts", 1184.2], ["Nov 7", "Venue deposit", -2500], ["Nov 9", "Grant, Rivera Fdn.", 25000]] as const;
  return (
    <div className="o-tablewrap">
      <table className="o-table"><thead><tr><th>Date</th><th>Description</th><th className="num">Amount</th><th className="num">Balance</th></tr></thead>
        <tbody>{rows.map(([d, t, a]) => { bal += a; return <tr key={t}><td>{d}</td><td>{t}</td><td className={`num${a < 0 ? " n-neg" : ""}`}>{a ? usd(a) : ""}</td><td className="num">{usd(bal)}</td></tr>; })}</tbody>
      </table>
    </div>
  );
};
export const PaymentMethodDemo = () => (
  <div className="ol-col">
    {[["VISA", "Visa ending 4242", "Expires 08/28", false], ["MC", "Mastercard ending 0019", "Expires 11/26", true]].map(([b, n, e, soon]) => (
      <div key={n as string} className="o-item"><span className="n-brand">{b}</span><div className="o-item-b"><p className="o-item-t">{n}</p><p className={`o-small${soon ? " n-due" : ""}`}>{e}{soon ? ", update before the next gift" : ""}</p></div></div>
    ))}
  </div>
);
export function RecurringDemo() {
  const [f, setF] = useState("Monthly");
  const next = f === "Monthly" ? ["Dec 12", "Jan 12", "Feb 12"] : f === "Quarterly" ? ["Dec 12", "Mar 12", "Jun 12"] : ["Nov 12, 2027", "Nov 12, 2028", "Nov 12, 2029"];
  return (
    <div className="ol-col">
      <div className="o-bgroup" role="group" aria-label="Frequency">{["Monthly", "Quarterly", "Yearly"].map((x) => <button key={x} type="button" aria-pressed={f === x} className={f === x ? "on" : ""} onClick={() => setF(x)}>{x}</button>)}</div>
      <p className="o-small">$50.00 {f.toLowerCase()} · next three: {next.join(", ")}</p>
    </div>
  );
}
export const PledgeDemo = () => (
  <div className="ol-col">
    <div className="ol-row" style={{ justifyContent: "space-between" }}><p className="o-item-t">$10,000 pledge, Capital campaign</p><span className="o-small">$6,000 paid</span></div>
    <div className="n-pledge">{[["Jan", "p"], ["Apr", "p"], ["Jul", "p"], ["Oct", "late"], ["Jan", ""]].map(([m, s], i) => <span key={i} className={`n-pl n-pl-${s || "due"}`}><b>{m}</b>{s === "p" ? "Paid" : s === "late" ? "Late" : "Due"}</span>)}</div>
    <p className="o-small">$2,000 per installment · one late since Oct 15</p>
  </div>
);
