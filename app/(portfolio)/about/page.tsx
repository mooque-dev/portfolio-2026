import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import AboutTabs from "@/components/AboutTabs";
import AboutStickers from "@/components/AboutStickers";
import WorldClock from "@/components/WorldClock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allen Kang, Product Design Lead. Eight years designing products for nonprofits, ed-tech, and food-tech. Fine Arts background, systems thinker.",
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
          </FadeIn>

          <AboutTabs />
        </div>
      </div>
    </section>
  );
}
