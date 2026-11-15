"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// The larger pieces of the Orchid library recreation: the Select (one
// component, four variants), the Date picker, and the Alert in four tones.
// Shaped after the shadcn Select, Combobox, Calendar and Alert, styled only
// through the --o-* tokens of the chosen skin.

type Opt = { value: string; label: string; icon?: ReactNode };

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Close a popover on outside click or Escape.
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open, close]);
  return ref;
}

export type SelectVariant = "single" | "multiple" | "searchable" | "icons";

export function Select({ variant, label, options, placeholder, initial = [] }: { variant: SelectVariant; label: string; options: Opt[]; placeholder: string; initial?: string[] }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string[]>(initial);
  const [q, setQ] = useState("");
  const close = () => { setOpen(false); setQ(""); };
  const ref = useDismiss(open, close);
  const multi = variant === "multiple";
  const id = `o-sel-${variant}`;

  const pick = (v: string) => {
    if (multi) setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    else { setSel([v]); close(); }
  };
  const shown = variant === "searchable" && q ? options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())) : options;
  const chosen = options.filter((o) => sel.includes(o.value));

  return (
    <div className="o-field" ref={ref}>
      <span id={`${id}-l`}>{label}</span>
      <div className="o-pop">
        {variant === "searchable" ? (
          <div className="o-trigger o-trigger-search">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input
              role="combobox" aria-expanded={open} aria-controls={`${id}-list`} aria-labelledby={`${id}-l`}
              value={open ? q : chosen[0]?.label ?? ""} placeholder={placeholder}
              onFocus={() => setOpen(true)} onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            />
          </div>
        ) : (
          <button type="button" className="o-trigger" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`${id}-l`} onClick={() => setOpen(!open)}>
            <span className="o-trigger-val">
              {chosen.length === 0 && <span className="o-ph">{placeholder}</span>}
              {multi
                ? chosen.map((o) => <span key={o.value} className="o-chip">{o.label}</span>)
                : chosen[0] && <>{chosen[0].icon && <span className="o-ico">{chosen[0].icon}</span>}{chosen[0].label}</>}
            </span>
            <Chevron />
          </button>
        )}
        {open && (
          <ul className="o-list" id={`${id}-list`} role="listbox" aria-multiselectable={multi || undefined} aria-labelledby={`${id}-l`}>
            {shown.length === 0 && <li className="o-empty">No match.</li>}
            {shown.map((o) => {
              const on = sel.includes(o.value);
              return (
                <li key={o.value} role="option" aria-selected={on}>
                  <button type="button" className={on ? "on" : ""} onClick={() => pick(o.value)}>
                    {multi && <span className={`o-box${on ? " on" : ""}`}>{on && <Check />}</span>}
                    {o.icon && <span className="o-ico">{o.icon}</span>}
                    <span className="o-opt">{o.label}</span>
                    {!multi && on && <Check />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// A small month view. November 2026 starts on a Sunday and has 30 days.
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export function DatePicker() {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState<number | null>(15);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div className="o-field" ref={ref}>
      <span id="o-date-l">Date received</span>
      <div className="o-pop">
        <button type="button" className="o-trigger" aria-haspopup="dialog" aria-expanded={open} aria-labelledby="o-date-l" onClick={() => setOpen(!open)}>
          <span className="o-trigger-val">
            <span className="o-ico"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><rect x="2.5" y="3.5" width="11" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
            {day ? `Nov ${day}, 2026` : <span className="o-ph">Pick a date</span>}
          </span>
          <Chevron />
        </button>
        {open && (
          <div className="o-cal" role="dialog" aria-label="November 2026">
            <p className="o-cal-m">November 2026</p>
            <div className="o-cal-g">
              {DAYS.map((d) => <span key={d} className="o-cal-h">{d}</span>)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <button key={d} type="button" className={d === day ? "on" : ""} aria-pressed={d === day} onClick={() => { setDay(d); setOpen(false); }}>{d}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ICONS: Record<string, ReactNode> = {
  info: <><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7.25v4M8 4.9v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
  success: <><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5.25 8.25l1.9 1.9 3.6-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>,
  warning: <><path d="M8 2.2l6.2 11H1.8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 6.5v3M8 11.4v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
  danger: <><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5.9 5.9l4.2 4.2M10.1 5.9l-4.2 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
};

export function Alert({ tone, title, children }: { tone: "info" | "success" | "warning" | "danger"; title: string; children: ReactNode }) {
  return (
    <div className={`o-alert o-alert-${tone}`} role={tone === "danger" ? "alert" : "status"}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>{ICONS[tone]}</svg>
      <p className="o-alert-t">{title}</p>
      <p className="o-alert-d">{children}</p>
    </div>
  );
}
