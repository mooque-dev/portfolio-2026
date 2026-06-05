import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWritingPost,
  getWritingSlugs,
  getAllWritingPosts,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";
import FadeIn from "@/components/FadeIn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWritingPost(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getWritingPost(slug);
  if (!post) notFound();

  const allPosts = await getAllWritingPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1];

  const { frontmatter, content } = post;

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
        <FadeIn>
          <Link
            href="/writing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; All writing
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <time className="block mt-8 text-sm text-muted">
            {formatDate(frontmatter.date)}
          </time>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mt-3 leading-[1.1]">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {frontmatter.excerpt}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 pt-8 border-t border-border" />
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </FadeIn>

        {nextPost && (
          <FadeIn>
            <div className="mt-24 pt-12 border-t border-border">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">
                Next article
              </p>
              <Link
                href={`/writing/${nextPost.slug}`}
                className="font-serif text-xl md:text-2xl font-semibold hover:opacity-70 transition-opacity"
              >
                {nextPost.frontmatter.title} &rarr;
              </Link>
            </div>
          </FadeIn>
        )}
        </div>
      </div>
    </article>
  );
}
