import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects spanning integrations, design systems, feature design, and automation for nonprofit technology.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Work
          </h1>
          <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
            Selected projects — design systems, product strategy, integrations,
            and a couple of things I built for fun.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.08}>
              <ProjectCard
                slug={project.slug}
                title={project.frontmatter.title}
                subtitle={project.frontmatter.subtitle}
                category={project.frontmatter.category}
                coverColor={project.frontmatter.coverColor}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
