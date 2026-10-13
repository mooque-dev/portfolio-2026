"use client";

import type { ReactNode } from "react";

// A white-labelled rebuild of the Raisely checkout from the Fee Opt-In
// experiment, after the MagicPatterns prototype: the fee sits in a sticky
// footer, and Edit opens the fallback being tested. Hope Foundation is
// fictional. The demo and the case study's figures both render this, so the
// pictures and the playable version always match.

export type Variant = "legacy" | "slider" | "buttons" | "dropdown";
export type Layout = "mobile" | "tablet" | "desktop";

export const GIFT = 50;
export const FULL_FEE = 2.25;
export const FEE_STEPS = [0, 0.75, 1.5, 2.25];

export const money = (n: number) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace("CA", "");
const round = (n: number) => Math.round(n * 100) / 100;

// The legacy box starts empty, and an empty box is $0: the leak.
export const legacyFee = (text: string) => Math.min(FULL_FEE, Math.max(0, Number(text) || 0));
export const feeFor = (variant: Variant, editing: boolean, fee: number, legacyText: string) =>
  variant === "legacy" && editing ? legacyFee(legacyText) : fee;
// Without the fee covered, processing comes out of the gift.
export const received = (fee: number) => round(GIFT - Math.max(0, FULL_FEE - fee));

const BRAND = "#1d6b52";
const INK = "#0f172a";

export type CheckoutProps = {
  variant: Variant;
  layout: Layout;
  fee: number;
  legacyText?: string;
  editing: boolean;
  done?: boolean;
  coach?: boolean;
  // The future-state concept: a thank-you when the slider reaches the top.
  generous?: boolean;
  onFee?: (n: number) => void;
  onLegacy?: (s: string) => void;
  onEdit?: () => void;
  onClose?: () => void;
  onDonate?: () => void;
  onReset?: () => void;
};

export default function Checkout(props: CheckoutProps) {
  const { layout } = props;
  const sheet = <Sheet {...props} />;
  if (layout === "mobile") return <Phone>{sheet}</Phone>;
  if (layout === "tablet") return <Tablet>{sheet}</Tablet>;
  return <Browser>{sheet}</Browser>;
}

/* ---------- Device frames. Fixed sizes, so a stage can scale them. ---------- */

export const FRAME = {
  mobile: { w: 392, h: 760 },
  tablet: { w: 1024, h: 720 },
  desktop: { w: 1280, h: 760 },
} as const;

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[52px] bg-[#16181d] p-[11px] shadow-[0_30px_60px_-20px_rgb(15_23_42/0.45)]" style={{ width: FRAME.mobile.w, height: FRAME.mobile.h }}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[42px] bg-white">
        <div className="flex h-[44px] flex-none items-center justify-between px-7 pt-1 text-[14px] font-semibold" style={{ color: INK }}>
          <span>9:41</span>
          <span className="absolute left-1/2 top-[10px] h-[26px] w-[104px] -translate-x-1/2 rounded-full bg-[#16181d]" aria-hidden />
          <span className="flex items-center gap-1.5" aria-hidden>
            <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill={INK} /><rect x="4.5" y="5" width="3" height="6" rx="1" fill={INK} /><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill={INK} /><rect x="13.5" y="0" width="3" height="11" rx="1" fill={INK} /></svg>
            <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke={INK} opacity="0.4" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill={INK} /><rect x="23" y="4" width="1.5" height="4" rx="0.75" fill={INK} opacity="0.4" /></svg>
          </span>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
        <div className="flex h-[22px] flex-none items-center justify-center" aria-hidden>
          <span className="h-[5px] w-[134px] rounded-full bg-[#16181d]" />
        </div>
      </div>
    </div>
  );
}

export function Backdrop({ children, className = "" }: { children?: ReactNode; className?: string }) {
  // Stands in for the campaign photo behind the Raisely modal.
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(120% 90% at 15% 20%, #3f7a5c 0%, transparent 55%), radial-gradient(90% 80% at 85% 75%, #24493a 0%, transparent 60%), linear-gradient(160deg, #2e5a46, #142a21)",
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        {Array.from({ length: 14 }, (_, i) => (
          <ellipse key={i} cx={(i * 67) % 400} cy={(i * 41) % 300} rx="46" ry="14" transform={`rotate(${(i * 37) % 180} ${(i * 67) % 400} ${(i * 41) % 300})`} fill="#c9f2d8" />
        ))}
      </svg>
      {children}
    </div>
  );
}

