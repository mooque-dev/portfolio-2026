"use client";

import { useEffect, useState } from "react";
import { Statement, type StatementLine } from "@/components/PaymentCard";

// Float is hiring for two teams, so the work is ordered for whichever one is
// reading: Banking (moving and managing customer funds) or Growth (switching
// to Float and using all of it). #banking or #growth in the link opens that
// tab. Every number is on the résumé.
const ROLES: { key: "banking" | "growth"; label: string; lede: string; lines: StatementLine[] }[] = [
  {
    key: "banking",
    label: "Banking",
    lede: "Five years on the screens where money is recorded, split and synced, where one wrong field means someone's books are wrong.",
    lines: [
      {
        tag: "Money movement",
        title: "Transaction Workflows",
        line: "One payment that's a donation, a gift and a ticket at once, recorded right under Canadian, US and Australian rules.",
        value: "-70% tickets",
        href: "/work/transaction-workflows",
      },
      {
        tag: "Trust",
        title: "Aplos × Keela",
        line: "A sync between two finance products that shows every mapping, because finance teams had been burned by silent ones.",
        value: "1st joint launch",
        href: "/work/aplos-keela-integration",
      },
      {
        tag: "Fees",
        title: "Fee Opt-In",
        line: "The moment a customer changes their mind about a fee. Has a checkout you can play with.",
        value: "75→92%",
        href: "/work/fee-opt-in-experimentation",
      },
    ],
  },
  {
    key: "growth",
    label: "Growth",
    lede: "I've taken a product from nothing to a paid add-on, and I test what moves people instead of guessing.",
    lines: [
      {
        tag: "0 to 1",
        title: "Automation for Nonprofits",
        line: "A product area that didn't exist, to a paid add-on in five months, used by 30% of 355 organizations.",
        value: "+13% ARR",
        href: "/work/automation-nonprofits",
      },
      {
        tag: "Experiment",
        title: "Fee Opt-In",
        line: "I paused a win to fix a leak, then A/B tested three fixes. Conversion held. Has a checkout you can play with.",
        value: "75→92%",
        href: "/work/fee-opt-in-experimentation",
      },
      {
        tag: "Cross-product",
        title: "Aplos × Keela",
        line: "The first thing two merged companies shipped together: a sync that let one customer run both products.",
        value: "1st joint launch",
        href: "/work/aplos-keela-integration",
      },
    ],
  },
];

export default function FloatRoles() {
  const [role, setRole] = useState<(typeof ROLES)[number]["key"]>("banking");
  useEffect(() => {
    const h = location.hash.slice(1);
    // The hash only exists in the browser, so this lands after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (h === "banking" || h === "growth") setRole(h);
  }, []);
  const current = ROLES.find((r) => r.key === role)!;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Which team">
        <span className="text-[14px] text-muted">Reading for</span>
        <div className="inline-flex rounded-full border border-border p-0.5">
          {ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={role === r.key}
              onClick={() => {
                setRole(r.key);
                history.replaceState(null, "", `#${r.key}`);
              }}
              className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
                role === r.key ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted" aria-live="polite">
        {current.lede}
      </p>
      <div className="mt-6">
        <Statement lines={current.lines} />
      </div>
    </div>
  );
}
