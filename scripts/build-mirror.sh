#!/usr/bin/env bash
# Builds a static copy of a branch for the GitHub Pages mirror
# (mooque-dev.github.io), for networks that block allenkang.com.
#
#   scripts/build-mirror.sh [branch] [out-dir]
#
# Works on a throwaway copy, so the repo itself is never changed. The copy
# drops what needs a server (the API routes and the question gateway, whose
# footer link then points to allenkang.com), switches Next to a static export,
# and adds plain HTML redirects for the two standalone case studies. Copy the
# result into a clone of mooque-dev.github.io, commit, and push.
set -euo pipefail

BRANCH="${1:-main}"
OUT="${2:-$(pwd)/mirror-out}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git -C "$REPO" archive "$BRANCH" | tar -x -C "$WORK"
# Turbopack refuses a symlinked node_modules; an APFS clone is instant.
cp -cR "$REPO/node_modules" "$WORK/node_modules"

cd "$WORK"
cat > next.config.ts <<'EOF'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
EOF
rm -rf app/api app/gateway
sed -i '' 's#href="/gateway"#href="https://allenkang.com/gateway"#' components/Footer.tsx
sed -i '' '/path: "\/gateway"/d' app/sitemap.ts
for f in app/robots.ts app/sitemap.ts; do
  grep -q force-static "$f" || sed -i '' '1a\
export const dynamic = "force-static";
' "$f"
done

NEXT_TELEMETRY_DISABLED=1 npx next build

# Case studies that live on standalone pages redirect with JavaScript in an
# export; give them a plain HTML redirect as well.
for pair in "care-pathway-dashboards:/case/care-pathway/index.html" "keela-contacts:/case/keela-contacts/index.html"; do
  page="out/work/${pair%%:*}/index.html"
  [ -f "$page" ] && sed -i '' "s#<head>#<head><meta http-equiv=\"refresh\" content=\"0; url=${pair#*:}\"/>#" "$page"
done
# GitHub Pages runs Jekyll by default, which hides the _next folder.
touch out/.nojekyll

# Other repos publish project sites under mooque-dev.github.io/<repo>/.
# A top-level folder with the same name here would shadow one, so stop.
if command -v gh >/dev/null; then
  for r in $(gh api "users/mooque-dev/repos?per_page=100" -q '.[] | select(.has_pages) | .name'); do
    if [ "$r" != "mooque-dev.github.io" ] && [ -e "out/$r" ]; then
      echo "Stopped: out/$r would clash with the $r project site." >&2
      exit 1
    fi
  done
fi

rm -rf "$OUT" && mkdir -p "$OUT" && cp -R out/. "$OUT/"
echo "Mirror built from $BRANCH into $OUT"
