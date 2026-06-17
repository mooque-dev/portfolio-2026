import { getAllProjects, getAllWritingPosts } from "@/lib/content";
import HomeContent from "@/components/HomeContent";
import HomeShell from "@/components/HomeShell";

export default async function Home() {
  const allProjects = await getAllProjects();
  const recentWriting = (await getAllWritingPosts()).slice(0, 3);

  const projects = allProjects.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    subtitle: p.frontmatter.subtitle,
    category: p.frontmatter.category,
    type: p.frontmatter.type ?? "work",
    coverColor: p.frontmatter.coverColor,
    featured: p.frontmatter.featured,
    role: p.frontmatter.role,
    timeline: p.frontmatter.timeline,
  }));

  const writing = recentWriting.map((w) => ({
    slug: w.slug,
    title: w.frontmatter.title,
    date: w.frontmatter.date,
    excerpt: w.frontmatter.excerpt,
  }));

  return (
    <HomeShell>
      <HomeContent allProjects={projects} recentWriting={writing} />
    </HomeShell>
  );
}
