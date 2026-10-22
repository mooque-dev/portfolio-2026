#!/usr/bin/env python3
"""Build a tailored page from a spec: python3 drafts/pipeline/new-page.py <slug>

Reads drafts/pipeline/specs/<slug>.json and writes app/(portfolio)/<slug>/page.tsx
from page-template.tsx.txt, then orders the cases and sets the headline and
contact line, and registers the page in Header.tsx ENTRY_PAGES.

Spec fields: company, object (one line for the code comment), desc (meta
description, neutral), lede, hero_import, hero_jsx, caption (optional),
bg (optional className of a backdrop div), cases (list of keys), h1, contact,
brand: the colours, same keys as an entry in brands.json (see brand.py),
and mark: a phrase of h1 to highlight.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
from cases import apply  # noqa: E402
from brand import brand_text  # noqa: E402
from minimal import minimal  # noqa: E402
from theme import theme_text  # noqa: E402

slug = sys.argv[1]
spec = json.load(open(os.path.join(HERE, "specs", slug + ".json")))
t = open(os.path.join(HERE, "page-template.tsx.txt")).read()
hero = spec["hero_jsx"]
if spec.get("caption"):
    hero += '\n              <p className="mt-3 text-[14px] text-muted">' + spec["caption"] + "</p>"
fn = "".join(w.capitalize() for w in re.split(r"[^a-zA-Z0-9]+", slug) if w) + "Page"
if fn[0].isdigit():
    fn = "P" + fn
vals = {
    "IMPORT": spec["hero_import"], "COMPANY": spec["company"], "OBJECT": spec["object"],
    "DESC": spec["desc"].replace('"', '\\"'), "FN": fn,
    "BG": ('\n      <div className="%s" aria-hidden />' % spec["bg"]) if spec.get("bg") else "",
    "LEDE": spec["lede"], "SLUG": slug, "HERO": hero,
    "ID": "".join(w[0] for w in slug.split("-")) + "x",
}
for k, v in vals.items():
    t = t.replace("{{%s}}" % k, v)
assert "{{" not in t
assert "—" not in t, "no em-dashes"
os.makedirs(os.path.join(REPO, "app", "(portfolio)", slug), exist_ok=True)
open(os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx"), "w").write(t)
apply(slug, spec["cases"], spec["h1"], spec["contact"])
b = spec.get("brand")
pp = os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx")
t2 = open(pp).read()
t2 = brand_text(t2, dict(b, mark=spec.get("mark") or b.get("mark"))) if b else minimal(t2)
THEMES = json.load(open(os.path.join(HERE, "themes.json")))
if b and slug in THEMES:
    t2 = theme_text(t2, slug, THEMES[slug])
open(pp, "w").write(t2)
hp = os.path.join(REPO, "components", "Header.tsx")
h = open(hp).read()
if f'"/{slug}"' not in h:
    h = re.sub(r'(const ENTRY_PAGES = \[[^\]]*)\]', lambda m: m.group(1) + f', "/{slug}"]', h, count=1)
    open(hp, "w").write(h)
print("wrote", slug)
