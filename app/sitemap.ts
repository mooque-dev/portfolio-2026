import type { MetadataRoute } from "next";
import { getProjectSlugs, getAllWritingPosts } from "@/lib/content";

const base = "https://mooque.xyz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/writing", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/resume", priority: 0.6 },
    { path: "/gateway", priority: 0.5 },
  ];

  const projects = getProjectSlugs().map((slug) => ({
    url: `${base}/work/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await getAllWritingPosts();
  const writing = posts.map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...projects,
    ...writing,
  ];
}
