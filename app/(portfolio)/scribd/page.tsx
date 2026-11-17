import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Newsreader, Work_Sans } from "next/font/google";
import BookShelf from "@/components/BookShelf";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Scribd, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a shelf of book covers, one per case study, including the tests that lost.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Scribd" },
  description:
    "A short path through Allen Kang's work: experiments that moved numbers, ones that didn't, and things that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Newsreader({ subsets: ["latin"], display: "swap", variable: "--bd-display" });
const ftext = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#16171B", "--brand-on": "#ffffff", "--brand-ink": "#201C14", "--brand-ink-dark": "#F9E04B", "--hb": "#FBF8F1", "--hf": "#201C14", "--hb-d": "#FBF8F1", "--hf-d": "#201C14", "--hm": "#F9E04B", "--hc": "#F9E04B", "--hco": "#16171B" } as CSSProperties;

export default function ScribdPage() {
  return (
    <TailoredPage
      slug="scribd"
      company="Scribd"
      style={BRAND}
      className={`themed theme-scribd ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I tested three fee designs. Two lost, and the slider took opt-in to 92%.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing, the last five on payments and paid add-ons, with tests behind the decisions that mattered.</>}
      hero={<><BookShelf /></>}
      caption={<>Every cover opens a case study. One is the tests that lost.</>}
      cases={["fe", "au", "or", "tw", "ar", "yu"]}
      fit={[
        { ask: "Tests, including the ones that lose", proof: <>On Fee Opt-In I paused a rollout that looked like a win, tested three new versions, and the slider took fee opt-in from 75% to 92%. The buttons and the dropdown lost, and the case covers why.</> },
        { ask: "Plans and pricing", proof: <>Automation went from a product area that didn&rsquo;t exist to a paid add-on in about four months. 30% of 355 organizations used it, and the product&rsquo;s ARR grew 13%.</> },
        { ask: "Lifecycle", proof: <>Automation is lifecycle email for nonprofits: welcome, thank-you and follow-up journeys staff build without code, with a preview of exactly who each one will reach before it goes live.</> },
        { ask: "Onboarding and setup", proof: <>The first thing customers of two merged products set up together was the Aplos and Keela sync. I made every data mapping visible before anything moved, so setting it up felt safe.</> },
        { ask: "Mobile, and AI every day", proof: <>ARND ships on iOS, Android and web, built with AI coding tools: 160+ merged pull requests. The musical&rsquo;s tools ran on the cast&rsquo;s phones every day for ten months.</> },
      ]}
      aside={
        <section aria-labelledby="reading-title" className="mt-20 max-w-[62ch] md:mt-28">
          <h2 id="reading-title" className="text-2xl md:text-3xl">How I find books</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Through people I trust, the feeds that know me, and, honestly, the covers in a bookshop. I read fiction, self-development, history and autobiography. The one I keep thinking about lately is <i>Demian</i>, for how it holds good and bad side by side, and what it asks about philosophy and faith.
          </p>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">
            I think reading starts as influence: someone you admire, or a topic you&rsquo;re already curious about. Then it becomes a habit, and sometimes a passion. The beautiful part is living, for a few hundred pages, a life you&rsquo;d never get to live yourself. The risk is reading alone. Without talking a book through, it&rsquo;s easy to keep only the parts that agree with you. That&rsquo;s why a library and a book club in the same place makes sense to me.
          </p>
        </section>
      }
      contact={<>If you&rsquo;d like the story of the two that lost, I&rsquo;m glad to tell it.</>}
    />
  );
}
