"use client";

import { useState } from "react";

// The Pawlicy page's opening object: a sample pet insurance plan with three
// terms that trip people up. Each term reads two ways, the policy wording and
// the plain version, and a sample vet bill shows what the plan would pay back.
// The plan, the wording and the numbers are made up for illustration; they
// are not Pawlicy's product or any insurer's. Sized in container units.
type TermKey = "deductible" | "reimbursement" | "limit";

const PLAN = { deductible: 250, rate: 0.8, limit: 5000 };

const TERMS: { key: TermKey; name: string; policy: string; plain: string }[] = [
  {
    key: "deductible",
    name: "Deductible",
    policy: "The Deductible is the amount of Covered Expenses the Insured must incur and pay in each Policy Period before benefits become payable hereunder.",
    plain: "The first $250 of vet bills each year is yours. After that, the plan starts paying.",
  },
  {
    key: "reimbursement",
    name: "Reimbursement",
    policy: "Benefits are payable at the Reimbursement Percentage shown on the Declarations Page, applied to Eligible Expenses remaining after satisfaction of the Deductible.",
    plain: "Once the $250 is covered, the plan pays back 80% of each covered bill. You pay the other 20%.",
  },
  {
    key: "limit",
    name: "Annual limit",
    policy: "The Annual Maximum Benefit is the aggregate amount payable for all claims incurred during a Policy Period, as stated on the Declarations Page.",
    plain: "The most the plan pays in one year is $5,000. Past that, the rest is yours until the plan year starts over.",
  },
];

const BILLS = [400, 1500, 8000];
const usd = (n: number) => "$" + n.toLocaleString("en-US");

export default function PlanExplainer() {
  const [term, setTerm] = useState<TermKey>("deductible");
  const [plain, setPlain] = useState(false);
  const [bill, setBill] = useState(1500);
  const t = TERMS.find((x) => x.key === term)!;

  const ded = Math.min(bill, PLAN.deductible);
  const share = (bill - ded) * PLAN.rate;
  const pays = Math.min(share, PLAN.limit);
  const capped = share > PLAN.limit;
  const yours = bill - pays;

  return (
    <div className="pe-wrap">
      <div className="pe">
        <div className="pe-top">
          <span className="pe-pet">Sample plan for a 4-year-old dog</span>
          <span className="pe-sample">Made-up numbers</span>
        </div>

        <div className="pe-terms" role="group" aria-label="Term">
          {TERMS.map((x) => (
            <button key={x.key} type="button" aria-pressed={x.key === term} onClick={() => setTerm(x.key)}>
              {x.name}
            </button>
          ))}
        </div>

        <div className="pe-read">
          <div className="pe-mode" role="group" aria-label="How it reads">
            <button type="button" aria-pressed={!plain} onClick={() => setPlain(false)}>Policy wording</button>
            <button type="button" aria-pressed={plain} onClick={() => setPlain(true)}>Plain version</button>
          </div>
          <p className={`pe-text ${plain ? "pe-plain" : "pe-policy"}`} aria-live="polite">
            {plain ? t.plain : t.policy}
          </p>
        </div>

        <div className="pe-calc">
          <div className="pe-bills" role="group" aria-label="Sample vet bill">
            <span className="pe-label">Sample vet bill</span>
            {BILLS.map((b) => (
              <button key={b} type="button" aria-pressed={b === bill} onClick={() => setBill(b)}>
                {usd(b)}
              </button>
            ))}
          </div>
          <dl className="pe-rows" aria-live="polite">
            <div className={term === "deductible" ? "on" : ""}>
              <dt>Deductible, paid by you</dt>
              <dd>{usd(ded)}</dd>
            </div>
            <div className={term === "reimbursement" ? "on" : ""}>
              <dt>80% of the rest</dt>
              <dd>{usd(share)}</dd>
            </div>
            <div className={term === "limit" ? "on" : ""}>
              <dt>{capped ? "Capped at the yearly limit" : "Under the yearly limit"}</dt>
              <dd>{capped ? usd(PLAN.limit) : "Yes"}</dd>
            </div>
            <div className="pe-total">
              <dt>The plan pays back</dt>
              <dd>{usd(pays)}</dd>
            </div>
            <div className="pe-you">
              <dt>You pay</dt>
              <dd>{usd(yours)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
