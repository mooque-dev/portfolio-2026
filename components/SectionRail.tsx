"use client";

import { useEffect, useState } from "react";

// A quiet list of the page's sections down the left side on wide screens. It
// stays in view while you scroll, and marks the section you're reading.
export default function SectionRail({ items }: { items: { id: string; num: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <ol className="m-0 list-none space-y-1 border-l border-border p-0">
        {items.map(({ id, num, label }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={on ? "true" : undefined}
                className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors ${
                  on ? "border-foreground text-foreground font-medium" : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <span className="tabular-nums opacity-60">{num}</span>
                {label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
