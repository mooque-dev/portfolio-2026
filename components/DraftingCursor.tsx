"use client";

import { useEffect, useRef, useState } from "react";

// A drafting crosshair for the Autodesk page's intro: two thin lines that
// follow the pointer across the band, with the coordinates beside them, the
// way a CAD cursor reads out where it is. Pointer devices only; it stays
// hidden for touch and under reduced motion.
export default function DraftingCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const leave = () => setPos(null);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className="dc" aria-hidden>
      {pos ? (
        <>
          <i className="dc-h" style={{ top: pos.y }} />
          <i className="dc-v" style={{ left: pos.x }} />
          <span className="dc-read" style={{ left: pos.x + 14, top: pos.y + 14 }}>
            X {Math.round(pos.x)} &nbsp;Y {Math.round(pos.y)}
          </span>
        </>
      ) : null}
    </div>
  );
}
