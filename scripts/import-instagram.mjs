#!/usr/bin/env node
/**
 * Instagram (Meta "Download Your Information") -> vault importer.
 *
 * Usage:
 *   node scripts/import-instagram.mjs <exportDir> --list
 *       Prints an indexed inventory (date, media count, caption preview).
 *       Use it to decide what to curate.
 *
 *   node scripts/import-instagram.mjs <exportDir> --import
 *       Reads scripts/instagram-selects.json and writes the selected posts
 *       as content/vault/*.mdx plus optimized media in public/vault/.
 *
 * Curation file (scripts/instagram-selects.json):
 *   [
 *     { "index": 12, "type": "frame",    "title": "Gas station, 2am" },
 *     { "index": 40, "type": "moment",   "title": "d-3 to Canada",
 *       "body": "A last run in Anyang before the move.", "signed": false },
 *     { "index": 7,  "type": "artifact", "mediaIndex": 1 }
 *   ]
 *   type: note | moment | frame | artifact  (default: moment)
 *   mediaIndex picks one image from a carousel (default: 0).
 *
 * The vault is curated, not mirrored: import a few dozen, not all 465.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const VAULT_DIR = path.join(ROOT, "content", "vault");
const MEDIA_DIR = path.join(ROOT, "public", "vault");
const SELECTS = path.join(ROOT, "scripts", "instagram-selects.json");

// Meta exports UTF-8 captions mis-decoded as latin-1. Reverse it.
function fixMojibake(s) {
  if (!s) return "";
  try {
    return Buffer.from(s, "latin1").toString("utf8");
  } catch {
    return s;
  }
}

function findPostsJson(exportDir) {
  const candidates = [
    // current layout
    "your_instagram_activity/content/posts_1.json",
    "your_instagram_activity/media/posts_1.json",
    // older layouts
    "content/posts_1.json",
    "media/posts_1.json",
  ];
  for (const rel of candidates) {
    const p = path.join(exportDir, rel);
    if (fs.existsSync(p)) return p;
  }
  // last resort: walk for posts_1.json
  const stack = [exportDir];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) stack.push(p);
      else if (/^posts_\d+\.json$/.test(name)) return p;
    }
  }
  return null;
}

function loadPosts(exportDir) {
  const jsonPath = findPostsJson(exportDir);
  if (!jsonPath) {
    console.error("Could not find posts_*.json under", exportDir);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  // Old exports: array. Some exports: { ig_posts: [...] } or similar.
  const arr = Array.isArray(raw)
    ? raw
    : raw.ig_posts ?? raw.posts ?? Object.values(raw)[0];
  return arr
    .map((post) => {
      const media = (post.media ?? []).map((m) => ({
        uri: m.uri,
        ts: m.creation_timestamp,
        title: fixMojibake(m.title ?? ""),
      }));
      const ts = post.creation_timestamp ?? media[0]?.ts;
      return {
        date: ts ? new Date(ts * 1000).toISOString().slice(0, 10) : "unknown",
        caption: fixMojibake(post.title ?? "") || media[0]?.title || "",
        media,
      };
    })
    .filter((p) => p.media.length > 0)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function slugify(s, fallback) {
  const base = (s || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 40)
    .replace(/^-+|-+$/g, "");
  return base || fallback;
}

async function optimize(srcPath, destPath) {
  // sharp ships with Next; resize to a sane web width, strip metadata.
  const { default: sharp } = await import("sharp");
  await sharp(srcPath)
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
}

const [exportDir, mode] = process.argv.slice(2);
if (!exportDir || !["--list", "--import"].includes(mode ?? "")) {
  console.error("Usage: node scripts/import-instagram.mjs <exportDir> --list | --import");
  process.exit(1);
}

const posts = loadPosts(exportDir);

if (mode === "--list") {
  console.log(`${posts.length} posts with media\n`);
  posts.forEach((p, i) => {
    const cap = p.caption.replace(/\s+/g, " ").slice(0, 80);
    console.log(
      `[${String(i).padStart(3)}] ${p.date}  x${p.media.length}  ${cap || "(no caption)"}`
    );
  });
  console.log(`\nNext: fill scripts/instagram-selects.json, then run --import.`);
  process.exit(0);
}

if (!fs.existsSync(SELECTS)) {
  console.error("Missing", SELECTS, "- run --list first and curate.");
  process.exit(1);
}
const selects = JSON.parse(fs.readFileSync(SELECTS, "utf8"));
fs.mkdirSync(VAULT_DIR, { recursive: true });
fs.mkdirSync(MEDIA_DIR, { recursive: true });

let written = 0;
for (const sel of selects) {
  const post = posts[sel.index];
  if (!post) {
    console.warn(`skip: no post at index ${sel.index}`);
    continue;
  }
  const type = sel.type ?? "moment";
  const media = post.media[sel.mediaIndex ?? 0];
  const srcPath = path.join(exportDir, media.uri);
  if (!fs.existsSync(srcPath)) {
    console.warn(`skip [${sel.index}]: media not found at ${media.uri}`);
    continue;
  }
  const slug = `${post.date}-${slugify(sel.title ?? post.caption, `ig-${sel.index}`)}`;
  const mediaName = `${slug}.jpg`;
  await optimize(srcPath, path.join(MEDIA_DIR, mediaName));

  const body = sel.body ?? post.caption;
  const fm = [
    "---",
    `type: ${type}`,
    `date: "${post.date}"`,
    sel.title ? `title: "${sel.title.replace(/"/g, '\\"')}"` : null,
    `media: "/vault/${mediaName}"`,
    `mediaAlt: "${(sel.alt ?? sel.title ?? "").replace(/"/g, '\\"')}"`,
    `source: "instagram"`,
    `signed: ${sel.signed ?? false}`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(
    path.join(VAULT_DIR, `${slug}.mdx`),
    `${fm}\n\n${body ? body.trim() + "\n" : ""}`
  );
  written++;
  console.log(`wrote ${slug}.mdx`);
}
console.log(`\n${written} entries imported. Review, edit voice, then commit.`);
