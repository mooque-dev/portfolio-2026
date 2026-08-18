<!-- Keep this short. The point is to catch ripples before they ship. -->

## What and why

<!-- One or two sentences: what changed, and the reason. -->

## Seam check

<!-- Did this touch a seam in docs/CONTRACTS.md? If yes, which, and what did you
re-verify? If no, say "no seams touched." -->

- [ ] Checked `docs/CONTRACTS.md` for ripples

## Verify gate

- [ ] `npx tsc --noEmit`
- [ ] `npx eslint .` (zero problems)
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Looked at it in a browser (if visible)

## Recorded

- [ ] `/changelog` entry added (if visitor-facing), or `docs/STATUS.md` updated
      (if internal), or neither needed (trivial)
