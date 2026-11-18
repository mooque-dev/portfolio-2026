"use client";

import { useState } from "react";
import Link from "next/link";

// The Plooto page's opening object: one bill on its way out, stepped
// through the three moments that decide whether a business trusts a
// payment: the approval, the catch, and the confirmation. The vendor and
// amounts are made up, and nothing here claims how any real product works.
// Each step links to the case where Allen used the same rule. Container
// units, so it scales.
type Step = "approve" | "catch" | "confirm";

const STEPS: { key: Step; label: string; text: string; proof?: { href: string; name: string } }[] = [
  {
    key: "approve",
    label: "Approve",
    text: "The bookkeeper has approved. The owner is next, and sees what the bill is for, who signed off, and when the money leaves, without opening the invoice.",
  },
  {
    key: "catch",
    label: "Catch",
    text: "The vendor’s bank details changed since the last payment. The payment pauses and says why, before any money moves, not after.",
    proof: { href: "/work/automation-nonprofits", name: "Same rule in Automation" },
  },
  {
    key: "confirm",
    label: "Confirm",
    text: "Paid, synced to the books, and the vendor has a receipt. Each line says where the record went, so no one has to check twice.",
    proof: { href: "/work/aplos-keela-integration", name: "Same idea in Aplos × Keela" },
  },
];

type Row = { who: string; state: "done" | "wait" | "hold" | "todo"; note: string };
const CHAIN: Record<Step, Row[]> = {
  approve: [
    { who: "Bookkeeper", state: "done", note: "Approved Nov 19" },
    { who: "Owner", state: "wait", note: "Waiting" },
    { who: "Payment", state: "todo", note: "Scheduled Nov 26" },
  ],
  catch: [
    { who: "Bookkeeper", state: "done", note: "Approved Nov 19" },
    { who: "Owner", state: "done", note: "Approved Nov 20" },
    { who: "Payment", state: "hold", note: "On hold: confirm bank details" },
  ],
  confirm: [
    { who: "Payment", state: "done", note: "Paid Nov 26" },
    { who: "Books", state: "done", note: "Synced to accounting" },
    { who: "Vendor", state: "done", note: "Receipt sent" },
  ],
};

const MARK: Record<Row["state"], string> = { done: "✓", wait: "", hold: "!", todo: "" };

export default function BillRun() {
  const [step, setStep] = useState<Step>("approve");
  const s = STEPS.find((x) => x.key === step)!;

  return (
    <div className="br-wrap">
      <div className="br">
        <div className="br-head">
          <div>
            <p className="br-vendor">Northline Supply Co.</p>
            <p className="br-meta">Bill 1047 &middot; Due Nov 28</p>
          </div>
          <p className="br-amt">$4,820.00</p>
        </div>

        <div className="br-tabs" role="group" aria-label="Moments in the payment">
          {STEPS.map((x) => (
            <button key={x.key} type="button" aria-pressed={x.key === step} onClick={() => setStep(x.key)}>
              {x.label}
            </button>
          ))}
        </div>

        <ol className={`br-chain is-${step}`} aria-live="polite">
          {CHAIN[step].map((r) => (
            <li key={r.who} className={`br-row is-${r.state}`}>
              <span className="br-dot" aria-hidden>{MARK[r.state]}</span>
              <span className="br-who">{r.who}</span>
              <span className="br-note">{r.note}</span>
            </li>
          ))}
        </ol>

        <div className="br-body">
          <p className="br-text">{s.text}</p>
          {s.proof ? (
            <Link href={s.proof.href} className="br-proof">
              {s.proof.name} <span aria-hidden>&rarr;</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
