import Link from "next/link";

// The Scribd page's opening object: the case studies as a shelf of book
// covers. One cover is the tests that lost, because those taught the most.
const BOOKS = [
  { title: "Fee Opt-In", by: "75% to 92%", tone: "b1", href: "/work/fee-opt-in-experimentation" },
  { title: "The Tests That Lost", by: "two variants the slider beat", tone: "b2", href: "/work/fee-opt-in-experimentation#try" },
  { title: "Automation", by: "+13% ARR", tone: "b3", href: "/work/automation-nonprofits" },
  { title: "Transaction Workflows", by: "−70% tickets", tone: "b4", href: "/work/transaction-workflows" },
  { title: "Orchid", by: "340+ components", tone: "b5", href: "/work/orchid-design-system" },
  { title: "ARND", by: "161 pull requests", tone: "b6", href: "/work/arnd" },
];

export default function BookShelf() {
  return (
    <ul className="bk" aria-label="Case studies, as books">
      {BOOKS.map((b) => (
        <li key={b.title}>
          <Link href={b.href} className={`bk-cover ${b.tone}`}>
            <span className="bk-title">{b.title}</span>
            <span className="bk-by">{b.by}</span>
            <span className="bk-au">Allen Kang</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
