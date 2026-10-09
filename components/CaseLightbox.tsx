"use client";

import { useEffect, useRef, useState } from "react";

interface Shot {
  img: HTMLImageElement;
  src: string;
  alt: string;
  cap: string;
}

// Click any case-study image to see it full size, then step through the rest
// with the arrow keys or buttons. Confidential (blurred) images stay out of
// it, so the lightbox never shows them unblurred.
export default function CaseLightbox({ skipBlurred }: { skipBlurred: boolean }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const list: Shot[] = [];
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLImageElement>("[data-case-body] img").forEach((img) => {
      if (skipBlurred && !img.classList.contains("clear")) return;
      if (img.closest("[data-demo]")) return;
      const label = img.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || img.alt;
      const i = list.length;
      list.push({ img, src: img.currentSrc || img.src, alt: img.alt, cap: label === img.alt ? "" : label });
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Enlarge: ${label}`);
      img.dataset.zoom = "";
      const open = () => {
        openerRef.current = img;
        setIndex(i);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };
      img.addEventListener("click", open);
      img.addEventListener("keydown", onKey);
      cleanups.push(() => {
        img.removeEventListener("click", open);
        img.removeEventListener("keydown", onKey);
      });
    });
    setShots(list);
    return () => cleanups.forEach((c) => c());
  }, [skipBlurred]);

  const open = index !== null;
  const step = (d: number) =>
    setIndex((i) => (i === null || shots.length === 0 ? i : (i + d + shots.length) % shots.length));

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  function close() {
    setIndex(null);
    openerRef.current?.focus();
  }

  if (index === null || !shots[index]) return null;
  const shown = shots[index];
  const many = shots.length > 1;
  const btn = "rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-black";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shown.cap || shown.alt}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 md:p-8"
    >
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {many && (
          <span className="mr-1 text-[13px] text-white/80 tabular-nums" aria-live="polite">
            {index + 1} of {shots.length}
          </span>
        )}
        <button ref={closeRef} type="button" onClick={close} className={btn}>
          Close
        </button>
      </div>
      <figure className="m-0 flex max-h-full flex-col items-center">
        <img src={shown.src} alt={shown.alt} className="max-h-[80vh] max-w-[94vw] rounded-lg bg-white object-contain" />
        {shown.cap && <figcaption className="mt-3 max-w-2xl text-center text-[15px] text-white/90">{shown.cap}</figcaption>}
        {many && (
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => step(-1)} className={btn} aria-label="Previous image">
              &larr; Previous
            </button>
            <button type="button" onClick={() => step(1)} className={btn} aria-label="Next image">
              Next &rarr;
            </button>
          </div>
        )}
      </figure>
    </div>
  );
}
