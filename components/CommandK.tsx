"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

// The Stripe page's opening object: a command palette, the kind internal
// tools live in, searching Allen's work. Type to filter, arrows to move,
// Enter to open. Follows the site's theme.
const ITEMS = [
  { title: "Automation for Nonprofits", tag: "Workflow automation", meta: "+13% ARR", href: "/work/automation-nonprofits", words: "workflow automation builder no-code 0 to 1" },
  { title: "Aplos × Keela", tag: "Data sync", meta: "1st joint launch", href: "/work/aplos-keela-integration", words: "integration mapping data sync audit" },
  { title: "Toronto Yuwol", tag: "Internal tools", meta: "used daily, 10 months", href: "/work/torontoyuwol", words: "internal tools scheduling attendance ops" },
  { title: "Orchid design system", tag: "Design system", meta: "340+ components", href: "/work/orchid-design-system", words: "design system components library" },
  { title: "Transaction Workflows", tag: "Dense workflows", meta: "-70% tickets", href: "/work/transaction-workflows", words: "accounting transactions finance complex" },
  { title: "Fee Opt-In", tag: "Experiment", meta: "75 to 92%", href: "/work/fee-opt-in-experimentation", words: "a/b test experiment prototype code checkout" },
  { title: "ARND", tag: "Built with AI", meta: "161 pull requests", href: "/work/arnd", words: "react native code ai developer" },
];

export default function CommandK() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? ITEMS.filter((x) => `${x.title} ${x.tag} ${x.words}`.toLowerCase().includes(t)) : ITEMS;
  }, [q]);
  const at = Math.min(i, Math.max(shown.length - 1, 0));

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((at + 1) % Math.max(shown.length, 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setI((at - 1 + shown.length) % Math.max(shown.length, 1)); }
    if (e.key === "Enter" && shown[at]) router.push(shown[at].href);
  }

  return (
    <div className="ck">
      <div className="ck-bar">
        <svg viewBox="0 0 16 16" aria-hidden><circle cx="7" cy="7" r="4.6" /><path d="m10.4 10.4 3.4 3.4" /></svg>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setI(0); }}
          onKeyDown={onKey}
          placeholder="Search Allen's work"
          aria-label="Search Allen's work"
          role="combobox"
          aria-expanded="true"
          aria-controls="ck-list"
          aria-activedescendant={shown[at] ? `ck-${at}` : undefined}
        />
        <kbd>&#8984;K</kbd>
      </div>
      <ul className="ck-list" id="ck-list" role="listbox" aria-label="Results">
        {shown.length ? (
          shown.map((x, n) => (
            <li
              key={x.title}
              id={`ck-${n}`}
              role="option"
              aria-selected={n === at}
              className={n === at ? "on" : undefined}
              onMouseEnter={() => setI(n)}
              onClick={() => router.push(x.href)}
            >
              <span className="ck-t">{x.title}</span>
              <span className="ck-tag">{x.tag}</span>
              <span className="ck-m">{x.meta}</span>
            </li>
          ))
        ) : (
          <li className="ck-none">Nothing yet. Try &ldquo;internal&rdquo; or &ldquo;data&rdquo;.</li>
        )}
      </ul>
      <p className="ck-foot">
        <span><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move</span>
        <span><kbd>Enter</kbd> to open</span>
      </p>
    </div>
  );
}
