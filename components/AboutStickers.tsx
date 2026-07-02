"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMounted } from "@/lib/useMounted";

type Offset = { x: number; y: number };

// Scrapbook layout: scattered down the right margin of the About column.
// left is a percentage of the page container; top is px from its top.
const STICKERS = [
  { id: "shoe", w: 96, h: 70, left: 74, top: 150, rot: -8 },
  { id: "korea", w: 112, h: 82, left: 84, top: 360, rot: 6 },
  { id: "canada", w: 112, h: 82, left: 72, top: 560, rot: -5 },
  { id: "jacob", w: 104, h: 104, left: 87, top: 780, rot: 8 },
  { id: "hiromi", w: 104, h: 104, left: 74, top: 1000, rot: -7 },
  { id: "piano", w: 112, h: 72, left: 84, top: 1230, rot: 4 },
  { id: "trumpet", w: 104, h: 72, left: 71, top: 1480, rot: -10 },
  { id: "clarinet", w: 60, h: 90, left: 88, top: 1560, rot: 9 },
  { id: "guitar", w: 84, h: 103, left: 78, top: 1800, rot: -6 },
] as const;

const STORAGE_KEY = "about-stickers-v1";

// Decorative, draggable pixel stickers. Desktop only; arrangement persists
// locally so a visitor's scrapbook stays the way they left it.
export default function AboutStickers() {
  const mounted = useMounted();
  const [offsets, setOffsets] = useState<Record<string, Offset>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      return {};
    }
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const drag = useRef<{
    id: string;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  useEffect(() => {
    if (dragging) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(offsets));
    } catch {
      // storage full or blocked: the stickers just reset next visit
    }
  }, [offsets, dragging]);

  const onPointerDown = (id: string) => (e: React.PointerEvent) => {
    const base = offsets[id] ?? { x: 0, y: 0 };
    drag.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      baseX: base.x,
      baseY: base.y,
    };
    setDragging(id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setOffsets((o) => ({
      ...o,
      [d.id]: { x: d.baseX + e.clientX - d.startX, y: d.baseY + e.clientY - d.startY },
    }));
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(null);
  };

  // Render only after hydration: the stored offsets live in localStorage, and
  // rendering them during hydration would mismatch the server HTML (React
  // keeps the stale server attribute in that case, losing the arrangement).
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block absolute inset-0 pointer-events-none print:hidden"
    >
      {STICKERS.map((s) => {
        const o = offsets[s.id] ?? { x: 0, y: 0 };
        return (
          <div
            key={s.id}
            onPointerDown={onPointerDown(s.id)}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`absolute pointer-events-auto select-none touch-none ${
              dragging === s.id ? "cursor-grabbing z-30" : "cursor-grab z-10"
            }`}
            style={{
              left: `${s.left}%`,
              top: s.top,
              width: s.w,
              transform: `translate(${o.x}px, ${o.y}px) rotate(${s.rot}deg)`,
            }}
          >
            <Image
              src={`/stickers/${s.id}.png`}
              alt=""
              width={s.w}
              height={s.h}
              unoptimized
              draggable={false}
              className="pointer-events-none"
              style={{ imageRendering: "pixelated", width: "100%", height: "auto" }}
            />
          </div>
        );
      })}
    </div>
  );
}
