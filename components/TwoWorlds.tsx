"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import LockedNote from "@/components/LockedNote";

// Two overlapping circles, a nod to the Mastercard mark: each pair of worlds
// I work between, with me in the overlap. Our own warm red and amber, drawn
// as three shapes so the overlap reads the same on light and dark.
const PAIRS = [
  {
    a: "Design",
    b: "Product",
    text: "I write the hypothesis with the PM. When a fee change looked like a win, I argued to pause, tested four variations, and shipped the one that reached 92%.",
    href: "/work/fee-opt-in-experimentation",
    link: "Fee Opt-In",
  },
  {
    a: "Design",
    b: "Engineering",
    text: "I prototype in code and review pull requests with engineers. Orchid merged 340+ components into one library three teams chose to use.",
    href: "/work/orchid-design-system",
    link: "Orchid",
  },
  {
    a: "Software",
    b: "Finance teams",
    text: "I design for accountants and donors who never asked for software. Split transactions cut support tickets by 70%.",
    href: "/work/transaction-workflows",
    link: "Transaction Workflows",
  },
  {
    a: "Korean",
    b: "English",
    text: "I built the bilingual script reader a forty-person musical rehearsed with, so two languages could share one stage.",
    href: "/work/torontoyuwol",
    link: "Toronto Yuwol",
  },
];

const RED = "#E8412C";
const AMBER = "#F5A623";
const OVERLAP = "#F27A1A";
// Each label sits in its circle's crescent, about 150 units wide. All three
// labels in a pair share one size, so "me" always matches its two worlds.
const size = (a: string, b: string) => (Math.max(a.length, b.length) > 9 ? 17 : 22);

export default function TwoWorlds() {
  const [i, setI] = useState(0);
  const [apart, setApart] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const pair = PAIRS[i];
  const fs = size(pair.a, pair.b);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (n: number) => {
    if (n === i) return;
    setI(n);
    // The circles step apart and meet again, so the change is felt, not just read.
    setApart(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setApart(false), 220);
  };

  const shift = apart ? 22 : 0;
  const move = "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none";

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
      <div className="min-w-0">
        <svg viewBox="0 0 520 340" className="w-full max-w-[560px] h-auto" aria-hidden>
          <g className={move} style={{ transform: `translateX(${-shift}px)` }}>
            <circle cx="185" cy="170" r="150" fill={RED} />
            <text x="112" y="176" textAnchor="middle" fill="#fff" fontSize={fs} fontWeight="600" letterSpacing="-0.3">
              {pair.a}
            </text>
          </g>
          <g className={move} style={{ transform: `translateX(${shift}px)` }}>
            <circle cx="335" cy="170" r="150" fill={AMBER} />
            <text x="408" y="176" textAnchor="middle" fill="#1a1205" fontSize={fs} fontWeight="600" letterSpacing="-0.3">
              {pair.b}
            </text>
          </g>
          <g className={`transition-opacity duration-200 motion-reduce:transition-none ${apart ? "opacity-0" : "opacity-100"}`}>
            <path d="M260 40.1 A150 150 0 0 1 260 299.9 A150 150 0 0 1 260 40.1 Z" fill={OVERLAP} />
            <text x="260" y="176" textAnchor="middle" fill="#fff" fontSize={fs} fontWeight="600" letterSpacing="-0.3">
              me
            </text>
          </g>
        </svg>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Which two worlds">
          {PAIRS.map((p, n) => (
            <button
              key={p.a + p.b}
              type="button"
              aria-pressed={i === n}
              onClick={() => pick(n)}
              className={`rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition-colors ${
                i === n ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {p.a} <span aria-hidden>&times;</span>
              <span className="sr-only"> and </span> {p.b}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-6">
          <p className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] leading-snug">
            {pair.a} and {pair.b}
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-muted max-w-[46ch]">{pair.text}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-2.5 text-sm">
            <Link href={pair.href} className="inline-flex underline underline-offset-4 hover:opacity-70 transition-opacity">
              {pair.link} <Arrow />
            </Link>
            <LockedNote href={pair.href} />
          </p>
        </div>
      </div>
    </div>
  );
}
