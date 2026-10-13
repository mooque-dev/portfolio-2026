// A small pill on a cover that says there's something to try inside: a
// working demo ("Interactive") or the real product ("Live app"). White with
// a red dot, so it reads the same on every cover colour.
export type TryTagKind = "Interactive" | "Live app";

export default function TryTag({ kind, className = "" }: { kind: TryTagKind; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-medium leading-none text-[#141414] shadow-[0_1px_3px_rgba(0,0,0,0.18)] ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--seal)]" />
      {kind}
    </span>
  );
}
