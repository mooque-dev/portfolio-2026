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
        <p>Autofill, tap to pay and the Google Pay app should feel like one way to pay. I&rsquo;ve worked on the same problem at a smaller scale: when Aplos, Keela and Raisely merged, they had 340+ components between them. I pitched Orchid and led it from the audit to adoption, consolidating them into 70 shared components on one set of tokens, with a variation for each product and a white-label one. A product-specific component stayed only if it gave people something the shared component couldn&rsquo;t, and saved them time. Three engineering teams use it.</p>
        <p>Earlier design system attempts there had stalled without engineers. I surveyed five departments, put the cost in front of leadership in their own words, and came back with two dedicated front-end engineers. Then I got governance wrong: a form and a weekly meeting, and proposals dropped to near zero. I swapped it for 48-hour async reviews, and proposals doubled.</p>
        <p>The AI side of the role is what I&rsquo;ve been doing on my own: design work that AI coding tools and engineers can both follow. On ARND, an iOS app I build with AI coding tools, the design rules live in files the tools read before they build, and tests on every push flag the patterns that broke before. 160+ merged pull requests so far.</p>
        <p>And it has to work for everyone. ARND caps how far each kind of text can grow so large type never breaks a screen, and every animation stands down when Reduce Motion is on.</p>
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
      lede={<>I&rsquo;m Allen, a senior product designer. For eight years I&rsquo;ve designed for people who&rsquo;d rather not think about software, the last five on payments and the design system behind them.</>}
      cases={["or", "tw", "fe", "ak", "au", "ar"]}
      built="rules"
      work="cards"
      hideBuilt
      aside={<><WhyThisRole /><CastTab /></>}
      close="curtain"
      contact={<>I&rsquo;d like to help paying feel like one product, wherever someone pays.</>}
    />
  );
}
