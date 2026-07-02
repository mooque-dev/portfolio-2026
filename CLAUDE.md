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
