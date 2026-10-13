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
      "Owned end-to-end design for payments and transactions across Aplos, Keela and Raisely as the three products merged into one suite.",
      "Redesigned split transactions so one payment can be a donation, a gift and a ticket at once, cutting categorization tickets by 70% in the first month.",
      "Ran an A/B test on the donation fee flow that raised fee opt-in from 75% to 92%, with conversion steady.",
      "Led integration design between the merged products, making data mapping visible and auditable.",
      "Grew Orchid into a shared library of 340+ components used by three engineering teams.",
      "Partnered with Product, Engineering and leadership on roadmap, experiments and delivery. Mentored two designers.",
    ],
  },
  {
    company: "Keela",
    role: "Lead Product Designer",
    location: "Toronto, ON (remote)",
    period: "Mar 2023 to Feb 2025",
    description: [
      "Led product design for the CRM's core: the contact record, Pipelines, and Reports & Dashboards.",
      "Pitched the Orchid design system to leadership and earned two dedicated front-end engineers.",
      "Set up the design-to-launch process. Mentored one designer.",
    ],
  },
  {
    company: "Keela",
    role: "Product Designer & Associate PM",
    location: "Toronto, ON (remote)",
    period: "Feb 2021 to Mar 2023",
    description: [
      "Designed Automation, a no-code workflow builder, from first interview to release (0 to 1).",
      "Reached 30% adoption across 355 organizations, contributing to a 13% ARR increase.",
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
