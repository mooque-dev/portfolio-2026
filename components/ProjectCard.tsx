"use client";

import Link from "next/link";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor?: string;
  coverImage?: string;
  wip?: boolean;
  featuredStat?: string;
  featuredStatLabel?: string;
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  category,
  coverColor = "#e5e5e0",
  coverImage,
  wip = false,
  featuredStat,
  featuredStatLabel,
}: ProjectCardProps) {
  return (
    <Magnetic strength={0.04} radius={260}>
    <Link href={`/work/${slug}`} className="group block">
      <article className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <div className="overflow-hidden rounded-sm aspect-[4/3]">
          <div
            className="cover-tinted relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ backgroundColor: coverColor }}
            role="img"
            aria-label={`Cover for ${title}`}
          >
            {coverImage && (
              <Image
                src={coverImage}
                alt=""
                fill
                className={`object-cover object-center transition-[filter] duration-300 ${wip ? "blur-lg brightness-75" : ""}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {wip && (
              <>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-3 right-3 z-10 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[9px] tracking-[0.18em] uppercase text-white/80">
                  Confidential
                </span>
                {featuredStat && (
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                    <div className="text-3xl md:text-4xl font-light tabular-nums leading-none">
                      {featuredStat}
                    </div>
                    {featuredStatLabel && (
                      <div className="mt-1.5 text-[10px] tracking-[0.14em] uppercase text-white/75">
                        {featuredStatLabel}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            {!coverImage && (
              <div className="absolute inset-0 flex items-center justify-center p-8" aria-hidden="true">
                <span className="font-serif text-foreground/15 text-center text-2xl md:text-3xl font-semibold leading-tight select-none">
                  {title}
                </span>
              </div>
            )}
            {/* Consistent hairline frame so every cover reads as a framed
                object, whether it's a bright product screenshot, a color
                field, or the blurred confidential card. */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.07] dark:ring-white/10" aria-hidden="true" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.06] transition-colors duration-300" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-muted">
            {category}
          </p>
          <h3 className="font-serif text-lg md:text-xl font-normal mt-2 leading-snug group-hover:opacity-60 transition-opacity">
            {title}
          </h3>
          <p className="text-[13px] text-muted leading-[1.65] mt-1.5 line-clamp-2">
            {subtitle}
          </p>
        </div>
      </article>
    </Link>
    </Magnetic>
  );
}
