"use client";

import { useState, useEffect } from "react";
import type { Heading } from "@/lib/content";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0% -55% 0%", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-28 self-start w-44 shrink-0"
    >
      <p className="microlabel text-muted mb-4 select-none">
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className="relative flex items-start gap-2" style={{ paddingLeft: h.level === 3 ? "10px" : "0" }}>
            <span
              className="mt-[3px] shrink-0 w-px self-stretch transition-all duration-300"
              style={{
                background: active === h.id ? "var(--foreground)" : "transparent",
                opacity: active === h.id ? 1 : 0,
              }}
            />
            <a
              href={`#${h.id}`}
              className={`block text-[11px] leading-snug transition-colors duration-150 ${
                active === h.id
                  ? "text-foreground"
                  : "text-muted/45 hover:text-muted/80"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
