import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Poppins, Inter } from "next/font/google";
import EntityGraph from "@/components/EntityGraph";
import TailoredPage from "@/components/tailored/TailoredPage";

// A tailored, unlisted view of the portfolio for Grafana Labs, built on the
// shared frame (components/tailored/TailoredPage.tsx). The object is
// a small entity graph in the style of an observability tool: each node is a piece of work with its type and the number that proves it.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Grafana Labs" },
  description:
    "A short path through Allen Kang's work: data made visible, dashboards, a design system, and apps that already run.",
  robots: { index: false, follow: false },
};

const fdisplay = Poppins({ subsets: ["latin"], display: "swap", variable: "--bd-display", weight: ["500", "600"] });
const ftext = Inter({ subsets: ["latin"], display: "swap", variable: "--bd-text" });
const BRAND = { "--brand": "#1B55F5", "--brand-on": "#ffffff", "--brand-ink": "#1B55F5", "--brand-ink-dark": "#8AB0FF", "--hb": "#F4F4F6", "--hf": "#000000", "--hb-d": "#111217", "--hf-d": "#F4F4F6", "--hm": "#F46800", "--hc": "#1B55F5", "--hco": "#ffffff" } as CSSProperties;

export default function GrafanaPage() {
  return (
    <TailoredPage
      slug="grafana"
      company="Grafana Labs"
      style={BRAND}
      className={`themed theme-grafana ${fdisplay.variable} ${ftext.variable}`}
      headline={<>I turn tangled systems into screens people can act on.</>}
      lede={<>I&rsquo;m Allen, a product designer in Toronto. Eight years designing B2B software, the last five on payments, finance and CRM tools, where I made the data mapping between merging products visible and designed dashboards for clinicians and fundraisers. I learn hard domains by sitting with the people who know them, and I prototype in code with AI tools.</>}
      hero={<><EntityGraph /></>}
      caption={<>Pick a node. Each one opens the case behind it.</>}
      cases={["ak", "tw", "mj", "or", "fe", "ar"]}
      contact={<>I&rsquo;d like to help engineers see how their systems fit together, without having to ask around.</>}
    />
  );
}
