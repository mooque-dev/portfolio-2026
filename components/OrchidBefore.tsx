"use client";

import { useState } from "react";
import Link from "next/link";

// The nine dropdowns Orchid replaced, recreated from the labels on Allen's
// audit board (A to I). They are drawn to look inconsistent on purpose, and
// they are recreations, not screenshots. Each says what it became.

const NINE: { k: string; label: string; became: string; mock: React.ReactNode }[] = [
  { k: "A", label: "Matches the design, with icons", became: "Select: with icons",
    mock: <span className="b-a"><i className="b-ico" />General fund<i className="b-tri" /></span> },
  { k: "B", label: "Matches the design, but not really a dropdown", became: "Removed: it was buttons pretending",
    mock: <span className="b-b"><span className="on">Monthly</span><span>Yearly</span><span>Once</span></span> },
  { k: "C", label: "Matches the design, with icons and labels", became: "Select: with icons",
    mock: <span className="b-c"><small>Payment</small><span><i className="b-ico" />Card</span><i className="b-chev" /></span> },
  { k: "D", label: "Native: the browser's own default", became: "Select: single",
    mock: <span className="b-d">Ontario<i>⇕</i></span> },
  { k: "E", label: "Third-party autocomplete, a different library", became: "Select: searchable",
    mock: <span className="b-e">Type to search…</span> },
  { k: "F", label: "Address lookup, third-party, can't be restyled", became: "Select: searchable, address list",
    mock: <span className="b-f"><span>123 Queen St</span><small>123 Queen St W, Toronto</small><small>123 Queen St E, Toronto</small></span> },
  { k: "G", label: "Keela's own single and multi select, no icons", became: "Select: single and multiple",
    mock: <span className="b-g"><span>Monthly ×</span><span>Major ×</span><i>▾</i></span> },
  { k: "H", label: "Country picker, third-party, can't be restyled", became: "Select: searchable, country list",
    mock: <span className="b-h">Canada<i>▼</i></span> },
  { k: "I", label: "Date picker, a date and time field", became: "Date picker, its own component",
    mock: <span className="b-i">MM/DD/YYYY hh:mm<i className="b-cal" /></span> },
];

export function DropdownBefore() {
  return (
    <div className="b-wrap">
      <ol className="b-grid">
        {NINE.map((n) => (
          <li key={n.k} className="b-card">
            <p className="b-k"><b>{n.k}</b> {n.label}</p>
            <div className="b-mock" aria-hidden>{n.mock}</div>
            <p className="b-became"><span aria-hidden>→</span> {n.became}</p>
          </li>
        ))}
      </ol>
      <p className="b-note">Recreated from the labels on my audit board, not screenshots. The board itself is in the <Link href="/work/orchid-design-system">Orchid story</Link>.</p>
    </div>
  );
}

export function Replaced({ count, what }: { count: number; what: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="b-rep">
      <div className="b-rep-h">
        <p><b>Replaced {count}</b> {what}</p>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Hide them" : `See the ${count}`}</button>
      </div>
      {open && <DropdownBefore />}
    </div>
  );
}
