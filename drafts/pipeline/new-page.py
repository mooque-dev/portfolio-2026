#!/usr/bin/env python3
"""Build a tailored page from a spec: python3 drafts/pipeline/new-page.py <slug>

Reads drafts/pipeline/specs/<slug>.json and writes app/(portfolio)/<slug>/page.tsx
from page-template.tsx.txt, then orders the cases and sets the headline and
contact line, and registers the page in Header.tsx ENTRY_PAGES.

Spec fields: company, object (one line for the code comment), desc (meta
description, neutral), lede, hero_import, hero_jsx, caption (optional),
bg (optional className of a backdrop div), cases (list of keys), h1, contact,
brand {fill, on, ink, inkDark, mark (optional), glow (bool)} with the company's
real colours (sample them from their site), and mark: a phrase of h1 to
highlight with the brand marker.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, HERE)
from cases import apply  # noqa: E402
from brand import brand_text  # noqa: E402

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
h1 = spec["h1"]
if spec.get("mark"):
    assert spec["mark"] in h1, "mark must be a phrase of h1"
    h1 = h1.replace(spec["mark"], '<span className="brand-mark">%s</span>' % spec["mark"], 1)
apply(slug, spec["cases"], h1, spec["contact"])
b = spec.get("brand")
if b:
    pp = os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx")
    t2 = brand_text(open(pp).read(), b["fill"], b["on"], b["ink"], b["inkDark"], bool(b.get("glow")))
    if b.get("mark"):
        t2 = t2.replace('"--brand-ink-dark":', '"--brand-mark": "%s", "--brand-ink-dark":' % b["mark"], 1)
    open(pp, "w").write(t2)
hp = os.path.join(REPO, "components", "Header.tsx")
h = open(hp).read()
if f'"/{slug}"' not in h:
    h = re.sub(r'(const ENTRY_PAGES = \[[^\]]*)\]', lambda m: m.group(1) + f', "/{slug}"]', h, count=1)
    open(hp, "w").write(h)
print("wrote", slug)
