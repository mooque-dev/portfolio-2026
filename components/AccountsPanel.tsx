import Link from "next/link";

// The work as an accounts panel: three totals across the top, then one row
// per project with a monogram, what it was, and the result set like a
// balance, the small unit raised beside the number. Every row opens its
// case study. Colours come from the page (--ap-*), so it can sit on the
// Mercury page's light or dark sections.
export type Account = { mono: string; name: string; meta: string; value: string; unit?: string; href: string };

export default function AccountsPanel({ totals, rows }: { totals: [string, string, string?][]; rows: Account[] }) {
  return (
    <div className="ap">
      <dl className="ap-totals">
        {totals.map(([label, value, unit]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {value}
              {unit ? <sup>{unit}</sup> : null}
            </dd>
          </div>
        ))}
      </dl>
      <div className="ap-head" aria-hidden>
        <span>Project</span>
        <span>Result</span>
      </div>
      <ul className="ap-rows">
        {rows.map((r) => (
          <li key={r.name}>
            <Link href={r.href} className="ap-row">
              <span className="ap-mono" aria-hidden>
                {r.mono}
              </span>
              <span className="ap-what">
                <span className="ap-name">{r.name}</span>
                <span className="ap-meta">{r.meta}</span>
              </span>
              <span className="ap-val">
                {r.value}
                {r.unit ? <sup>{r.unit}</sup> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
