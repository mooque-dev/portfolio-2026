import Link from "next/link";

// The Harvey page's opening object: a one-page statement on pleading paper,
// with numbered lines down the margin and an exhibit sticker. Each claim
// cites the case that backs it, the way a brief cites authority. Our own
// document: no company marks. Sized in container units, so it scales with
// its column; the paper stays light in both themes.
const CLAIMS: { text: string; see?: { name: string; href: string } }[] = [
  { text: "Allen Kang (the “Designer”) has designed software for eight years, the last five on payments and finance tools." },
  {
    text: "The Designer learned three countries’ tax rules from accountants, then cut categorization tickets by 70%.",
    see: { name: "Transaction Workflows", href: "/work/transaction-workflows" },
  },
  {
    text: "The Designer paused a launch that looked like a win, and the fix lifted opt-in from 75% to 92%.",
    see: { name: "Fee Opt-In", href: "/work/fee-opt-in-experimentation" },
  },
  {
    text: "The Designer grew one design system to 340+ components used by three teams.",
    see: { name: "Orchid", href: "/work/orchid-design-system" },
  },
  {
    text: "The Designer prototypes in code: 161 merged pull requests on a live app.",
    see: { name: "ARND", href: "/work/arnd" },
  },
];

const LINES = Array.from({ length: 28 }, (_, i) => i + 1);

export default function Brief() {
  return (
    <div className="br-wrap">
      <div className="br">
        <div className="br-sticker" aria-hidden>
          <span>Exhibit</span>
          <b>A</b>
        </div>
        <div className="br-sheet">
          <div className="br-body">
            <ol className="br-nums" aria-hidden>
              {LINES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
            <p className="br-title">Statement of qualifications</p>
            <ol className="br-claims">
              {CLAIMS.map((c, i) => (
                <li key={i}>
                  <span className="br-n">{i + 1}.</span> {c.text}
                  {c.see ? (
                    <>
                      {" "}
                      <i>See</i>{" "}
                      <Link href={c.see.href}>
                        <i>{c.see.name}</i>
                      </Link>
                      .
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <p className="br-foot">Allen Kang &middot; Toronto &middot; Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
}
