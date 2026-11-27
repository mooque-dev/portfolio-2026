import Link from "next/link";

// Results as plain rows: what changed on the left, the number on the right.
// Every row opens the case behind it.
export interface ResultLine {
  label: string;
  value: string;
  href: string;
}

export default function ResultsList({ lines, className = "" }: { lines: ResultLine[]; className?: string }) {
  return (
    <ul className={`m-0 list-none p-0 border-t border-border ${className}`}>
      {lines.map((l) => (
        <li key={l.label} className="border-b border-border">
          <Link
            href={l.href}
            className="group flex items-baseline justify-between gap-6 py-3 hover:opacity-70 transition-opacity"
          >
            <span className="min-w-0 text-[15px] text-muted group-hover:text-foreground transition-colors">{l.label}</span>
            <span className="whitespace-nowrap text-xl font-semibold tracking-tight tabular-nums">{l.value}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
