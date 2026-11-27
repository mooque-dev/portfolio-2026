"use client";

import Image from "next/image";
import { useState } from "react";

type Item = { img: string; text: string };

// The home page's opening picture: Allen's own pixel stickers, stuck on the
// paper beside the headline. Each one is a fact about him; pick one and its
// line shows underneath. Every sticker is drawn on an 8px grid, so sizes here
// are whole multiples of that grid (4x) and the pixels stay square.
const PLACE: Record<string, { w: number; h: number; x: number; y: number; r: number }> = {
  "stage-mic": { w: 120, h: 92, x: 2, y: 0, r: -6 },
  palette: { w: 84, h: 72, x: 70, y: 4, r: 8 },
  "rainbow-flower": { w: 108, h: 128, x: 2, y: 44, r: 5 },
  "running-shoe": { w: 112, h: 76, x: 38, y: 48, r: -9 },
  "bear-heart": { w: 92, h: 100, x: 72, y: 50, r: 7 },
  invader: { w: 120, h: 96, x: 33, y: 8, r: 3 },
};

export default function StickerSheet({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="sheet">
      <ul className="sheet-board" aria-label="A few things about me">
        {items.map((o, i) => {
          const id = o.img.split("/").pop()!.replace(".png", "");
          const p = PLACE[id];
          if (!p) return null;
          return (
            <li key={o.img} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--r" as string]: `${p.r}deg` }}>
              <button
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="sheet-sticker"
              >
                <Image src={o.img} alt="" width={p.w} height={p.h} className="[image-rendering:pixelated]" style={{ width: p.w, height: p.h }} />
                <span className="sr-only">{o.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sheet-line" aria-live="polite">{items[active]?.text}</p>
    </div>
  );
}
