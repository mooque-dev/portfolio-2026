export interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

export interface SideProject {
  title: string;
  year: string;
  description: string;
  url?: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface Education {
  school: string;
  detail: string;
}

export const experience: Job[] = [
  {
    company: "Aplos",
    role: "Senior Product Designer",
    location: "Toronto, ON",
    period: "Feb 2025 to Jun 2026",
    description: [
      "Designed unified experiences across a three-product nonprofit software suite (Aplos, Keela, Raisely) as separate platforms merged into one.",
      "Led integration design across all three products: data import and export, schema translation, and cross-platform data fidelity for accurate, auditable financial records.",
      "Consolidated roughly 340 components into a single Figma library serving three products with different existing conventions, owning deprecation decisions, naming governance, and adoption across three engineering teams.",
      "Designed a split-transaction feature for multi-category donation logging, keeping financial data compliant across Canadian, US, and Australian tax rules.",
    ],
  },
  {
    company: "Keela",
    role: "Product Design Lead",
    location: "Toronto, ON",
    period: "Mar 2023 to Feb 2025",
    description: [
      "Led design of core fundraising tools (Automation, Pipelines, Reports & Dashboards) for donor management, donation tracking, and revenue reporting.",
      "Contributed to a 13% ARR increase through the Automation feature, which reached 30% adoption across 355 organizations.",
      "Established the design system and launch process that improved cross-team collaboration and shipping consistency.",
    ],
  },
  {
    company: "Keela",
    role: "Product Designer & Associate PM",
    location: "Vancouver, BC",
    period: "Feb 2021 to Mar 2023",
    description: [
      "Redesigned onboarding and checkout flows, cutting support volume by roughly 70% from a baseline of 500 tickets per quarter and bringing self-serve setup completion to 92%.",
      "Stepped in as Associate PM to ship the Pipelines feature, earning recognition for autonomy and leadership.",
    ],
  },
  {
    company: "Forkable",
    role: "UX/UI Designer",
    location: "San Francisco, CA",
    period: "Jan 2020 to Sep 2022",
    description: [
      "Migrated the product design practice from Sketch to Figma over a two-and-a-half-year engagement, building and maintaining the component library and design system that came out of it.",
    ],
  },
  {
    company: "MyJourney",
    role: "Product Designer",
    location: "Toronto, ON",
    period: "Aug 2019 to Jul 2022",
    description: [
      "Ran user research and usability testing with patients and clinicians to shape accessible, patient-centered flows for a cancer-care web and mobile app.",
    ],
  },
];

export const sideProjects: SideProject[] = [
  {
    title: "ARND, founding designer",
    year: "2025 to present",
    description:
      "A native iOS app for independent musicians, built solo with agentic AI tooling and taken through App Store readiness: Sign in with Apple, in-app account deletion, a privacy manifest, and accessibility (VoiceOver, Dynamic Type).",
    url: "https://arnd.app",
  },
  {
    title: "Yuwol Productions, designer and developer",
    year: "Oct 2025 to present",
    description:
      "Internal tooling for a Toronto musical company: a ticketing platform that sold seats for a ten-month production, plus a scheduling tool and a bilingual (Korean and English) script reader used daily by a thirty-person company.",
    url: "https://torontoyuwol.vercel.app",
  },
  {
    title: "Forkestrate, founding designer",
    year: "2024 to present",
    description: "A consumer recipe app that adapts recipes conversationally.",
    url: "https://app.forkestrate.com/",
  },
];

export const certifications: Certification[] = [
  {
    title: "From Ideas to Action",
    issuer: "IDEO",
  },
  {
    title: "Generative AI Fundamentals",
    issuer: "Google Cloud",
  },
  {
    title: "Responsible Use of Generative AI",
    issuer: "Google Cloud",
  },
  {
    title: "Introduction to Python & Data Structures",
    issuer: "Georgia Tech via Coursera",
  },
];

export const education: Education[] = [
  {
    school: "YSDN (York University & Sheridan College joint program)",
    detail: "Bachelor of Design, Graphic Design, 2012 to 2017.",
  },
  {
    school: "Fine Arts",
    detail:
      "Foundation in visual composition, color theory, and creative problem-solving",
  },
];
