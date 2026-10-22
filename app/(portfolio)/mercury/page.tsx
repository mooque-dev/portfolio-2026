import type { Metadata } from "next";
import Link from "next/link";
import { Albert_Sans, Instrument_Serif } from "next/font/google";
import EngravedCard from "@/components/EngravedCard";
import AccountsPanel, { type Account } from "@/components/AccountsPanel";

// A tailored, unlisted view of the portfolio for Mercury. Not in the
// sitemap, not in the nav, and kept out of search results on purpose.
// Unlike the template pages, this one is built to sit next to Mercury's own
// site: a dark plum intro that fades to pale lavender, a geometric sans with
// a serif italic accent, glassy pill buttons, an engraved metal card, and
// the work laid out as an accounts panel. No Mercury logo, photos or copy.
const sans = Albert_Sans({ subsets: ["latin"], variable: "--mx-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--mx-serif", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Mercury" },
  description: "A short path through Allen Kang's work: payments, experiments, craft, and things that already run.",
  robots: { index: false, follow: false },
};

const TOTALS: [string, string, string?][] = [
  ["Years designing", "8"],
  ["Components shipped", "340", "+"],
  ["Pull requests merged", "161"],
];

const ROWS: Account[] = [
  { mono: "Tw", name: "Transaction Workflows", meta: "Split payments under three countries’ tax rules", value: "−70", unit: "% tickets", href: "/work/transaction-workflows" },
  { mono: "Fo", name: "Fee Opt-In", meta: "Paused a launch, tested three fixes in code", value: "92", unit: "% opt-in", href: "/work/fee-opt-in-experimentation" },
  { mono: "Ak", name: "Aplos × Keela", meta: "Every field mapping visible before data moved", value: "1st", unit: "joint launch", href: "/work/aplos-keela-integration" },
  { mono: "Or", name: "Orchid design system", meta: "One library, three engineering teams", value: "340", unit: "+ components", href: "/work/orchid-design-system" },
  { mono: "Au", name: "Automation for Nonprofits", meta: "From no product area to a paid add-on", value: "+13", unit: "% ARR", href: "/work/automation-nonprofits" },
  { mono: "Ar", name: "ARND", meta: "Designed and built with AI coding tools, in beta", value: "161", unit: "pull requests", href: "/work/arnd" },
];

export default function MercuryPage() {
  return (
    <article className={`mx ${sans.variable} ${serif.variable}`}>
      <section className="mx-hero">
        <div className="mx-in">
          <h1 className="mx-h1">
            I make complicated money feel <em>simple</em>.
          </h1>
          <p className="mx-lede">
            I&rsquo;m Allen, a product designer in Toronto with a graphic design degree. Eight years designing, the last five on payments and
            finance tools, and I prototype in code when a mock can&rsquo;t answer the question.
          </p>
          <div className="mx-ctas">
            <span className="mx-field">
              <a href="mailto:allensmkang@gmail.com" className="mx-email">
                allensmkang@gmail.com
              </a>
              <a href="/allen-kang-resume-mercury.pdf" target="_blank" rel="noopener noreferrer" className="mx-btn">
                Résumé
                <span className="sr-only"> (PDF, opens in new tab)</span>
              </a>
            </span>
            <a href="#mx-work" className="mx-ghost">
              See the work
            </a>
          </div>
        </div>
        <div className="mx-card">
          <EngravedCard />
        </div>
      </section>

      <section id="mx-work" aria-labelledby="mx-work-title" className="mx-light">
        <div className="mx-in">
          <p className="mx-note">
            The card number is four years of my life. <Link href="/about#four-years">What they are</Link>
          </p>
          <h2 id="mx-work-title" className="mx-h2">
            Six projects. <span>What changed after each one shipped.</span>
          </h2>
          <AccountsPanel totals={TOTALS} rows={ROWS} />
          <p className="mx-all">
            <Link href="/work">All work</Link>
          </p>
          <div className="mx-built">
            <p>
              ARND is a map-first app for Toronto&rsquo;s small live shows that I designed and built with AI coding tools, now in public beta.{" "}
              <a href="https://arnd.app" target="_blank" rel="noopener noreferrer">
                arnd.app<span className="sr-only"> (opens in new tab)</span>
              </a>
            </p>
            <p>
              Fee Opt-In was prototyped in code with Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it before
              anything shipped. <Link href="/work/fee-opt-in-experimentation#try">Play with the checkout</Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="mx-contact" className="mx-end">
        <div className="mx-in">
          <h2 id="mx-contact" className="mx-h2">
            I&rsquo;d like to make banking feel <em>built</em> for the people using it.
          </h2>
          <div className="mx-ctas">
            <span className="mx-field">
              <a href="mailto:allensmkang@gmail.com" className="mx-email">
                allensmkang@gmail.com
              </a>
              <a href="mailto:allensmkang@gmail.com" className="mx-btn">
                Say hello
              </a>
            </span>
            <a href="https://www.linkedin.com/in/mooque/" target="_blank" rel="noopener noreferrer" className="mx-ghost">
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
          <p className="mx-legal">An independent portfolio page. Not affiliated with or endorsed by Mercury.</p>
        </div>
      </section>
    </article>
  );
}
