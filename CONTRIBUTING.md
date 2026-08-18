# Contributing

Welcome. This project is built to be picked up easily by like-minded people. It
stays healthy because everyone follows the same short loop, not because of heavy
process. If you read three files first, read `CLAUDE.md` (the rules and voice),
`docs/CONTRACTS.md` (what connects to what), and `docs/STATUS.md` (where things
stand).

## Start here

```bash
npm install
npm run dev        # http://localhost:3000
```

The stack: Next.js App Router, TypeScript, Tailwind, MDX case studies in
`content/`. Content is authored, not fetched. Path alias `@/*` maps to the repo
root.

## The change loop

Every change, small or large, follows the same five steps:

1. **Decide.** Know what you are changing and why.
2. **Check the seams.** Open `docs/CONTRACTS.md` and see if your change touches a
   seam. If it does, note what else you need to re-verify. This is the step that
   keeps the project from breaking in surprising places.
3. **Make the change.** Match the surrounding code. Follow the house rules in
   `CLAUDE.md`: no em-dashes anywhere, plain and human voice, the bellflower-blue
   accent, and the confidential work stays blurred.
4. **Verify.** Run the gate, and for anything visible, look at it in a browser:
   ```bash
   npx tsc --noEmit && npx eslint . && npm test && npm run build
   ```
5. **Record it.** If the change is visitor-facing, add a `/changelog` entry in
   `lib/changelog.ts` in Allen's voice. If it changes how the project is built or
   where it stands, update `docs/STATUS.md` instead. Internal-only changes do not
   go on the public changelog.

## Shipping

- Production deploys from `main` on push, so `main` is always live.
- `git fetch` and rebase before pushing; parallel work lands on `main` often.
- Open a pull request for anything you want reviewed. The PR template is a copy of
  the loop above, as a checklist.

## When in doubt

Ask. Flag anything that might affect another part of the project before you ship
it. Surfacing a ripple early is always cheaper than fixing it after.
