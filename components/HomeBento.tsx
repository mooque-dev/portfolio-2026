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

const tileSpan: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2",
  1: "md:col-span-1 md:row-span-1",
  2: "md:col-span-1 md:row-span-1",
  3: "md:col-span-1 md:row-span-2",
  4: "md:col-span-2 md:row-span-1",
  5: "md:col-span-1 md:row-span-1",
};

const tileAspect: Record<number, string> = {
  0: "aspect-[4/3]",
  1: "aspect-square",
  2: "aspect-square",
  3: "aspect-[3/5]",
  4: "aspect-[3/1]",
  5: "aspect-square",
};

export default function HomeBento({ allProjects, recentWriting }: Props) {
  return (
    <>
      {/* Compact header */}
      <section className="pt-28 md:pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm text-muted mb-2">Allen Kang</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-lg">
              Designing the foundations that make great products feel inevitable.
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Bento grid */}
      <section className="px-6 pb-16 md:pb-24" aria-label="Project grid">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-3">
          {allProjects.map((project, i) => (
            <FadeIn
              key={project.slug}
              delay={i * 0.06}
              className={tileSpan[i] ?? "md:col-span-1 md:row-span-1"}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full relative overflow-hidden rounded-xl"
              >
                <div
                  className="cover-tinted absolute inset-0"
                  style={{ backgroundColor: project.coverColor }}
                  role="img"
                  aria-label={`Cover for ${project.title}`}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.06] transition-colors duration-300" aria-hidden="true" />
                <div className={`relative ${tileAspect[i] ?? "aspect-square"} p-5 md:p-6 flex flex-col justify-end`}>
                  <span className="inline-block self-start bg-background/80 backdrop-blur-sm text-foreground text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium mb-2">
                    {project.category}
                  </span>
                  <h2 className="font-serif text-lg md:text-xl font-bold leading-snug text-foreground drop-shadow-sm">
                    {project.title}
                  </h2>
                  {(i === 0 || i === 3) && (
                    <p className="text-sm text-foreground/70 mt-1.5 leading-relaxed max-w-sm drop-shadow-sm">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}

          {/* Writing tile */}
          {recentWriting.length > 0 && (
            <FadeIn delay={allProjects.length * 0.06} className="md:col-span-1">
              <div className="h-full bg-surface rounded-xl p-5 md:p-6 flex flex-col">
                <p className="text-[10px] tracking-widest uppercase text-muted mb-4">
                  Writing
                </p>
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  {recentWriting.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/writing/${post.slug}`}
                      className="group block"
                    >
                      <h3 className="font-serif text-sm font-semibold leading-snug group-hover:opacity-60 transition-opacity">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/writing"
                  className="text-xs text-muted hover:text-foreground transition-colors mt-4"
                >
                  View all &rarr;
                </Link>
              </div>
            </FadeIn>
          )}

          {/* About tile */}
          <FadeIn delay={(allProjects.length + 1) * 0.06} className="md:col-span-2">
            <div className="h-full bg-surface rounded-xl p-5 md:p-6 flex flex-col justify-between">
              <p className="font-serif text-lg md:text-xl leading-snug font-medium max-w-lg">
                Fine Arts trained, systems minded. Building design culture at Keela (acquired by Aplos) — where I cook, paint, code, and occasionally ship enterprise software.
              </p>
              <div className="flex gap-4 mt-6">
                <Link href="/about" className="text-xs text-muted hover:text-foreground transition-colors">
                  About &rarr;
                </Link>
                <Link href="/resume" className="text-xs text-muted hover:text-foreground transition-colors">
                  Resume &rarr;
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
