"use client";

import { useState } from "react";

// An illustrative rebuild of the Fee Opt-In decision: what happens after a
// donor clicks Edit on the fee. The production screens are confidential, so
// this is a generic checkout, not Raisely's UI. Amounts are illustrative.
const GIFT = 50;
const FEES = 2.5; // what it costs the cause to process this gift, in this example
const MAX = 7.5;
const LEGACY_OPTIONS = [0.5, 1, 1.5, 2.5];

const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

function outcome(fee: number) {
  if (fee <= 0) return `No fee added. The cause receives ${money(GIFT - FEES)} after processing.`;
  if (fee < FEES) return `Covers part of the fees. The cause receives ${money(GIFT - FEES + fee)}.`;
  if (fee === FEES) return `Covers the fees. The cause receives your full ${money(GIFT)}.`;
  return `Covers the fees, plus ${money(fee - FEES)} extra for the cause.`;
}

export default function FeeSliderDemo() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const [editing, setEditing] = useState(false);
  const [fee, setFee] = useState(FEES);
  const [legacyFee, setLegacyFee] = useState(LEGACY_OPTIONS[0]);

  const switchMode = (m: "before" | "after") => {
    setMode(m);
    setEditing(false);
    setFee(FEES);
    setLegacyFee(LEGACY_OPTIONS[0]);
  };

  const current = editing && mode === "before" ? legacyFee : fee;
  const pct = (fee / MAX) * 100;

  return (
    <div>
      {/* A presentation control for the reader, not part of the product, so it
          sits outside the product card. */}
      <div className="mb-3 flex flex-wrap items-center gap-3" role="group" aria-label="Compare the fallback before and after the redesign">
        <span className="text-[13px] text-muted">Compare</span>
        <div className="inline-flex rounded-full border border-border p-0.5">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => switchMode(m)}
              className={`rounded-full px-3.5 py-1 text-[13px] font-medium transition-colors ${
                mode === m ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "before" ? "Legacy fallback" : "Slider that won"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-[#fcfcfb] text-[#0b0b0b] p-5 md:p-7 shadow-sm">
        <p className="text-[15px] font-semibold leading-tight">Donation checkout: a {money(GIFT)} gift</p>
        <p className="text-[12.5px] text-[#52514e] mt-0.5">
          Illustrative rebuild. The production screens are confidential.
        </p>

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="w-full max-w-[460px] shrink-0 rounded-md border border-[#e6e5e0] bg-white p-4 md:p-5">
          <div className="flex items-baseline justify-between text-[14px]">
            <span>Your gift</span>
            <span className="font-semibold tabular-nums">{money(GIFT)}</span>
          </div>

          <div className="mt-4 rounded-md bg-[#f3f2ee] p-3.5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13.5px] leading-snug">
                <span className="font-semibold">Cover the fees</span> so the cause receives your full gift.
              </p>
              <span className="shrink-0 text-[14px] font-semibold tabular-nums">+{money(current)}</span>
            </div>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="mt-2 text-[13px] font-medium underline underline-offset-4"
              >
                Edit
              </button>
            )}

            {editing && mode === "before" && (
              // The legacy fallback: a different-looking control, preset to the minimum.
              <div className="mt-3 border border-[#b9b8b1] bg-[#fafafa] p-2.5 font-[Arial,sans-serif]">
                <label htmlFor="fee-legacy" className="block text-[11.5px] text-[#555]">
                  Select contribution amount
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <select
                    id="fee-legacy"
                    value={legacyFee}
                    onChange={(e) => setLegacyFee(Number(e.target.value))}
                    className="h-7 rounded-none border border-[#999] bg-white pl-1.5 text-[12px]"
                  >
                    {LEGACY_OPTIONS.map((v) => (
                      <option key={v} value={v}>
                        {money(v)}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => setLegacyFee(0)} className="text-[11.5px] text-[#1a4fd6] underline">
                    Remove
                  </button>
                </div>
              </div>
            )}

            {editing && mode === "after" && (
              <div className="mt-3">
                <label htmlFor="fee-slider" className="sr-only">
                  Fee contribution
                </label>
                <div className="relative pt-5">
                  {/* Anchor: the amount that covers the fees exactly */}
                  <span
                    aria-hidden
                    className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11.5px] font-medium text-[#52514e]"
                    style={{ left: `${(FEES / MAX) * 100}%` }}
                  >
                    Covers fees
                  </span>
                  <span
                    aria-hidden
                    className="absolute top-[18px] h-3 w-px -translate-x-1/2 bg-[#52514e]"
                    style={{ left: `${(FEES / MAX) * 100}%` }}
                  />
                  <input
                    id="fee-slider"
                    type="range"
                    min={0}
                    max={MAX}
                    step={0.25}
                    value={fee}
                    onChange={(e) => setFee(Number(e.target.value))}
                    aria-valuetext={`${money(fee)}. ${outcome(fee)}`}
                    className="fee-range w-full"
                    style={{ ["--fill" as string]: `${pct}%` }}
                  />
                  <div className="flex justify-between text-[11.5px] text-[#52514e] tabular-nums" aria-hidden>
                    <span>{money(0)}</span>
                    <span>{money(MAX)}</span>
                  </div>
                </div>
                <p className="mt-2 text-[13px] leading-snug" aria-live="polite">
                  {outcome(fee)}
                </p>
                <div className="mt-2 flex gap-4">
                  <button type="button" onClick={() => setFee(0)} className="text-[12.5px] text-[#52514e] underline underline-offset-4">
                    No thanks
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="text-[12.5px] font-medium underline underline-offset-4">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-[#e6e5e0] pt-3 text-[14px]">
            <span>Total today</span>
            <span className="text-[17px] font-semibold tabular-nums">{money(GIFT + current)}</span>
          </div>
        </div>

        <p className="text-[14px] leading-relaxed text-[#52514e] max-w-[46ch] md:pt-2">
          {mode === "before"
            ? "Edit opens a control that looks like a different product, preset to the smallest amount. Donors who clicked Edit mostly dragged the fee to the minimum or opted out."
            : "Same decision, one consistent control: the fair amount is marked, every choice shows what the cause receives, and No thanks stays one click away."}
        </p>
        </div>
      </div>
    </div>
  );
}
