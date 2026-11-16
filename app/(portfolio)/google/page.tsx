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
      fit={[
        { ask: "One system across surfaces", proof: <>Orchid replaced three products&rsquo; separate components with 70 shared ones, and three engineering teams adopted it. ARND runs one set of tokens across iOS, Android and web, in five themes, light and dark.</> },
        { ask: "Reusable frameworks", proof: <>Tokens first, Storybook as the source of truth, visual regression checks on every pull request, and contribution reviews answered within 48 hours so teams keep proposing.</> },
        { ask: "AI that works inside the system", proof: <>On ARND the design rules are written in files my AI coding tools read before they build, and tests run on every push to flag the patterns that broke before. 160+ merged pull requests that way.</> },
        { ask: "A case leaders can act on", proof: <>Earlier design system efforts had stalled without engineers. I surveyed five departments, put the cost in their own words in front of leadership, and came back with two dedicated front-end engineers.</> },
        { ask: "Usable by everyone", proof: <>ARND caps how far each kind of text can grow so large type never breaks a screen, and every animation stands down when Reduce Motion is on.</> },
      ]}
      work="cards"
      hideBuilt
      aside={<CastTab />}
      close="curtain"
      contact={<>I&rsquo;d like to help paying feel like one product, wherever someone pays.</>}
    />
  );
}
