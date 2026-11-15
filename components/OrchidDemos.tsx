"use client";

import { useRef, useState, type ReactNode } from "react";
import { Select, DatePicker, Alert } from "./OrchidParts";

// Small working demos for every component in the Orchid library recreation,
// one per shadcn component. Each reads only the --o-* skin tokens. Overlays
// open inside their own little stage so nothing escapes the card.
// Sample content is invented and nonprofit-flavoured.

const I = ({ d, s = 16 }: { d: ReactNode; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const chev = <path d="M4 6l4 4 4-4" />;
const chevR = <path d="M6 4l4 4-4 4" />;
const check = <path d="M3.5 8.5l3 3 6-7" />;
const plus = <path d="M8 3v10M3 8h10" />;
const x = <path d="M4 4l8 8M12 4l-8 8" />;
const dots = <><circle cx="3.5" cy="8" r=".6" /><circle cx="8" cy="8" r=".6" /><circle cx="12.5" cy="8" r=".6" /></>;
const file = <><path d="M4 1.75h5l3 3v9.5H4z" /><path d="M9 1.75v3h3" /></>;

const FUNDS = [{ value: "general", label: "General fund" }, { value: "building", label: "Building fund" }, { value: "youth", label: "Youth programs" }, { value: "missions", label: "Missions" }, { value: "scholarship", label: "Scholarship fund" }, { value: "relief", label: "Disaster relief" }];
const TAGS = [{ value: "monthly", label: "Monthly donor" }, { value: "major", label: "Major gift" }, { value: "volunteer", label: "Volunteer" }, { value: "board", label: "Board" }, { value: "lapsed", label: "Lapsed" }];
const COUNTRIES = ["Australia", "Canada", "France", "Germany", "Ireland", "Mexico", "New Zealand", "South Korea", "United Kingdom", "United States"].map((c) => ({ value: c, label: c }));
const METHODS = [
  { value: "card", label: "Card", icon: <I d={<><rect x="1.75" y="3.5" width="12.5" height="9" rx="1.5" /><path d="M1.75 6.5h12.5" /></>} /> },
  { value: "bank", label: "Bank transfer", icon: <I d={<path d="M2 6.5L8 3l6 3.5M3.5 7v5M6.5 7v5M9.5 7v5M12.5 7v5M2 13h12" />} /> },
  { value: "cheque", label: "Cheque", icon: <I d={<><rect x="1.75" y="4" width="12.5" height="8" rx="1" /><path d="M4 9.5h4M10 9.5h2" /></>} /> },
  { value: "cash", label: "Cash", icon: <I d={<><rect x="1.75" y="4.5" width="12.5" height="7" rx="1" /><circle cx="8" cy="8" r="1.75" /></>} /> },
];
const DONORS = [
  { name: "J. Park", fund: "General", amt: 250, date: "Nov 12" },
  { name: "M. Osei", fund: "Building", amt: 1000, date: "Nov 9" },
  { name: "R. Silva", fund: "Youth", amt: 75, date: "Nov 14" },
  { name: "A. Nguyen", fund: "General", amt: 500, date: "Nov 3" },
  { name: "L. Haddad", fund: "Relief", amt: 120, date: "Nov 11" },
];
const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

// An overlay demo: a trigger, and a layer that opens inside the stage.
function Stage({ label, children, tall = false, variant = "o-btn-2" }: { label: string; children: (close: () => void) => ReactNode; tall?: boolean; variant?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`o-stage${tall ? " tall" : ""}`}>
      <button type="button" className={`o-btn ${variant}`} aria-expanded={open} onClick={() => setOpen(!open)}>{label}</button>
      {open && children(() => setOpen(false))}
    </div>
  );
}

/* ---------- Actions ---------- */
export const ButtonDemo = () => (
  <div className="ol-row">
    <button type="button" className="o-btn">Save donation</button>
    <button type="button" className="o-btn o-btn-2">Cancel</button>
    <button type="button" className="o-btn o-btn-3">Learn more</button>
    <button type="button" className="o-btn o-btn-d">Delete</button>
  </div>
);
export function ButtonGroupDemo() {
  const [v, setV] = useState(1);
  return (
    <div className="o-bgroup" role="group" aria-label="Range">
      {["Day", "Week", "Month", "Year"].map((t, i) => <button key={t} type="button" aria-pressed={i === v} className={i === v ? "on" : ""} onClick={() => setV(i)}>{t}</button>)}
    </div>
  );
}
export function ToggleDemo() {
  const [b, setB] = useState(true);
  const [i, setI] = useState(false);
  return (
    <div className="ol-row">
      <button type="button" className={`o-toggle${b ? " on" : ""}`} aria-pressed={b} onClick={() => setB(!b)}><b>B</b></button>
      <button type="button" className={`o-toggle${i ? " on" : ""}`} aria-pressed={i} onClick={() => setI(!i)}><i>I</i></button>
    </div>
  );
}
export function ToggleGroupDemo() {
  const [v, setV] = useState("left");
  const al = { left: <path d="M2 4h12M2 8h8M2 12h10" />, center: <path d="M2 4h12M4 8h8M3 12h10" />, right: <path d="M2 4h12M6 8h8M4 12h10" /> };
  return (
    <div className="o-tgroup" role="radiogroup" aria-label="Alignment">
      {(Object.keys(al) as (keyof typeof al)[]).map((k) => <button key={k} type="button" role="radio" aria-checked={v === k} aria-label={`Align ${k}`} className={`o-toggle${v === k ? " on" : ""}`} onClick={() => setV(k)}><I d={al[k]} /></button>)}
    </div>
  );
}
export const KbdDemo = () => <p className="o-p">Search donors with <kbd className="o-kbd">⌘</kbd> <kbd className="o-kbd">K</kbd>, save with <kbd className="o-kbd">⌘</kbd> <kbd className="o-kbd">S</kbd>.</p>;

/* ---------- Forms ---------- */
export const InputDemo = () => <label className="o-field"><span>Donor email</span><input type="email" placeholder="name@example.org" /><em>We send the receipt here.</em></label>;
export const LabelDemo = () => (
  <div className="ol-col">
    <label className="o-check"><input type="checkbox" /> <span className="o-label">Accept the gift agreement</span></label>
  </div>
);
export const FieldDemo = () => (
  <div className="ol-col">
    <label className="o-field"><span>Gift amount</span><input defaultValue="25" inputMode="decimal" /><em>The minimum online gift is $5.</em></label>
    <label className="o-field o-invalid"><span>Postal code</span><input defaultValue="M5V" aria-invalid /><em>Enter a full postal code, like M5V 2T6.</em></label>
  </div>
);
export const InputGroupDemo = () => (
  <label className="o-field"><span>Amount</span>
    <span className="o-igroup"><span className="o-iadd">$</span><input defaultValue="50.00" inputMode="decimal" /><span className="o-iadd">CAD</span></span>
  </label>
);
export function InputOTPDemo() {
  const [v, setV] = useState("4821");
  return (
    <label className="o-field"><span>Verification code</span>
      <span className="o-otp">
        <input aria-label="Six digit code" inputMode="numeric" maxLength={6} value={v} onChange={(e) => setV(e.target.value.replace(/\D/g, ""))} />
        {Array.from({ length: 6 }, (_, i) => <i key={i} className={i === v.length ? "cur" : ""}>{v[i] ?? ""}</i>)}
      </span>
    </label>
  );
}
export const TextareaDemo = () => <label className="o-field"><span>Note to the donor</span><textarea rows={3} defaultValue="Thank you for standing with us this season." /></label>;
export const CheckboxDemo = () => (
  <div className="ol-col">
    <label className="o-check"><input type="checkbox" defaultChecked /> Cover the processing fee</label>
    <label className="o-check"><input type="checkbox" /> Make it anonymous</label>
  </div>
);
export function RadioGroupDemo() {
  const [v, setV] = useState("monthly");
  return (
    <div className="ol-col" role="radiogroup" aria-label="Frequency">
      {[["once", "One-time"], ["monthly", "Monthly"], ["yearly", "Yearly"]].map(([k, l]) => <label key={k} className="o-check"><input type="radio" name="o-freq" checked={v === k} onChange={() => setV(k)} /> {l}</label>)}
    </div>
  );
}
export function SwitchDemo() {
  const [on, setOn] = useState(true);
  return <label className="o-switch"><input type="checkbox" role="switch" checked={on} onChange={() => setOn(!on)} /><i aria-hidden /> Send receipts automatically</label>;
}
export function SliderDemo() {
  const [v, setV] = useState(40);
  return (
    <label className="o-field"><span>Monthly gift: ${v}</span>
      <input type="range" className="o-range" min={5} max={100} step={5} value={v} onChange={(e) => setV(+e.target.value)} style={{ ["--p" as string]: `${((v - 5) / 95) * 100}%` }} />
    </label>
  );
}
export const SelectSingle = () => <Select variant="single" label="Fund" placeholder="Choose a fund" initial={["general"]} options={FUNDS} />;
export const SelectMultiple = () => <Select variant="multiple" label="Tags" placeholder="Add tags" initial={["monthly", "major"]} options={TAGS} />;
export const SelectSearch = () => <Select variant="searchable" label="Country" placeholder="Search countries" options={COUNTRIES} />;
export const SelectIcons = () => <Select variant="icons" label="Payment method" placeholder="Choose a method" initial={["card"]} options={METHODS} />;
export const NativeSelectDemo = () => (
  <label className="o-field"><span>Province</span>
    <span className="o-select"><select defaultValue="on"><option value="bc">British Columbia</option><option value="on">Ontario</option><option value="qc">Quebec</option></select></span>
  </label>
);
export const ComboboxDemo = () => <Select variant="searchable" label="Campaign" placeholder="Search campaigns" options={["Spring appeal", "Giving Tuesday", "Year-end", "Gala 2026", "Capital campaign"].map((c) => ({ value: c, label: c }))} />;
export const DatePickerDemo = () => <DatePicker />;
export function CalendarDemo() {
  const [d, setD] = useState(15);
  return (
    <div className="o-cal o-cal-inline">
      <p className="o-cal-m">November 2026</p>
      <div className="o-cal-g">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => <span key={w} className="o-cal-h">{w}</span>)}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => <button key={n} type="button" className={n === d ? "on" : ""} aria-pressed={n === d} onClick={() => setD(n)}>{n}</button>)}
      </div>
    </div>
  );
}
export function FormDemo() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  return sent ? (
    <Alert tone="success" title="You're on the list">We&rsquo;ll email you before the next volunteer day.</Alert>
  ) : (
    <form className="ol-col" noValidate onSubmit={(e) => { e.preventDefault(); const v = (new FormData(e.currentTarget).get("email") as string) || ""; if (!v.includes("@")) setErr("Enter an email address with an @."); else setSent(true); }}>
      <label className={`o-field${err ? " o-invalid" : ""}`}><span>Email</span><input name="email" type="email" placeholder="name@example.org" onChange={() => setErr("")} aria-invalid={!!err} /><em>{err || "One email a month, at most."}</em></label>
      <div><button type="submit" className="o-btn">Sign up to volunteer</button></div>
    </form>
  );
}

