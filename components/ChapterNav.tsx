"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/components/Arrow";

// Sticky chapter pills for a case study, under the site header. The pill for
// the chapter in view is filled, and the row scrolls sideways to keep it shown.
// An optional button on the right opens the live product, and an optional
// band above the pills points to an interactive demo further down the page.
export default function ChapterNav({
  items,
  cta,
  demo,
}: {
  items: { id: string; label: string }[];
  cta?: { href: string; label: string };
  demo?: { text: string; href: string };
}) {
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
    // A jump straight back to the top (Home key, "Back to top") can skip the
    // observer, so the top of the page always means the first pill.
    const first = items[1] && document.getElementById(items[1].id);
    const onScroll = () => {
      if (first && first.getBoundingClientRect().top > innerHeight * 0.45) setActive(items[0].id);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // A link straight to a chapter (#id) can land short when images above it
  // finish loading after the jump; settle on it once the page has loaded.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
    const t = window.setTimeout(go, 600);
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", go);
    };
  }, []);

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
      {demo && (
        <div className="bg-foreground text-background">
          <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-x-3 gap-y-1 flex-wrap text-[13.5px] leading-snug">
            <span aria-hidden className="h-2 w-2 flex-none rounded-full bg-[var(--seal)]" />
            <span className="hidden sm:inline opacity-85">{demo.text}</span>
            <a href={demo.href} className="font-medium underline underline-offset-4 hover:opacity-70 transition-opacity">
              Try the interactive version <Arrow dir="down" />
            </a>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-3">
        <div
          ref={rowRef}
          className="min-w-0 flex-1 flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        {cta && (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-[13px] font-medium hover:border-foreground/40 transition-colors"
          >
            <span className="hidden sm:inline">{cta.label} </span>
            <span className="sm:hidden">Open </span>
            <Arrow dir="up-right" />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
      </div>
    </nav>
  );
}
