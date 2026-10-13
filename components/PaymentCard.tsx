import type { ReactNode } from "react";
import Link from "next/link";

// The tailored pages' money metaphor: a card that says who I am, and a
// statement of the work, one line per case, each opening its page. The mark
// is our own two circles in red and amber, a nod to the Mastercard logo
// rather than a copy of it. (The Float page has its own card, FloatCard.)
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#E8412C" />
      <circle cx="36" cy="16" r="16" fill="#F5A623" />
      <path d="M26 3.5 A16 16 0 0 1 26 28.5 A16 16 0 0 1 26 3.5 Z" fill="#F27A1A" />
    </svg>
  );
}

function Chip() {
  return (
    <svg viewBox="0 0 44 34" className="h-[30px] w-auto" aria-hidden>
      <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="#d9b867" stroke="#b8963f" />
      <path d="M0.5 12h14M0.5 22h14M29.5 12h14M29.5 22h14M14.5 0.5v33M29.5 0.5v33M14.5 17h15" stroke="#b8963f" fill="none" />
    </svg>
  );
}

export default function PaymentCard() {
  return (
    <div
      className="relative aspect-[1.586] w-full max-w-[400px] overflow-hidden rounded-[18px] p-[6%] text-white shadow-[0_28px_48px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:-rotate-1 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
      style={{ background: "radial-gradient(120% 140% at 0% 0%, #3a3734 0%, #1b1a19 55%, #0f0e0d 100%)" }}
      role="img"
      aria-label="A payment card: Allen Kang, product designer in payments since 2018. Card number: 1994, 2007, 2018, 2026."
    >
      <div className="flex items-start justify-between">
        <span className="text-[15px] font-semibold tracking-[-0.01em]">mooque</span>
        <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/60">Prepared for Mastercard</span>
      </div>
      <div className="mt-[7%] flex items-center gap-3">
        <Chip />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a10 10 0 0 1 0 14M5 10a2.5 2.5 0 0 1 0 4" />
        </svg>
      </div>
      <p className="mt-[6%] font-mono text-[clamp(14px,4.4vw,19px)] tracking-[0.12em] text-white/90 tabular-nums">
        1994 2007 2018 2026
      </p>
      <div className="absolute inset-x-[6%] bottom-[7%] flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Designing since 2018</p>
          <p className="mt-1 truncate text-[14px] font-medium uppercase tracking-[0.08em]">Allen Kang</p>
        </div>
        <Mark className="h-8 w-auto flex-none" />
      </div>
    </div>
  );
}

export interface StatementLine {
  tag: string;
  title: string;
  line: string;
  value: string;
  href: string;
  // What the number measures, in a few words, shown under it.
  note?: string;
}

// One row per case: what kind of problem it was, what happened, the number,
// and the way in. The rows are the page's directory, not a second copy of it.
export function Statement({ lines, footer }: { lines: StatementLine[]; footer?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border">
      <ul className="m-0 list-none p-0">
        {lines.map((l) => (
          <li key={l.href} className="border-b border-border last:border-0">
            <Link
              href={l.href}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.04] md:grid-cols-[150px_minmax(0,1fr)_auto] md:px-6"
            >
              <span className="col-span-2 text-[12.5px] text-muted md:col-span-1">{l.tag}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2 text-[16px] font-semibold">
                  {l.title}
                </span>
                <span className="mt-0.5 block text-[14px] leading-snug text-muted">{l.line}</span>
              </span>
              <span className="flex items-center gap-2 text-right">
                <span>
                  <span className="block text-[15px] font-semibold tabular-nums">{l.value}</span>
                  {l.note && <span className="mt-0.5 block max-w-[170px] text-[12.5px] leading-snug text-muted">{l.note}</span>}
                </span>
                <span aria-hidden className="text-muted transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
                  &rarr;
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {footer && <div className="rounded-b-2xl border-t border-border bg-foreground/[0.03] px-5 py-3.5 text-[14px] md:px-6">{footer}</div>}
    </div>
  );
}
