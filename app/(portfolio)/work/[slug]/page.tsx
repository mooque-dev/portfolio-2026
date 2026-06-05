import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, getAllProjects } from "@/lib/content";
import FadeIn from "@/components/FadeIn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] ?? allProjects[0];

  const { frontmatter, content } = project;

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
        {/* Header */}
        <FadeIn>
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; All work
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="inline-block mt-8 text-xs tracking-widest uppercase text-muted">
            {frontmatter.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-3 leading-[1.1]">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {frontmatter.subtitle}
          </p>
        </FadeIn>

        {/* Metadata */}
        <FadeIn delay={0.2}>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-border">
            <div>
              <dt className="text-xs tracking-widest uppercase text-muted mb-1">
                Role
              </dt>
              <dd className="text-sm">{frontmatter.role}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest uppercase text-muted mb-1">
                Timeline
              </dt>
              <dd className="text-sm">{frontmatter.timeline}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest uppercase text-muted mb-1">
                Team
              </dt>
              <dd className="text-sm">{frontmatter.team}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest uppercase text-muted mb-1">
                Tools
              </dt>
              <dd className="text-sm">{frontmatter.tools?.join(", ")}</dd>
            </div>
          </dl>
        </FadeIn>

        {/* Cover */}
        <FadeIn delay={0.3}>
          <div
            className="cover-tinted mt-12 aspect-[16/9] rounded-sm flex items-center justify-center"
            style={{ backgroundColor: frontmatter.coverColor }}
            role="img"
            aria-label={`Cover image for ${frontmatter.title}`}
          >
            <span className="font-serif text-foreground/10 text-3xl md:text-4xl font-semibold text-center px-8 select-none" aria-hidden="true">
              {frontmatter.title}
            </span>
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.35}>
          <div
            className="prose mt-16"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </FadeIn>

        {/* Next project */}
        {nextProject && nextProject.slug !== slug && (
          <FadeIn>
            <div className="mt-24 pt-12 border-t border-border">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">
                Next project
              </p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="font-serif text-xl md:text-2xl font-semibold hover:opacity-70 transition-opacity"
              >
                {nextProject.frontmatter.title} &rarr;
              </Link>
            </div>
          </FadeIn>
        )}
        </div>
      </div>
    </article>
  );
}
