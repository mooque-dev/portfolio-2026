import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import Link from "next/link";
import { ProjectGrid } from "@/components/WorkFilter";
import Arrow from "@/components/Arrow";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Professional case studies: transaction workflows, integrations, design systems, experimentation and data visualization.",
};

export default async function WorkPage() {
  const allProjects = await getAllProjects();

  const projects = allProjects.filter((p) => (p.frontmatter.type ?? "work") === "work").map((p) => ({
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
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Work
            </h1>
            <p className="text-lg text-muted max-w-xl leading-relaxed">
              Professional case studies. Side projects live in the{" "}
              <Link href="/playground" className="underline underline-offset-4 hover:text-foreground">
                Playground <Arrow />
              </Link>
            </p>
          </div>
        </FadeIn>

        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
