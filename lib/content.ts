import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  category: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  coverColor: string;
  featured: boolean;
  order: number;
}

export interface WritingFrontmatter {
  title: string;
  date: string;
  excerpt: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

function getContentFiles(subdir: string): string[] {
  const dir = path.join(contentDirectory, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

async function parseMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

export async function getProject(
  slug: string
): Promise<ContentItem<ProjectFrontmatter> | null> {
  const filePath = path.join(contentDirectory, "work", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = await parseMarkdown(content);
  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content: html,
  };
}

export async function getAllProjects(): Promise<
  ContentItem<ProjectFrontmatter>[]
> {
  const files = getContentFiles("work");
  const projects = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getProject(slug);
    })
  );
  return projects
    .filter((p): p is ContentItem<ProjectFrontmatter> => p !== null)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export async function getFeaturedProjects(): Promise<
  ContentItem<ProjectFrontmatter>[]
> {
  const all = await getAllProjects();
  return all.filter((p) => p.frontmatter.featured);
}

export async function getWritingPost(
  slug: string
): Promise<ContentItem<WritingFrontmatter> | null> {
  const filePath = path.join(contentDirectory, "writing", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = await parseMarkdown(content);
  return {
    slug,
    frontmatter: data as WritingFrontmatter,
    content: html,
  };
}

export async function getAllWritingPosts(): Promise<
  ContentItem<WritingFrontmatter>[]
> {
  const files = getContentFiles("writing");
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getWritingPost(slug);
    })
  );
  return posts
    .filter((p): p is ContentItem<WritingFrontmatter> => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getProjectSlugs(): string[] {
  return getContentFiles("work").map((f) => f.replace(/\.mdx$/, ""));
}

export function getWritingSlugs(): string[] {
  return getContentFiles("writing").map((f) => f.replace(/\.mdx$/, ""));
}
