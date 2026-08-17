# mooque portfolio

Allen Kang's portfolio (Next.js App Router, MDX case studies in `content/`).
Production deploys from `main` via Vercel to https://www.mooque.xyz.

## Working rules

- **Changelog per push.** This site keeps public release notes at `/changelog`,
  sourced from `lib/changelog.ts`. Every meaningful push adds one entry there:
  `date`, `title`, `tags` (design / content / engineering / fix), `what`
  (what shipped), and `why` (the rationale). Write it in Allen's voice, like
  the existing entries. Trivial chores (lockfile bumps, typo fixes) can skip it.
- **No em-dashes.** Anywhere: copy, code comments, commit messages, changelog
  entries. Use a comma, colon, period, or parentheses instead.
- **Voice.** Plain, human, feature-first. No buzzwords ("leverage", "seamless",
  "unlock"), no content-marketing title templates, no AI cadence.
- **Fetch before push.** Parallel sessions land on `main` often. Always
  `git fetch` and rebase before pushing.
- **Verify before ship.** `npx tsc --noEmit`, `npx eslint .` (keep it at zero
  problems), and `npm run build` must pass. Visual changes get checked in a
  browser against a local `next start` before pushing.
- **Confidential work stays blurred.** Fee Opt-In product visuals are blurred
  on purpose (`wip: true`); aggregate results may show crisp via `img.clear`.
- **The vault (`/vault`) is Allen's record; the changelog is the site's.**
  Vault entries live in `content/vault/*.mdx` (type: note | moment | frame |
  artifact, plus date, optional media/signed). Now-snapshots in `lib/now.ts`
  are append-only: never edit or delete an old snapshot, add a new one.
  Instagram imports go through `scripts/import-instagram.mjs` (curated via
  `scripts/instagram-selects.json`, never bulk-mirrored). Documents and IDs
  never migrate to the site.

## Architecture map

- `app/` — App Router. Route group `(portfolio)` holds the public pages
  (work, writing, vault, resume, changelog, now); `app/gateway` is the visitor
  Q&A; `app/api/*` are the two write endpoints behind it.
- `lib/` — `content.ts` + `vault.ts` (MDX pipeline: gray-matter + remark +
  remark-html), `changelog.ts`, `now.ts`, `resumeData.ts`, `questions.ts`,
  `supabase.ts`, `ratelimit.ts`.
- `content/` — MDX case studies, writing, and vault entries (owner-authored).
- `components/` — page widgets + `components/ui/*` (shadcn).
- `supabase/schema.sql` — gateway tables + RLS.

---

# Audit (2026-07-12)

Overall: **healthy**. No committed build output, no leaked secrets, RLS on the
gateway tables with visitor contact info locked to the service role, rate-limited
write endpoints, MDX rendered only from owner-authored content. The gaps below
are targeted hardening, not structural problems.

## File size — healthy, except media

- No bloat committed: `.next/` and `*.tsbuildinfo` are gitignored;
  `package-lock.json` (426K) is normal.
- Largest source file is `app/gateway/page.tsx` (578); nothing else clears 360.
  These are fine.
- **The real weight is in `public/case-studies/`.** A few images are heavy:
  `de-mello/untitled-8.png` (~2.0M), `artist-merchandise/image-3.png` (~1.4M)
  and `image-4.png` (~1.2M), `allen-kang-portrait.png` (~0.8M), plus a ~0.75M
  GIF. Case-study media is referenced as raw `<img>` inside MDX (see next), so
  it bypasses `next/image` optimization. Compress these. (P0)

## Security — solid

Good already:
- **RLS is on** (`supabase/schema.sql`): `gateway_responses` is public
  read + insert by design (it is a public wall); `visitor_questions` allows
  inserts but restricts reads to the **service role**, so the `contact` field a
  visitor leaves is never served to the client even though the anon key ships.
- No hardcoded secrets. Only `NEXT_PUBLIC_SUPABASE_URL` + anon key reach the
  client, which is safe under RLS.
- Both API routes (`app/api/responses`, `app/api/questions-for-allen`)
  validate input, clamp lengths, guard JSON parsing, degrade gracefully when the
  DB is unconfigured, and sit behind `lib/ratelimit.ts`.

Gaps:
- **MDX is rendered with `sanitize: false`** (`lib/content.ts:70`,
  `lib/vault.ts:41`) via `dangerouslySetInnerHTML`. That is fine for
  owner-authored case studies, but the vault also ingests **Instagram captions**
  through `scripts/import-instagram.mjs`. External text should be escaped or
  sanitized at import time so a caption can never inject markup into a page. (P1)
- **Rate limiting is best-effort in-memory** (`lib/ratelimit.ts`), so it resets
  per serverless instance. The code comment is honest about this and it is the
  right trade-off for a portfolio. If the gateway ever gets abused, move the
  counter to a shared store (Upstash/Redis). (P2)

## Loading performance

- **Unoptimized case-study images are the main cost.** Raw `<img>` in MDX skips
  `next/image`, so the ~2M PNG above ships full size. Compress and, where
  possible, route media through `next/image` or a loader. Biggest single win. (P0)
- **No `loading.tsx`** anywhere. Heavier routes (`work/[slug]`, `vault`) have no
  streamed skeleton on navigation. Add them. (P1)
- 17 `use client` files. Reasonable, but keep the heavy interactive pieces
  (`CapyCompanion`, `AboutStickers`, framer-motion) out of the initial bundle
  where a CSS transition would do; dynamically import the rest. (P1)

## Structure — strong

Clean `app` / `lib` / `content` split, route groups, a real MDX pipeline, and
shadcn `components/ui`. No action needed beyond watching `gateway/page.tsx`.

## Testing — the biggest gap

**No test tooling at all**: no jest/vitest/playwright, no `test` script, zero
test files. The cheapest, highest-value coverage to add first:
- `lib/content.ts` frontmatter parsing + `getAllProjects` ordering
- `lib/ratelimit.ts` window logic
- the API route validation branches (missing field, bad JSON, length clamps)

## Error handling

- Good: `app/not-found.tsx` (+ one scoped to the portfolio group). API routes
  handle errors and fall back cleanly.
- **No `error.tsx` or `global-error.tsx`.** An unhandled render error in any
  route drops to Next's default error screen instead of a branded recovery.
  Add both. (P0)
- No React `ErrorBoundary` component for client subtrees (the gateway, stickers).

---

# Prioritized roadmap

## P0 — correctness and quality now
1. Add `app/error.tsx` + `app/global-error.tsx` with a branded recovery screen.
   *(error handling)*
2. Compress the heavy `public/case-studies` images (the ~2M PNG first) and route
   MDX media through `next/image` or a loader. *(perf + file size)*
3. Stand up a minimal test setup (vitest) and cover `lib/content.ts`,
   `lib/ratelimit.ts`, and the two API routes' validation branches. *(testing)*

## P1 — hardening
4. Escape or sanitize externally-derived text (Instagram captions in
   `import-instagram.mjs`) before it lands in vault MDX rendered with
   `sanitize: false`. Owner MDX stays trusted; imported text should not be. *(security)*
5. Add `loading.tsx` skeletons for `work/[slug]` and `vault`. *(perf)*
6. Dynamically import the heaviest client components so framer-motion and the
   companion/stickers stay out of the initial bundle. *(perf)*

## P2 — maintainability
7. If the gateway sees abuse, move rate limiting to a shared store (Upstash). *(security)*
8. Decompose `app/gateway/page.tsx` (578) into sections if it keeps growing. *(structure)*
9. Add one interaction test on a critical flow (gateway submit, or work filter). *(testing)*
