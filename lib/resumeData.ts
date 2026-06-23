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
    company: "Velora (Keela · Raisely · Aplos)",
    role: "Product Design Lead",
    location: "Toronto, ON",
    period: "February 2023 to present",
    description: [
      "Lead design across Velora's three nonprofit products: merging Keela, Raisely, and Aplos into one connected system used by 85,600+ campaigns across 102 countries.",
      "Built Orchid, a design system that consolidated 340+ scattered components into 86 shared primitives. Adopted across all three products within 6 months, cutting component development time by 40%.",
      "Led the first cross-product initiative post-acquisition: designed the integration experience and established the collaboration framework that every subsequent cross-team project followed.",
      "Designed a 0 to 1 automation platform. 45% of active accounts adopted within 3 months. Became a differentiator in sales conversations.",
      "Grew and mentored a design team of 3. Established critique processes, a contribution model with 12+ active contributors, and research operations that didn't exist before.",
    ],
  },
  {
    company: "Keela & KIT",
    role: "Product Designer",
    location: "Vancouver, BC",
    period: "February 2021 to January 2023",
    description: [
      "Redesigned the transaction workflow, the #1 driver of tax-season churn. Cut monthly reconciliation time by 60% and moved feature NPS from -12 to +34.",
      "Ran 40+ user research sessions that directly shaped what the product team built next. Built the research practice from nothing.",
      "Created the design system foundations that later became Orchid after the acquisition.",
    ],
  },
  {
    company: "Forkable",
    role: "UI/UX Designer, Design Systems",
    location: "San Francisco, CA",
    period: "January 2020 to September 2022",
    description: [
      "Built and maintained a design system for a food-tech platform. Improved feature delivery speed by 35% through reusable components and documented patterns.",
      "Established component API standards and a design-engineering handoff process that the entire product team adopted.",
    ],
  },
  {
    company: "Xperly",
    role: "UI/UX Designer",
    location: "Toronto, ON",
    period: "October 2018 to December 2019",
    description: [
      "Designed an expert-matching platform from scratch to product-market fit, connecting businesses with industry professionals.",
      "Led competitive analysis and usability testing, iterating on core matching and onboarding flows. Improved activation rate by 22%.",
    ],
  },
];

export const sideProjects: SideProject[] = [
  {
    title: "Forkestrate",
    year: "2024 to present",
    description:
      "Designed and built a conversational AI cooking app exploring trust patterns in AI-assisted instruction. React, Supabase, OpenAI API. Also: I just really like cooking.",
    url: "https://app.forkestrate.com/",
  },
  {
    title: "arnd",
    year: "2024",
    description:
      "Product exploration: how do you make street performing accessible? Focused on discovery, booking, and tip flows for performers and passersby.",
    url: "https://arnd-alpha.vercel.app/",
  },
  {
    title: "Colour Analysis",
    year: "2024",
    description:
      "Tool exploring colour analysis for beauty and personal styling. Built to understand how AI recommendations map to aesthetic preferences.",
    url: "https://color-analysis-three.vercel.app/",
  },
  {
    title: "mooze",
    year: "2024",
    description:
      "A tool for collecting and collaging inspiration. Personal project exploring curation UI and mood-board creation flows.",
    url: "https://mooze.vercel.app/",
  },
  {
    title: "Artist Brand Systems",
    year: "2022 to 2023",
    description:
      "Volunteered design skills to help 4 emerging artists develop visual identities and merchandise. Built reusable systems, not one-off deliverables.",
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
    school: "York University",
    detail:
      "Bachelor of Design, Graphic Design. Visual communication, interactive design, and systematic thinking.",
  },
  {
    school: "Fine Arts",
    detail:
      "Foundation in visual composition, color theory, and creative problem-solving",
  },
];
