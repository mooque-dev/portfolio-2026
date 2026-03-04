"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import WritingCard from "@/components/WritingCard";
import FadeIn from "@/components/FadeIn";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor: string;
  featured: boolean;
}

interface Writing {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface Props {
  featured: Project[];
  recentWriting: Writing[];
}

export default function HomeEditorial({ featured, recentWriting }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl">
              I design the invisible architecture of products.
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              The systems, patterns, and culture that make great work feel
              inevitable. I&apos;m Allen Kang — a design leader with a Fine Arts
              background, currently merging three products into one at Keela
              (acquired by Aplos).
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex gap-6 text-sm">
              <Link
                href="/work"
                className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
              >
                View work
              </Link>
              <Link
                href="/about"
                className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
              >
                About me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Work */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                Featured Work
              </h2>
              <Link
                href="/work"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                View all
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {featured.map((project, i) => (
              <FadeIn
                key={project.slug}
                delay={i * 0.1}
                className={i === 0 ? "md:col-span-2" : ""}
              >
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  subtitle={project.subtitle}
                  category={project.category}
                  coverColor={project.coverColor}
                  featured={i === 0}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="px-6 py-24 md:py-32 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug font-medium max-w-4xl">
              I studied Fine Arts before I ever touched a wireframe.
              That training — seeing composition in complexity, rhythm in
              interaction — still shapes how I design systems that thousands
              of people rely on.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/about"
              className="inline-block mt-8 text-sm underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
            >
              More about me
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Latest Writing */}
      {recentWriting.length > 0 && (
        <section className="px-6 py-24 md:py-32 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                  Writing
                </h2>
                <Link
                  href="/writing"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  View all
                </Link>
              </div>
            </FadeIn>
            <div className="max-w-4xl">
              {recentWriting.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 0.1}>
                  <WritingCard
                    slug={post.slug}
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
