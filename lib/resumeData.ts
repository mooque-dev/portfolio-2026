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
  url?: string;
}

export interface Education {
  school: string;
  detail: string;
}

export const experience: Job[] = [
  {
    company: "Aplos (now Velora)",
    role: "Senior Product Designer",
    location: "Toronto, ON",
    period: "Feb 2025 to Jun 2026",
    description: [
      "Designed split transactions so one payment can be logged as a donation, an in-kind gift, and the value of goods received, compliant across Canadian, US, and Australian tax rules. Categorization support tickets fell 70% in the first month.",
      "Ran a four-variation A/B test on Raisely's donation fee flow, measured in Pendo. Fee opt-in rose from 75% to 92% while conversion and average gift size held steady.",
      "Led integration design across Aplos, Keela, and Raisely after the acquisition: data import and export, schema translation, and visible, editable data mapping for accurate, auditable financial records.",
      "Consolidated 340+ components from three products into one Figma and Storybook library, owning deprecation, naming governance, and adoption across three engineering teams.",
      "Ran the first joint design reviews between the merged engineering teams; the format became the default for cross-product work. Mentored two designers.",
    ],
  },
  {
    company: "Keela",
    role: "Product Design Lead",
    location: "Toronto, ON",
    period: "Mar 2023 to Feb 2025",
    description: [
      "Led the design system refresh that became Orchid, pitched to leadership with surveys from five departments.",
      "Redesigned the contact record fundraisers open before every call to lead with recent change instead of lifetime totals.",
      "Led design for Pipelines and Reports & Dashboards, and set up the launch process. Mentored one designer.",
    ],
  },
  {
    company: "Keela",
    role: "Product Designer & Associate PM",
    location: "Vancouver, BC",
    period: "Feb 2021 to Mar 2023",
    description: [
      "Designed Automation, a no-code workflow builder, a month into the role: 30% adoption across 355 organizations, contributing to a 13% ARR increase.",
      "Stepped in as Associate PM to ship the Pipelines feature, earning recognition for autonomy and leadership.",
    ],
  },
  {
    company: "Forkable",
    role: "UX/UI Designer (Contract)",
    location: "San Francisco, CA",
    period: "Jan 2020 to Sep 2022",
    description: [
      "Moved the product design practice from Sketch to Figma and built the component library and design system that came out of it.",
    ],
  },
  {
    company: "MyJourney",
    role: "UX/UI Designer",
    location: "Toronto, ON",
    period: "Aug 2019 to Jul 2022",
    description: [
      "Ran user research and usability testing with patients and clinicians for a cancer-care web and mobile app.",
      "Designed clinician dashboards that track patients across treatment stages, and tools for the teams running cancer conferences.",
    ],
  },
];

export const sideProjects: SideProject[] = [
  {
    title: "ARND, founding designer and developer",
    year: "2025 to present",
    description:
      "A live-music discovery app for Toronto's small shows, designed and built solo with agentic AI tooling on live curated listings. In public beta at arnd.app, with the App Store release next.",
    url: "https://arnd.app",
  },
  {
    title: "Yuwol Productions, designer and developer",
    year: "Oct 2025 to present",
    description:
      "Internal tools for a Toronto musical company: scheduling and attendance, a bilingual (Korean and English) script reader, and a bill splitter, used daily by a forty-person company.",
    url: "https://torontoyuwol.vercel.app",
  },
  {
    title: "Forkestrate, founding designer",
    year: "2025 to present",
    description: "With a PM and two engineers, took a conversational recipe app from zero to MVP in under three months.",
    url: "https://app.forkestrate.com/",
  },
];

export const certifications: Certification[] = [
  {
    title: "From Ideas to Action",
    issuer: "IDEO",
    url: "https://drive.google.com/file/d/1qFPBho7WmKuEoqeVKRcQ-1Si5JnRIeWb/view",
  },
  {
    title: "Generative AI Fundamentals",
    issuer: "Google Cloud",
    url: "https://www.cloudskillsboost.google/public_profiles/769c1f02-4e51-4227-a338-d07383cec62b/badges/6756185",
  },
  {
    title: "Responsible Use of Generative AI",
    issuer: "Google Cloud",
    url: "https://www.cloudskillsboost.google/public_profiles/769c1f02-4e51-4227-a338-d07383cec62b/badges/6855202",
  },
  {
    title: "Introduction to Python & Data Structures",
    issuer: "Georgia Tech via Coursera",
    url: "https://www.coursera.org/account/accomplishments/certificate/VCJ4U3KH75HR",
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
