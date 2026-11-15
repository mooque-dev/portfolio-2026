"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import "./orchid-library.css";

// A recreation of the Orchid library, in progress. One set of components,
// four skins: Keela, Raisely, Aplos, and a neutral white-label one. The
// component list starts from the standard shadcn set. Colours, corners and
// type for the three products are read from each company's public website,
// not from the products themselves, so they are a starting point for Allen
// to correct. "Where it's used" is left for him to fill in. No logos.
type Theme = { key: string; name: string; note: string; vars: Record<string, string> };

const THEMES: Theme[] = [
  {
    key: "keela", name: "Keela", note: "Fundraising CRM. Purple, with a yellow accent and soft corners.",
    vars: { "--o-primary": "#7745D6", "--o-on": "#ffffff", "--o-accent": "#FFD13A", "--o-ink": "#211F54", "--o-mut": "#6E7191", "--o-line": "#DDDEEA", "--o-soft": "#F8F8FC", "--o-bg": "#ffffff", "--o-r": "9px", "--o-rb": "9px", "--o-font": "Inter, system-ui, sans-serif", "--o-pad": "11px 16px" },
  },
  {
    key: "raisely", name: "Raisely", note: "Fundraising pages. Violet on navy ink, fully rounded buttons.",
    vars: { "--o-primary": "#6138D8", "--o-on": "#ffffff", "--o-accent": "#262861", "--o-ink": "#262861", "--o-mut": "#62648F", "--o-line": "#DCDCF0", "--o-soft": "#F3F3FD", "--o-bg": "#FBFBFF", "--o-r": "12px", "--o-rb": "999px", "--o-font": "system-ui, sans-serif", "--o-pad": "12px 20px" },
  },
  {
    key: "aplos", name: "Aplos", note: "Fund accounting. Navy and teal, an orange call to action, tighter spacing.",
    vars: { "--o-primary": "#16587D", "--o-on": "#ffffff", "--o-accent": "#CE5D01", "--o-ink": "#0B233B", "--o-mut": "#52647A", "--o-line": "#D5DCE3", "--o-soft": "#F2F5F8", "--o-bg": "#ffffff", "--o-r": "6px", "--o-rb": "6px", "--o-font": "'Open Sans', Inter, system-ui, sans-serif", "--o-pad": "8px 14px" },
  },
  {
    key: "neutral", name: "White label", note: "No brand at all. The version that shows the system underneath.",
    vars: { "--o-primary": "#111111", "--o-on": "#ffffff", "--o-accent": "#111111", "--o-ink": "#111111", "--o-mut": "#666666", "--o-line": "#DDDDDD", "--o-soft": "#F5F5F5", "--o-bg": "#ffffff", "--o-r": "8px", "--o-rb": "8px", "--o-font": "inherit", "--o-pad": "10px 16px" },
  },
];

const TODO = "To fill in";

function Spec({ name, use, where = TODO, children }: { name: string; use: string; where?: string; children: ReactNode }) {
  return (
    <section className="ol-spec">
      <div className="ol-demo">{children}</div>
      <div className="ol-meta">
        <h3>{name}</h3>
        <dl>
          <div><dt>When to use</dt><dd>{use}</dd></div>
          <div><dt>Where it&rsquo;s used</dt><dd className={where === TODO ? "ol-todo" : ""}>{where}</dd></div>
        </dl>
      </div>
    </section>
  );
}

