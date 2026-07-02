import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { changelog, type ChangelogTag } from "@/lib/changelog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Every meaningful update to this site, with the reasoning. Built in the open.",
};

const TAG_LABEL: Record<ChangelogTag, string> = {
  design: "Design",
  content: "Content",
  engineering: "Engineering",
  fix: "Fix",
};

export default function ChangelogPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Changelog
            </h1>
            <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
              This site is a working product, so it keeps release notes: every
              meaningful push, what changed, and why. I build it in the open
              with an AI pair; the taste and the final calls are mine.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-0">
            {changelog.map((entry, i) => (
              <FadeIn key={`${entry.date}-${entry.title}`} delay={Math.min(i * 0.05, 0.3)}>
                <article
                  className={`relative border-l border-border pl-8 ${
                    i === changelog.length - 1 ? "pb-0" : "pb-16"
                  }`}
                >
                  <span
                    className="absolute -left-[5px] top-[6px] h-[9px] w-[9px] rounded-full bg-foreground"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <time
                      dateTime={entry.date}
                      className="text-xs tracking-wide text-muted tabular-nums"
                    >
                      {formatDate(entry.date)}
                    </time>
                    <span className="flex items-center gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase text-muted"
                        >
                          {TAG_LABEL[tag]}
                        </span>
                      ))}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold mt-3 leading-snug">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
                    {entry.what}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    <span className="text-[10px] tracking-[0.16em] uppercase mr-2">
                      Why
                    </span>
                    {entry.why}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-16 text-sm text-muted leading-relaxed max-w-xl">
              Older than this, the history lives in git. The format takes after
              teams that publish their work as it happens; if a change was worth
              shipping, it is worth explaining.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
