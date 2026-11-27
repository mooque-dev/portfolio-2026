"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Item = { img: string; text: string };

// The home page's opening picture: Allen's own pixel stickers, stuck on the
// paper beside the headline. Each one is a fact about him; pick one and its
// line shows underneath. Every sticker is drawn on an 8px grid, so sizes here
// are whole multiples of that grid (4x) and the pixels stay square.
//
// The stage mic is also a switch: the house lights go down and a spotlight
// follows the pointer (or sits on the mic for keyboard users). The light
// layer never takes a click. Escape, the mic again, or scrolling away brings
// the lights up.
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
  const [lights, setLights] = useState(false);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const wrap = useRef<HTMLDivElement>(null);
  const mic = useRef<HTMLButtonElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const aim = (x: number, y: number) => {
    spot.current?.style.setProperty("--spot-x", `${x}px`);
    spot.current?.style.setProperty("--spot-y", `${y}px`);
  };

  useEffect(() => {
    if (!lights) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLights(false);
    const onMove = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && setLights(false));
    if (wrap.current) io.observe(wrap.current);
    addEventListener("keydown", onKey);
    addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      removeEventListener("keydown", onKey);
      removeEventListener("pointermove", onMove);
    };
  }, [lights]);

  const toggle = () => {
    const b = mic.current?.getBoundingClientRect();
    if (b && !lights) aim(b.left + b.width / 2, b.top + b.height / 2);
    setLights((on) => !on);
  };

  return (
    <div ref={wrap} className="sheet">
      <ul className="sheet-board" aria-label="A few things about me">
        {items.map((o, i) => {
          const id = o.img.split("/").pop()!.replace(".png", "");
          const p = PLACE[id];
          if (!p) return null;
          const isMic = id === "stage-mic";
          return (
            <li key={o.img} style={{ left: `${p.x}%`, top: `${p.y}%`, ["--r" as string]: `${p.r}deg` }}>
              <button
                ref={isMic ? mic : undefined}
                type="button"
                aria-pressed={isMic ? lights : active === i}
                data-on={active === i || undefined}
                title={isMic ? (lights ? "Bring the lights up" : "Spotlight, please") : undefined}
                onClick={() => {
                  setActive(i);
                  if (isMic) toggle();
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="sheet-sticker"
              >
                <Image src={o.img} alt="" width={p.w} height={p.h} className="[image-rendering:pixelated]" style={{ width: p.w, height: p.h }} />
                <span className="sr-only">{isMic ? `${o.text} ${lights ? "Bring the lights up." : "Turn on the spotlight."}` : o.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sheet-line" aria-live="polite">{items[active]?.text}</p>
      {mounted && createPortal(<div ref={spot} className={`spotlight ${lights ? "is-on" : ""}`} aria-hidden />, document.body)}
      <p className="sr-only" aria-live="polite">{lights ? "Spotlight on. Press Escape to bring the lights up." : ""}</p>
    </div>
  );
}
