"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Item = { img: string; text: string };

// Off the clock, with stickers you can pick up. The stage mic is a switch:
// the house lights go down and a spotlight follows the pointer (or sits on
// the mic for keyboard users). The light layer never takes a click. Escape,
// the mic again, or scrolling away brings the lights up.
export default function OffClock({ items }: { items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const mic = useRef<HTMLButtonElement>(null);
  const [lights, setLights] = useState(false);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

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
    <div ref={wrap} className={`offclock ${lights ? "is-dark" : ""}`}>
      <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((o) => {
          const isMic = o.img.includes("stage-mic");
          const art = (
            <Image src={o.img} alt="" width={64} height={48} className="h-12 w-auto object-contain object-left [image-rendering:pixelated]" />
          );
          return (
            <li key={o.img} className="flex flex-col gap-3 min-w-0">
              {isMic ? (
                <button
                  ref={mic}
                  type="button"
                  onClick={toggle}
                  aria-pressed={lights}
                  title={lights ? "Bring the lights up" : "Spotlight, please"}
                  className="sticker w-fit cursor-pointer rounded-md"
                >
                  {art}
                  <span className="sr-only">{lights ? "Stage mic: bring the lights up" : "Stage mic: turn on the spotlight"}</span>
                </button>
              ) : (
                <span className="sticker w-fit">{art}</span>
              )}
              <p className="text-[14px] leading-relaxed text-muted">{o.text}</p>
            </li>
          );
        })}
      </ul>
      {/* Portaled to the body: the section's fade-in transform would otherwise
          trap a fixed layer inside the section's box. */}
      {mounted && createPortal(<div ref={spot} className={`spotlight ${lights ? "is-on" : ""}`} aria-hidden />, document.body)}
      <p className="sr-only" aria-live="polite">{lights ? "Spotlight on. Press Escape to bring the lights up." : ""}</p>
    </div>
  );
}
