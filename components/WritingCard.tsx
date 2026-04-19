"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface WritingCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const arrowVariants = {
  rest: { opacity: 0, x: -6 },
  hover: { opacity: 1, x: 0 },
};

export default function WritingCard({
  slug,
  title,
  date,
  excerpt,
}: WritingCardProps) {
  return (
    <Link href={`/writing/${slug}`} className="block">
      <motion.article
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="py-6 border-b border-border flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
      >
        <time dateTime={date} className="text-sm text-muted shrink-0 md:w-40">
          {formatDate(date)}
        </time>
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <h3 className="font-serif text-lg font-semibold leading-snug transition-opacity group-hover:opacity-70">
              {title}
            </h3>
            <motion.span
              variants={arrowVariants}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-muted text-base"
              aria-hidden="true"
            >
              →
            </motion.span>
          </div>
          <p className="text-sm text-muted mt-1 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
