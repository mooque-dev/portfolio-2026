import type { Metadata } from "next";
import { getAllWritingPosts } from "@/lib/content";
import WritingCard from "@/components/WritingCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on design leadership, systems thinking, and building products that matter.",
};

export default async function WritingPage() {
  const posts = await getAllWritingPosts();

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Writing
          </h1>
          <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
            Things I&apos;m working through — mostly about design systems,
            organizational challenges, and what changes when you zoom out.
          </p>
        </FadeIn>

        <div className="mt-12 max-w-4xl">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <WritingCard
                slug={post.slug}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                excerpt={post.frontmatter.excerpt}
              />
            </FadeIn>
          ))}
        </div>

        {posts.length === 0 && (
          <FadeIn>
            <p className="mt-12 text-muted">
              Writing coming soon. Check back for thoughts on design,
              leadership, and building products.
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
