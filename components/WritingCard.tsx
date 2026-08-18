"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface WritingCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function WritingCard({
  slug,
  title,
  date,
  excerpt,
}: WritingCardProps) {
  return (
    <Link href={`/writing/${slug}`} className="group block">
      <article className="py-6 border-b border-border flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
        <time dateTime={date} className="text-sm text-muted shrink-0 md:w-40">
          {formatDate(date)}
        </time>
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <h3 className="font-serif text-lg font-semibold leading-snug transition-opacity group-hover:opacity-70">
              {title}
            </h3>
            <span
              className="text-muted text-base opacity-0 -translate-x-1.5 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0"
              aria-hidden="true"
            >
              →
            </span>
          </div>
          <p className="text-sm text-muted mt-1 leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