function Tablet({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[34px] bg-[#16181d] p-[14px] shadow-[0_30px_60px_-24px_rgb(15_23_42/0.45)]" style={{ width: FRAME.tablet.w, height: FRAME.tablet.h }}>
      <Backdrop className="flex h-full items-end justify-center rounded-[22px] px-8 pt-12">
        <div className="relative h-full w-[440px] rounded-t-[22px] bg-white shadow-2xl">
          <Badge className="absolute -top-8 left-1/2 -translate-x-1/2" />
          <div className="h-full overflow-hidden rounded-t-[22px] pt-10">{children}</div>
        </div>
      </Backdrop>
    </div>
  );
}

function Browser({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#d4d4d8] bg-white shadow-[0_30px_60px_-24px_rgb(15_23_42/0.4)]" style={{ width: FRAME.desktop.w, height: FRAME.desktop.h }}>
      <div className="flex h-[44px] items-center gap-3 border-b border-[#e4e4e7] bg-[#f4f4f5] px-4">
        <span className="flex gap-2" aria-hidden>
          <i className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <i className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto w-[420px] rounded-md bg-white px-3 py-1 text-center text-[12.5px] text-[#52525b]">give.hopefoundation.org/spring</span>
      </div>
      <div className="flex" style={{ height: FRAME.desktop.h - 44 }}>
        <Backdrop className="flex flex-1 flex-col justify-end p-14 text-white">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c9f2d8]">Spring appeal</p>
          <p className="mt-3 max-w-[520px] text-[40px] font-semibold leading-[1.08] tracking-[-0.02em]">Every gift plants trees where the city needs shade most.</p>
          <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-white/80">Hope Foundation is a fictional charity, built to show the checkout without the real product.</p>
        </Backdrop>
        <div className="relative w-[480px] flex-none border-l border-[#e4e4e7] pt-8">
          <Badge className="absolute left-1/2 top-5 -translate-x-1/2 scale-[0.85]" />
          <div className="h-full pt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Badge({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-16 w-16 place-items-center rounded-full border-[3px] border-white text-center text-[10px] font-extrabold leading-[1.05] tracking-wide text-white shadow-md ${className}`} style={{ background: BRAND }}>
      HOPE
      <br />
      FDN
    </span>
  );
}

/* ---------- The checkout sheet itself ---------- */

export function Sheet(p: CheckoutProps) {
  const { variant, layout, fee, legacyText = "", editing, done } = p;
  const current = feeFor(variant, editing, fee, legacyText);
  const total = round(GIFT + current);
  const pad = layout === "mobile" ? "px-5" : "px-7";

  if (done) {
    return (
      <div className={`flex h-full flex-col items-center justify-center ${pad} text-center`} style={{ color: INK }}>
        <span className="grid h-14 w-14 place-items-center rounded-full text-white" style={{ background: BRAND }} aria-hidden>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>
        </span>
        <p className="mt-5 text-[24px] font-bold">Thank you, Jordan</p>
        <p className="mt-1 text-[15px] text-[#64748b]">{money(total)} CAD donated to Hope Foundation</p>
        <dl className="mt-6 w-full max-w-[300px] space-y-2 rounded-xl bg-[#f8fafc] p-4 text-left text-[14px]">
          <div className="flex justify-between"><dt className="text-[#64748b]">Your gift</dt><dd className="tabular-nums">{money(GIFT)}</dd></div>
          <div className="flex justify-between"><dt className="text-[#64748b]">Fee you covered</dt><dd className="tabular-nums">{money(current)} of {money(FULL_FEE)}</dd></div>
          <div className="flex justify-between border-t border-[#e2e8f0] pt-2 font-semibold"><dt>Charity receives</dt><dd className="tabular-nums">{money(received(current))}</dd></div>
        </dl>
        <button type="button" onClick={p.onReset} className="mt-6 text-[14px] font-semibold underline underline-offset-4" style={{ color: BRAND }}>
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white" style={{ color: INK }}>
      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        <div className={`${pad} pb-6`}>
          <div className="flex items-center justify-between pt-2">
            <span className="flex items-center gap-1 text-[14px] font-medium text-[#334155]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back
            </span>
            <span className="flex gap-1.5" aria-label="Step 4 of 4">
              {[0, 1, 2].map((i) => (
                <span key={i} className="grid h-[18px] w-[18px] place-items-center rounded-full text-white" style={{ background: BRAND }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden><path d="m5 12 5 5 9-10" /></svg>
                </span>
              ))}
              <span className="h-[18px] w-[18px] rounded-full border-[5px]" style={{ borderColor: BRAND }} />
            </span>
            <span className="w-[52px]" />
          </div>
          <p className="mt-5 text-center text-[21px] font-bold tracking-[-0.01em]">Select payment method</p>

          <div className="mt-5 flex gap-3 rounded-xl border border-[#e2e8f0] p-3.5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-[#eff6ff] text-[#2563eb]" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" /></svg>
            </span>
            <span>
              <span className="block text-[14px] font-semibold">Secure payment</span>
              <span className="block text-[12.5px] leading-snug text-[#64748b]">Protected by industry best-practice encryption.</span>
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-[#f8fafc] p-4">
            <p className="text-center text-[11px] font-semibold tracking-[0.14em] text-[#64748b]">EXPRESS CHECKOUT</p>
            <div className={`mt-3 grid gap-2 ${layout === "mobile" ? "" : "grid-cols-1"}`}>
              <span className="grid h-11 place-items-center rounded-lg bg-[#ffc439] text-[17px] font-extrabold italic text-[#003087]">PayPal</span>
              <span className="grid h-11 place-items-center rounded-lg bg-black text-[15px] font-semibold text-white">G Pay</span>
            </div>
          </div>

          <div className="my-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.14em] text-[#94a3b8]">
            <span className="h-px flex-1 bg-[#e2e8f0]" />
            OR
            <span className="h-px flex-1 bg-[#e2e8f0]" />
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#f1f5f9] p-1 text-[13.5px] font-medium">
            <span className="rounded-md bg-white py-1.5 text-center shadow-sm">Card</span>
            <span className="py-1.5 text-center text-[#64748b]">Bank account</span>
          </div>
          <Field label="Name on card" value="Jordan Lee" />
          <Field label="Card number" value="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry" value="08 / 28" />
            <Field label="CVC" value="•••" />
          </div>
        </div>
      </div>

      <Footer {...p} current={current} total={total} pad={pad} />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-[12.5px] font-medium text-[#334155]">{label}</p>
      <p className="mt-1 rounded-lg border border-[#cbd5e1] px-3 py-2.5 text-[14px] tabular-nums">{value}</p>
    </div>
  );
}

function Footer(p: CheckoutProps & { current: number; total: number; pad: string }) {
  const { variant, editing, current, total, pad, fee } = p;
  const modern = variant !== "legacy";
  return (
    <div className={`flex-none border-t border-[#e2e8f0] bg-white ${pad} pb-5 pt-4 shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.18)]`}>
      <p className="text-[28px] font-bold leading-none tracking-[-0.01em] tabular-nums">{money(GIFT)}</p>

      {(!editing || !modern) && (
        <p className="relative mt-2 flex items-center gap-1.5 text-[13.5px] text-[#475569]">
          <span className="tabular-nums">+ {money(current)} processing fee</span>
          {!editing && (
            <span className="relative">
              {p.coach && (
                <>
                  <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 animate-ping rounded-full border-2" style={{ borderColor: BRAND }} aria-hidden />
                  <span className="pointer-events-none absolute bottom-[calc(100%+12px)] -left-3 w-max rounded-lg px-3 py-2 text-[12.5px] font-semibold text-white shadow-lg" style={{ background: INK }}>
                    Click Edit to change the fee
                    <span className="absolute left-5 top-full h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent" style={{ borderTopColor: INK }} />
                  </span>
                </>
              )}
              <button
                type="button"
                onClick={p.onEdit}
                aria-label="Edit processing fee"
                className="relative inline-flex items-center gap-1 rounded font-semibold underline underline-offset-2"
                style={{ color: INK }}
              >
                Edit
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="9.5" /><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.4v.5M12 16.8v.2" /></svg>
              </button>
            </span>
          )}
        </p>
      )}

      {editing && !modern && (
        // The legacy fallback: an older, unstyled box that starts empty.
        <div className="mt-3 border border-[#9ca3af] bg-[#f9fafb] p-2.5" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <label htmlFor="fee-legacy" className="block text-[12px] text-[#374151]">
            Edit amount
          </label>
          <div className="mt-1 flex items-center gap-1 text-[13px]">
            $
            <input
              id="fee-legacy"
              inputMode="decimal"
              value={p.legacyText ?? ""}
              placeholder="0.00"
              onChange={(e) => p.onLegacy?.(e.target.value.replace(/[^0-9.]/g, ""))}
              className="h-7 w-24 rounded-none border border-[#9ca3af] bg-white px-1.5 text-[13px] text-black"
            />
            <button type="button" onClick={p.onClose} className="ml-auto h-7 border border-[#9ca3af] bg-[#e5e7eb] px-2 text-[12px] text-black">
              Done
            </button>
          </div>
          <p className="mt-1 text-[11px] text-[#6b7280]">Min $0.00 · Max {money(FULL_FEE)}</p>
        </div>
      )}

      {editing && modern && (
        <div className="mt-3 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-[0_2px_10px_-4px_rgb(15_23_42/0.15)]">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[14.5px] font-semibold">Support our mission</p>
            <button type="button" onClick={p.onClose} aria-label="Close fee editor" className="-mr-1 -mt-1 grid h-7 w-7 place-items-center rounded-md text-[#94a3b8] hover:bg-[#f1f5f9]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-[#64748b]">
            Covering the processing fee means Hope Foundation keeps all of your gift.
          </p>
          <div className="mt-3 rounded-lg border border-[#e2e8f0] px-4 py-3">
            {variant === "slider" && (
              <>
                <p className="text-center text-[26px] font-bold tabular-nums">{money(fee)}</p>
                <label htmlFor="fee-slider" className="sr-only">Processing fee you cover</label>
                <input
                  id="fee-slider"
                  type="range"
                  min={0}
                  max={FULL_FEE}
                  step={0.05}
                  value={fee}
                  onChange={(e) => p.onFee?.(round(Number(e.target.value)))}
                  aria-valuetext={`${money(fee)} of ${money(FULL_FEE)}`}
                  className="hope-range mt-1 w-full"
                  style={{ ["--fill" as string]: `${(fee / FULL_FEE) * 100}%` }}
                />
                {p.generous && fee >= FULL_FEE && (
                  <p className="mt-2 rounded-md bg-[#ecfdf5] px-2.5 py-1.5 text-center text-[12.5px] font-medium text-[#065f46]">
                    Thank you. Every dollar of your gift goes to the work.
                  </p>
                )}
              </>
            )}
            {variant === "buttons" && (
              <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Processing fee you cover">
                {FEE_STEPS.map((v) => {
                  const on = fee === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => p.onFee?.(v)}
                      className="h-10 rounded-lg border text-[13.5px] font-semibold tabular-nums transition-colors"
                      style={on ? { background: BRAND, borderColor: BRAND, color: "#fff" } : { borderColor: "#cbd5e1", color: INK }}
                    >
                      {money(v)}
                    </button>
                  );
                })}
              </div>
            )}
            {variant === "dropdown" && (
              <div className="relative">
                <label htmlFor="fee-dropdown" className="sr-only">Processing fee you cover</label>
                <select
                  id="fee-dropdown"
                  value={fee}
                  onChange={(e) => p.onFee?.(Number(e.target.value))}
                  className="h-11 w-full appearance-none rounded-lg border border-[#cbd5e1] bg-white pl-3 pr-9 text-[15px] font-semibold tabular-nums text-[#0f172a]"
                >
                  {FEE_STEPS.map((v, i) => (
                    <option key={v} value={v}>
                      {money(v)} · {["No fee", "A third", "Two thirds", "Full fee"][i]}
                    </option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={p.onDonate}
        className="mt-4 h-12 w-full rounded-full text-[16px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: BRAND }}
      >
        Donate {money(total)} CAD
      </button>
    </div>
  );
}
