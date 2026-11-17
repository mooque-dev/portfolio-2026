import type { Metadata } from "next";
import type { CSSProperties } from "react";
import CastTab from "@/components/CastTab";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Google, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// Text-only opening; the work cards carry the pictures.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Google" },
  description:
    "A short path through Allen Kang's work: a design system three teams adopted, payment flows, and an app built with AI coding tools.",
  robots: { index: false, follow: false },
};

const BRAND = { "--brand": "#0A0A0A", "--brand-on": "#ffffff", "--brand-ink": "#0A0A0A", "--brand-ink-dark": "#F5F5F5", "--hb": "#FFFFFF", "--hf": "#0A0A0A", "--hb-d": "#0A0A0A", "--hf-d": "#F5F5F5", "--hm": "#6E6E6E" } as CSSProperties;

// Why this role, said as a short note in prose rather than a grid of cards.
function WhyThisRole() {
  return (
    <section aria-labelledby="google-why" className="mt-20 md:mt-28 max-w-[65ch]">
      <h2 id="google-why" className="tp-h2">Why this role</h2>
      <div className="mt-6 grid gap-5 text-[17px] leading-relaxed text-muted">
        <p>Payments that feel like one product across many surfaces is the problem I&rsquo;ve been working on. When Aplos, Keela and Raisely merged, each had its own components. I pitched Orchid and led it from there: 340+ one-off components became 70 shared ones, built on one set of tokens, with a variation for each product and a white-label one. Three engineering teams use it.</p>
        <p>Earlier design system attempts there had stalled without engineers. I surveyed five departments, put the cost in front of leadership in their own words, and came back with two dedicated front-end engineers. Contribution reviews came back within 48 hours, so teams kept proposing.</p>
        <p>The AI side of the role is what I&rsquo;ve been doing on my own. ARND, the app I build with AI coding tools, runs one set of tokens across iOS, Android and web. Its design rules live in files the tools read before they build, and tests on every push flag the patterns that broke before. 160+ merged pull requests so far.</p>
      </div>
    </section>
  );
}

export default function GooglePage() {
  return (
    <TailoredPage
      slug="google"
      company="Google"
      style={BRAND}
      className="tp-plain"
      headline={<>I make complex systems <span className="sig-em">easy for people to use</span>.</>}
      lede={<>I&rsquo;m Allen, a senior product designer. For eight years I&rsquo;ve designed for people who&rsquo;d rather not think about software, the last five on payments.</>}
      cases={["or", "tw", "fe", "ak", "ar", "yu"]}
      built="rules"
      work="cards"
      hideBuilt
      aside={<><WhyThisRole /><CastTab /></>}
      close="curtain"
      contact={<>I&rsquo;d like to help paying feel like one product, wherever someone pays.</>}
    />
  );
}
