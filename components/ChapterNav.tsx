"use client";

import { useEffect, useRef, useState } from "react";

// Sticky chapter pills for a case study, under the site header. The pill for
// the chapter in view is filled, and the row scrolls sideways to keep it shown.
export default function ChapterNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const row = rowRef.current;
    const pill = row?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (row && pill) row.scrollTo({ left: Math.max(0, pill.offsetLeft - 24), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Chapters"
      className="sticky top-16 z-40 mt-16 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div
        ref={rowRef}
        className="max-w-[1120px] mx-auto px-6 flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            className={`flex-none whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] font-medium transition-colors ${
              active === id
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
