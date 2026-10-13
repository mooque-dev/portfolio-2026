"use client";

import type { ReactNode } from "react";
import Checkout, { Backdrop, Badge, FRAME, FULL_FEE, Phone, Sheet, type Variant } from "@/components/fee/Checkout";

// The Fee Opt-In case study's figures, each a 1600x900 frame composed from
// the same checkout the demo uses. Rendered by app/figures/fee and captured
// at 2x into public/case-studies/fee-opt-in/.

const PAPER = "#efebe4";
const INK = "#1c1917";
const MUTED = "#78716c";
const BRAND = "#1d6b52";

export default function FeeFigures() {
  return (
    <div style={{ background: "#d6d3d1", padding: 40, display: "grid", gap: 40, justifyContent: "center", fontFamily: "var(--font-geist), system-ui, sans-serif" }}>
      <Before />
      <Variants />
      <Prototype />
      <Future />
      <Results />
      <MobileNext />
    </div>
  );
}

function Figure({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} style={{ width: 1600, height: 900, background: PAPER, color: INK, position: "relative", overflow: "hidden" }}>
      <p style={{ position: "absolute", left: 72, top: 48, margin: 0, fontSize: 13, letterSpacing: "0.16em", fontWeight: 600, color: MUTED }}>{label}</p>
      {children}
    </section>
  );
}

function Scaled({ s, w, h, x, y, children }: { s: number; w: number; h: number; x: number; y: number; children: ReactNode }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w * s, height: h * s }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

function Note({ n, title, children }: { n?: number; title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {n !== undefined && (
        <span style={{ flex: "none", width: 30, height: 30, borderRadius: 99, background: INK, color: "#fff", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700 }}>{n}</span>
      )}
      <div>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 650 }}>{title}</p>
        <p style={{ margin: "6px 0 0", fontSize: 16, lineHeight: 1.5, color: "#57534e" }}>{children}</p>
      </div>
    </div>
  );
}

/* 01 · The legacy fallback */
function Before() {
  return (
    <Figure id="fig-01" label="BEFORE · THE OLD EDIT FALLBACK">
      <Scaled s={1} w={FRAME.mobile.w} h={FRAME.mobile.h} x={250} y={92}>
        <Checkout variant="legacy" layout="mobile" fee={FULL_FEE} legacyText="" editing />
      </Scaled>
      <div style={{ position: "absolute", left: 790, top: 150, width: 640, display: "grid", gap: 34 }}>
        <p style={{ margin: 0, fontSize: 36, fontWeight: 650, letterSpacing: "-0.02em", lineHeight: 1.12 }}>Edit opened a box that started at&nbsp;$0.</p>
        <Note n={1} title="A blank field">The amount starts empty, and empty means no fee. Doing nothing opts you out.</Note>
        <Note n={2} title="A different product">An older box in an older style, nothing like the checkout around it.</Note>
        <Note n={3} title="No guidance">No default and no reason to cover the fee. Just a minimum and a maximum.</Note>
        <div style={{ marginTop: 6, borderRadius: 16, background: "#fff", padding: "22px 26px", display: "flex", gap: 22, alignItems: "center", boxShadow: "0 1px 0 rgb(0 0 0 / 0.04)" }}>
          <span style={{ fontSize: 46, fontWeight: 750, letterSpacing: "-0.03em", color: "#b42318", whiteSpace: "nowrap" }}>12–20%</span>
          <span style={{ fontSize: 16, lineHeight: 1.45, color: "#44403c" }}>of donors click Edit. Most of them lowered the fee or removed it.</span>
        </div>
      </div>
    </Figure>
  );
}

