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
  type: "work" | "personal" | "experiment";
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  coverColor: string;
  coverImage?: string;
  featured: boolean;
  wip?: boolean;
  order: number;
  // Optional headline stat for the home feature card (e.g. "75% → 92%").
  featuredStat?: string;
  featuredStatLabel?: string;
  // Optional live deployment. When set, the case study shows a "visit the app"
  // link so a visitor can open the real thing, not just read about it.
  liveUrl?: string;
  // Employer or context for the work, shown beside the role.
  company?: string;
  // A 30-second summary for skimming reviewers: [label, text] pairs.
  tldr?: [string, string][];
  // A case study that lives on its own standalone page instead of /work/[slug].
  href?: string;
  // Up to three headline numbers for the case hero: [value, label] pairs.
  glance?: [string, string][];
  // How long the work took, shown beside the timeline (e.g. "about 3 months").
  duration?: string;
  // Outside links worth opening: [label, url] pairs.
  links?: [string, string][];
  // People who built it with Allen: [name, role, url?]. Name may be empty.
  credits?: [string, string, string?][];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

// Parses h2/h3 from rendered HTML, injects IDs, returns both.
export function extractHeadings(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const processed = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_, lvl, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, text, level: parseInt(lvl, 10) });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: processed, headings };
}

export interface Chapter {
  id: string;
  num: string;
  kicker?: string;
  title: string;
  html: string;
}

// Splits a case study into numbered chapters at each h2. An h2 written as
// "Kicker | Title" gets a short kicker, which also labels the chapter nav.
export function chapterize(html: string): { intro: string; chapters: Chapter[] } {
  let intro = "";
  const chapters: Chapter[] = [];
  for (const part of html.split(/(?=<h2>)/)) {
    const m = part.match(/^<h2>([\s\S]*?)<\/h2>/);
    if (!m) {
      intro += part;
      continue;
    }
    const [kicker, title] = m[1].includes(" | ")
      ? (m[1].split(" | ", 2) as [string, string])
      : [undefined, m[1]];
    const text = title.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "").trim();
    chapters.push({
      id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      num: String(chapters.length + 1).padStart(2, "0"),
      kicker: kicker?.trim(),
      title: title.trim(),
      html: part.slice(m[0].length),
    });
  }
  return { intro, chapters };
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
  // sanitize: false lets owner-authored MDX include raw <figure>/<img> markup
  // for captioned case-study visuals. Content is trusted (repo-authored only).
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);
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

export interface SimplePageFrontmatter {
  title: string;
  subtitle?: string;
}

// A one-off, hand-authored page outside the work/writing collections (for
// example a curated illustration retrospective). Same pipeline, single file,
// no slug list or index needed.
export async function getSimplePage(
  filename: string
): Promise<ContentItem<SimplePageFrontmatter> | null> {
  const filePath = path.join(contentDirectory, `${filename}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = await parseMarkdown(content);
  return {
    slug: filename,
    frontmatter: data as SimplePageFrontmatter,
    content: html,
  };
}

export function getProjectSlugs(): string[] {
  return getContentFiles("work").map((f) => f.replace(/\.mdx$/, ""));
}

export function getWritingSlugs(): string[] {
  return getContentFiles("writing").map((f) => f.replace(/\.mdx$/, ""));
}
