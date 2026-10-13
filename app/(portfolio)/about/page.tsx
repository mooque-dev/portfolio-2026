import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import AboutTabs from "@/components/AboutTabs";
import AboutStickers from "@/components/AboutStickers";
import WorldClock from "@/components/WorldClock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allen Kang, senior product designer. Eight years in product design, five in payments and transaction-heavy products. Fine Arts background, systems thinker.",
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="relative max-w-6xl mx-auto px-6">
        <AboutStickers />
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              About
            </h1>
            {/* The two clocks Allen lives between: Toronto, where he is, and
                Seoul, where he's from. Moved here from the site header, where
                it was decoration; here it's biography. */}
            <div className="mt-3">
              <WorldClock />
            </div>
            {/* Four years that explain most of me. The same four digits are
                the card number on the Mastercard page. */}
            <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4" aria-label="Four years">
              {[
                ["1994", "Born in Seoul"],
                ["2007", "Moved to Canada"],
                ["2018", "Started designing"],
                ["2026", "Today, in Toronto"],
              ].map(([year, what]) => (
                <li key={year}>
                  <p className="text-2xl font-semibold tabular-nums tracking-tight">{year}</p>
                  <p className="mt-1 text-[14px] text-muted">{what}</p>
                </li>
              ))}
            </ol>
          </FadeIn>

          <AboutTabs />
        </div>
      </div>
    </section>
  );
}
