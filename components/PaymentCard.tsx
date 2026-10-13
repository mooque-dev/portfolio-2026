import Link from "next/link";
import type { ReceiptLine } from "@/components/ResultsReceipt";
import LockedNote from "@/components/LockedNote";

// The results as a card and its statement, the way a banking app shows them:
// a card on top, recent activity below. The mark is our own two circles in
// red and amber, a nod to the Mastercard logo rather than a copy of it.
const CASE_NAMES: Record<string, string> = {
  "/work/transaction-workflows": "Transaction Workflows",
  "/work/fee-opt-in-experimentation": "Fee Opt-In",
  "/work/automation-nonprofits": "Automation for Nonprofits",
  "/work/orchid-design-system": "Orchid design system",
  "/resume": "Résumé",
};

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

export default function PaymentCard({ lines, total }: { lines: ReceiptLine[]; total?: ReceiptLine }) {
  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:items-start">
      <div className="min-w-0">
        <div
          className="group relative aspect-[1.586] w-full max-w-[380px] overflow-hidden rounded-[18px] p-[6%] text-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] hover:-rotate-1 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
          style={{ background: "radial-gradient(120% 140% at 0% 0%, #3a3734 0%, #1b1a19 55%, #0f0e0d 100%)" }}
          role="img"
          aria-label="A payment card: Allen Kang, Senior Product Designer, eight years in product design, five in payments."
        >
          <div className="flex items-start justify-between">
            <span className="text-[15px] font-semibold tracking-[-0.01em]">mooque</span>
            <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/60">Open to senior &amp; staff</span>
          </div>
          <div className="mt-[7%] flex items-center gap-3">
            <Chip />
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a10 10 0 0 1 0 14M5 10a2.5 2.5 0 0 1 0 4" />
            </svg>
          </div>
          <p className="mt-[6%] font-mono text-[clamp(14px,4.4vw,19px)] tracking-[0.12em] text-white/90 tabular-nums">
            •••• •••• •••• 2018
          </p>
          <div className="absolute inset-x-[6%] bottom-[7%] flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Member since 2018</p>
              <p className="mt-1 truncate text-[14px] font-medium uppercase tracking-[0.08em]">Allen Kang</p>
            </div>
            <Mark className="h-8 w-auto flex-none" />
          </div>
        </div>
        <p className="mt-5 max-w-[380px] text-[14.5px] leading-relaxed text-muted">
          Eight years in product design, the last five in payments.
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-border">
        <div className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-4">
          <p className="text-[15px] font-semibold">Recent activity</p>
          <p className="text-[13px] text-muted">Tap a line to open the case</p>
        </div>
        <ul className="m-0 list-none p-0">
          {lines.map((l) => (
            <li key={l.label} className="border-b border-border last:border-0">
              <Link
                href={l.href}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.04]"
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 flex-none place-items-center rounded-full bg-foreground/[0.06] text-[13px] font-semibold"
                >
                  {l.label.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium">{l.label}</span>
                  <span className="flex items-center gap-2 truncate text-[13px] text-muted">
                    {CASE_NAMES[l.href] ?? ""}
                    <LockedNote href={l.href} />
                  </span>
                </span>
                <span className="flex-none text-[15px] font-semibold tabular-nums">{l.value}</span>
              </Link>
            </li>
          ))}
        </ul>
        {total && (
          <Link
            href={total.href}
            className="flex items-center justify-between gap-4 rounded-b-2xl border-t border-border bg-foreground/[0.03] px-5 py-4 transition-colors hover:bg-foreground/[0.06]"
          >
            <span className="text-[15px] font-semibold">{total.label}</span>
            <span className="text-[15px] font-semibold tabular-nums">{total.value}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
