#!/usr/bin/env bash
# Publish v2 to the GitHub Pages mirror and to allenkang.com (main), then check
# the given paths return 200 on the mirror.
#   drafts/pipeline/publish-mirror.sh "<commit message>" /slug/ /allen-kang-resume-slug.pdf ...
# Keeps the folders that live only in the mirror repo: jungmin/ (the lunch
# counter) and study/ (the case study presenter and its prototype).
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
MSG="$1"; shift
WORK="${TMPDIR:-/tmp}/mooque-mirror"
OUT="$WORK/out"; SITE="$WORK/site"
mkdir -p "$WORK"
rm -rf "$OUT"
# The build downloads every Google font; the font server sometimes drops a
# request, so try up to three times before giving up.
for try in 1 2 3; do
  if bash "$REPO/scripts/build-mirror.sh" v2 "$OUT" > "$WORK/build.log" 2>&1; then tail -1 "$WORK/build.log"; break; fi
  [ "$try" = 3 ] && { tail -30 "$WORK/build.log"; echo "build failed three times"; exit 1; }
  echo "build attempt $try failed (usually a font download); retrying"; sleep 20
done
# The cached clone lives in the temp folder, which macOS sometimes half-clears;
# if git can't read it any more, start from a fresh clone.
if ! git -C "$SITE" rev-parse --git-dir >/dev/null 2>&1; then rm -rf "$SITE"; fi
[ -d "$SITE/.git" ] || gh repo clone mooque-dev/mooque-dev.github.io "$SITE" -- -q
cd "$SITE"
git fetch -q && git reset -q --hard origin/main
git ls-files | grep -vE '^(jungmin|study)/' | xargs git rm -q
rsync -a "$OUT/" ./
git add -A
git commit -qm "$MSG" || { echo "nothing to publish"; exit 0; }
git push -q origin main
H=$(git rev-parse --short=7 HEAD)
for i in $(seq 1 40); do
  s=$(gh api repos/mooque-dev/mooque-dev.github.io/pages/builds/latest --jq '.status+" "+.commit[0:7]' 2>/dev/null || true)
  [ "$s" = "built $H" ] && break; sleep 12
done
echo "pages build: $s"
# allenkang.com deploys from main on Vercel; keep it on the same version as
# the mirror. A fast-forward only, so it never overwrites anything on main.
git -C "$REPO" push -q origin v2:main && echo "allenkang.com: main updated to v2"
for p in "$@"; do printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' "https://mooque-dev.github.io$p?v=$H")" "$p"; done
