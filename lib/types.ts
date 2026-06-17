export interface ProjectSummary {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: "work" | "personal";
  coverColor: string;
  featured: boolean;
  role: string;
  timeline: string;
}

export interface WritingSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}
