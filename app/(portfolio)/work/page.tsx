import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import WorkFilter from "@/components/WorkFilter";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects spanning integrations, design systems, feature design, and automation for nonprofit technology.",
};

export default async function WorkPage() {
  const allProjects = await getAllProjects();

  const projects = allProjects.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    subtitle: p.frontmatter.subtitle,
    category: p.frontmatter.category,
    type: (p.frontmatter.type ?? "work") as "work" | "personal",
    coverColor: p.frontmatter.coverColor,
    featured: p.frontmatter.featured,
    role: p.frontmatter.role,
    timeline: p.frontmatter.timeline,
  }));

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Work
          </h1>
          <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
            Selected projects — design systems, product strategy, integrations,
            and a couple of things I built for fun.
          </p>
        </FadeIn>

        <WorkFilter projects={projects} />
      </div>
    </section>
  );
}
