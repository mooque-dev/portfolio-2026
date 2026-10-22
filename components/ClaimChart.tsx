import Link from "next/link";

// The Stilta page's opening object: a claim chart, the table patent work is
// argued in. Each element of the claim is matched to evidence, with a cite.
const ROWS = [
  { el: "[a] a designer who learns the domain from its experts,", ev: "learned three countries’ tax rules from accountants, then cut categorization tickets by 70%", cite: "Transaction Workflows", href: "/work/transaction-workflows" },
  { el: "[b] who tests before shipping,", ev: "paused a launch that looked like a win; three fixes, tested, took opt-in from 75% to 92%", cite: "Fee Opt-In", href: "/work/fee-opt-in-experimentation" },
  { el: "[c] and builds from zero with AI,", ev: "designed and built a live app with Claude Code: 161 merged pull requests", cite: "ARND", href: "/work/arnd" },
];

export default function ClaimChart() {
  return (
    <div className="cc">
      <p className="cc-head">Claim 1 &middot; Claim chart</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Claim element</th>
            <th scope="col">Evidence</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.el}>
              <td>{r.el}</td>
              <td>
                {r.ev}. <Link href={r.href}>{r.cite}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
