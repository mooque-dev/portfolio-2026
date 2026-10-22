#!/usr/bin/env python3
"""Build a tailored page: python3 drafts/pipeline/new-page.py <slug>

Reads drafts/pipeline/specs/<slug>.json and writes app/(portfolio)/<slug>/page.tsx,
a short settings file on the shared frame (components/tailored/TailoredPage.tsx),
then registers the page in Header.tsx ENTRY_PAGES.

Spec fields: company, object (one line for the code comment), desc (meta
description, neutral), lede, hero_import, hero_jsx, caption (optional),
cases (keys from lib/tailored.ts: tw ak au mj or fe ar yu), h1, contact,
built (optional: "rules" for the version that mentions ARND's rules file).
Colours come from the slug's entry in brands.json and type plus the
signature detail from themes.json; add both first (see brand-briefs/).
Layout fixes belong in TailoredPage.tsx, never in a page.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
from frame import build_page  # noqa: E402

slug = sys.argv[1]
spec = json.load(open(os.path.join(HERE, "specs", slug + ".json")))
brands = json.load(open(os.path.join(HERE, "brands.json")))
themes = json.load(open(os.path.join(HERE, "themes.json")))
assert slug in brands, f"add {slug} to brands.json first"
out = build_page(slug, spec, brands[slug], themes.get(slug))
os.makedirs(os.path.join(REPO, "app", "(portfolio)", slug), exist_ok=True)
open(os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx"), "w").write(out)
hp = os.path.join(REPO, "components", "Header.tsx")
h = open(hp).read()
if f'"/{slug}"' not in h:
    h = re.sub(r'(const ENTRY_PAGES = \[[^\]]*)\]', lambda m: m.group(1) + f', "/{slug}"]', h, count=1)
    open(hp, "w").write(h)
print("wrote", slug)
