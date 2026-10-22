import type { StatementLine } from "@/components/PaymentCard";

// The shared content of the tailored pages: one neutral line per project
// (the order a page picks does the tailoring) and the two short paragraphs
// about building in code. Edit a case here and every page that uses it
// changes with it.
export type CaseKey = "tw" | "ak" | "au" | "mj" | "or" | "fe" | "ar" | "yu";

export const CASES: Record<CaseKey, StatementLine> = {
  tw: {
    tag: "Accounting",
    title: "Transaction Workflows",
    line: "One payment can be a donation, a gift and a ticket at once. I sat with accountants until that made sense, then redesigned how it's recorded under three countries' tax rules.",
    value: "-70% tickets",
    note: "fewer categorization support tickets, first month",
    href: "/work/transaction-workflows",
  },
  ak: {
    tag: "Data sync",
    title: "Aplos × Keela",
    line: "Twelve interviews with finance managers turned a data sync into a trust problem, so every field mapping became visible before anything moved.",
    value: "1st joint launch",
    note: "the first feature the merged companies shipped together",
    href: "/work/aplos-keela-integration",
  },
  au: {
    tag: "0 to 1",
    title: "Automation for Nonprofits",
    line: "Fifteen interviews and three rounds of prototype testing, from a product area that didn't exist to a paid add-on in five months.",
    value: "+13% ARR",
    note: "for the product, with 30% of 355 organizations using it",
    href: "/work/automation-nonprofits",
  },
  mj: {
    tag: "Healthcare",
    title: "MyJourney dashboards",
    line: "Dashboards clinicians used to track cancer patients through treatment, rebuilt as working redesigns you can filter and click.",
    value: "4 screens",
    note: "rebuilt as working software",
    href: "/case/care-pathway/index.html",
  },
  or: {
    tag: "Design system",
    title: "Orchid design system",
    line: "I pitched it with surveys from five departments, earned two dedicated front-end engineers, and got three teams onto one system.",
    value: "340+ components",
    note: "merged into one library three teams use",
    href: "/work/orchid-design-system",
  },
  fe: {
    tag: "Experiment",
    title: "Fee Opt-In",
    line: "I paused a launch that looked like a win, prototyped three fixes in code, then A/B tested them. Has a checkout you can play with.",
    value: "75→92%",
    note: "donors who chose to cover the fee",
    href: "/work/fee-opt-in-experimentation",
  },
  ar: {
    tag: "Side project",
    title: "ARND",
    line: "A map-first app for Toronto's small live shows that I designed and built end to end.",
    value: "161 pull requests",
    note: "merged since April, in public beta",
    href: "/work/arnd",
  },
  yu: {
    tag: "Side project",
    title: "Toronto Yuwol",
    line: "Scheduling, attendance and a bill splitter for a forty-person company putting on a musical.",
    value: "10 months",
    note: "used daily through the run",
    href: "/work/torontoyuwol",
  },
};

export type BuiltLine = { text: string; links: { href: string; name: string; external?: boolean }[] };

const ARND_LINKS = [
  { href: "https://arnd.app", name: "arnd.app", external: true },
  { href: "/work/arnd", name: "The case" },
];
const FEE: BuiltLine = {
  text: "Fee Opt-In was prototyped in code with Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it before anything shipped.",
  links: [{ href: "/work/fee-opt-in-experimentation#try", name: "Play with the checkout" }],
};

export const BUILT: Record<"default" | "rules", BuiltLine[]> = {
  default: [
    {
      text: "ARND, a map-first React Native app for Toronto's small live shows, designed and built with AI coding tools. 161 merged pull requests since April, in public beta.",
      links: ARND_LINKS,
    },
    FEE,
  ],
  rules: [
    {
      text: "ARND, a map-first React Native app for Toronto's small live shows, built with AI coding tools that read its design rules before they write a line. Five themes in light and dark, 161 merged pull requests, in public beta.",
      links: ARND_LINKS,
    },
    FEE,
  ],
};
