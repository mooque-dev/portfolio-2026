"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Results, printed like a payment receipt: most of the work it lists is about
// money moving correctly. It prints once, the first time it scrolls into
// view. If it's already on screen when the page loads, or the visitor prefers
// reduced motion, it simply sits there, complete.
export interface ReceiptLine {
  label: string;
  value: string;
  href: string;
}

const BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 1, 2];

export default function ResultsReceipt({ lines, total }: { lines: ReceiptLine[]; total?: ReceiptLine }) {
  const paper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = paper.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on the first screen: stay still.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    const full = el.scrollHeight;
    el.style.maxHeight = "0px";
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let h = 0;
        const step = () => {
          h = Math.min(full, h + 14);
          el.style.maxHeight = `${h}px`;
          if (h < full) timer = setTimeout(step, 40);
          else el.style.maxHeight = "";
        };
        step();
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    // Watch the slot, since the paper itself has no height until it prints.
    io.observe(el.parentElement ?? el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const row = (l: ReceiptLine, strong = false) => (
    <li key={l.label}>
      <Link
        href={l.href}
        className={`flex justify-between gap-3 rounded-sm hover:bg-black/[0.05] focus-visible:bg-black/[0.05] ${strong ? "font-semibold" : ""}`}
      >
        <span>{l.label}</span>
        <b className="font-semibold whitespace-nowrap">{l.value}</b>
      </Link>
    </li>
  );

  return (
    <div className="w-full max-w-[300px]">
      <div className="h-3 rounded-full bg-foreground/85" aria-hidden />
      <div
        ref={paper}
        className="receipt mx-[15px] -mt-1 overflow-hidden bg-[#fffdf7] px-4 tabular-nums text-[12.5px] leading-[1.55] text-[#1d1c19] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.45)]"
        aria-label="Results, as a receipt"
      >
        <div className="pt-4 pb-6">
          <p className="m-0 text-center font-semibold">ALLEN KANG</p>
          <p className="m-0 text-center">Senior Product Designer</p>
          <p className="m-0 text-center">Toronto · 7 years</p>
          <hr className="my-2 border-0 border-t border-dashed border-[#9a978d]" />
          <ul className="m-0 list-none p-0">{lines.map((l) => row(l))}</ul>
          {total && (
            <>
              <hr className="my-2 border-0 border-t border-dashed border-[#9a978d]" />
              <ul className="m-0 list-none p-0">{row(total, true)}</ul>
            </>
          )}
          <hr className="my-2 border-0 border-t border-dashed border-[#9a978d]" />
          <p className="m-0 text-center">Thank you for reviewing</p>
          <div className="mt-2.5 flex h-7 justify-center gap-px" aria-hidden>
            {BARS.map((w, i) => (
              <i key={i} className="block bg-[#1d1c19]" style={{ width: w }} />
            ))}
          </div>
          <p className="m-0 mt-1 text-center text-[11px]">allenkang.com</p>
        </div>
      </div>
    </div>
  );
}