export default function OrchidLibrary() {
  const [t, setT] = useState(0);
  const [tab, setTab] = useState(0);
  const [on, setOn] = useState(true);
  const [pick, setPick] = useState("monthly");
  const theme = THEMES[t];
  const swatches = ["--o-primary", "--o-accent", "--o-ink", "--o-mut", "--o-line", "--o-soft"];

  return (
    <div className="ol">
      <div className="ol-bar">
        <div className="ol-themes" role="tablist" aria-label="Product skin">
          {THEMES.map((th, i) => (
            <button key={th.key} type="button" role="tab" aria-selected={i === t} className={i === t ? "on" : ""} onClick={() => setT(i)}>{th.name}</button>
          ))}
        </div>
        <p className="ol-note" aria-live="polite">{theme.note}</p>
      </div>

      <div className="ol-skin" style={theme.vars as CSSProperties}>
        <div className="ol-tokens">
          {swatches.map((v) => (
            <span key={v}><i style={{ background: `var(${v})` }} />{theme.vars[v]}</span>
          ))}
          <span><i className="ol-corner" />corner {theme.vars["--o-r"]}</span>
        </div>

        <Spec name="Button" use="One primary action per view. Secondary for the alternative, quiet for everything else.">
          <div className="ol-row">
            <button type="button" className="o-btn">Save donation</button>
            <button type="button" className="o-btn o-btn-2">Cancel</button>
            <button type="button" className="o-btn o-btn-3">Learn more</button>
          </div>
        </Spec>

        <Spec name="Input" use="A single line of text. The label always sits above, and help text sits below.">
          <label className="o-field"><span>Donor email</span><input type="email" placeholder="name@example.org" /><em>We send the receipt here.</em></label>
        </Spec>

        <Spec name="Dropdown" use="Choosing one from a list of more than five. For five or fewer, use radio buttons.">
          <label className="o-field"><span>Fund</span>
            <span className="o-select"><select defaultValue="general"><option value="general">General fund</option><option value="building">Building fund</option><option value="youth">Youth programs</option></select></span>
          </label>
        </Spec>

        <Spec name="Checkbox and radio" use="Checkbox for any number of choices, radio for exactly one.">
          <div className="ol-col">
            <label className="o-check"><input type="checkbox" defaultChecked /> Cover the processing fee</label>
            <div className="ol-row">
              {["one-time", "monthly"].map((v) => (
                <label key={v} className="o-check"><input type="radio" name="ol-freq" checked={pick === v} onChange={() => setPick(v)} /> {v === "monthly" ? "Monthly" : "One-time"}</label>
              ))}
            </div>
          </div>
        </Spec>

        <Spec name="Switch" use="A setting that takes effect right away, with no save button.">
          <label className="o-switch"><input type="checkbox" role="switch" checked={on} onChange={() => setOn(!on)} /><i aria-hidden /> Send receipts automatically</label>
        </Spec>

        <Spec name="Badge" use="A short status that needs no action. Never the only way to read a state.">
          <div className="ol-row"><span className="o-badge">Recurring</span><span className="o-badge o-badge-2">Pending</span><span className="o-badge o-badge-3">Draft</span></div>
        </Spec>

        <Spec name="Tabs" use="Switching between views of the same thing. Not for steps in a flow.">
          <div className="o-tabs" role="tablist">
            {["Overview", "Gifts", "Notes"].map((x, i) => (
              <button key={x} type="button" role="tab" aria-selected={i === tab} className={i === tab ? "on" : ""} onClick={() => setTab(i)}>{x}</button>
            ))}
          </div>
        </Spec>

        <Spec name="Alert" use="Something the person needs to know before they continue. One per view.">
          <div className="o-alert" role="note"><b>Receipts are paused.</b> Turn them back on in settings to send this one.</div>
        </Spec>

        <Spec name="Card" use="One object with a title, a few facts and at most one action.">
          <div className="o-card"><p className="o-card-k">Spring appeal</p><p className="o-card-v">$12,480</p><div className="o-prog" role="img" aria-label="62 percent of goal"><i style={{ width: "62%" }} /></div><p className="o-card-s">62% of a $20,000 goal</p></div>
        </Spec>

        <Spec name="Table" use="Comparing many records by the same fields. Numbers align right.">
          <div className="o-tablewrap">
            <table className="o-table">
              <thead><tr><th>Donor</th><th>Fund</th><th className="num">Amount</th></tr></thead>
              <tbody>
                <tr><td>J. Park</td><td>General</td><td className="num">$250.00</td></tr>
                <tr><td>M. Osei</td><td>Building</td><td className="num">$1,000.00</td></tr>
                <tr><td>R. Silva</td><td>Youth</td><td className="num">$75.00</td></tr>
              </tbody>
            </table>
          </div>
        </Spec>
      </div>
    </div>
  );
}
