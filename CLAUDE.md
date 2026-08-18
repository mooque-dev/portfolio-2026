# mooque portfolio

Allen Kang's portfolio (Next.js App Router, MDX case studies in `content/`).
Production deploys from `main` via Vercel to https://www.mooque.xyz.

New here? Read this file (the rules and voice), then `docs/CONTRACTS.md` (what
connects to what, and what to re-verify when you change it), `docs/STATUS.md`
(where the project stands), and `CONTRIBUTING.md` (how a change flows). The
guiding principle across all of it: flexibility at the edges, contracts at the
seams.

## Working rules

- **Changelog per push.** This site keeps public release notes at `/changelog`,
  sourced from `lib/changelog.ts`. Every meaningful visitor-facing push adds one
  entry there: `date`, `title`, `tags` (design / content / engineering / fix),
  `what` (what shipped), and `why` (the rationale). Write it in Allen's voice,
  like the existing entries. Internal-only changes (docs, tests, refactors a
  visitor never sees) update `docs/STATUS.md` instead. Trivial chores skip both.
- **No em-dashes.** Anywhere: copy, code comments, commit messages, changelog
  entries. Use a comma, colon, period, or parentheses instead.
- **Voice.** Plain, human, feature-first. No buzzwords ("leverage", "seamless",
  "unlock"), no content-marketing title templates, no AI cadence.
- **Fetch before push.** Parallel sessions land on `main` often. Always
  `git fetch` and rebase before pushing.
- **Verify before ship.** `npx tsc --noEmit`, `npx eslint .` (keep it at zero
  problems), `npm test`, and `npm run build` must pass. Visual changes get
  checked in a browser before pushing.
- **Check the seams.** Before shipping, see if the change touches a seam in
  `docs/CONTRACTS.md`, and re-verify what it lists. Flag ripples early.
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

- `app/`, App Router. Route group `(portfolio)` holds the public pages
  (work, writing, vault, resume, changelog, now); `app/gateway` is the visitor
  Q&A; `app/api/*` are the two write endpoints behind it.
- `lib/`, the domain code: `content.ts` + `vault.ts` (MDX pipeline: gray-matter,
  remark, remark-html), `changelog.ts`, `now.ts`, `resumeData.ts`, `questions.ts`,
  `supabase.ts`, `ratelimit.ts`.
- `content/`, MDX case studies, writing, and vault entries (owner-authored).
- `components/`, page widgets plus `components/ui/*` (shadcn).
- `supabase/schema.sql`, gateway tables and RLS.
- `__tests__/`, vitest suites (content pipeline, rate limiter, API validation).

## Where things are written down

- `docs/STATUS.md`, where the project stands, plus the two backlogs (feature and
  system) and how to oversee the project.
- `docs/CONTRACTS.md`, the seams and the change-impact map: what to re-verify
  when you touch each one, and the verify gate.
- `CONTRIBUTING.md`, the five-step change loop from idea to shipped.
- `lib/changelog.ts` (`/changelog`), the visitor-facing history.

The July 2026 codebase audit that used to live here has been folded into
`docs/STATUS.md` (the backlogs) and `docs/CONTRACTS.md` (the architecture and
security posture), so there is one living source instead of a dated snapshot.