/* 02 · The three fallbacks */
function Variants() {
  const items: { v: Variant; name: string; text: string; shipped?: boolean }[] = [
    { v: "slider", name: "Slider", text: "Starts at the full fee. Less feels like a little less.", shipped: true },
    { v: "buttons", name: "Buttons", text: "Four set amounts, full fee chosen. No blank box." },
    { v: "dropdown", name: "Dropdown", text: "Compact and familiar. Choices stay hidden." },
  ];
  const s = 0.82;
  const w = FRAME.mobile.w * s;
  const gap = 110;
  const left = (1600 - (w * 3 + gap * 2)) / 2;
  return (
    <Figure id="fig-02" label="THREE FALLBACKS · EACH BUILT READY TO SHIP">
      {items.map((it, i) => (
        <div key={it.v}>
          <Scaled s={s} w={FRAME.mobile.w} h={FRAME.mobile.h} x={left + i * (w + gap)} y={96}>
            <Checkout variant={it.v} layout="mobile" fee={FULL_FEE} editing />
          </Scaled>
          <div style={{ position: "absolute", left: left + i * (w + gap) - 40, top: 96 + FRAME.mobile.h * s + 26, width: w + 80, textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
              {it.name}
              {it.shipped && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#fff", background: BRAND, borderRadius: 99, padding: "3px 10px" }}>SHIPPED</span>}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "#57534e" }}>{it.text}</p>
          </div>
        </div>
      ))}
    </Figure>
  );
}

/* 03 and 04 · The MagicPatterns prototype, rebuilt */
function Seg({ items, on }: { items: string[]; on: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 2, background: "#f1f5f9", borderRadius: 9, padding: 3 }}>
      {items.map((t, i) => (
        <span key={t} style={{ textAlign: "center", padding: "6px 0", fontSize: 12.5, fontWeight: 500, borderRadius: 7, background: i === on ? "#fff" : "transparent", boxShadow: i === on ? "0 1px 2px rgb(0 0 0 / 0.08)" : "none", color: i === on ? "#0f172a" : "#475569" }}>{t}</span>
      ))}
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return <p style={{ margin: "14px 0 6px", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", color: "#475569" }}>{children}</p>;
}

function Controls({ future }: { future?: boolean }) {
  return (
    <div style={{ width: 236, background: "#fff", borderRadius: 14, boxShadow: "0 12px 30px -10px rgb(15 23 42 / 0.4)", color: "#0f172a", overflow: "hidden" }}>
      <p style={{ margin: 0, padding: "13px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", borderBottom: "1px solid #e2e8f0" }}>DESIGN CONTROLS</p>
      <div style={{ padding: "0 16px 16px" }}>
        <H>LAYOUT</H>
        <Seg items={["Left", "Center"]} on={1} />
        <H>BRAND COLOURS</H>
        {[["Brand", BRAND], ["Secondary", "#4fb38a"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, fontSize: 12.5 }}>
            <span style={{ flex: 1 }}>{k}</span>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: v }} />
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11.5, border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 6px" }}>{v}</span>
          </div>
        ))}
        <H>FEE VISIBILITY</H>
        <Seg items={["Hide on edit", "Always show"]} on={0} />
        {future && (
          <>
            <H>DEFAULT FEE LEVEL</H>
            <Seg items={["None", "Low", "Mid", "High"]} on={3} />
            <H>MAX FEE MESSAGE</H>
            <Seg items={["None", "Generous", "Platform"]} on={1} />
          </>
        )}
        <H>FEE EDITOR STYLE</H>
        <Seg items={["Slider", "Buttons", "Dropdown"]} on={0} />
      </div>
    </div>
  );
}

function PrototypeScene({ future }: { future?: boolean }) {
  // A browser showing the prototype: campaign photo, the checkout modal, and
  // the control panel PMs and engineers used to change the logic live.
  const W = 1380;
  const H = 740;
  return (
    <div style={{ position: "absolute", left: (1600 - W) / 2, top: 100, width: W, height: H, borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 30px 60px -24px rgb(15 23 42 / 0.4)", border: "1px solid #d4d4d8" }}>
      <div style={{ height: 42, display: "flex", alignItems: "center", gap: 12, padding: "0 16px", background: "#f4f4f5", borderBottom: "1px solid #e4e4e7" }}>
        <span style={{ display: "flex", gap: 8 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 12, height: 12, borderRadius: 99, background: c }} />)}
        </span>
        <span style={{ margin: "0 auto", width: 420, textAlign: "center", fontSize: 12.5, color: "#52525b", background: "#fff", borderRadius: 6, padding: "4px 0" }}>
          {future ? "Fee opt-in prototype · next version" : "Fee opt-in prototype · fallback options"}
        </span>
      </div>
      <Backdrop className="h-[698px]">
        <div style={{ position: "absolute", left: 28, bottom: 28 }}>
          <Controls future={future} />
        </div>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: 44, width: 440, height: 654, background: "#fff", borderRadius: "22px 22px 0 0", boxShadow: "0 20px 50px rgb(0 0 0 / 0.35)" }}>
          <Badge className="absolute -top-8 left-1/2 -translate-x-1/2" />
          <div style={{ height: "100%", overflow: "hidden", borderRadius: "22px 22px 0 0", paddingTop: 40 }}>
            <Sheet variant="slider" layout="tablet" fee={FULL_FEE} editing generous={future} />
          </div>
        </div>
        <div style={{ position: "absolute", right: 28, bottom: 28, background: "rgb(255 255 255 / 0.95)", borderRadius: 99, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, color: "#0f172a" }}>
          Built with MagicPatterns
        </div>
      </Backdrop>
    </div>
  );
}

