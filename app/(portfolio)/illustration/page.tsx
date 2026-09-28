import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSimplePage, extractHeadings } from "@/lib/content";
import FadeIn from "@/components/FadeIn";
import TableOfContents from "@/components/TableOfContents";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSimplePage("illustration");
  if (!page) return {};
  return {
    title: page.frontmatter.title,
    ...(page.frontmatter.subtitle && { description: page.frontmatter.subtitle }),
  };
}

// A curated retrospective pulling illustration work out of several case
// studies (and a few pieces that never had a home on the site), for
// conversations where illustration itself is the thing being evaluated.
// Not linked from the main nav on purpose, it's a page to share directly.
export default async function IllustrationPage() {
  const page = await getSimplePage("illustration");
  if (!page) notFound();

  const { frontmatter } = page;
  const { html: content, headings } = extractHeadings(page.content);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-16 items-start">
          <div className="flex-1 min-w-0 max-w-3xl">
            <FadeIn>
              <Link
                href="/work"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                &larr; All work
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mt-6 leading-[1.1]">
                {frontmatter.title}
              </h1>
              {frontmatter.subtitle && (
                <p className="mt-4 text-lg text-muted leading-relaxed">
                  {frontmatter.subtitle}
                </p>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                className="prose mt-16"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </FadeIn>
          </div>
          <TableOfContents headings={headings} />
        </div>
      </div>
    </article>
  );
}
