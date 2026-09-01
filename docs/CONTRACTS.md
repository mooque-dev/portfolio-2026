# Contracts and change-impact map

The one rule that makes this project both flexible and safe:

> **Flexibility at the edges, contracts at the seams.**

Most of this codebase is meant to move fast and change often: copy, styling, a
new case study, a layout tweak. That is the edge, and you should feel free there.

A few places are **seams**: points where many parts of the site meet and depend
on a shared shape. Change a seam without thinking and something far away breaks
quietly. This document lists the seams and, for each, what to re-check when you
touch it. If you read nothing else before making a change, read the map at the
bottom.

This is written for anyone: you do not need to be an engineer to use it. Find
the thing you are about to change on the left, and do the checks on the right.

---

## The seams

### 1. Case-study frontmatter (the shape every project obeys)
- **Where:** the block at the top of each `content/work/*.mdx`, between the `---`
  lines. The allowed fields are defined in `lib/content.ts` (`ProjectFrontmatter`)
  and `lib/types.ts`.
- **The contract:** every case study has the same fields (title, subtitle,
  category, type, role, timeline, team, tools, coverColor, featured, order, and a
  few optional ones like `featuredStat`, `liveUrl`). Pages trust that shape.
- **If you add or rename a field:** update `ProjectFrontmatter` in
  `lib/content.ts` AND `lib/types.ts`, then every place that reads it. A field the
  code does not know about is silently ignored.

### 2. `featured` and `order` (what leads, and in what sequence)
- **Where:** the `featured:` and `order:` lines in each case study's frontmatter.
- **The contract:** `featured: true` promotes a study to the home page grid,
  which `components/HomeReader.tsx` builds by filtering on `featured` and grouping
  by type. `order` sets the sequence on `/work`. Note: `/work` shows every study
  regardless of `featured` (it sorts by `order` and type via `WorkFilter`), so
  `featured` changes the home page only, not `/work`.
- **If you change which studies are featured:** the home page grid re-ranks. It is
  a visible content decision, so preview the home page. Featuring works only if it
  stays scarce: if almost everything is featured, nothing is. The shelf is 7: 4
  professional flagships, a 2-piece second tier, and ARND leading a self-built
  Experiments section (featured studies group by `type` on the home page, so an
  experiment surfaces under its own heading, not among the work pieces).

### 3. The changelog (the public record)
- **Where:** `lib/changelog.ts`, shown at `/changelog`.
- **The contract:** the changelog is **visitor-facing site history**. Every
  meaningful change to the live site gets one entry, in Allen's voice, with
  `what` and `why`. Purely internal changes (these docs, tests, refactors that a
  visitor never sees) do **not** go here; they belong in `docs/STATUS.md` and the
  git history instead. Keeping that line clean is itself part of the contract.

### 4. Navigation and routes (how pages connect)
- **Where:** the nav is defined in **two** places today: `components/Header.tsx`
  (`navItems`) and `components/Footer.tsx` (hardcoded links). Routes are also
  listed in `app/sitemap.ts`. (The Guide in `components/CapyCompanion.tsx` is
  home-page-only and no longer carries per-route text.)
- **The contract:** these three should agree on what pages exist.
- **If you add, rename, or remove a page:** update `Header.tsx` navItems,
  `Footer.tsx` links, and `app/sitemap.ts`. Missing one of these is the most
  common "why is this inconsistent" bug.

### 5. Security: RLS and the write endpoints
- **Where:** `supabase/schema.sql` (row-level security policies) and the two API
  routes `app/api/questions-for-allen/route.ts` and `app/api/responses/route.ts`,
  rate-limited by `lib/ratelimit.ts`.
- **The contract:** the Supabase anon key ships to the browser, so **RLS is the
  only thing protecting the data.** `visitor_questions` is readable by the service
  role only (a visitor's contact info never reaches the client);
  `gateway_responses` is a public wall by design.
- **If you touch the schema or a policy:** re-check both API routes, their offline
  fallbacks, and confirm no table that holds private data becomes publicly
  readable. This is the one seam where a mistake is a data leak, not a visual bug.

### 6. The MDX render pipeline (the trust boundary)
- **Where:** `lib/content.ts` and `lib/vault.ts` render MDX with
  `sanitize: false`, then inject it via `dangerouslySetInnerHTML`.
- **The contract:** that is safe **only because the content is authored by Allen**
  in the repo. Any content that comes from outside (for example Instagram captions
  via `scripts/import-instagram.mjs`) must be escaped or sanitized before it enters
  a vault entry, or it becomes a way to inject markup into the page.

### 7. Instant first paint (a deliberate performance choice)
- **Where:** `components/FadeIn.tsx` uses a CSS-first reveal (the `.fi` class in
  `app/globals.css`), not JavaScript, so content is visible immediately and never
  flashes blank.
- **If you change how things animate in** (for example, code-splitting
  framer-motion or converting FadeIn to a JS animation): re-verify that pages
  still paint instantly with no blank-on-load, and that reduced-motion still works.

---

## Change-impact map

| If you change... | Re-verify... |
| --- | --- |
| A case study's `featured` | The home page grid (`HomeReader`); `/work` is unaffected |
| A case study's `order` | Its sequence within its group on `/work` |
| Frontmatter fields (add/rename) | `lib/content.ts`, `lib/types.ts`, every reader, the case-study template |
| A page's route (add/rename/remove) | `Header.tsx` nav, `Footer.tsx` links, `sitemap.ts` |
| `lib/changelog.ts` | It renders on `/changelog`, and the entry is visitor-facing (voice + no em-dashes) |
| Supabase schema or RLS | Both API routes, their offline fallbacks, no private table made public |
| Vault import / external content | It flows through `sanitize: false`; escape it first |
| Animation / reveal behavior | Instant paint, no blank-on-load, reduced-motion honored |
| Brand color / core tokens | `app/globals.css` light AND dark blocks; contrast still passes |
| Adding a small uppercase label | Use `.microlabel` (globals.css), don't hand-roll a new size/tracking combo |
| Adding case-study media | Tall portrait captures get `<figure class="phone">` (phone-size, centered); several screens sharing one caption get `<figure class="phones">`; extra-wide art gets `<figure class="wide">`; plain figures fill the column |
| Adding or changing a cover | Covers are authored 3:2 canvases (1800x1200), never CSS-cropped: run `python3 scripts/make-cover.py <source> <coverColor> <out>` to mat the artifact whole on the study's ground. Custom compositions (like ARND's) still author to the same canvas |

## The verify gate (before any ship)

Run all four, and for anything visible, look at it in the browser:

```bash
npx tsc --noEmit    # types
npx eslint .        # keep it at zero problems
npm test            # vitest: content, rate limiter, API validation
npm run build       # the deploy gate
```

Production deploys from `main` on push, so `main` is always live. Fetch and
rebase before pushing (parallel work lands there often).
