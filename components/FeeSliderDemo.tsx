"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Checkout, { FRAME, FULL_FEE, feeFor, money, received, type Layout, type Variant } from "@/components/fee/Checkout";

// The playable Fee Opt-In checkout: pick a fallback, click Edit, change the
// fee, and read what donors actually did beside it. Only reported numbers
// appear; the two variants that lost show no rate because none was reported.

const VARIANTS: { key: Variant; label: string; note: string }[] = [
  {
    key: "legacy",
    label: "Old fallback",
    note: "Edit drops you into an older box that starts empty. Leave it blank and the fee is $0, so the easiest path is opting out.",
  },
  {
    key: "slider",
    label: "Slider",
    note: "Starts at the full fee. Sliding down feels like giving a little less, not quitting. This is the one that shipped.",
  },
  {
    key: "buttons",
    label: "Buttons",
    note: "Four set amounts with the full fee chosen. No blank box, but one more decision to make.",
  },
  {
    key: "dropdown",
    label: "Dropdown",
    note: "Compact and familiar. Quick if you know what you want, but the choices stay hidden until you open it.",
  },
];

// Inline, so the case study's prose list styles can't reach in.
const BARE = { margin: 0, padding: 0, listStyle: "none" } as const;

const LAYOUTS: { key: Layout; label: string }[] = [
  { key: "mobile", label: "Mobile" },
  { key: "tablet", label: "Tablet" },
  { key: "desktop", label: "Desktop" },
];