function Prototype() {
  return (
    <Figure id="fig-03" label="PROTOTYPE · MAGICPATTERNS, WITH LIVE CONTROLS">
      <PrototypeScene />
    </Figure>
  );
}

function Future() {
  return (
    <Figure id="fig-04" label="NEXT VERSION · DEFAULT LEVELS AND A THANK-YOU AT THE TOP">
      <PrototypeScene future />
    </Figure>
  );
}

/* 05 · Results */
function Results() {
  const bars = [
    { label: "Original fee box", sub: "Before the redesign", v: 75, c: "#d6d0c6" },
    { label: "New box, old fallback", sub: "The control", v: 82, c: "#b9c9bd" },
    { label: "Slider fallback", sub: "Shipped", v: 92, c: BRAND },
  ];
  const top = 350;
  const base = 790;
  const y = (v: number) => base - ((base - top) * v) / 100;
  const card = (k: string, big: string, sub: string, x: number) => (
    <div style={{ position: "absolute", left: x, top: 100, width: 460, height: 150, background: "#fff", borderRadius: 18, padding: "24px 28px", boxSizing: "border-box" }}>
      <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.12em", fontWeight: 600, color: MUTED }}>{k}</p>
      <p style={{ margin: "10px 0 0", fontSize: 48, fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1, color: big === "92%" ? BRAND : INK }}>{big}</p>
      <p style={{ margin: "12px 0 0", fontSize: 15.5, color: "#57534e" }}>{sub}</p>
    </div>
  );
  return (
    <Figure id="fig-05" label="RESULTS · A/B TEST IN PENDO">
      {card("FEE OPT-IN", "92%", "Up from 75%, past the 90% benchmark", 72)}
      {card("DONATION CONVERSION", "Held", "No drop in donors finishing checkout", 570)}
      {card("AVERAGE GIFT", "Held", "The lift came from better choices, not pressure", 1068)}
      <div style={{ position: "absolute", left: 72, top: 280, width: 1456, height: 580, background: "#fff", borderRadius: 18 }} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width="1600" height="900" viewBox="0 0 1600 900" fontFamily="var(--font-geist), system-ui, sans-serif">
        {[0, 20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1="190" x2="1480" y1={y(v)} y2={y(v)} stroke={v === 0 ? "#d6d3d1" : "#f0eeeb"} strokeWidth={v === 0 ? 1.5 : 1} />
            <text x="172" y={y(v) + 5} textAnchor="end" fontSize="13" fill="#a8a29e">{v}%</text>
          </g>
        ))}
        <line x1="190" x2="1480" y1={y(90)} y2={y(90)} stroke="#b08a30" strokeWidth="1.5" strokeDasharray="7 6" />
        <text x="1480" y={y(90) - 10} textAnchor="end" fontSize="13.5" fontWeight="600" fill="#93721f">90% benchmark</text>
        {bars.map((b, i) => {
          const cx = 420 + i * 400;
          return (
            <g key={b.label}>
              <rect x={cx - 95} y={y(b.v)} width="190" height={base - y(b.v)} rx="8" fill={b.c} />
              <text x={cx} y={b.v === 92 ? y(b.v) + 44 : y(b.v) - 14} textAnchor="middle" fontSize={b.v === 92 ? 30 : 24} fontWeight="750" fill={b.v === 92 ? "#fff" : "#57534e"}>{b.v}%</text>
              <text x={cx} y={base + 30} textAnchor="middle" fontSize="16" fontWeight="650" fill={INK}>{b.label}</text>
              <text x={cx} y={base + 52} textAnchor="middle" fontSize="13.5" fill={MUTED}>{b.sub}</text>
            </g>
          );
        })}
      </svg>
      <p style={{ position: "absolute", left: 104, top: 304, margin: 0, fontSize: 13, letterSpacing: "0.12em", fontWeight: 600, color: MUTED }}>SHARE OF DONORS WHO COVERED THE FEE</p>
    </Figure>
  );
}

