import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Statement, type StatementLine } from "@/components/PaymentCard";
import ResultsReceipt, { type ReceiptLine } from "@/components/ResultsReceipt";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";

// A tailored, unlisted view of the portfolio for Blue J. Not in the sitemap,
// not in the nav, and kept out of search results on purpose. Same shape as
// /float: a picture of the results, the work, a way to reach me, plus a
// short block of things that already run. Blue J's users are accountants, so
// the results come as a receipt.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Blue J" },
  description: "A short path through Allen Kang's work designing for accountants, building design systems and prototyping in code.",
  robots: { index: false, follow: false },
};

// The receipt's lines, each opening its case. Every number is on the résumé.
const RECEIPT: ReceiptLine[] = [
  { label: "Components, one library", value: "340+", href: "/work/orchid-design-system" },
  { label: "Tax regimes learned", value: "CA US AU", href: "/work/transaction-workflows" },
  { label: "Categorization tickets", value: "-70%", href: "/work/transaction-workflows" },
  { label: "Finance managers interviewed", value: "12", href: "/work/aplos-keela-integration" },
  { label: "Fee opt-in, A/B tested", value: "75→92%", href: "/work/fee-opt-in-experimentation" },
];
const RECEIPT_TOTAL: ReceiptLine = { label: "Designers mentored", value: "3", href: "/resume" };

// One line per case, each opening its page. Every number is on the résumé,
// with a few words under it saying what it measures.
const STATEMENT: StatementLine[] = [
  {
    tag: "Design systems",
    title: "Orchid design system",
    line: "Three teams onto one system without the authority to make them, and the guidelines that kept it consistent.",
    value: "340+ components",
    note: "merged into one library three teams use",
    href: "/work/orchid-design-system",
  },
  {
    tag: "Accountants",
    title: "Transaction Workflows",
    line: "I learned tax receipting rules in Canada, the US and Australia from accountants, then redesigned how one payment splits into a donation, a gift and a ticket.",
    value: "-70% tickets",
    note: "fewer categorization support tickets, first month",
    href: "/work/transaction-workflows",
  },
  {
    tag: "Research",
    title: "Aplos × Keela",
    line: "Interviews turned a data sync into a trust problem, so every mapping became visible before anything moved.",
    value: "12 interviews",
    note: "with nonprofit finance managers, before any design",
    href: "/work/aplos-keela-integration",
  },
  {
    tag: "0 to 1",
    title: "Automation for Nonprofits",
    line: "From fifteen interviews and three rounds of prototype testing to a paid add-on in five months.",
    value: "+13% ARR",
    note: "for the product, with 30% of 355 organizations using it",
    href: "/work/automation-nonprofits",
  },
  {
    tag: "Prototyping",
    title: "Fee Opt-In",
    line: "Prototyped in code so PMs and engineers could test the logic, then A/B tested three fixes. Has a checkout you can play with.",
    value: "75→92%",
    note: "donors who chose to cover the fee",
    href: "/work/fee-opt-in-experimentation",
  },
];

const BUILT: { label: string; text: string; links: { href: string; name: string; external?: boolean }[] }[] = [
  {
    label: "At work",
    text: "Fee Opt-In was prototyped in Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it. The rebuilt checkout runs on phone, tablet and desktop.",
    links: [{ href: "/work/fee-opt-in-experimentation#try", name: "Play with the checkout" }],
  },
  {
    label: "On my own",
    text: "ARND, a React Native app for Toronto's small live shows, designed and built from the database to App Store prep. In public beta.",
    links: [
      { href: "https://arnd.app", name: "arnd.app", external: true },
      { href: "/work/arnd", name: "The case" },
    ],
  },
  {
    label: "Working rebuilds",
    text: "Two case studies rebuilt as software instead of screenshots: a contact record that shipped at Keela, and cancer-care dashboards you can filter and click.",
    links: [
      { href: "/case/keela-contacts/index.html", name: "Keela Contacts" },
      { href: "/case/care-pathway/index.html", name: "MyJourney" },
    ],
  },
];

const OWN = [
  { slug: "forkestrate", name: "Forkestrate" },
  { slug: "arnd", name: "ARND" },
  { slug: "torontoyuwol", name: "Toronto Yuwol" },
];

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";

function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 mt-24 md:mt-32">
      <p className="microlabel text-muted">{label}</p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function BlueJPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                I design software accountants trust, and the systems that keep it simple.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on
                accounting and payments software, and I prototype in code when a mock can&rsquo;t answer the question.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/allen-kang-resume-bluej.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} gap-1.5 border border-border hover:border-foreground/40`}
                >
                  Résumé (PDF) <Arrow dir="up-right" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a href="#bj-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="flex min-w-0 justify-center lg:justify-end">
              <ResultsReceipt lines={RECEIPT} total={RECEIPT_TOTAL} />
            </div>
          </div>
        </FadeIn>

        <Block id="bj-work" label="The work" title="Five projects, and what changed after each one shipped.">
          <Statement lines={STATEMENT} />
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted">
            <span>Built on my own:</span>
            {OWN.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/work/${o.slug}`} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  {o.name}
                </Link>
                {i < OWN.length - 1 ? "," : ""}
              </span>
            ))}
            <span aria-hidden>·</span>
            <Link href="/work" className={`text-foreground ${link}`}>
              All work <Arrow />
            </Link>
          </p>
        </Block>

        <Block id="bj-code" label="Built, not just drawn" title="Most of what I'd show you already runs.">
          <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {BUILT.map((b) => (
              <li key={b.label} className="flex flex-col border-t border-foreground/80 pt-5">
                <p className="microlabel text-muted">{b.label}</p>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed">{b.text}</p>
                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {b.links.map((l) =>
                    l.external ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                        {l.name} <Arrow dir="up-right" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={link}>
                        {l.name} <Arrow />
                      </Link>
                    )
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <section
          aria-labelledby="bj-contact"
          className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="bj-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to help tax professionals get to the right answer faster.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} bg-foreground text-background hover:opacity-80`}>
              allensmkang@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} border border-border hover:border-foreground/40`}
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by Blue J.</p>
      </div>
    </article>
  );
}
