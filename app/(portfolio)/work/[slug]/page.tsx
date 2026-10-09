import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getProject, getProjectSlugs, getAllProjects, chapterize } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ChapterNav from "@/components/ChapterNav";
import CaseLightbox from "@/components/CaseLightbox";

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
  if (project.frontmatter.href) redirect(project.frontmatter.href);

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] ?? allProjects[0];

  const { frontmatter } = project;
  const { intro, chapters } = chapterize(project.content);
  const blur = frontmatter.wip
    ? "[&_img]:blur-md [&_img]:brightness-75 [&_img.clear]:blur-none [&_img.clear]:brightness-100"
    : "";
  const navItems = [
    { id: "overview", label: "Overview" },
    ...chapters.map((c) => ({ id: c.id, label: `${c.num} ${c.kicker ?? c.title.replace(/<[^>]+>/g, "")}` })),
  ];
  const meta: [string, ReactNode][] = [
    ["Role", frontmatter.role],
    [
      frontmatter.company ? "Company" : "Timeline",
      frontmatter.company ? (
        <>
          {frontmatter.company}
          <span className="block text-muted">{frontmatter.timeline}</span>
        </>
      ) : (
        frontmatter.timeline
      ),
    ],
    ["Team", frontmatter.team],
    ["Tools", frontmatter.tools?.join(", ")],
  ];

  return (
    <article className="pb-24 md:pb-32">
      {chapters.length > 1 && <ChapterNav items={navItems} />}

      <header
        id="overview"
        className={`max-w-[1120px] mx-auto px-6 scroll-mt-32 ${chapters.length > 1 ? "pt-12 md:pt-16" : "pt-32 md:pt-40"}`}
      >
        <FadeIn>
          <Link href="/work" className="text-sm text-muted hover:text-foreground transition-colors">
            &larr; All work
          </Link>
          <p className="mt-8 text-[13px] tracking-[0.1em] uppercase font-semibold text-muted">
            Case study &middot; {frontmatter.category}
            {frontmatter.company && <> &middot; {frontmatter.company}</>}
          </p>
          <h1 className="font-serif text-[34px] md:text-[48px] font-bold tracking-[-0.01em] mt-3.5 leading-[1.1] max-w-[880px] text-balance">
            {frontmatter.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted leading-relaxed max-w-[760px]">
            {frontmatter.subtitle}
          </p>
          {frontmatter.liveUrl && (
            <a
              href={frontmatter.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              Visit the live app
              <span aria-hidden>&#8599;</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
        </FadeIn>

        <FadeIn delay={0.1}>
          <dl className="mt-9 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-5">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="text-[12.5px] tracking-[0.1em] uppercase font-semibold text-muted mb-1">{label}</dt>
                <dd className="text-[15px] leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        {frontmatter.glance && frontmatter.glance.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {frontmatter.glance.map(([value, label]) => (
                <div key={label} className="border-t-2 border-foreground pt-3">
                  <b className="block text-[34px] md:text-[40px] leading-[1.05] font-bold tracking-[-0.02em] tabular-nums">
                    {value}
                  </b>
                  <span className="block mt-1.5 text-[15px] leading-snug text-muted">{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {frontmatter.tldr && frontmatter.tldr.length > 0 && (
          <FadeIn delay={0.2}>
            <dl className="mt-11 grid gap-x-6 md:grid-cols-[130px_1fr] max-w-[900px]">
              {frontmatter.tldr.map(([label, text]) => (
                <div key={label} className="contents">
                  <dt className="text-[12.5px] tracking-[0.1em] uppercase font-bold text-muted pt-1">{label}</dt>
                  <dd className="mb-3 md:mb-2.5 text-[17px] leading-relaxed">{text}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        )}

        {frontmatter.coverImage && (
          <FadeIn delay={0.25}>
            <div
              className="mt-12 aspect-[16/9] rounded-lg overflow-hidden relative border border-border"
              style={{ backgroundColor: frontmatter.coverColor }}
            >
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                fill
                sizes="(min-width: 1120px) 1072px, 100vw"
                className={`object-cover object-center ${frontmatter.wip ? "blur-md brightness-75" : ""}`}
                priority
              />
            </div>
          </FadeIn>
        )}

        {frontmatter.wip && (
          <p className="mt-8 border-l-2 border-border pl-4 text-sm text-muted leading-relaxed max-w-[720px]">
            The product visuals here are intentionally blurred. This work is
            confidential. The aggregate results are shown as reported, and
            I&apos;m glad to walk through the real screens in conversation.
          </p>
        )}
      </header>

      <div className="max-w-[1120px] mx-auto px-6" data-case-body>
        {intro.trim() && (
          <div className={`case-body mt-16 ${blur}`} dangerouslySetInnerHTML={{ __html: intro }} />
        )}

        {chapters.map((c) => (
          <section key={c.id} id={c.id} className="pt-20 md:pt-24 scroll-mt-32">
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 md:gap-x-6 gap-y-1 max-w-[980px]">
              <span aria-hidden className="row-span-2 font-serif text-[42px] md:text-[56px] leading-none font-bold text-[var(--seal)]">
                {c.num}
              </span>
              {c.kicker && (
                <span className="text-[13px] tracking-[0.12em] uppercase font-bold text-muted">{c.kicker}</span>
              )}
              <h2
                className="font-serif text-[28px] md:text-[38px] leading-[1.15] font-semibold text-balance"
                dangerouslySetInnerHTML={{ __html: c.title }}
              />
            </div>
            <div className={`case-body mt-6 ${blur}`} dangerouslySetInnerHTML={{ __html: c.html }} />
          </section>
        ))}

        {nextProject && nextProject.slug !== slug && (
          <div className="mt-24 pt-12 border-t border-border">
            <p className="text-xs tracking-widest uppercase text-muted mb-3">Next project</p>
            <Link
              href={nextProject.frontmatter.href ?? `/work/${nextProject.slug}`}
              className="font-serif text-xl md:text-2xl font-semibold hover:opacity-70 transition-opacity"
            >
              {nextProject.frontmatter.title} &rarr;
            </Link>
          </div>
        )}
      </div>
      <CaseLightbox skipBlurred={!!frontmatter.wip} />
    </article>
  );
}
