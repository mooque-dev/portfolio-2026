#!/usr/bin/env bash
# Publish v2 to the GitHub Pages mirror and check the given paths return 200.
#   drafts/pipeline/publish-mirror.sh "<commit message>" /slug/ /allen-kang-resume-slug.pdf ...
# Keeps the jungmin/ folder that lives only in the mirror repo.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
MSG="$1"; shift
WORK="${TMPDIR:-/tmp}/mooque-mirror"
OUT="$WORK/out"; SITE="$WORK/site"
mkdir -p "$WORK"
rm -rf "$OUT"
bash "$REPO/scripts/build-mirror.sh" v2 "$OUT" | tail -1
[ -d "$SITE/.git" ] || gh repo clone mooque-dev/mooque-dev.github.io "$SITE" -- -q
cd "$SITE"
git fetch -q && git reset -q --hard origin/main
git ls-files | grep -v '^jungmin/' | xargs git rm -q
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
for p in "$@"; do printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' "https://mooque-dev.github.io$p?v=$H")" "$p"; done
