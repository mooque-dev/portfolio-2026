"use client";

import { useState, type CSSProperties } from "react";

// The OpenLoop page's opening object: one component in three made-up
// brands, with the tokens behind it. Switching the brand changes only the
// primitive tier; the component and semantic names stay put, which is the
// whole point of tiers. The preview stays light in both themes, like a
// canvas. Sized in container units, so it scales with its column.
type Token = { name: string; value: string };
type Brand = { name: string; primary: Token; tint: Token; radius: Token };

const BRANDS: Brand[] = [
  { name: "Fern", primary: { name: "green.700", value: "#1E6B52" }, tint: { name: "green.50", value: "#E9F4EF" }, radius: { name: "radius.lg", value: "16px" } },
  { name: "Harbor", primary: { name: "blue.600", value: "#2456C9" }, tint: { name: "blue.50", value: "#EAF0FC" }, radius: { name: "radius.sm", value: "6px" } },
  { name: "Plum", primary: { name: "plum.600", value: "#7A3E8E" }, tint: { name: "plum.50", value: "#F4ECF7" }, radius: { name: "radius.xl", value: "24px" } },
];

export default function TokenCard() {
  const [sel, setSel] = useState(0);
  const b = BRANDS[sel];
  const rows: [string, string, Token, boolean][] = [
    ["button.background", "action.primary", b.primary, true],
    ["card.radius", "shape.surface", b.radius, false],
    ["badge.background", "surface.tint", b.tint, true],
  ];
  const vars = { "--tc-primary": b.primary.value, "--tc-tint": b.tint.value, "--tc-radius": b.radius.value } as CSSProperties;

  return (
    <div className="tc-wrap">
      <div className="tc">
        <div className="tc-head">
          <span className="tc-label">visit-card</span>
          <div className="tc-brands" role="group" aria-label="Brand">
            {BRANDS.map((x, i) => (
              <button key={x.name} type="button" aria-pressed={i === sel} onClick={() => setSel(i)}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div className="tc-canvas" style={vars}>
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
        </div>
        <table className="tc-table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Semantic</th>
              <th scope="col">Primitive</th>
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
