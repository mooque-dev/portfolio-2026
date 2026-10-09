import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getProject, getProjectSlugs, getAllProjects, chapterize } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import ChapterNav from "@/components/ChapterNav";
import CaseLightbox from "@/components/CaseLightbox";
import CaseDemos from "@/components/CaseDemos";

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

  // Previous and next stay within the same shelf (work, experiments, or
  // personal), in the order the Work page shows them.
  const allProjects = await getAllProjects();
  const shelf = allProjects.filter((p) => (p.frontmatter.type ?? "work") === (project.frontmatter.type ?? "work"));
  const at = shelf.findIndex((p) => p.slug === slug);
  const prevProject = shelf.length > 1 ? shelf[(at - 1 + shelf.length) % shelf.length] : null;
  const nextProject = shelf.length > 1 ? shelf[(at + 1) % shelf.length] : null;
  const neighbours = [
    prevProject && { dir: "Previous", p: prevProject },
    nextProject && nextProject.slug !== prevProject?.slug && { dir: "Next", p: nextProject },
  ].filter(Boolean) as { dir: string; p: typeof shelf[number] }[];
  const shelfName = { work: "professional work", experiment: "experiments", personal: "side projects" }[
    project.frontmatter.type ?? "work"
  ];

  const { frontmatter } = project;
  const { intro, chapters } = chapterize(project.content);
  const words = project.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 230));
  // Image-led archives with no chapters read better as a grid.
  const gallery = chapters.length === 0 && (project.content.match(/<img/g) ?? []).length >= 6;
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
      {chapters.length > 1 && (
        <ChapterNav
          items={navItems}
          cta={frontmatter.liveUrl ? { href: frontmatter.liveUrl, label: "Open the live app" } : undefined}
        />
      )}

      <header
        id="overview"
        className={`max-w-[1120px] mx-auto px-6 scroll-mt-32 ${chapters.length > 1 ? "pt-12 md:pt-16" : "pt-32 md:pt-40"}`}
      >
        <FadeIn>
          <Link href="/work" className="text-sm text-muted hover:text-foreground transition-colors">
            &larr; All work
          </Link>
          <p className="mt-8 text-[13px] tracking-[0.1em] uppercase font-semibold text-muted">
            {gallery ? "Archive" : "Case study"} &middot; {frontmatter.category}
            {frontmatter.company && <> &middot; {frontmatter.company}</>}
            {!gallery && <> &middot; {minutes} min read</>}
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
          <div
            className={`case-body mt-16 ${gallery ? "case-gallery" : ""} ${blur}`}
            dangerouslySetInnerHTML={{ __html: intro }}
          />
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

        <nav aria-label="More projects" className="mt-24 pt-10 border-t border-border">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[13px] tracking-[0.1em] uppercase font-semibold text-muted">More {shelfName}</p>
            <div className="flex gap-5 text-[14px]">
              <a href="#overview" className="text-muted hover:text-foreground transition-colors">Back to top &uarr;</a>
              <Link href="/work" className="text-muted hover:text-foreground transition-colors">All work</Link>
            </div>
          </div>
          {neighbours.length > 0 && (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {neighbours.map(({ dir, p }) => (
                <Link
                  key={dir}
                  href={p.frontmatter.href ?? `/work/${p.slug}`}
                  className={`group flex gap-4 rounded-lg border border-border p-3 hover:border-foreground/40 transition-colors ${
                    dir === "Next" ? "md:flex-row-reverse md:text-right" : ""
                  }`}
                >
                  {p.frontmatter.coverImage && (
                    <span
                      className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-md"
                      style={{ backgroundColor: p.frontmatter.coverColor }}
                    >
                      <Image
                        src={p.frontmatter.coverImage}
                        alt=""
                        fill
                        sizes="112px"
                        className={`object-cover ${p.frontmatter.wip ? "blur-sm brightness-75" : ""}`}
                      />
                    </span>
                  )}
                  <span className="min-w-0 self-center">
                    <span className="block text-[12px] tracking-[0.1em] uppercase text-muted">
                      {dir === "Previous" ? <>&larr; Previous</> : <>Next &rarr;</>}
                    </span>
                    <span className="mt-1 block font-serif text-[18px] leading-snug font-semibold group-hover:opacity-70 transition-opacity">
                      {p.frontmatter.title}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
      <CaseLightbox skipBlurred={!!frontmatter.wip} />
      <CaseDemos />
    </article>
  );
}
