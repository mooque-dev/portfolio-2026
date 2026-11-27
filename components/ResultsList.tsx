import Link from "next/link";

// Results as plain rows: what changed on the left, the number on the right.
// Every row opens the case behind it.
export interface ResultLine {
  label: string;
  value: string;
  href: string;
}

export default function ResultsList({ lines, className = "", circle = false }: { lines: ResultLine[]; className?: string; circle?: boolean }) {
  return (
    <ul className={`m-0 list-none p-0 border-t border-border ${className}`}>
      {lines.map((l, i) => (
        <li key={l.label} className="border-b border-border">
          <Link
            href={l.href}
            className="group flex items-baseline justify-between gap-6 py-3 hover:opacity-70 transition-opacity"
          >
            <span className="min-w-0 text-[15px] text-muted group-hover:text-foreground transition-colors">{l.label}</span>
            <span className={`whitespace-nowrap text-xl font-semibold tracking-tight tabular-nums ${circle && i === 0 ? "pen-circle" : ""}`}>
              {l.value}
              {circle && i === 0 && (
                <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M52 3 C 22 1, 3 9, 4 21 C 5 34, 30 39, 56 37 C 82 35, 98 28, 96 17 C 94 6, 70 1, 40 4" />
                </svg>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
