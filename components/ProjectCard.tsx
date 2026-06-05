"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  coverColor?: string;
  featured?: boolean;
}

export default function ProjectCard({
  slug,
  title,
  subtitle,
  category,
  coverColor = "#e5e5e0",
  featured = false,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={`overflow-hidden rounded-sm ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <div
            className="cover-tinted relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ backgroundColor: coverColor }}
            role="img"
            aria-label={`Cover for ${title}`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8" aria-hidden="true">
              <span className="font-serif text-foreground/15 text-center text-2xl md:text-3xl font-semibold leading-tight select-none">
                {title}
              </span>
            </div>
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.06] transition-colors duration-300" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4">
          <Badge
            variant="outline"
            className="text-[10px] tracking-widest uppercase text-muted-foreground border-border/50 font-normal h-auto py-0.5 rounded-sm"
          >
            {category}
          </Badge>
          <h3 className="font-serif text-lg md:text-xl font-semibold mt-2 leading-snug group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          <p className="text-sm text-muted mt-1.5 leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
