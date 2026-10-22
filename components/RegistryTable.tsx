import Link from "next/link";

// The Signal 1 page's opening object: the work as a registry, the way a
// governance tool lists what is running, its status and what it is doing.
const ROWS = [
  { name: "MyJourney dashboards", area: "Healthcare", status: "Shipped", metric: "4 screens rebuilt", href: "/case/care-pathway/index.html" },
  { name: "Orchid design system", area: "Platform", status: "In use", metric: "340+ components", href: "/work/orchid-design-system" },
  { name: "Aplos × Keela sync", area: "Data", status: "Shipped", metric: "1st joint launch", href: "/work/aplos-keela-integration" },
  { name: "Automation", area: "Workflows", status: "In use", metric: "+13% ARR", href: "/work/automation-nonprofits" },
  { name: "ARND", area: "Built with AI", status: "Live beta", metric: "161 pull requests", href: "/work/arnd" },
];

export default function RegistryTable() {
  return (
    <div className="rg">
      <div className="rg-head">
        <p className="rg-title">Portfolio registry</p>
        <p className="rg-count">{ROWS.length} entries</p>
      </div>
      <ul className="rg-rows">
        {ROWS.map((r) => (
          <li key={r.name}>
            <Link href={r.href} className="rg-row">
              <span className="rg-name">
                {r.name}
                <span>{r.area}</span>
              </span>
              <span className="rg-status">{r.status}</span>
              <span className="rg-metric">{r.metric}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
