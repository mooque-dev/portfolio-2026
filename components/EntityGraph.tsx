"use client";

import { useState } from "react";
import Link from "next/link";

// The Grafana page's opening object: a small entity graph in the style of an
// observability tool. Allen sits in the middle, and each node around him is a
// piece of work with its type, its health and the number that proves it.
// Pick a node and its edge lights up and the details panel shows the case.
// The edges mean "shown by", not that the projects depend on each other.
// Our own panel: no Grafana marks. Sized in container units.
type Entity = { id: string; name: string; kind: string; metric: string; detail: string; href: string; x: number; y: number };

const ENTITIES: Entity[] = [
  { id: "ak", name: "Aplos × Keela", kind: "Integration", metric: "Mapping made visible", detail: "Two products merging: I showed how every field mapped before the first joint launch.", href: "/work/aplos-keela-integration", x: 22, y: 16 },
  { id: "tw", name: "Transaction Workflows", kind: "Service", metric: "−70% tickets", detail: "One payment split into a donation, a gift and a ticket, with three countries' tax rules behind it.", href: "/work/transaction-workflows", x: 77, y: 16 },
  { id: "mj", name: "Care dashboards", kind: "Dashboard", metric: "4 screens rebuilt", detail: "Dashboards clinicians used to follow cancer patients through treatment, rebuilt as working redesigns.", href: "/case/care-pathway/index.html", x: 17, y: 56 },
  { id: "or", name: "Orchid", kind: "Library", metric: "340+ components", detail: "One design system that three engineering teams chose to build with.", href: "/work/orchid-design-system", x: 85, y: 56 },
  { id: "fe", name: "Fee Opt-In", kind: "Experiment", metric: "75% → 92%", detail: "Paused a launch that looked like a win, tested three fixes, and opt-in rose.", href: "/work/fee-opt-in-experimentation", x: 28, y: 88 },
  { id: "ar", name: "ARND", kind: "App", metric: "160+ pull requests", detail: "A live-music app for iOS, Android and web, built with AI coding tools.", href: "/work/arnd", x: 72, y: 88 },
];
const CENTER = { x: 50, y: 52 };

export default function EntityGraph() {
  const [sel, setSel] = useState(0);
  const e = ENTITIES[sel];

  return (
    <div className="eg-wrap">
      <div className="eg">
        <div className="eg-bar">
          <span className="eg-title">Entity graph</span>
          <span className="eg-ok"><i aria-hidden />6 healthy</span>
        </div>
        <div className="eg-map">
          <svg className="eg-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {ENTITIES.map((n, i) => (
              <line key={n.id} x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} className={i === sel ? "on" : ""} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="eg-me" style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}>
            <b>Allen Kang</b>
            <span>Product designer</span>
          </div>
          {ENTITIES.map((n, i) => (
            <button
              key={n.id}
              type="button"
              className={`eg-node${i === sel ? " on" : ""}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
            >
              <i aria-hidden />
              <span>{n.name}</span>
            </button>
          ))}
        </div>
        <div className="eg-panel" aria-live="polite">
          <div className="eg-row">
            <span className="eg-kind">{e.kind}</span>
            <span className="eg-metric">{e.metric}</span>
          </div>
          <p className="eg-name">{e.name}</p>
          <p className="eg-detail">{e.detail}</p>
          <Link href={e.href} className="eg-link">Open the case →</Link>
        </div>
      </div>
    </div>
  );
}
