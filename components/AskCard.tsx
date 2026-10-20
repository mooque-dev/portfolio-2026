"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The Blue J page's hero: ask a question about Allen and get an answer that
// cites its sources, the way a good research tool should. The answer types
// itself out; every claim links to the case that backs it. With reduced
// motion it simply appears.
type Part = string | { cite: number };
type Source = { title: string; detail: string; href: string };
type QA = { q: string; chip: string; answer: Part[]; sources: Source[] };

const QAS: QA[] = [
  {
    chip: "Designed for accountants?",
    q: "Has Allen designed for accountants before?",
    answer: [
      "Yes, for the last five years. At Aplos he learned tax receipting rules in Canada, the US and Australia from accountants, then redesigned split transactions, which cut categorization tickets by 70%.",
      { cite: 1 },
      " Before designing a sync between accounting and CRM data, he interviewed 12 nonprofit finance managers.",
      { cite: 2 },
    ],
    sources: [
      { title: "Transaction Workflows", detail: "-70% categorization tickets", href: "/work/transaction-workflows" },
      { title: "Aplos × Keela", detail: "12 finance managers interviewed", href: "/work/aplos-keela-integration" },
    ],
  },
  {
    chip: "Design systems?",
    q: "Can he build and scale a design system?",
    answer: [
      "He pitched Orchid with surveys from five departments, earned two dedicated front-end engineers, and grew it into one library of 340+ components that three teams chose to use.",
      { cite: 1 },
      " He also wrote its guidelines, including a rule that came straight out of the accounting work.",
      { cite: 2 },
    ],
    sources: [
      { title: "Orchid design system", detail: "340+ components, three teams", href: "/work/orchid-design-system" },
      { title: "Transaction Workflows", detail: "suggested categories became a platform rule", href: "/work/transaction-workflows" },
    ],
  },
  {
    chip: "Front-end code?",
    q: "Does he contribute front-end code?",
    answer: [
      "He prototypes in code when a mock can't answer the question. The Fee Opt-In checkout was built so PMs and engineers could change the logic and watch it,",
      { cite: 1 },
      " and he designed and built ARND, a React Native app now in public beta.",
      { cite: 2 },
    ],
    sources: [
      { title: "Fee Opt-In", detail: "a checkout you can play with", href: "/work/fee-opt-in-experimentation#try" },
      { title: "ARND", detail: "live at arnd.app", href: "/work/arnd" },
    ],
  },
  {
    chip: "Fun to work with?",
    q: "Is he fun to work with?",
    answer: [
      "A director of product he worked with wrote that he has “a rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking.”",
      { cite: 1 },
      " Off the clock, he built the tools a forty-person musical company ran on, then joined the cast on stage.",
      { cite: 2 },
    ],
    sources: [
      { title: "What colleagues say", detail: "LinkedIn recommendations", href: "/about#colleagues" },
      { title: "Toronto Yuwol", detail: "a ten-month musical", href: "/work/torontoyuwol" },
    ],
  },
];

const length = (parts: Part[]) => parts.reduce((n, p) => n + (typeof p === "string" ? p.length : 0), 0);

export default function AskCard() {
  const [i, setI] = useState(0);
  // The full answer is in the HTML from the start (for readers without
  // JavaScript and for screeners); it fades in and types once the page is live.
  const [shown, setShown] = useState(Infinity);
  const [ready, setReady] = useState(false);
  const qa = QAS[i];
  const total = length(qa.answer);
  const done = shown >= total;

  useEffect(() => {
    // The page is live: start the answer from its first letter, unless motion is reduced.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(Infinity);
      return;
    }
    setShown(0);
    const t = setInterval(() => setShown((n) => (n >= total ? n : n + 3)), 16);
    return () => clearInterval(t);
  }, [i, total]);

  // Where each part starts in the answer, so it can render up to the typed length;
  // a citation shows once the text before it has.
  const starts = qa.answer.map((_, k) => length(qa.answer.slice(0, k)));
  const rendered = qa.answer.map((p, k) => {
    const left = shown - starts[k];
    if (typeof p === "string") {
      return <span key={k}>{p.slice(0, Math.max(0, left))}</span>;
    }
    if (left < 0) return null;
    return (
      <a
        key={k}
        href={`#ask-src-${p.cite}`}
        className="ask-cite mx-0.5 inline-grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 align-[2px] text-[11px] font-semibold tabular-nums no-underline"
        aria-label={`Source ${p.cite}`}
      >
        {p.cite}
      </a>
    );
  });

  return (
    <div className="ask-card w-full max-w-[440px] rounded-2xl p-4 md:p-5">
      <div className="ask-field flex items-center gap-3 rounded-xl px-4 py-3">
        <p className="m-0 flex-1 text-[15px] leading-snug">{qa.q}</p>
        <span className="ask-send grid h-8 w-8 flex-none place-items-center rounded-full" aria-hidden>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <div className={`mt-4 min-h-[150px] text-[14.5px] leading-relaxed ${ready ? "" : "opacity-0"}`} aria-live="polite" aria-busy={!done}>
        {rendered}
        {!done && <span className="ask-caret ml-0.5 inline-block h-[1em] w-[2px] align-[-2px]" aria-hidden />}
      </div>

      <ol className={`m-0 mt-4 list-none space-y-1.5 border-t pt-3 p-0 transition-opacity duration-300 ask-rule ${done ? "opacity-100" : "opacity-0"}`} aria-label="Sources">
        {qa.sources.map((s, k) => (
          <li key={s.href + k} id={`ask-src-${k + 1}`} className="scroll-mt-28">
            <Link href={s.href} className="group flex items-baseline gap-2 text-[13px]">
              <span className="ask-cite inline-grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[11px] font-semibold tabular-nums">{k + 1}</span>
              <span className="font-medium underline-offset-4 group-hover:underline">{s.title}</span>
              <span className="text-muted">{s.detail}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Ask something else">
        {QAS.map((x, k) => (
          <button
            key={x.chip}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={`rounded-full border px-3 py-1 text-[12.5px] transition-colors ${
              k === i ? "ask-chip-on" : "border-border text-muted hover:text-foreground"
            }`}
          >
            {x.chip}
          </button>
        ))}
      </div>
    </div>
  );
}