export default function FeeSliderDemo() {
  const [variant, setVariant] = useState<Variant>("slider");
  const [layout, setLayout] = useState<Layout>("mobile");
  const [fee, setFee] = useState(FULL_FEE);
  const [legacyText, setLegacyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [done, setDone] = useState(false);
  const [opened, setOpened] = useState(false);
  const [changed, setChanged] = useState(false);
  const [tried, setTried] = useState<Set<Variant>>(new Set());

  const pick = (v: Variant) => {
    setVariant(v);
    setFee(FULL_FEE);
    setLegacyText("");
    setEditing(false);
    setDone(false);
    setOpened(false);
    setChanged(false);
  };
  const current = feeFor(variant, editing, fee, legacyText);
  const note = VARIANTS.find((v) => v.key === variant)!;
  const wide = layout !== "mobile";

  const steps = [
    { label: "Click Edit on the fee", done: opened },
    { label: "Change the fee", done: changed || done },
    { label: "Switch fallbacks and compare", done: tried.size > 1 },
  ];
  const active = steps.findIndex((s) => !s.done);

  const checkout = (
    <Checkout
      variant={variant}
      layout={layout}
      fee={fee}
      legacyText={legacyText}
      editing={editing}
      done={done}
      coach={!opened}
      onEdit={() => {
        setEditing(true);
        setOpened(true);
        setTried((t) => new Set(t).add(variant));
      }}
      onClose={() => setEditing(false)}
      onFee={(n) => {
        setFee(n);
        setChanged(true);
      }}
      onLegacy={(s) => {
        setLegacyText(s);
        setChanged(true);
      }}
      onDonate={() => setDone(true)}
      onReset={() => pick(variant)}
    />
  );

  return (
    <div>
      <ol className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]" style={BARE} aria-label="How to try it">
        {steps.map((s, i) => (
          <li key={s.label} style={BARE} className={`flex items-center gap-2 ${i === active ? "text-foreground font-medium" : "text-muted"}`}>
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[12px] font-semibold tabular-nums ${
                s.done ? "bg-[#1d6b52] text-white" : i === active ? "bg-foreground text-background" : "border border-border"
              }`}
              aria-hidden
            >
              {s.done ? "✓" : i + 1}
            </span>
            {s.label}
            <span className="sr-only">{s.done ? " (done)" : ""}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Segmented label="Fallback" items={VARIANTS} value={variant} onChange={(v) => { pick(v); setTried((t) => new Set(t).add(v)); }} />
        <Segmented label="Screen" items={LAYOUTS} value={layout} onChange={setLayout} />
      </div>

      <div className={`mt-5 grid gap-5 ${wide ? "" : "lg:grid-cols-[minmax(0,1fr)_340px]"}`}>
        <Stage layout={layout}>{checkout}</Stage>
        <Results variant={variant} note={note} current={current} wide={wide} tried={tried} />
      </div>
    </div>
  );
}

function Segmented<T extends string>({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="text-[13px] text-muted">{label}</span>
      <div className="inline-flex flex-wrap rounded-full border border-border p-0.5">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            aria-pressed={value === it.key}
            onClick={() => onChange(it.key)}
            className={`rounded-full px-3 py-1 text-[13px] font-medium transition-colors ${
              value === it.key ? "bg-foreground text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Scales a fixed-size device down to fit the column, so every screen size
// shows whole.
function Stage({ layout, children }: { layout: Layout; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [room, setRoom] = useState(900);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    // Fit the height too, so the fee footer and its Edit link are on screen.
    const fit = () => setRoom(Math.max(460, innerHeight - 230));
    fit();
    addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      removeEventListener("resize", fit);
    };
  }, []);
  const { w, h } = FRAME[layout];
  const scale = width ? Math.min(1, width / w, room / h) : 0;
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-[color-mix(in_oklab,var(--foreground)_4%,var(--background))] p-4 md:p-8">
      <div ref={ref} className="relative w-full" style={{ height: h * scale }}>
        {scale > 0 && (
          <div className="absolute top-0" style={{ width: w, height: h, left: (width - w * scale) / 2, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

const ROWS: { key: Variant | "before"; label: string; sub: string; value: number | null }[] = [
  { key: "before", label: "Original fee box", sub: "Before the redesign", value: 75 },
  { key: "legacy", label: "New box, old fallback", sub: "The control in the test", value: 82 },
  { key: "slider", label: "Slider", sub: "Shipped to every checkout", value: 92 },
  { key: "buttons", label: "Buttons", sub: "Tested, lost to the slider", value: null },
  { key: "dropdown", label: "Dropdown", sub: "Tested, lost to the slider", value: null },
];

function Results({
  variant,
  note,
  current,
  wide,
  tried,
}: {
  variant: Variant;
  note: { label: string; note: string };
  current: number;
  wide: boolean;
  tried: Set<Variant>;
}) {
  const share = current / FULL_FEE;
  return (
    <aside className={`grid content-start gap-5 ${wide ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]" : ""}`} aria-label="Results">
      <div className="grid content-start gap-5">
        <div>
          <p className="text-[15px] font-semibold">{note.label}</p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{note.note}</p>
        </div>
        <div className="rounded-xl border border-border p-4" aria-live="polite">
          <p className="text-[13px] text-muted">Your checkout right now</p>
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <span className="text-[14px]">Fee you&rsquo;re covering</span>
            <span className="text-[15px] font-semibold tabular-nums">
              {money(current)} <span className="font-normal text-muted">of {money(FULL_FEE)}</span>
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-border" aria-hidden>
            <div className="h-full rounded-full bg-[#1d6b52] transition-[width] duration-300" style={{ width: `${share * 100}%` }} />
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-border pt-3">
            <span className="text-[14px]">Hope Foundation receives</span>
            <span className="text-[15px] font-semibold tabular-nums">{money(received(current))}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border p-4">
        <p className="text-[15px] font-semibold">What donors did</p>
        <p className="mt-0.5 text-[13px] text-muted">Share who covered the fee, from the A/B test</p>
        <ul className="mt-4 grid gap-3.5" style={BARE}>
          {ROWS.map((r) => {
            const on = r.key === variant;
            return (
              <li key={r.key} style={BARE} className={`rounded-lg ${on ? "bg-[color-mix(in_oklab,#1d6b52_10%,transparent)] -mx-2 px-2 py-1.5" : ""}`}>
                <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
                  <span className="min-w-0">
                    <span className="font-medium">{r.label}</span>
                    {on && <span className="ml-2 text-[12px] font-medium text-[#1d6b52]">Trying now</span>}
                    {!on && r.key !== "before" && tried.has(r.key as Variant) && <span className="ml-2 text-[12px] text-muted">Tried</span>}
                  </span>
                  <span className="flex-none font-semibold tabular-nums">{r.value === null ? "" : `${r.value}%`}</span>
                </div>
                <div className="relative mt-1.5 h-2.5 rounded-full bg-border/60">
                  {r.value !== null ? (
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${r.value}%`, background: r.key === "slider" ? "#1d6b52" : "color-mix(in oklab, var(--foreground) 35%, transparent)" }}
                    />
                  ) : (
                    <div className="h-full rounded-full border border-dashed border-muted/60" />
                  )}
                  <span className="absolute -bottom-1 -top-1 w-px bg-[#b08a30]" style={{ left: "90%" }} aria-hidden />
                </div>
                <p className="mt-1 text-[12.5px] text-muted">{r.sub}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex items-center gap-2 text-[12.5px] text-muted">
          <span className="inline-block h-3 w-px bg-[#b08a30]" aria-hidden />
          90% benchmark. 12 to 20% of donors click Edit. With the slider, conversion and average gift held steady.
        </p>
      </div>
    </aside>
  );
}
