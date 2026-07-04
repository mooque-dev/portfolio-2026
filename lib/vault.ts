import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getAllWritingPosts } from "./content";
import { nowSnapshots } from "./now";

// The vault is Allen's record: notes, moments, frames, artifacts, plus the
// essays and now-snapshots it inherits from elsewhere on the site. The
// changelog stays separate; that one is the site's own diary.

export type VaultType = "note" | "moment" | "frame" | "artifact" | "essay" | "now";

export interface VaultEntry {
  type: VaultType;
  date: string; // ISO; imported entries keep their original date
  slug: string;
  title?: string;
  html?: string; // rendered body, when the entry has one
  media?: string; // /vault/... image path
  mediaAlt?: string;
  href?: string; // where the entry links, if anywhere
  source?: string; // e.g. "instagram" for imported entries
  signed?: boolean; // finished thinking; gets the seal mark
}

interface VaultFrontmatter {
  type: Exclude<VaultType, "essay" | "now">;
  date: string;
  title?: string;
  media?: string;
  mediaAlt?: string;
  source?: string;
  signed?: boolean;
}

const vaultDir = path.join(process.cwd(), "content", "vault");

async function md(content: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return result.toString();
}

async function getNativeEntries(): Promise<VaultEntry[]> {
  if (!fs.existsSync(vaultDir)) return [];
  const files = fs.readdirSync(vaultDir).filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(vaultDir, file), "utf-8");
      const { data, content } = matter(raw);
      const fm = data as VaultFrontmatter;
      return {
        type: fm.type,
        date: fm.date,
        slug: file.replace(/\.mdx$/, ""),
        title: fm.title,
        html: content.trim() ? await md(content) : undefined,
        media: fm.media,
        mediaAlt: fm.mediaAlt,
        source: fm.source,
        signed: fm.signed,
      };
    })
  );
}

export async function getVaultFeed(): Promise<VaultEntry[]> {
  const native = await getNativeEntries();

  const essays: VaultEntry[] = (await getAllWritingPosts()).map((p) => ({
    type: "essay",
    date: p.frontmatter.date,
    slug: `essay-${p.slug}`,
    title: p.frontmatter.title,
    html: `<p>${p.frontmatter.excerpt}</p>`,
    href: `/writing/${p.slug}`,
    signed: true,
  }));

  const nows: VaultEntry[] = nowSnapshots.map((s) => ({
    type: "now",
    date: s.date,
    slug: `now-${s.date}`,
    html: `<p>${s.items.map((i) => i.text).join(". ")}.</p>`,
    href: "/now",
  }));

  return [...native, ...essays, ...nows].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
