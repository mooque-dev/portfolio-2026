import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getVaultFeed, type VaultType } from "@/lib/vault";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vault",
  description:
    "A living record: notes, moments, frames, and artifacts from Allen Kang's life and work, kept in the open.",
};

const TYPE_LABEL: Record<VaultType, string> = {
  note: "Note",
  moment: "Moment",
  frame: "Frame",
  artifact: "Artifact",
  essay: "Essay",
};

export default async function VaultPage() {
  const feed = await getVaultFeed();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Vault
            </h1>
            {/* Epigraph: to be replaced with the scanned handwritten note */}
            <blockquote className="mt-6 border-l-2 border-border pl-4 max-w-xl">
              <p className="text-lg text-muted leading-relaxed italic">
                &ldquo;You are a detective. Your mission is to document and
                observe the world around you as if you&apos;ve never seen it
                before. Take notes. Collect things you find on your
                travels.&rdquo;
              </p>
              <cite className="mt-2 block text-xs tracking-wide text-muted not-italic">
                a note to self, found again in 2026
              </cite>
            </blockquote>
          </FadeIn>

          <div className="mt-16 space-y-0">
            {feed.map((entry, i) => (
              <FadeIn key={entry.slug} delay={Math.min(i * 0.04, 0.24)}>
                <article
                  className={`relative border-l border-border pl-8 ${
                    i === feed.length - 1 ? "pb-0" : "pb-14"
                  }`}
                >
                  <span
                    className="absolute -left-[5px] top-[6px] h-[9px] w-[9px] rounded-full bg-foreground"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full border border-border px-2 py-0.5 microlabel text-muted">
                      {TYPE_LABEL[entry.type]}
                    </span>
                    <time
                      dateTime={entry.date}
                      className="text-xs tracking-wide text-muted tabular-nums"
                    >
                      {formatDate(entry.date)}
                    </time>
                    {entry.signed && (
                      <span
                        className="h-[7px] w-[7px] rounded-[2px]"
                        style={{ backgroundColor: "var(--seal)" }}
                        aria-label="Signed entry"
                        role="img"
                      />
                    )}
                    {entry.source && (
                      <span className="text-[10px] tracking-wide text-muted">
                        from {entry.source}
                      </span>
                    )}
                  </div>

                  {entry.title &&
                    (entry.href ? (
                      <Link
                        href={entry.href}
                        className="font-serif text-xl md:text-2xl font-semibold mt-3 leading-snug block hover:opacity-70 transition-opacity"
                      >
                        {entry.title}
                      </Link>
                    ) : (
                      <h2 className="font-serif text-xl md:text-2xl font-semibold mt-3 leading-snug">
                        {entry.title}
                      </h2>
                    ))}

                  {entry.media && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={entry.media}
                      alt={entry.mediaAlt ?? ""}
                      className="mt-4 rounded-sm max-w-md w-full"
                      loading="lazy"
                    />
                  )}

                  {entry.html && (
                    <div
                      className="mt-3 text-[15px] leading-relaxed text-foreground/90 [&_p]:mt-2 first:[&_p]:mt-0"
                      dangerouslySetInnerHTML={{ __html: entry.html }}
                    />
                  )}

                  {entry.href && !entry.title && (
                    <Link
                      href={entry.href}
                      className="mt-2 inline-block text-[12px] text-muted hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
                    >
                      More &rarr;
                    </Link>
                  )}
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-16 text-sm text-muted leading-relaxed max-w-xl">
              The red mark means signed: finished thinking I stand behind.
              Everything else is allowed to be in progress. The present tense
              lives at{" "}
              <Link href="/now" className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors">
                now
              </Link>
              , and the site keeps its own diary in the{" "}
              <Link href="/changelog" className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors">
                changelog
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
