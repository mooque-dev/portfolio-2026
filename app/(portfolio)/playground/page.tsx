import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import WorkFilter from "@/components/WorkFilter";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Side projects and experiments: apps built end to end, design research, branding, and the archive of illustration and graphic design.",
};

export default async function PlaygroundPage() {
  const allProjects = await getAllProjects();

  const projects = allProjects
    .filter((p) => (p.frontmatter.type ?? "work") !== "work")
    .map((p) => ({
      slug: p.slug,
      title: p.frontmatter.title,
      subtitle: p.frontmatter.subtitle,
      category: p.frontmatter.category,
      type: (p.frontmatter.type ?? "work") as "work" | "personal" | "experiment",
      coverColor: p.frontmatter.coverColor,
      coverImage: p.frontmatter.coverImage,
      featured: p.frontmatter.featured,
      role: p.frontmatter.role,
      timeline: p.frontmatter.timeline,
      wip: p.frontmatter.wip,
      featuredStat: p.frontmatter.featuredStat,
      featuredStatLabel: p.frontmatter.featuredStatLabel,
    }));

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Playground
            </h1>
            <p className="text-lg text-muted max-w-sm leading-relaxed md:text-right">
              Things I build on my own time, and where it all started.
            </p>
          </div>
        </FadeIn>

        <WorkFilter projects={projects} />
      </div>
    </section>
  );
}