/* ---------- Feedback ---------- */
export const AlertDemo = () => (
  <div className="ol-col">
    <Alert tone="info" title="Receipts are paused">Turn them back on in settings to send this one.</Alert>
    <Alert tone="success" title="Donation saved">A receipt is on its way to the donor.</Alert>
    <Alert tone="warning" title="This fund is almost closed">It stops taking gifts on Nov 30.</Alert>
    <Alert tone="danger" title="The card was declined">Nothing was charged. Ask the donor for another card.</Alert>
  </div>
);
export function ToastDemo() {
  const [n, setN] = useState(0);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fire = () => { setN((k) => k + 1); if (t.current) clearTimeout(t.current); t.current = setTimeout(() => setN(0), 3500); };
  return (
    <div className="o-stage">
      <button type="button" className="o-btn o-btn-2" onClick={fire}>Save donation</button>
      {n > 0 && (
        <div className="o-toast" role="status">
          <span className="o-toast-i"><I d={check} /></span>
          <div><p className="o-toast-t">Donation saved</p><p className="o-toast-d">Receipt sent to J. Park.</p></div>
          <button type="button" className="o-btn o-btn-3 o-sm" onClick={() => setN(0)}>Undo</button>
        </div>
      )}
    </div>
  );
}
export const ProgressDemo = () => (
  <div className="ol-col">
    <div className="o-prog" role="progressbar" aria-valuenow={62} aria-valuemin={0} aria-valuemax={100} aria-label="Spring appeal"><i style={{ width: "62%" }} /></div>
    <p className="o-small">$12,480 of $20,000 raised</p>
  </div>
);
export const SpinnerDemo = () => <div className="ol-row"><span className="o-spin" role="status" aria-label="Loading" /><span className="o-small">Syncing gifts from Aplos…</span></div>;
export const SkeletonDemo = () => (
  <div className="o-skel-row" aria-hidden>
    <span className="o-skel o-skel-c" />
    <div className="ol-col" style={{ flex: 1, gap: 8 }}><span className="o-skel" style={{ width: "60%" }} /><span className="o-skel" style={{ width: "85%" }} /></div>
  </div>
);
export const EmptyDemo = () => (
  <div className="o-empty-state">
    <span className="o-empty-i"><I s={20} d={<><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 9h3l1 1.5h4L11 9h3" /></>} /></span>
    <p className="o-empty-t">No gifts yet</p>
    <p className="o-small">Gifts show up here as soon as someone gives.</p>
    <button type="button" className="o-btn o-sm">Record a gift</button>
  </div>
);
export const BadgeDemo = () => <div className="ol-row"><span className="o-badge">Recurring</span><span className="o-badge o-badge-2">Pending</span><span className="o-badge o-badge-3">Draft</span><span className="o-badge o-badge-d">Failed</span></div>;

/* ---------- Overlays ---------- */
export const DialogDemo = () => (
  <Stage label="Edit donor" tall>{(close) => (
    <div className="o-layer o-dialog" role="dialog" aria-label="Edit donor">
      <div className="o-dlg-h"><p className="o-dlg-t">Edit donor</p><button type="button" className="o-icon-btn" aria-label="Close" onClick={close}><I d={x} /></button></div>
      <label className="o-field"><span>Name</span><input defaultValue="Jamie Park" /></label>
      <div className="o-dlg-f"><button type="button" className="o-btn o-btn-2 o-sm" onClick={close}>Cancel</button><button type="button" className="o-btn o-sm" onClick={close}>Save</button></div>
    </div>
  )}</Stage>
);
export const AlertDialogDemo = () => (
  <Stage label="Refund gift" tall variant="o-btn-d">{(close) => (
    <div className="o-layer o-dialog" role="alertdialog" aria-label="Refund this gift?">
      <p className="o-dlg-t">Refund this gift?</p>
      <p className="o-small">$250.00 goes back to J. Park&rsquo;s card and the receipt is voided. This can&rsquo;t be undone.</p>
      <div className="o-dlg-f"><button type="button" className="o-btn o-btn-2 o-sm" onClick={close}>Keep the gift</button><button type="button" className="o-btn o-btn-d o-sm" onClick={close}>Refund $250.00</button></div>
    </div>
  )}</Stage>
);
export const SheetDemo = () => (
  <Stage label="Open filters" tall>{(close) => (
    <div className="o-layer o-sheet" role="dialog" aria-label="Filters">
      <div className="o-dlg-h"><p className="o-dlg-t">Filters</p><button type="button" className="o-icon-btn" aria-label="Close" onClick={close}><I d={x} /></button></div>
      <label className="o-check"><input type="checkbox" defaultChecked /> Recurring only</label>
      <label className="o-check"><input type="checkbox" /> Over $500</label>
    </div>
  )}</Stage>
);
export const DrawerDemo = () => (
  <Stage label="Quick gift" tall>{(close) => (
    <div className="o-layer o-drawer" role="dialog" aria-label="Quick gift">
      <span className="o-grab" aria-hidden />
      <p className="o-dlg-t">Give $25 now?</p>
      <div className="o-dlg-f"><button type="button" className="o-btn o-btn-2 o-sm" onClick={close}>Not now</button><button type="button" className="o-btn o-sm" onClick={close}>Give $25</button></div>
    </div>
  )}</Stage>
);
export const PopoverDemo = () => (
  <Stage label="Goal">{() => (
    <div className="o-layer o-pop-card" role="dialog" aria-label="Campaign goal">
      <label className="o-field"><span>Campaign goal</span><input defaultValue="$20,000" /></label>
    </div>
  )}</Stage>
);
export const TooltipDemo = () => (
  <div className="ol-row"><span className="o-tip-wrap"><button type="button" className="o-icon-btn o-bordered" aria-label="About the eligible amount" aria-describedby="o-tip1"><I d={<><circle cx="8" cy="8" r="6" /><path d="M8 7.5v3.5M8 5v.1" /></>} /></button><span role="tooltip" id="o-tip1" className="o-tip">Eligible amount = gift minus any benefit received</span></span><span className="o-small">Hover or focus the icon</span></div>
);
export const HoverCardDemo = () => (
  <p className="o-p">Gift from <span className="o-tip-wrap"><a href="#hc" className="o-link" onClick={(e) => e.preventDefault()}>Jamie Park</a><span className="o-hcard"><span className="o-avatar">JP</span><span><b>Jamie Park</b><br /><span className="o-small">Monthly donor since 2021 · 38 gifts</span></span></span></span> on Nov 12.</p>
);
export const DropdownMenuDemo = () => (
  <Stage label="Actions">{(close) => (
    <div className="o-layer o-menu" role="menu">
      {["View donor", "Send receipt again", "Split this gift"].map((m) => <button key={m} type="button" role="menuitem" onClick={close}>{m}</button>)}
      <hr />
      <button type="button" role="menuitem" className="o-menu-d" onClick={close}>Refund</button>
    </div>
  )}</Stage>
);
export function ContextMenuDemo() {
  const [at, setAt] = useState<{ x: number; y: number } | null>(null);
  return (
    <div className="o-ctx" onContextMenu={(e) => { e.preventDefault(); const r = e.currentTarget.getBoundingClientRect(); setAt({ x: e.clientX - r.left, y: e.clientY - r.top }); }} onClick={() => setAt(null)}>
      <span className="o-small">Right-click in this box</span>
      {at && <div className="o-layer o-menu" role="menu" style={{ left: Math.min(at.x, 140), top: Math.min(at.y, 70) }}>{["Copy amount", "Open in new tab", "Add a note"].map((m) => <button key={m} type="button" role="menuitem">{m}</button>)}</div>}
    </div>
  );
}
export function CommandDemo() {
  const [q, setQ] = useState("");
  const items = ["New donor", "New gift", "Find a donor", "Run year-end receipts", "Open settings"];
  const shown = items.filter((i) => i.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="o-cmd">
      <div className="o-cmd-in"><I d={<><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></>} /><input aria-label="Type a command" placeholder="Type a command…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <ul>{shown.length ? shown.map((i) => <li key={i}>{i}</li>) : <li className="o-small">No results.</li>}</ul>
    </div>
  );
}

/* ---------- Navigation ---------- */
export function TabsDemo() {
  const [t, setT] = useState(0);
  return (
    <div className="o-tabs" role="tablist">
      {["Overview", "Gifts", "Notes"].map((x, i) => <button key={x} type="button" role="tab" aria-selected={i === t} className={i === t ? "on" : ""} onClick={() => setT(i)}>{x}</button>)}
    </div>
  );
}
export const BreadcrumbDemo = () => (
  <nav aria-label="Breadcrumb"><ol className="o-crumbs"><li><a href="#b" onClick={(e) => e.preventDefault()}>Donors</a></li><li><I s={14} d={chevR} /></li><li><a href="#b" onClick={(e) => e.preventDefault()}>Jamie Park</a></li><li><I s={14} d={chevR} /></li><li aria-current="page">Gift on Nov 12</li></ol></nav>
);
export function PaginationDemo() {
  const [p, setP] = useState(2);
  return (
    <nav aria-label="Pages" className="o-pages">
      <button type="button" className="o-icon-btn" aria-label="Previous" disabled={p === 1} onClick={() => setP(p - 1)}><I d={<path d="M10 4L6 8l4 4" />} /></button>
      {[1, 2, 3, 4].map((n) => <button key={n} type="button" aria-current={n === p ? "page" : undefined} className={n === p ? "on" : ""} onClick={() => setP(n)}>{n}</button>)}
      <span aria-hidden>…</span>
      <button type="button" onClick={() => setP(12)} className={p === 12 ? "on" : ""}>12</button>
      <button type="button" className="o-icon-btn" aria-label="Next" disabled={p === 12} onClick={() => setP(p + 1)}><I d={chevR} /></button>
    </nav>
  );
}
export function NavigationMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="o-stage o-stage-l">
      <div className="o-navm">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>Fundraising <I s={14} d={chev} /></button>
        <a href="#n" onClick={(e) => e.preventDefault()}>Reports</a>
        <a href="#n" onClick={(e) => e.preventDefault()}>Settings</a>
      </div>
      {open && <div className="o-layer o-navm-panel">{[["Campaigns", "Goals, pages and progress"], ["Events", "Tickets and check-in"], ["Pledges", "Promises and schedules"]].map(([t, d]) => <a key={t} href="#n" onClick={(e) => e.preventDefault()}><b>{t}</b><span className="o-small">{d}</span></a>)}</div>}
    </div>
  );
}
export function MenubarDemo() {
  const [m, setM] = useState<string | null>(null);
  const menus: Record<string, string[]> = { File: ["New gift", "Import CSV", "Export"], Edit: ["Undo", "Find"], View: ["Compact rows", "Show archived"] };
  return (
    <div className="o-stage o-stage-l">
      <div className="o-menubar" role="menubar">{Object.keys(menus).map((k) => <button key={k} type="button" role="menuitem" aria-expanded={m === k} className={m === k ? "on" : ""} onClick={() => setM(m === k ? null : k)}>{k}</button>)}</div>
      {m && <div className="o-layer o-menu" role="menu" style={{ left: Object.keys(menus).indexOf(m) * 58, top: 44 }}>{menus[m].map((i) => <button key={i} type="button" role="menuitem" onClick={() => setM(null)}>{i}</button>)}</div>}
    </div>
  );
}
export function SidebarDemo() {
  const [a, setA] = useState("Donors");
  return (
    <div className="o-side">
      <nav aria-label="App">
        {["Dashboard", "Donors", "Gifts", "Campaigns", "Reports"].map((n) => <button key={n} type="button" aria-current={a === n ? "page" : undefined} className={a === n ? "on" : ""} onClick={() => setA(n)}>{n}</button>)}
      </nav>
      <div className="o-side-main"><p className="o-dlg-t">{a}</p><span className="o-skel" style={{ width: "70%" }} /><span className="o-skel" style={{ width: "50%" }} /></div>
    </div>
  );
}
export function DirectionDemo() {
  const [rtl, setRtl] = useState(false);
  return (
    <div className="ol-col">
      <div className="o-bgroup" role="group" aria-label="Direction"><button type="button" aria-pressed={!rtl} className={!rtl ? "on" : ""} onClick={() => setRtl(false)}>Left to right</button><button type="button" aria-pressed={rtl} className={rtl ? "on" : ""} onClick={() => setRtl(true)}>Right to left</button></div>
      <div dir={rtl ? "rtl" : "ltr"} className="o-crumbs-box"><label className="o-field"><span>{rtl ? "البريد الإلكتروني" : "Email"}</span><input placeholder={rtl ? "name@example.org" : "name@example.org"} /></label></div>
    </div>
  );
}

