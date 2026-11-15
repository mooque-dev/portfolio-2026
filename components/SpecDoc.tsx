"use client";

import { useState } from "react";
import Link from "next/link";

// The Ashby page's opening object: a one-page spec, the kind written to get
// everyone behind a decision before anything is built. The subject is one
// recruiting task, booking a final round, sketched from the outside. Each
// section redraws the small schedule below it, and the decision links to
// the case where Allen used the same rule. No company marks; nothing here
// claims how any real product works. Container units, so it scales.
type Step = "problem" | "decision" | "change";

const STEPS: { key: Step; label: string; text: string; proof?: { href: string; name: string } }[] = [
  {
    key: "problem",
    label: "Problem",
    text: "A final round is four interviews on one day. The recruiter opens every calendar, keeps the candidate’s times in their head, and starts over when one person declines.",
  },
  {
    key: "decision",
    label: "Decision",
    text: "Start from the candidate’s open days and lay the panel out as rows, so the first day every seat can be filled is the first thing you see. Suggest the swap, let the recruiter overrule it.",
    proof: { href: "/work/transaction-workflows", name: "Same rule in Transaction Workflows" },
  },
  {
    key: "change",
    label: "What changes",
    text: "The recruiter picks a day instead of building one. If someone drops out, only their seat reopens, and every change is shown before an invite goes out.",
    proof: { href: "/work/aplos-keela-integration", name: "Same idea in Aplos × Keela" },
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const CANDIDATE = [0, 1, 1, 1, 0];
const PICK = 3;
// 1 free, 0 busy. The cross-team seat is busy on the pick day until a
// trained stand-in takes it.
const SEATS = [
  { name: "Hiring manager", free: [1, 0, 0, 1, 0] },
  { name: "Peer", free: [1, 1, 0, 1, 1] },
  { name: "Cross-team", swap: "Stand-in", free: [0, 1, 1, 0, 1] },
  { name: "Values", free: [1, 0, 1, 1, 1] },
];

const SUMMARY: Record<Step, string> = {
  problem: "Schedule grid: the candidate is open Tuesday to Thursday, and no day has all four interviewers free.",
  decision: "Schedule grid: Thursday is the first day every seat can be filled, with a stand-in for the cross-team seat.",
  change: "Schedule grid: Thursday is booked for all four seats, with the stand-in marked.",
};

export default function SpecDoc() {
  const [step, setStep] = useState<Step>("problem");
  const s = STEPS.find((x) => x.key === step)!;

  return (
    <div className="sd-wrap">
      <div className="sd">
        <div className="sd-head">
          <p className="sd-title">Booking a final round</p>
          <p className="sd-meta">Spec &middot; Allen Kang &middot; Draft</p>
        </div>

        <div className="sd-tabs" role="group" aria-label="Spec sections">
          {STEPS.map((x) => (
            <button key={x.key} type="button" aria-pressed={x.key === step} onClick={() => setStep(x.key)}>
              {x.label}
            </button>
          ))}
        </div>

        <div className="sd-body" aria-live="polite">
          <p className="sd-text">{s.text}</p>
          {s.proof ? (
            <Link href={s.proof.href} className="sd-proof">
              {s.proof.name} <span aria-hidden>&rarr;</span>
            </Link>
          ) : null}
        </div>

        <div className={`sd-grid is-${step}`} role="img" aria-label={SUMMARY[step]}>
          <span />
          {DAYS.map((d, i) => (
            <span key={d} className={`sd-day${CANDIDATE[i] ? "" : " is-off"}${i === PICK && step !== "problem" ? " is-pick" : ""}`}>
              {d}
            </span>
          ))}
          {SEATS.map((seat) => {
            const swapped = !!seat.swap && step !== "problem";
            return (
              <div key={seat.name} className="sd-row">
                <span className="sd-seat">{swapped ? seat.swap : seat.name}</span>
                {seat.free.map((f, i) => {
                  const pick = i === PICK && step !== "problem";
                  const free = f || (pick && swapped);
                  const cls = [
                    "sd-cell",
                    CANDIDATE[i] ? "" : "is-off",
                    free ? "is-free" : "is-busy",
                    pick ? "is-pick" : "",
                    pick && swapped ? "is-swap" : "",
                    pick && step === "change" ? "is-booked" : "",
                  ].join(" ");
                  return <span key={i} className={cls} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
