import { describe, it, expect } from "vitest";
import {
  extractHeadings,
  getAllProjects,
  getProject,
  getProjectSlugs,
} from "@/lib/content";

describe("extractHeadings", () => {
  it("extracts h2/h3, slugifies ids, and strips inner tags from text", () => {
    const html = "<h2>The Brief</h2><p>body</p><h3>A <em>Small</em> Experiment</h3>";
    const { html: out, headings } = extractHeadings(html);
    expect(headings).toEqual([
      { id: "the-brief", text: "The Brief", level: 2 },
      { id: "a-small-experiment", text: "A Small Experiment", level: 3 },
    ]);
    // Ids are injected back into the markup for anchor links.
    expect(out).toContain('<h2 id="the-brief">');
    expect(out).toContain('<h3 id="a-small-experiment">');
  });

  it("ignores h1 and h4+ (only h2/h3 make the table of contents)", () => {
    const { headings } = extractHeadings("<h1>Title</h1><h4>Aside</h4>");
    expect(headings).toHaveLength(0);
  });

  it("collapses punctuation and trims stray dashes in ids", () => {
    const { headings } = extractHeadings("<h2>What I Took Away!</h2>");
    expect(headings[0].id).toBe("what-i-took-away");
  });
});

describe("getAllProjects", () => {
  it("returns projects ordered ascending by `order`", async () => {
    const all = await getAllProjects();
    expect(all.length).toBeGreaterThan(0);
    const orders = all.map((p) => p.frontmatter.order ?? 99);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("gives every project a slug, title, and rendered html body", async () => {
    const all = await getAllProjects();
    for (const p of all) {
      expect(p.slug).toBeTruthy();
      expect(p.frontmatter.title).toBeTruthy();
      expect(p.content).toContain("<");
    }
  });
});

describe("getProject", () => {
  it("returns null for an unknown slug", async () => {
    expect(await getProject("this-slug-does-not-exist-xyz")).toBeNull();
  });

  it("resolves a real slug with matching frontmatter", async () => {
    const slug = getProjectSlugs()[0];
    const project = await getProject(slug);
    expect(project).not.toBeNull();
    expect(project!.slug).toBe(slug);
    expect(project!.frontmatter.title).toBeTruthy();
  });
});
