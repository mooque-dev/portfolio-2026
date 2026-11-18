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
      "Led Orchid, the shared design system: consolidated 340+ components across the three products into 70.",
      "Owned design for payments and transactions across Aplos, Keela and Raisely as they merged; mentored two designers.",
      "Led the redesign of split payments, so one payment can be part donation, part gift and part ticket; categorization support tickets fell 70% in the first month.",
      "Stopped a donation-fee launch that only looked successful, prototyped three alternatives in code and A/B tested them; donors covering the fee rose from 75% to 92%.",
      "Led design of the first feature Aplos and Keela shipped together, a CRM-to-accounting sync; after interviewing 12 finance managers, it shows every field mapping before data moves.",
    ],
  },
  {
    company: "Keela",
    role: "Lead Product Designer",
    location: "Toronto, ON (remote)",
    period: "Mar 2023 to Feb 2025",
    description: [
      "Got Orchid funded: surveyed five departments and used the results to win two dedicated front-end engineers, a first for a design system there.",
      "Led design for the CRM's core: contact records, Pipelines, and Reports & Dashboards; mentored one designer.",
    ],
  },
  {
    company: "Keela",
    role: "Product Designer & Associate PM",
    location: "Toronto, ON (remote)",
    period: "Feb 2021 to Mar 2023",
    description: [
      "Designed Automation, a no-code workflow builder, from first interviews to release; 30% of 355 organizations adopted it, contributing to a 13% ARR increase.",
      "Stepped in as Associate PM to ship Pipelines.",
    ],
  },
  {
    company: "Forkable",
    role: "UX/UI Designer (Contract, part-time)",
    location: "San Francisco, CA",
    period: "Jan 2020 to Sep 2022",
    description: [
      "Moved design from Sketch to Figma and built the component library and design system.",
    ],
  },
  {
    company: "MyJourney",
    role: "UX/UI Designer (Part-time)",
    location: "Toronto, ON",
    period: "Aug 2019 to Jul 2022",
    description: [
      "Ran research and usability testing with patients and clinicians, and designed dashboards for tracking patients through treatment.",
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
    title: "Forkestrate, co-founder and founding designer",
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
