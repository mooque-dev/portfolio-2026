"use client";

import { useState } from "react";

// A white-labelled rebuild of the Fee Opt-In experiment: a donation checkout
// for a fictional charity, with the legacy fallback and the three variants
// that were tested when a donor clicks Edit on the fee. The production
// screens are confidential; this shows the decisions, not the product.
type Variant = "legacy" | "slider" | "toggle" | "dropdown";

const VARIANTS: { key: Variant; label: string; note: string }[] = [
  {
    key: "legacy",
    label: "Legacy fallback",
    note: "Edit opens a blank field in an older style. Typing nothing means no fee, so the easiest path is opting out. Most donors who clicked Edit lowered the fee or removed it.",
  },
  {
    key: "slider",
    label: "Slider (won)",
    note: "A continuous control that starts at the full fee and marks it. Sliding down still feels like giving a little less, not quitting. This one shipped: opt-in went from 75% to 92% with conversion steady.",
  },
  {
    key: "toggle",
    label: "Toggle buttons",
    note: "Pre-framed choices with the full fee selected, so there's no blank slate. Four options asked donors to make one more decision.",
  },
  {
    key: "dropdown",
    label: "Segmented dropdown",
    note: "Compact and familiar, quick for donors who already know what they want, but the choices stay hidden until you open it.",
  },
];

const AMOUNTS = [25, 50, 100, 250];
const RATE = 0.02;
const ACCENT = "#0f766e";

const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round = (n: number) => Math.round(n * 100) / 100;

