"use client";

import { useState } from "react";

// A working slice of the Transaction Workflows redesign: one $200 gala
// payment, split by purpose, with the tax receipt following along. Same
// example as the case's problem statement. Illustrative data.
const TOTAL = 200;
const TYPES = [
  { key: "value", label: "Value received", color: "#0d366b", ink: "#ffffff", receipt: false },
  { key: "donation", label: "Donation", color: "#256abf", ink: "#ffffff", receipt: true },
  { key: "inkind", label: "In-kind gift", color: "#86b6ef", ink: "#0b0b0b", receipt: true },
] as const;
type TypeKey = (typeof TYPES)[number]["key"];
const FUNDS = ["Annual Gala", "General Donations", "Capital Campaign"];

interface Line {
  id: number;
  amount: number;
  type: TypeKey;
  fund: string;
  edited: boolean;
}

const SUGGESTED: Line[] = [
  { id: 1, amount: 100, type: "value", fund: "Annual Gala", edited: false },
  { id: 2, amount: 50, type: "donation", fund: "General Donations", edited: false },
  { id: 3, amount: 50, type: "donation", fund: "Capital Campaign", edited: false },
];

const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 2 });
const typeOf = (k: TypeKey) => TYPES.find((t) => t.key === k)!;

export default function SplitPaymentDemo() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const [lines, setLines] = useState<Line[]>(SUGGESTED);
  const [nextId, setNextId] = useState(4);

  const shown: Line[] =
    mode === "before" ? [{ id: 0, amount: TOTAL, type: "donation", fund: "General Donations", edited: false }] : lines;
  const allocated = shown.reduce((n, l) => n + (Number.isFinite(l.amount) ? l.amount : 0), 0);
  const left = Math.round((TOTAL - allocated) * 100) / 100;
  const receiptable = shown.filter((l) => typeOf(l.type).receipt).reduce((n, l) => n + l.amount, 0);
  const valueReceived = shown.filter((l) => l.type === "value").reduce((n, l) => n + l.amount, 0);
  const trueValue = lines.filter((l) => l.type === "value").reduce((n, l) => n + l.amount, 0);

  const update = (id: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch, edited: true } : l)));

  const status =
    mode === "before"
      ? `Logged as one $200 donation. The receipt overstates the gift by ${money(SUGGESTED[0].amount)}, the price of the gala ticket.`
      : left === 0
        ? "Balanced. Every dollar has a purpose, so the receipt is right."
        : left > 0
          ? `${money(left)} left to allocate before this can be saved.`
          : `${money(-left)} more than the payment. Lower a line before saving.`;

  return (
    <div>
      {/* A presentation control for the reader, not part of the product, so it
          sits outside the product card. */}
      <div className="mb-3 flex flex-wrap items-center gap-3" role="group" aria-label="Compare the product before and after the redesign">
        <span className="text-[13px] text-muted">Compare</span>
        <div className="inline-flex rounded-full border border-border p-0.5">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3.5 py-1 text-[13px] font-medium transition-colors ${
                mode === m ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "before" ? "Before the redesign" : "After the redesign"}
            </button>
          ))}
        </div>
      </div>

    <div className="rounded-lg border border-border bg-[#fcfcfb] text-[#0b0b0b] p-5 md:p-7 shadow-sm">
      <div>
        <p className="text-[15px] font-semibold leading-tight">New transaction: one {money(TOTAL)} gala payment</p>
        <p className="text-[12.5px] text-[#52514e] mt-0.5">Illustrative data, from the case&apos;s own example</p>
      </div>

      {/* The payment as a bar: each line's share of the $200, plus anything unallocated */}
      <div className="mt-5 flex h-7 overflow-hidden rounded-[4px] bg-[repeating-linear-gradient(135deg,#ecebe6_0_6px,#f6f5f1_6px_12px)]" role="img" aria-label={`${money(allocated)} of ${money(TOTAL)} allocated`}>
        {shown.map((l) => {
          const t = typeOf(l.type);
          const w = Math.max(0, Math.min(l.amount, TOTAL)) / TOTAL;
          return w > 0 ? (
            <span
              key={l.id}
              title={`${money(l.amount)}, ${t.label}, ${l.fund}`}
              className="flex items-center justify-center border-r-2 border-[#fcfcfb] last:border-r-0 text-[11.5px] font-semibold transition-[width] duration-300"
              style={{ width: `${w * 100}%`, background: t.color, color: t.ink }}
            >
              {w >= 0.18 ? money(l.amount) : ""}
            </span>
          ) : null;
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#52514e]">
        {TYPES.map((t) => (
          <span key={t.key} className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: t.color }} />
            {t.label}
            {!t.receipt && " (not receiptable)"}
          </span>
        ))}
      </div>

      {/* The lines: one row each on wide screens, wrapping to two on a phone */}
      <div className="mt-5 text-[13.5px]">
        <div className="hidden md:flex gap-2 pb-2 text-[11.5px] uppercase tracking-[0.1em] text-[#52514e] font-semibold">
          <span className="w-[96px]">Amount</span>
          <span className="w-[150px]">Type</span>
          <span className="w-[170px]">Fund</span>
        </div>
        {shown.map((l, i) => {
          const locked = mode === "before";
          return (
            <div key={l.id} className="relative flex flex-wrap items-center gap-2 border-t border-[#e6e5e0] py-2">
              <label className="sr-only" htmlFor={`amt-${l.id}`}>Line {i + 1} amount</label>
              <div className="inline-flex w-[96px] items-center rounded-md border border-[#e6e5e0] bg-white px-2 focus-within:border-[#0b0b0b]">
                <span className="text-[#52514e]">$</span>
                <input
                  id={`amt-${l.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  disabled={locked}
                  value={Number.isFinite(l.amount) ? l.amount : ""}
                  onChange={(e) => update(l.id, { amount: e.target.value === "" ? 0 : Number(e.target.value) })}
                  className="w-full min-w-0 bg-transparent py-1.5 pl-1 tabular-nums outline-none disabled:text-[#52514e]"
                />
              </div>
              <label className="sr-only" htmlFor={`type-${l.id}`}>Line {i + 1} type</label>
              <select
                id={`type-${l.id}`}
                disabled={locked}
                value={l.type}
                onChange={(e) => update(l.id, { type: e.target.value as TypeKey })}
                className="w-[150px] rounded-md border border-[#e6e5e0] bg-white px-2 py-1.5 disabled:text-[#52514e]"
              >
                {TYPES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor={`fund-${l.id}`}>Line {i + 1} fund</label>
              <select
                id={`fund-${l.id}`}
                disabled={locked}
                value={l.fund}
                onChange={(e) => update(l.id, { fund: e.target.value })}
                className="w-[170px] rounded-md border border-[#e6e5e0] bg-white px-2 py-1.5 disabled:text-[#52514e]"
              >
                {FUNDS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <span className="ml-auto whitespace-nowrap">
                {locked ? (
                  <span className="text-[12px] text-[#52514e]">The only option</span>
                ) : (
                  <>
                    <span className={`mr-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium ${l.edited ? "bg-[#f0efe9] text-[#52514e]" : "bg-[#e9eefb] text-[#0d366b]"}`}>
                      {l.edited ? "Edited" : "Suggested"}
                    </span>
                    {lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setLines((ls) => ls.filter((x) => x.id !== l.id))}
                        aria-label={`Remove line ${i + 1}`}
                        className="rounded px-1.5 text-[16px] leading-none text-[#52514e] hover:text-[#0b0b0b]"
                      >
                        &times;
                      </button>
                    )}
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {mode === "after" && (
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setLines((ls) => [...ls, { id: nextId, amount: Math.max(0, left), type: "donation", fund: "General Donations", edited: true }]);
              setNextId((n) => n + 1);
            }}
            className="rounded-full border border-[#e6e5e0] bg-white px-3 py-1 text-[12.5px] text-[#0b0b0b] hover:border-[#0b0b0b]/40"
          >
            + Add a line
          </button>
          <button
            type="button"
            onClick={() => setLines(SUGGESTED)}
            className="rounded-full px-3 py-1 text-[12.5px] text-[#52514e] underline underline-offset-4 hover:text-[#0b0b0b]"
          >
            Reset to the suggestion
          </button>
        </div>
      )}

      {/* Continuous validation and the receipt it protects */}
      <div className="mt-5 grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <p
          aria-live="polite"
          className={`m-0 self-start rounded-md border px-3.5 py-2.5 text-[13.5px] leading-snug ${
            mode === "after" && left === 0 ? "border-[#cfe0d2] bg-[#f1f7f2]" : "border-[#ecd9a8] bg-[#fdf7e7]"
          }`}
        >
          <b className="font-semibold">{mode === "after" && left === 0 ? "Ready to save. " : "Needs attention. "}</b>
          {status}
        </p>
        <div className="rounded-md border border-[#e6e5e0] bg-white px-3.5 py-2.5 text-[13px]">
          <p className="m-0 text-[11.5px] uppercase tracking-[0.1em] text-[#52514e] font-semibold">Tax receipt preview</p>
          <p className="m-0 mt-1 flex justify-between gap-3">
            <span>Eligible amount</span>
            <b className="font-semibold tabular-nums">{money(receiptable)}</b>
          </p>
          <p className="m-0 flex justify-between gap-3 text-[#52514e]">
            <span>Value received, not receipted</span>
            <span className="tabular-nums">{money(mode === "before" ? 0 : valueReceived)}</span>
          </p>
          {mode === "before" && trueValue > 0 && (
            <p className="m-0 mt-1 text-[12px] text-[#8a5a00]">Should be {money(TOTAL - trueValue)} once the ticket is split out.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
