#!/usr/bin/env python3
"""Dress a tailored page in the company's colours: python3 drafts/pipeline/brand.py <slug>

Reads the slug's entry in drafts/pipeline/brands.json (colours sampled from
the company's own site, never a logo):
  fill, on        filled buttons and the colour of text on them
  ink, inkDark    brand-coloured text readable on the light and dark themes
  heroBg, heroFg  the full-width band behind the intro and the contact
                  block (a colour or a CSS gradient), and its text colour
  heroBgDark, heroFgDark  optional dark-theme band, for light bands
  heroMark        the headline marker colour on the band
  heroCta, heroCtaOn      the résumé and email buttons on the band
  mark            a phrase of the headline to highlight
Safe to re-run: it replaces the values.
"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from minimal import minimal  # noqa: E402
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
VARS = [("fill", "--brand"), ("on", "--brand-on"), ("ink", "--brand-ink"), ("inkDark", "--brand-ink-dark"),
        ("heroBg", "--hb"), ("heroFg", "--hf"), ("heroBgDark", "--hb-d"), ("heroFgDark", "--hf-d"),
        ("heroMark", "--hm"), ("heroCta", "--hc"), ("heroCtaOn", "--hco")]

def brand_text(s, b):
    if "type CSSProperties" not in s:
        s = s.replace('import type { ReactNode } from "react";', 'import type { CSSProperties, ReactNode } from "react";', 1)
    body = ", ".join(f'"{v}": "{b[k]}"' for k, v in VARS if b.get(k))
    const = f"const BRAND = {{ {body} }} as CSSProperties;\n"
    if "const BRAND = " in s:
        s = re.sub(r"const BRAND = \{[^\n]*\n", lambda m: const, s, count=1)
    else:
        s = s.replace("const pill = ", const + "\nconst pill = ", 1)
    if "brand-page" not in s:
        s = s.replace('<article className="relative isolate', '<article style={BRAND} className="brand-page relative isolate', 1)
    s = s.replace('\n      <div className="brand-glow" aria-hidden />', "")
    if 'className="brand-hero"' not in s:
        s = s.replace("        <FadeIn>", '        <div className="brand-hero">\n        <FadeIn>', 1)
        s = s.replace("        </FadeIn>", "        </FadeIn>\n        </div>", 1)
    s = s.replace("${pill} gap-1.5 border border-border hover:border-foreground/40", "${pill} brand-cta gap-1.5", 1)
    s = s.replace("${pill} bg-foreground text-background hover:opacity-80", "${pill} brand-cta")
    s = s.replace('className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row',
                  'className="brand-foot mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row', 1)
    if b.get("mark") and "brand-mark" not in s:
        i = s.index('<h1 className="text-4xl'); i = s.index(">", i) + 1; j = s.index("</h1>", i)
        assert b["mark"] in s[i:j], "mark must be a phrase of the headline"
        s = s[:i] + s[i:j].replace(b["mark"], f'<span className="brand-mark">{b["mark"]}</span>', 1) + s[j:]
    return minimal(s)

if __name__ == "__main__":
    brands = json.load(open(os.path.join(HERE, "brands.json")))
    for slug in sys.argv[1:] or brands:
        p = os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx")
        s = brand_text(open(p).read(), brands[slug])
        assert "brand-hero" in s and "brand-foot" in s and "brand-cta" in s, slug
        open(p, "w").write(s)
        print("branded", slug)