/* 06 · What's next on mobile */
function NestedScroll() {
  // Today's mobile checkout: a form scrolling inside a page scroll, with the
  // fee and Donate pushed out of view.
  const field = (l: string, v: string) => (
    <div style={{ marginTop: 10 }}>
      <p style={{ margin: 0, fontSize: 12.5, fontWeight: 500, color: "#334155" }}>{l}</p>
      <p style={{ margin: "4px 0 0", border: "1px solid #cbd5e1", borderRadius: 8, padding: "9px 12px", fontSize: 14, color: v ? "#0f172a" : "#94a3b8" }}>{v || "Required"}</p>
    </div>
  );
  return (
    <Phone>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", color: "#0f172a" }}>
        <div style={{ padding: "6px 20px 0" }}>
          <p style={{ margin: 0, textAlign: "center", fontSize: 20, fontWeight: 700 }}>Complete your donation</p>
          <p style={{ margin: "14px 0 0", fontSize: 28, fontWeight: 700 }}>$50.00</p>
        </div>
        <div style={{ margin: "14px 14px 0", border: "2px dashed #d97706", borderRadius: 14, background: "#fffbeb", padding: "10px 12px 12px", position: "relative", height: 330, overflow: "hidden" }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#b45309" }}>SCROLLS ON ITS OWN</p>
          {field("Name on card", "Jordan Lee")}
          {field("Email", "jordan.lee@email.com")}
          {field("Card number", "")}
          {field("Expiry", "")}
          <span style={{ position: "absolute", right: 5, top: 40, width: 4, height: 90, borderRadius: 4, background: "#d6a24b" }} />
        </div>
        <div style={{ margin: "14px 20px 0", borderTop: "1px solid #e2e8f0", paddingTop: 12, fontSize: 13.5, color: "#94a3b8" }}>
          <p style={{ margin: 0 }}>Processing fee</p>
          <p style={{ margin: "4px 0 0" }}>Below the fold</p>
        </div>
        <div style={{ marginTop: "auto", padding: "0 20px 18px" }}>
          <div style={{ height: 48, borderRadius: 99, background: "#cbd5e1", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>Scroll to donate</div>
        </div>
      </div>
    </Phone>
  );
}

function MobileNext() {
  const s = 0.8;
  const w = FRAME.mobile.w * s;
  const xs = [300, 1600 - 300 - w];
  return (
    <Figure id="fig-06" label="WHAT'S NEXT · MOBILE, WHERE MOST GIVING HAPPENS">
      <Scaled s={s} w={FRAME.mobile.w} h={FRAME.mobile.h} x={xs[0]} y={96}>
        <NestedScroll />
      </Scaled>
      <Scaled s={s} w={FRAME.mobile.w} h={FRAME.mobile.h} x={xs[1]} y={96}>
        <Checkout variant="slider" layout="mobile" fee={FULL_FEE} editing={false} />
      </Scaled>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 64, fontWeight: 750, letterSpacing: "-0.03em" }}>60%+</p>
        <p style={{ margin: "4px 0 0", fontSize: 16, color: "#57534e" }}>of donations happen on a phone</p>
        <svg width="90" height="24" viewBox="0 0 90 24" style={{ margin: "18px auto 0", display: "block" }} aria-hidden>
          <path d="M2 12h80M72 3l10 9-10 9" fill="none" stroke="#a8a29e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {[
        { x: xs[0], t: "Today", a: "A form that scrolls inside a page that scrolls.", b: "The fee and Donate sit below the fold." },
        { x: xs[1], t: "Proposed", a: "One scroll, so gestures behave.", b: "The fee, Edit and Donate stay in the footer." },
      ].map((n) => (
        <div key={n.t} style={{ position: "absolute", left: n.x - 40, width: w + 80, top: 96 + FRAME.mobile.h * s + 22, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{n.t}</p>
          <p style={{ margin: "6px 0 0", fontSize: 14.5, color: "#57534e", lineHeight: 1.45 }}>
            {n.a}
            <br />
            {n.b}
          </p>
        </div>
      ))}
    </Figure>
  );
}
