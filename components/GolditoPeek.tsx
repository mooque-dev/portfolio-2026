"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Goldito's golden pup peeks up from the bottom-left corner as a page loads,
// says a short hello once, then stays put. Its note opens only when asked
// (hover, keyboard or tap). Hiding it is remembered.
// Bottom-left, because the home guide lives bottom-right.
const KEY = "peek-goldito-hidden";
const CASE = "/work/goldito";
const LEARNED = `${CASE}#five-things-i-d-bring-to-the-next-team`;

export default function GolditoPeek() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const bubbleId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  // Read the remembered choice after mount (storage can be blocked).
  useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(KEY) === "1";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHidden(stored);
  }, []);

  // Rise a few seconds after the page settles, never on first paint. A small
  // "New" tag says hello beside it once, then tucks away.
  const [hello, setHello] = useState(false);
  useEffect(() => {
    if (hidden || shown) return;
    // A beat after load, so the peek reads as a hello rather than a flash.
    const t = window.setTimeout(() => {
      setShown(true);
      setHello(true);
    }, 600);
    return () => window.clearTimeout(t);
  }, [hidden, shown]);
  useEffect(() => {
    if (!hello) return;
    const t = window.setTimeout(() => setHello(false), 6500);
    return () => window.clearTimeout(t);
  }, [hello]);

  // Escape or a click elsewhere closes the note.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const hide = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
    setHidden(true);
  };

  if (hidden || pathname.startsWith(CASE) || pathname.startsWith("/changelog")) return null;

  return (
    <div
      ref={wrap}
      className="fixed z-[55] print:hidden"
      style={{ left: "max(12px, env(safe-area-inset-left, 0px))", bottom: "env(safe-area-inset-bottom, 0px)" }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <div
        id={bubbleId}
        role="dialog"
        aria-label="New: Goldito"
        hidden={!open}
        className="absolute bottom-[calc(100%+6px)] left-0 w-[min(18rem,calc(100vw-24px))] rounded-xl border border-border bg-background p-4 text-[14px] leading-relaxed shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)]"
      >
        <p className="m-0 text-[12.5px] font-medium text-muted">New this month</p>
        <p className="m-0 mt-1">
          <b className="font-semibold">Goldito</b>, a pet-sitting app I&rsquo;m designing for the Nebius × NVIDIA
          hackathon, submitting Oct 30. A new way of working, written up.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {/* A plain link, so the browser lands on the section after the page loads. */}
          <a href={LEARNED} className="inline-flex items-center gap-1 font-medium underline underline-offset-4">
            What I learned
            <span aria-hidden>&rarr;</span>
          </a>
          <button type="button" onClick={hide} className="min-h-[36px] text-[13px] text-muted hover:text-foreground">
            Hide the pup
          </button>
        </div>
      </div>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(true)}
        className={`absolute bottom-3 left-[calc(100%+6px)] whitespace-nowrap rounded-full border border-border bg-background px-3 py-1.5 text-[13px] font-medium shadow-sm transition-opacity duration-500 motion-reduce:transition-none ${
          hello && !open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        New: Goldito
      </button>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={bubbleId}
        aria-label="Goldito, new this month. Show the note."
        // A mouse already opened it on hover, so its click only opens; taps and keys toggle.
        onClick={(e) => setOpen((o) => ((e.nativeEvent as PointerEvent).pointerType === "mouse" ? true : !o))}
        className={`peek-pup block h-16 w-16 rounded-t-[20px] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
          open ? "translate-y-0" : !shown ? "translate-y-full" : "translate-y-[10%] hover:translate-y-0"
        }`}
      />
    </div>
  );
}