/* ---------- Data display ---------- */
export const TableDemo = () => (
  <div className="o-tablewrap">
    <table className="o-table">
      <thead><tr><th>Donor</th><th>Fund</th><th className="num">Amount</th></tr></thead>
      <tbody>{DONORS.slice(0, 3).map((d) => <tr key={d.name}><td>{d.name}</td><td>{d.fund}</td><td className="num">{money(d.amt)}</td></tr>)}</tbody>
    </table>
  </div>
);
export function DataTableDemo() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ k: "name" | "amt"; up: boolean }>({ k: "amt", up: false });
  const [sel, setSel] = useState<string[]>([]);
  const rows = DONORS.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.fund.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort.k === "amt" ? a.amt - b.amt : a.name.localeCompare(b.name)) * (sort.up ? 1 : -1));
  const th = (k: "name" | "amt", label: string, num = false) => (
    <th className={num ? "num" : ""} aria-sort={sort.k === k ? (sort.up ? "ascending" : "descending") : "none"}>
      <button type="button" className="o-th" onClick={() => setSort({ k, up: sort.k === k ? !sort.up : true })}>{label} <I s={12} d={sort.k === k ? (sort.up ? <path d="M4 10l4-4 4 4" /> : chev) : <path d="M5 6l3-3 3 3M5 10l3 3 3-3" />} /></button>
    </th>
  );
  return (
    <div className="ol-col">
      <div className="ol-row" style={{ justifyContent: "space-between" }}>
        <input className="o-input-s" aria-label="Filter donors" placeholder="Filter donors or funds…" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="o-small">{sel.length ? `${sel.length} selected` : `${rows.length} gifts`}</span>
      </div>
      <div className="o-tablewrap">
        <table className="o-table">
          <thead><tr><th style={{ width: 28 }}><input type="checkbox" aria-label="Select all" checked={sel.length === rows.length && rows.length > 0} onChange={(e) => setSel(e.target.checked ? rows.map((r) => r.name) : [])} /></th>{th("name", "Donor")}<th>Fund</th><th>Date</th>{th("amt", "Amount", true)}</tr></thead>
          <tbody>{rows.map((d) => <tr key={d.name} className={sel.includes(d.name) ? "sel" : ""}><td><input type="checkbox" aria-label={`Select ${d.name}`} checked={sel.includes(d.name)} onChange={() => setSel(sel.includes(d.name) ? sel.filter((s) => s !== d.name) : [...sel, d.name])} /></td><td>{d.name}</td><td>{d.fund}</td><td>{d.date}</td><td className="num">{money(d.amt)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
export const CardDemo = () => (
  <div className="o-card"><p className="o-card-k">Spring appeal</p><p className="o-card-v">$12,480</p><div className="o-prog" role="img" aria-label="62 percent of goal"><i style={{ width: "62%" }} /></div><p className="o-card-s">62% of a $20,000 goal</p></div>
);
export const AvatarDemo = () => (
  <div className="ol-row"><span className="o-avatar">JP</span><span className="o-avatar o-avatar-2">MO</span><span className="o-avatars"><span className="o-avatar">RS</span><span className="o-avatar o-avatar-2">AN</span><span className="o-avatar">+3</span></span></div>
);
export function AccordionDemo() {
  const [o, setO] = useState(0);
  const qs = [["Is my gift tax-deductible?", "Yes. You'll get an official receipt by email the same day."], ["Can I change my monthly amount?", "Any time, from the link in your last receipt."], ["Where does the money go?", "To the fund you chose. General gifts go where the need is greatest."]];
  return (
    <div className="o-acc">{qs.map(([q, a], i) => (
      <div key={q}><button type="button" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>{q}<I d={chev} /></button>{o === i && <p className="o-small">{a}</p>}</div>
    ))}</div>
  );
}
export function CollapsibleDemo() {
  const [o, setO] = useState(false);
  return (
    <div className="ol-col">
      <button type="button" className="o-btn o-btn-3 o-sm" aria-expanded={o} onClick={() => setO(!o)} style={{ justifySelf: "start" }}>{o ? "Hide" : "Show"} 3 earlier gifts</button>
      {o && <ul className="o-list-plain">{["$50.00, Oct 12", "$50.00, Sep 12", "$50.00, Aug 12"].map((g) => <li key={g}>{g}</li>)}</ul>}
    </div>
  );
}
export function CarouselDemo() {
  const [i, setI] = useState(0);
  const slides = ["Spring appeal: $12,480 raised", "Gala 2026: 210 tickets sold", "Giving Tuesday: 94 new donors"];
  return (
    <div className="o-carousel" aria-roledescription="carousel">
      <button type="button" className="o-icon-btn o-bordered" aria-label="Previous slide" onClick={() => setI((i + 2) % 3)}><I d={<path d="M10 4L6 8l4 4" />} /></button>
      <div className="o-slide" aria-live="polite"><p>{slides[i]}</p><span className="o-dots">{slides.map((_, k) => <i key={k} className={k === i ? "on" : ""} />)}</span></div>
      <button type="button" className="o-icon-btn o-bordered" aria-label="Next slide" onClick={() => setI((i + 1) % 3)}><I d={chevR} /></button>
    </div>
  );
}
export function ChartDemo() {
  const data = [["Jun", 4.2], ["Jul", 3.1], ["Aug", 5.6], ["Sep", 6.8], ["Oct", 5.9], ["Nov", 8.4]] as const;
  const max = 10;
  return (
    <figure className="o-chart">
      <figcaption className="o-small">Gifts per month, $ thousands</figcaption>
      <svg viewBox="0 0 300 140" role="img" aria-label="Bar chart of gifts per month, rising from 4.2 thousand in June to 8.4 thousand in November">
        {[0, 5, 10].map((t) => <g key={t}><line x1="24" x2="296" y1={120 - (t / max) * 110} y2={120 - (t / max) * 110} className="o-chart-grid" /><text x="18" y={124 - (t / max) * 110} textAnchor="end" className="o-chart-t">{t}</text></g>)}
        {data.map(([m, v], k) => <g key={m}><rect x={34 + k * 44} y={120 - (v / max) * 110} width="28" height={(v / max) * 110} rx="3" className="o-chart-bar" /><text x={48 + k * 44} y="136" textAnchor="middle" className="o-chart-t">{m}</text></g>)}
      </svg>
    </figure>
  );
}
export const ItemDemo = () => (
  <div className="o-item"><span className="o-avatar">JP</span><div className="o-item-b"><p className="o-item-t">Jamie Park</p><p className="o-small">Monthly, $50 · next gift Dec 12</p></div><button type="button" className="o-btn o-btn-2 o-sm">View</button></div>
);
export const TypographyDemo = () => (
  <div className="o-type"><p className="o-h1">Year-end report</p><p className="o-h3">What your gifts did</p><p className="o-p">This year 1,204 donors gave to the youth program. <span className="o-small">Figures are illustrative.</span></p></div>
);
export const SeparatorDemo = () => (
  <div className="ol-col"><p className="o-p">Gift details</p><hr className="o-sep" /><div className="ol-row o-small"><span>Receipt</span><span className="o-vsep" /><span>Refund</span><span className="o-vsep" /><span>History</span></div></div>
);
export const AspectRatioDemo = () => <div className="o-ratio"><span className="o-small">16 : 9 campaign image</span></div>;
export const ScrollAreaDemo = () => (
  <div className="o-scroll" tabIndex={0} aria-label="Recent activity">{Array.from({ length: 12 }, (_, i) => <p key={i} className="o-small">Gift #{1040 - i} recorded</p>)}</div>
);
export function ResizableDemo() {
  const [w, setW] = useState(45);
  const box = useRef<HTMLDivElement>(null);
  const drag = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    const move = (ev: PointerEvent) => setW(Math.min(80, Math.max(20, ((ev.clientX - r.left) / r.width) * 100)));
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); e.preventDefault();
  };
  return (
    <div className="o-resize" ref={box}>
      <div style={{ width: `${w}%` }}><span className="o-small">Donor list</span></div>
      <button type="button" className="o-handle" aria-label="Resize panels" onPointerDown={drag} onKeyDown={(e) => { if (e.key === "ArrowLeft") setW(Math.max(20, w - 5)); if (e.key === "ArrowRight") setW(Math.min(80, w + 5)); }} />
      <div style={{ flex: 1 }}><span className="o-small">Donor detail</span></div>
    </div>
  );
}

/* ---------- Chat and AI ---------- */
export const MessageDemo = () => (
  <div className="ol-col">
    <div className="o-msg"><span className="o-avatar o-avatar-2">AI</span><div><p className="o-msg-h">Assistant</p><p className="o-p">Three monthly donors haven&rsquo;t given since August. Want a draft check-in email?</p></div></div>
  </div>
);
export const BubbleDemo = () => (
  <div className="o-chat"><p className="o-bub">How many gifts came in this week?</p><p className="o-bub o-bub-me">42 gifts, $6,310 in total.</p></div>
);
export const MessageScrollerDemo = () => (
  <div className="o-scroll o-chat" tabIndex={0} aria-label="Conversation">{["Show lapsed donors", "12 donors lapsed this quarter.", "Sort by last gift", "Done. Oldest first.", "Draft a note to the first three", "Here are three drafts."].map((m, i) => <p key={i} className={`o-bub${i % 2 ? " o-bub-me" : ""}`}>{m}</p>)}</div>
);
export const AttachmentDemo = () => (
  <div className="o-attach"><span className="o-attach-i"><I d={file} /></span><div className="o-item-b"><p className="o-item-t">year-end-receipts.csv</p><div className="o-prog o-prog-s"><i style={{ width: "70%" }} /></div><p className="o-small">Uploading, 70%</p></div><button type="button" className="o-icon-btn" aria-label="Remove file"><I d={x} /></button></div>
);
export function CodeBlockDemo() {
  const [copied, setCopied] = useState(false);
  const code = "GET /v1/gifts?fund=general\n200 OK  42 gifts";
  return (
    <div className="o-code">
      <div className="o-code-h"><span>Terminal</span><button type="button" className="o-btn o-btn-3 o-sm" onClick={() => { navigator.clipboard?.writeText(code).then(() => setCopied(true), () => {}); setTimeout(() => setCopied(false), 1500); }}>{copied ? "Copied" : "Copy"}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
export const MarkerDemo = () => (
  <div className="o-chat"><p className="o-bub">Find duplicate donors</p><p className="o-marker"><span>Searched 4,120 records</span></p><p className="o-bub o-bub-me">Found 18 likely duplicates.</p></div>
);
export function QuestionnaireDemo() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string | null>(null);
  const qs = [{ q: "What's this report for?", o: ["Board meeting", "Grant application", "Just curious"] }, { q: "Which period?", o: ["This month", "This quarter", "This year"] }];
  if (step >= qs.length) return <Alert tone="success" title="Got it">Building your report.</Alert>;
  return (
    <div className="ol-col">
      <p className="o-small">Question {step + 1} of {qs.length}</p>
      <p className="o-item-t">{qs[step].q}</p>
      <div className="ol-col" style={{ gap: 6 }}>{qs[step].o.map((o) => <button key={o} type="button" className={`o-choice${ans === o ? " on" : ""}`} aria-pressed={ans === o} onClick={() => setAns(o)}>{o}</button>)}</div>
      <div className="ol-row"><button type="button" className="o-btn o-sm" disabled={!ans} onClick={() => { setStep(step + 1); setAns(null); }}>Next</button><button type="button" className="o-btn o-btn-3 o-sm" onClick={() => { setStep(step + 1); setAns(null); }}>Skip</button></div>
    </div>
  );
}
export function TraceDemo() {
  const [o, setO] = useState(false);
  return (
    <div className="o-trace">
      <button type="button" aria-expanded={o} onClick={() => setO(!o)}><I d={check} /> Looked up 3 sources <I d={chev} /></button>
      {o && <ol className="o-list-plain"><li>Read gifts for November</li><li>Matched them to funds</li><li>Checked the receipts log</li></ol>}
    </div>
  );
}

export { plus, dots };
