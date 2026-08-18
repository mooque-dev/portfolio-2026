# Status

Where the portfolio stands and what is owed. This is the repo-side control room:
read it to understand the whole project at a glance. Update it when the picture
changes. (Visitor-facing history lives on `/changelog`; this file is for the
people building the thing.)

_Last updated: 2026-08-17._

## What this is

Allen Kang's (mooque) portfolio and personal record. Next.js App Router, MDX case
studies in `content/`, deployed from `main` to https://www.mooque.xyz via Vercel.
Beyond the portfolio, it is growing into a "life vault": a dated, honest record of
the work and the person behind it.

## The operating principle

**Flexibility at the edges, contracts at the seams.** Move fast on copy, styling,
and content. Slow down and check `docs/CONTRACTS.md` when you touch a seam. That
is how the project stays both fluid and hard to break.

## Health

- Verify gate is green: `tsc`, `eslint`, `vitest` (28 tests), `npm run build`.
- Error handling: branded `app/error.tsx` + `app/global-error.tsx` at the root.
- Tests cover the content pipeline, the rate limiter, and the two API routes.
- Security: RLS on the gateway tables; visitor contact info is service-role only.

## The two backlogs

We work these together: each batch pairs one feature with one system piece.

### Feature backlog (visitor-facing)
- **Flagship hierarchy.** 19 of 20 case studies are `featured: true`, so featuring
  signals nothing. Pick 3 to 4 true flagships and demote the rest. _(in progress:
  shortlist being proposed for Allen's approval)_
- **Vault** has one entry and is text-only. Under-populated for the "life vault"
  idea; needs real entries and visual frames.
- **Metrics** in the professional case studies (for example 340 to 86, 45%,
  NPS -12 to +34) need Allen's factual sign-off before the studies lean on them.
- **Writing** has three posts. A cadence question, not a bug.

### System backlog (how we build)
- Performance: framer-motion is imported in eight components with no
  code-splitting. Dynamic-import the non-critical ones (respect the instant-paint
  contract, see `docs/CONTRACTS.md`).
- Wire real crash reporting into the ErrorBoundary.
- `loading.tsx` skeletons for `work/[slug]` and `vault`.
- Sanitize Instagram captions before they enter vault MDX.
- Per-case-study Open Graph images (all share the global one today).
- Oversight, phase 2: an on-site overview/admin surface once there is real
  visitor traffic worth watching (phase 1 is this docs set).

## How to oversee the project (for Allen)

- **The system:** this file + `docs/CONTRACTS.md`.
- **What shipped, in plain language:** `/changelog`.
- **What changed, in detail:** `git log`.
- **Live visitor questions and responses:** the Supabase tables
  `visitor_questions` and `gateway_responses` (phase-2 dashboard will surface
  these; for now they are read directly in Supabase).
- **Deploy health:** Vercel, or
  `gh api repos/mooque-dev/portfolio-2026/commits/<sha>/status`.

## Where everything is written down

- `CLAUDE.md`, the working rules and the audit.
- `docs/CONTRACTS.md`, the seams and the change-impact map.
- `docs/STATUS.md`, this file.
- `CONTRIBUTING.md`, how a change flows from idea to shipped.
- `lib/changelog.ts` and `/changelog`, the public history.
