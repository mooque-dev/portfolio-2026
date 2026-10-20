"use client";

import { useState, type CSSProperties } from "react";

// The opening object on the OpenLoop and APPLY pages: one component in
// three made-up brands, with the tokens behind it. Switching the brand changes only the
// primitive tier; the component and semantic names stay put, which is the
// whole point of tiers. The preview stays light in both themes, like a
// canvas. Sized in container units, so it scales with its column.
type Token = { name: string; value: string };
type Brand = { name: string; primary: Token; tint: Token; radius: Token };

const PRESETS = {
  visit: {
    label: "visit-card",
    tiers: ["Component", "Semantic", "Primitive"],
    names: ["action.primary", "shape.surface", "surface.tint"],
    brands: [
      { name: "Fern", primary: { name: "green.700", value: "#1E6B52" }, tint: { name: "green.50", value: "#E9F4EF" }, radius: { name: "radius.lg", value: "16px" } },
      { name: "Harbor", primary: { name: "blue.600", value: "#2456C9" }, tint: { name: "blue.50", value: "#EAF0FC" }, radius: { name: "radius.sm", value: "6px" } },
      { name: "Plum", primary: { name: "plum.600", value: "#7A3E8E" }, tint: { name: "plum.50", value: "#F4ECF7" }, radius: { name: "radius.xl", value: "24px" } },
    ] as Brand[],
  },
  product: {
    label: "product-card",
    tiers: ["Component", "Alias", "Global"],
    names: ["color.action", "shape.surface", "color.highlight"],
    brands: [
      { name: "Summit", primary: { name: "red.600", value: "#C23A2B" }, tint: { name: "sand.100", value: "#F3EADF" }, radius: { name: "radius.none", value: "2px" } },
      { name: "Field", primary: { name: "olive.700", value: "#4F5B2A" }, tint: { name: "olive.50", value: "#EEF0E2" }, radius: { name: "radius.md", value: "10px" } },
      { name: "Pace", primary: { name: "ink.900", value: "#16181D" }, tint: { name: "lime.200", value: "#E4F7A8" }, radius: { name: "radius.xl", value: "22px" } },
    ] as Brand[],
  },
};

export default function TokenCard({ preset = "visit" }: { preset?: keyof typeof PRESETS }) {
  const P = PRESETS[preset];
  const [sel, setSel] = useState(0);
  const b = P.brands[sel];
  const rows: [string, string, Token, boolean][] = [
    ["button.background", P.names[0], b.primary, true],
    ["card.radius", P.names[1], b.radius, false],
    ["badge.background", P.names[2], b.tint, true],
  ];
  const vars = { "--tc-primary": b.primary.value, "--tc-tint": b.tint.value, "--tc-radius": b.radius.value } as CSSProperties;

  return (
    <div className="tc-wrap">
      <div className="tc">
        <div className="tc-head">
          <span className="tc-label">{P.label}</span>
          <div className="tc-brands" role="group" aria-label="Brand">
            {P.brands.map((x, i) => (
              <button key={x.name} type="button" aria-pressed={i === sel} onClick={() => setSel(i)}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div className="tc-canvas" style={vars}>
          {preset === "product" ? (
          <div
            className="tc-visit"
            role="img"
            aria-label={`A product card in the ${b.name} brand: a trail shell jacket at $240, with an Add to bag button.`}
          >
            <div className="tc-visit-top">
              <span className="tc-icon tc-thumb" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path d="M8.5 4 12 6l3.5-2L20 7.5l-2 3.5-1.5-.8V20h-9v-9.8L6 11 4 7.5z" />
                </svg>
              </span>
              <span className="tc-what">
                <b>Trail shell jacket</b>
                <span>$240 &middot; 4 colours</span>
              </span>
              <span className="tc-badge">New</span>
            </div>
            <div className="tc-actions">
              <span className="tc-btn">Add to bag</span>
              <span className="tc-btn2">Save</span>
            </div>
          </div>
          ) : (
          <div
            className="tc-visit"
            role="img"
            aria-label={`A video visit card in the ${b.name} brand: today at 3:30 PM, with a Join visit button.`}
          >
            <div className="tc-visit-top">
              <span className="tc-icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" />
                  <path d="M15.5 10.5 21 7.5v9l-5.5-3z" />
                </svg>
              </span>
              <span className="tc-what">
                <b>Video visit</b>
                <span>Today, 3:30 PM &middot; 20 min</span>
              </span>
              <span className="tc-badge">In 10 min</span>
            </div>
            <div className="tc-actions">
              <span className="tc-btn">Join visit</span>
              <span className="tc-btn2">Reschedule</span>
            </div>
          </div>
          )}
        </div>
        <table className="tc-table">
          <thead>
            <tr>
              {P.tiers.map((t) => (
                <th key={t} scope="col">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody key={b.name}>
            {rows.map(([c, s, p, swatch]) => (
              <tr key={c}>
                <td>{c}</td>
                <td>{s}</td>
                <td>
                  {swatch ? <i className="tc-swatch" style={{ background: p.value }} aria-hidden /> : null}
                  {p.name}
                  <span className="tc-val">{p.value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
