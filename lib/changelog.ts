export type ChangelogTag = "design" | "content" | "engineering" | "fix";

export interface ChangelogEntry {
  date: string; // ISO, used for sorting and display
  title: string;
  tags: ChangelogTag[];
  what: string;
  why: string;
}

// Newest first. One entry per meaningful push (or tight cluster of pushes),
// written like release notes: what shipped, and the reasoning behind it.
// When you ship a change to this site, add an entry here in the same voice.
export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07-02",
    title: "A second audit, and the work grid gets its proof back",
    tags: ["fix", "engineering"],
    what: "Re-audited the whole site from recruiter, designer, and engineer seats. The flagship card on the work grid now leads with its 75% to 92% result instead of an unlabeled blur, the guide stays closed on browsing pages, ESLint went from seven problems to zero, and dependencies got patched.",
    why: "An audit only counts if you run it again after the fixes. The second pass caught a label that had been invisible all along: white text on a cream blur.",
  },
  {
    date: "2026-07-01",
    title: "Instant first paint, visible results, honest thumbnails",
    tags: ["design", "engineering"],
    what: "Replaced hydration-gated reveal animations with pure CSS so pages paint immediately. Un-blurred the Fee Opt-In results infographic, drew five cover marks to replace near-black screenshot thumbnails, and gave the wide-screen home a small Now rail.",
    why: "First visits started with two seconds of blank screen, and the best case study was hiding its own outcome. Aggregate results are not confidential; product screens are. The blur now knows the difference.",
  },
  {
    date: "2026-06-30",
    title: "The availability pill comes off",
    tags: ["content"],
    what: "Removed the green Open to roles indicator from the home hero.",
    why: "The work should make the case before the status does. The About page still says it in full sentences.",
  },
  {
    date: "2026-06-29",
    title: "Sharing layer: sitemap, robots, one clean share card",
    tags: ["engineering", "fix"],
    what: "Added a sitemap and robots file, then caught my own duplicate: a second generated share image was fighting the hand-made one, so the generators went and the branded card stayed.",
    why: "Links to this site get pasted into Slack and LinkedIn by people deciding whether to talk to me. The preview is the first impression before the first impression.",
  },
  {
    date: "2026-06-29",
    title: "Earned Black, and every em-dash leaves the site",
    tags: ["content"],
    what: "Published Earned Black, an essay on rank, ink, and what depth you cannot shortcut. Retitled two essays and two case studies away from formula. Removed all eighty em-dashes from the site, each replaced by the punctuation the sentence actually wanted.",
    why: "Titles that read like content marketing undercut writing that is personal. And the dashes were a tell: machine cadence in what should be a human voice.",
  },
  {
    date: "2026-06-27",
    title: "The guide wins; the chatbot goes",
    tags: ["design"],
    what: "Shipped a streaming AI chat grounded on the portfolio, lived with it for an evening, and removed it the same day. The curated guide took its place and became a real navigator: per-page notes, next-step links, quick nav.",
    why: "The chat felt off. An open prompt invites anyone to test the edges; a curated voice says exactly what I want said. Killing your own feature quickly is a feature.",
  },
  {
    date: "2026-06-27",
    title: "The flagship becomes a feature card",
    tags: ["design", "content"],
    what: "The home page now leads with the Fee Opt-In study as a feature card: the 75% to 92% result over the redacted cover, with a confidential chip. Contact moved to allen@mooque.xyz, and the gateway forms got rate limiting, honest error states, and proper tap targets.",
    why: "The strongest evidence was buried in a list. If the work is confidential, lead with the outcome and say why the pixels are blurred.",
  },
  {
    date: "2026-06-24",
    title: "From capybara to quiet",
    tags: ["design"],
    what: "Retired the animated mascot era: a pixel avatar, Clippy, the Windows XP dog, and a custom capybara all had their day. What remains is a small text guide that knows which page you are on.",
    why: "Four mascots taught me the personality belongs in the words, not the sprite. Charm that interrupts reading is not charm.",
  },
  {
    date: "2026-06-24",
    title: "Images: 198 MB to 33 MB",
    tags: ["engineering"],
    what: "Resized and re-encoded every case-study image, fixed uppercase filenames that broke on case-sensitive servers, and pruned dead mascot code and assets.",
    why: "Case studies were shipping raw design-file exports. And macOS forgives filename casing; Linux does not.",
  },
  {
    date: "2026-06-24",
    title: "Experiments join the portfolio",
    tags: ["content"],
    what: "Added the Experiments section: Wayfind, ARND, Vesta Press, Mooze, Toronto Yuwol, and Personal Color Analysis, alongside the full personal-project arc from illustration to design systems.",
    why: "The range is the point. Side projects show judgment with no one else in the room.",
  },
  {
    date: "2026-06-23",
    title: "First branding pass: favicon, share card, adaptive theme",
    tags: ["design"],
    what: "Hand-set the ak favicon and share card in the wordmark style, added a theme color that follows light and dark mode, and gave the 404 page the site's typography.",
    why: "The details nobody asks for are the ones designers check first.",
  },
];
