export interface ProjectSummary {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: "work" | "personal" | "experiment";
  coverColor: string;
  coverImage?: string;
  featured: boolean;
  wip?: boolean;
  role: string;
  timeline: string;
  featuredStat?: string;
  featuredStatLabel?: string;
  company?: string;
  href?: string;
}

export interface WritingSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}