export default function FeeSliderDemo() {
  const [variant, setVariant] = useState<Variant>("slider");
  const [amount, setAmount] = useState(100);
  const fullFee = round(amount * RATE);
  const maxFee = round(fullFee * 1.5);
  const [fee, setFee] = useState(fullFee);
  const [legacyText, setLegacyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState(false);

  const reset = (v: Variant, a = amount) => {
    setVariant(v);
    setAmount(a);
    setFee(round(a * RATE));
    setLegacyText("");
    setEditing(false);
    setDone(false);
  };

  // Legacy: once Edit is open the field starts empty, and an empty field is $0.
  const legacyFee = Math.min(fullFee, Math.max(0, Number(legacyText) || 0));
  const currentFee = variant === "legacy" && editing ? legacyFee : fee;
  const total = round(amount + currentFee);
  const received = round(amount - Math.max(0, fullFee - currentFee));
  const current = VARIANTS.find((v) => v.key === variant)!;

  const outcome =
    currentFee <= 0
      ? `No fee. Hope Foundation receives ${money(received)} after processing.`
      : currentFee < fullFee
        ? `Covers part of the fees. Hope Foundation receives ${money(received)}.`
        : currentFee === fullFee
          ? `Covers the fees. Hope Foundation receives your full ${money(amount)}.`
          : `Covers the fees, plus ${money(currentFee - fullFee)} extra.`;

  const choices = [
    { v: 0, label: "No fee" },
    { v: round(fullFee / 2), label: "Half" },
    { v: fullFee, label: "Full fee" },
    { v: maxFee, label: "A little extra" },
  ];
  const selected = (on: boolean) =>
    on ? { borderColor: ACCENT, background: "#f0fdfa", color: ACCENT } : { borderColor: "#d6d3d1", background: "#ffffff" };

  return (
    <div>
      {/* Presentation control for the reader, outside the product. */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2" role="group" aria-label="Which fallback to show">
        <span className="text-[13px] text-muted">Fallback</span>
        <div className="inline-flex flex-wrap rounded-full border border-border p-0.5">
          {VARIANTS.map((v) => (
            <button
              key={v.key}
              type="button"
              aria-pressed={variant === v.key}
              onClick={() => reset(v.key)}
              className={`rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${
                variant === v.key ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        {/* The product: a fictional charity's checkout, in its own colours. */}
        <div className="w-full max-w-[440px] shrink-0 overflow-hidden rounded-xl border border-[#e7e5e4] bg-white text-[#1c1917] shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#f0eeec] px-5 py-3.5">
            <span className="grid h-7 w-7 place-items-center rounded-full text-[13px] font-semibold text-white" style={{ background: ACCENT }}>
              H
            </span>
            <span className="text-[14px] font-semibold">Hope Foundation</span>
            <span className="ml-auto text-[12px] text-[#78716c]">Step 2 of 2</span>
          </div>

          {done ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-[#78716c]">Thank you</p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums">{money(total)} donated</p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#57534e]">{outcome}</p>
              <button type="button" onClick={() => reset(variant)} className="mt-6 text-[13px] font-medium underline underline-offset-4" style={{ color: ACCENT }}>
                Try again
              </button>
            </div>
          ) : (
            <div className="px-5 py-5">
              <p className="text-[12px] font-medium text-[#78716c]">Your gift</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={amount === a}
                    onClick={() => reset(variant, a)}
                    className="h-10 rounded-lg border text-[14px] font-medium tabular-nums transition-colors"
                    style={selected(amount === a)}
                  >
                    ${a}
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-lg bg-[#f5f5f4] p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] leading-snug">
                    <span className="font-semibold">Help cover our fees</span> so Hope Foundation receives your full gift.
                  </p>
                  <span className="shrink-0 text-[14px] font-semibold tabular-nums">+{money(currentFee)}</span>
                </div>

                {!editing && (
                  <button type="button" onClick={() => setEditing(true)} className="mt-2 text-[13px] font-medium underline underline-offset-4">
                    Edit
                  </button>
                )}

                {editing && variant === "legacy" && (
                  <div className="mt-3 border border-[#a8a29e] bg-[#fafaf9] p-2.5 font-[Arial,sans-serif]">
                    <label htmlFor="fee-legacy" className="block text-[11.5px] text-[#57534e]">
                      Edit amount
                    </label>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[13px]">$</span>
                      <input
                        id="fee-legacy"
                        inputMode="decimal"
                        value={legacyText}
                        placeholder="0"
                        onChange={(e) => setLegacyText(e.target.value.replace(/[^0-9.]/g, ""))}
                        className="h-7 w-24 rounded-none border border-[#a8a29e] bg-white px-1.5 text-[13px]"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-[#78716c]">Min $0.00 · Max {money(fullFee)}</p>
                  </div>
                )}

                {editing && variant === "slider" && (
                  <div className="mt-3">
                    <label htmlFor="fee-slider" className="sr-only">
                      Fee contribution
                    </label>
                    <div className="relative pt-5">
                      <span
                        aria-hidden
                        className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[11.5px] font-medium text-[#57534e]"
                        style={{ left: `${(fullFee / maxFee) * 100}%` }}
                      >
                        Covers fees
                      </span>
                      <input
                        id="fee-slider"
                        type="range"
                        min={0}
                        max={maxFee}
                        step={0.05}
                        value={fee}
                        onChange={(e) => setFee(round(Number(e.target.value)))}
                        aria-valuetext={`${money(fee)}. ${outcome}`}
                        className="fee-range w-full"
                        style={{ ["--fill" as string]: `${(fee / maxFee) * 100}%` }}
                      />
                      <div className="flex justify-between text-[11.5px] tabular-nums text-[#78716c]" aria-hidden>
                        <span>$0.00</span>
                        <span>{money(maxFee)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {editing && variant === "toggle" && (
                  <div className="mt-3 grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Fee contribution">
                    {[
                      { v: 0, l: "$0" },
                      { v: round(fullFee / 2), l: money(fullFee / 2) },
                      { v: fullFee, l: money(fullFee) },
                      { v: maxFee, l: money(maxFee) },
                    ].map((c) => (
                      <button
                        key={c.l}
                        type="button"
                        role="radio"
                        aria-checked={fee === c.v}
                        onClick={() => setFee(c.v)}
                        className="h-9 rounded-md border text-[12.5px] font-medium tabular-nums"
                        style={selected(fee === c.v)}
                      >
                        {c.l}
                      </button>
                    ))}
                  </div>
                )}

                {editing && variant === "dropdown" && (
                  <div className="mt-3">
                    <label htmlFor="fee-dropdown" className="sr-only">
                      Fee contribution
                    </label>
                    <select
                      id="fee-dropdown"
                      value={fee}
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="h-9 w-full rounded-md border border-[#d6d3d1] bg-white pl-3 text-[13.5px]"
                    >
                      {choices.map((c) => (
                        <option key={c.label} value={c.v}>
                          {money(c.v)} · {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {editing && (
                  <p className="mt-3 text-[12.5px] leading-snug text-[#57534e]" aria-live="polite">
                    {outcome}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-baseline justify-between text-[14px]">
                <span>Total today</span>
                <span className="text-[18px] font-semibold tabular-nums">{money(total)}</span>
              </div>
              <button type="button" onClick={() => setDone(true)} className="mt-4 h-11 w-full rounded-lg text-[15px] font-semibold text-white" style={{ background: ACCENT }}>
                Donate {money(total)}
              </button>
              <p className="mt-3 text-center text-[11.5px] text-[#a8a29e]">Fictional charity · illustrative amounts</p>
            </div>
          )}
        </div>

        <div className="max-w-[46ch] md:pt-2">
          <p className="text-[15px] font-semibold">{current.label}</p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{current.note}</p>
          <p className="mt-4 text-[13px] text-muted">Click Edit on the fee, then switch fallbacks to compare.</p>
        </div>
      </div>
    </div>
  );
}
