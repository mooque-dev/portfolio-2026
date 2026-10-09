"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Inspect mode: press I (or the footer switch) and the page shows the values
// it is built from, read live from the browser: typeface, size and line
// height for type, aspect and corner radius for images, height and radius for
// controls. It draws in its own layer and never takes a click, so the page
// keeps working underneath. Hover anything for its details. Esc to leave.
export const INSPECT_EVENT = "inspect:toggle";

const SELECTOR = "main h1, main h2, main h3, main img, main a.rounded-full, main button, main blockquote, main .receipt";

type Box = { x: number; y: number; w: number; h: number; label: string; inset?: number };

const family = (cs: CSSStyleDeclaration) => {
  const f = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
  if (/playfair/i.test(f)) return "Playfair";
  if (/inter/i.test(f)) return "Inter";
  if (/caveat/i.test(f)) return "Caveat";
  return f;
};
const px = (v: string) => Math.round(parseFloat(v) || 0);
const ratio = (w: number, h: number) => {
  const r = w / h;
  const known: [number, string][] = [[1, "1:1"], [1.5, "3:2"], [1.6, "16:10"], [16 / 9, "16:9"], [4 / 3, "4:3"], [2 / 3, "2:3"], [3 / 4, "3:4"]];
  const hit = known.find(([k]) => Math.abs(k - r) < 0.03);
  return hit ? hit[1] : `${Math.round(w)}×${Math.round(h)}`;
};

function describe(el: Element, detailed = false): string {
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const raw = px(cs.borderTopLeftRadius);
  // A radius past half the short side is a full round: say so, not 33554400.
  const round = raw >= Math.min(r.width, r.height) / 2;
  const radius = round ? 0 : raw;
  const tag = el.tagName.toLowerCase();
  if (tag === "img") return `image · ${ratio(r.width, r.height)}${round ? " · circle" : radius ? ` · radius ${radius}` : ""}`;
  if (el.classList.contains("receipt")) return `receipt · ${Math.round(r.width)} wide`;
  const lh = cs.lineHeight === "normal" ? "" : `/${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2).replace(/0$/, "")}`;
  const type = `${family(cs)} ${px(cs.fontSize)}${lh} · ${cs.fontWeight}`;
  if (tag === "a" || tag === "button")
    return `${round ? "pill" : tag === "a" ? "link" : "button"} · height ${Math.round(r.height)}${radius ? ` · radius ${radius}` : ""}`;
  if (!detailed) return `${tag} · ${type}`;
  const pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px);
  const gap = px(cs.columnGap) || px(cs.rowGap);
  return [
    `${tag} · ${type}`,
    pad.some(Boolean) ? `padding ${pad.join(" ")}` : "",
    (cs.display.includes("flex") || cs.display.includes("grid")) && gap ? `gap ${gap}` : "",
    radius ? `radius ${radius}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function InspectMode() {
  const [on, setOn] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [hover, setHover] = useState<Box | null>(null);

  const measure = useCallback(() => {
    const vh = innerHeight;
    // Nothing is labeled under the sticky header or chapter bar.
    const top = Math.max(0, ...[...document.querySelectorAll("header, nav[aria-label='Chapters']")].map((n) => n.getBoundingClientRect().bottom));
    const out: Box[] = [];
    let last = { label: "", y: -1 };
    document.querySelectorAll(SELECTOR).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < top + 20 || r.top > vh || r.width < 40 || r.height < 14) return;
      if (getComputedStyle(el).visibility === "hidden") return;
      if (el.closest("[data-inspect-skip], nav[aria-label='Chapters']")) return;
      const label = describe(el);
      // A row of identical controls gets one tag; the rest are outlined only.
      const repeat = label === last.label && Math.abs(r.top - last.y) < 6;
      last = { label, y: r.top };
      // Clip at the sticky bars so outlines never run under them.
      const y = Math.max(r.top, top);
      out.push({ x: r.left, y, w: r.width, h: r.bottom - y, label: repeat ? "" : label, inset: y > r.top ? 1 : 0 });
    });
    setBoxes(out.slice(0, 24));
  }, []);

  useEffect(() => {
    const flip = () => {
      setHover(null);
      setOn((v) => !v);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      const typing = t instanceof Element && t.closest("input, textarea, select, [contenteditable]");
      if (typing || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (e.key === "i" || e.key === "I") flip();
      if (e.key === "Escape") setOn(false);
    };
    addEventListener(INSPECT_EVENT, flip);
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener(INSPECT_EVENT, flip);
      removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-inspect", on);
    if (!on) return;
    let raf = 0;
    const queue = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element)?.closest?.("main *");
      if (!el) return setHover(null);
      const r = el.getBoundingClientRect();
      setHover({ x: r.left, y: r.top, w: r.width, h: r.height, label: describe(el, true) });
    };
    queue();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      removeEventListener("pointermove", onMove);
    };
  }, [on, measure]);

  if (!on) return null;
  return createPortal(
    <div className="inspect-layer" aria-hidden>
      {boxes.map((b, i) => (
        <div key={i} className="inspect-box" style={{ left: b.x, top: b.y, width: b.w, height: b.h }}>
          {b.label && (
            <i className={b.inset ? "in" : ""}>
              {b.label}
            </i>
          )}
        </div>
      ))}
      {hover && (
        <div className="inspect-box is-hover" style={{ left: hover.x, top: hover.y, width: hover.w, height: hover.h }}>
          <i className={hover.y < 120 ? "in" : ""}>{hover.label}</i>
        </div>
      )}
      <div className="inspect-hint">
        Inspecting: live values. Hover anything.
        <button type="button" onClick={() => setOn(false)}>
          Exit (Esc)
        </button>
      </div>
    </div>,
    document.body
  );
}
