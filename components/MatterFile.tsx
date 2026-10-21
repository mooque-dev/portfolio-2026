// The Clio pages' opening object: a matter file, the way a practice
// management tool keeps one. The header is Allen's record; below it, the
// platform page lists how three products became one, and the insights page
// shows a short report. Every number is on the résumé. Container units, so
// it scales with its column; the paper stays light in both themes.
import Link from "next/link";

const RECORD: [string, string][] = [
  ["Responsible", "Allen Kang"],
  ["Practice area", "Product design"],
  ["Opened", "2018"],
  ["Status", "Open"],
];

const ENTRIES = [
  { date: "2025", text: "Owned payments across Aplos, Keela and Raisely as they merged into one suite", href: "/work/transaction-workflows" },
  { date: "2025", text: "Made every field mapping visible before the first joint launch", href: "/work/aplos-keela-integration" },
  { date: "2023", text: "Got three teams onto one design system, 340+ components", href: "/work/orchid-design-system" },
];

const BARS = [
  { label: "Donors covering the fee", from: 75, to: 92, value: "75% to 92%", href: "/work/fee-opt-in-experimentation" },
  { label: "Categorization tickets", from: 100, to: 30, value: "-70%", href: "/work/transaction-workflows" },
  { label: "Organizations on Automation", from: 0, to: 30, value: "30% of 355", href: "/work/automation-nonprofits" },
];

export default function MatterFile({ preset = "platform" }: { preset?: "platform" | "insights" }) {
  return (
    <div className="mf-wrap">
      <div className="mf">
        <div className="mf-tab">Matter 2018-0008</div>
        <div className="mf-body">
          <p className="mf-title">Senior product design</p>
          <dl className="mf-rec">
            {RECORD.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{k === "Status" ? <span className="mf-open">{v}</span> : v}</dd>
              </div>
            ))}
          </dl>
          {preset === "platform" ? (
            <>
              <p className="mf-sec">Activity</p>
              <ol className="mf-log">
                {ENTRIES.map((e) => (
                  <li key={e.text}>
                    <span className="mf-date">{e.date}</span>
                    <Link href={e.href}>{e.text}</Link>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <>
              <p className="mf-sec">Report &middot; before and after</p>
              <ul className="mf-bars">
                {BARS.map((b) => (
                  <li key={b.label}>
                    <Link href={b.href} className="mf-bl">
                      <span>{b.label}</span>
                      <b>{b.value}</b>
                    </Link>
                    <span className="mf-track" aria-hidden>
                      <i className="mf-from" style={{ width: `${b.from}%` }} />
                      <i className="mf-to" style={{ width: `${b.to}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
