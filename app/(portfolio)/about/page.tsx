import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import AboutTabs from "@/components/AboutTabs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allen Kang — Product Design Lead. Optimist, systems-builder, experience-maker, designing mission-driven products for people the industry usually designs around.",
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              About
            </h1>
          </FadeIn>

          <AboutTabs />
        </div>
      </div>
    </section>
  );
}
