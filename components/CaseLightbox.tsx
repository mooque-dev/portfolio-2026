"use client";

import { useEffect, useRef, useState } from "react";

// Click any case-study image to see it full size. Confidential (blurred)
// images stay out of it, so the lightbox never shows them unblurred.
export default function CaseLightbox({ skipBlurred }: { skipBlurred: boolean }) {
  const [shown, setShown] = useState<{ src: string; alt: string; cap: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLImageElement>("[data-case-body] img").forEach((img) => {
      if (skipBlurred && !img.classList.contains("clear")) return;
      const label = img.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || img.alt;
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Enlarge: ${label}`);
      img.dataset.zoom = "";
      const open = () => {
        openerRef.current = img;
        setShown({ src: img.currentSrc || img.src, alt: img.alt, cap: label === img.alt ? "" : label });
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
    return () => cleanups.forEach((c) => c());
  }, [skipBlurred]);

  useEffect(() => {
    if (!shown) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shown]);

  function close() {
    setShown(null);
    openerRef.current?.focus();
  }

  if (!shown) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shown.cap || shown.alt}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 md:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        className="absolute top-4 right-4 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-black"
      >
        Close
      </button>
      <figure className="m-0 flex max-h-full flex-col items-center">
        <img src={shown.src} alt={shown.alt} className="max-h-[84vh] max-w-[94vw] rounded-lg bg-white object-contain" />
        {shown.cap && <figcaption className="mt-3 max-w-2xl text-center text-[15px] text-white/90">{shown.cap}</figcaption>}
      </figure>
    </div>
  );
}
