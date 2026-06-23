"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor?: string;
  coverImage?: string;
  featured?: boolean;
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  category,
  coverColor = "#e5e5e0",
  coverImage,
  featured = false,
}: ProjectCardProps) {
  return (
    <Magnetic strength={0.04} radius={260}>
    <Link href={`/work/${slug}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
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
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            {!coverImage && (
              <div className="absolute inset-0 flex items-center justify-center p-8" aria-hidden="true">
                <span className="font-serif text-foreground/15 text-center text-2xl md:text-3xl font-semibold leading-tight select-none">
                  {title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.06] transition-colors duration-300" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-muted/70">
            {category}
          </p>
          <h3 className="font-serif text-lg md:text-xl font-normal mt-2 leading-snug group-hover:opacity-60 transition-opacity">
            {title}
          </h3>
          <p className="text-[13px] text-muted leading-[1.65] mt-1.5 line-clamp-2">
            {subtitle}
          </p>
        </div>
      </motion.article>
    </Link>
    </Magnetic>
  );
}
