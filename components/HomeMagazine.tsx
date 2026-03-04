"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor: string;
  featured: boolean;
  role: string;
  timeline: string;
}

interface Writing {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface Props {
  allProjects: Project[];
  recentWriting: Writing[];
}

export default function HomeMagazine({ allProjects, recentWriting }: Props) {
  const hero = allProjects[0];
  const secondary = allProjects.slice(1, 3);
  const remaining = allProjects.slice(3);

  return (
    <>
      {/* Full-bleed hero — overlay text aligned to grid */}
      <section className="pt-16">
        <FadeIn direction="none">
          <Link href={`/work/${hero.slug}`} className="group block">
            <div
              className="cover-tinted relative w-full aspect-[2/1] md:aspect-[3/1]"
              style={{ backgroundColor: hero.coverColor }}
              role="img"
              aria-label={`Cover for ${hero.title}`}
            >
              <div className="absolute inset-0 bg-foreground/[0.03] group-hover:bg-foreground/[0.08] transition-colors duration-500" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0">
                <div className="max-w-6xl mx-auto px-6 pb-6 md:pb-12">
                  <span className="inline-block bg-foreground text-background text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium mb-3">
                    {hero.category}
                  </span>
                  <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl text-foreground">
                    {hero.title}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </section>

      {/* Two-up secondary */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {secondary.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.1}>
              <Link href={`/work/${project.slug}`} className="group block bg-background p-8 md:p-12">
                <span className="text-[10px] tracking-widest uppercase text-muted">
                  {project.category}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mt-2 leading-tight group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h2>
                <p className="text-muted mt-3 leading-relaxed max-w-md">
                  {project.subtitle}
                </p>
                <div
                  className="cover-tinted mt-8 aspect-[16/9] rounded-sm"
                  style={{ backgroundColor: project.coverColor }}
                  role="img"
                  aria-label={`Cover for ${project.title}`}
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Pull-quote interlude */}
      <section className="px-6 py-20 md:py-28 border-t border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-medium leading-snug tracking-tight max-w-4xl mx-auto">
              &ldquo;I studied painting before I studied interfaces. That eye for composition, tension, and balance? It&apos;s the same skill — just different material.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted">
              Allen Kang
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Remaining projects — stacked editorial */}
      {remaining.length > 0 && (
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            {remaining.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.05}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className={`py-8 border-b border-border md:grid md:grid-cols-12 gap-8 items-center ${i === 0 ? "border-t" : ""}`}>
                    <div className="md:col-span-4">
                      <div
                        className="cover-tinted aspect-[4/3] rounded-sm"
                        style={{ backgroundColor: project.coverColor }}
                        role="img"
                        aria-label={`Cover for ${project.title}`}
                      />
                    </div>
                    <div className="md:col-span-8 mt-4 md:mt-0">
                      <span className="text-[10px] tracking-widest uppercase text-muted">
                        {project.category}
                      </span>
                      <h3 className="font-serif text-xl md:text-2xl font-bold mt-1 leading-snug group-hover:opacity-70 transition-opacity">
                        {project.title}
                      </h3>
                      <p className="text-muted mt-2 leading-relaxed max-w-lg">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Writing — large serif titles */}
      {recentWriting.length > 0 && (
        <section className="px-6 py-16 md:py-20 bg-surface">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <p className="text-[10px] tracking-widest uppercase text-muted mb-8">
                Recent Writing
              </p>
            </FadeIn>
            {recentWriting.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <Link href={`/writing/${post.slug}`} className="group block py-6 border-b border-border last:border-b-0">
                  <h3 className="font-serif text-xl md:text-3xl font-bold leading-tight group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted mt-2">{post.excerpt}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
