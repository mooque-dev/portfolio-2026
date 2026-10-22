#!/usr/bin/env python3
"""Give a tailored page the company's colours: python3 drafts/pipeline/brand.py <slug> fill on ink inkDark [glow]

fill: the brand colour for filled buttons; on: text on that fill;
ink: brand-coloured text on the light theme (needs 4.5:1 on white);
inkDark: brand-coloured text on the dark theme. glow=1 adds a soft
brand-coloured glow behind the intro (skip it when the page already has
its own backdrop). Safe to re-run: it replaces the values.
"""
import os, re, sys
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

def brand_text(s, fill, on, ink, ink_dark, glow):
    if "type CSSProperties" not in s:
        s = s.replace('import type { ReactNode } from "react";', 'import type { CSSProperties, ReactNode } from "react";', 1)
    const = f'const BRAND = {{ "--brand": "{fill}", "--brand-on": "{on}", "--brand-ink": "{ink}", "--brand-ink-dark": "{ink_dark}" }} as CSSProperties;\n'
    if "const BRAND = " in s:
        s = re.sub(r'const BRAND = \{[^\n]*\n', const, s, count=1)
    else:
        s = s.replace("const pill = ", const + "\nconst pill = ", 1)
    s = s.replace('<article className="relative isolate', '<article style={BRAND} className="brand-page relative isolate', 1)
    if glow and 'className="brand-glow"' not in s:
        s = re.sub(r'(<article style=\{BRAND\}[^>]*>)', r'\1\n      <div className="brand-glow" aria-hidden />', s, count=1)
    s = s.replace("${pill} gap-1.5 border border-border hover:border-foreground/40", "${pill} brand-cta gap-1.5", 1)
    s = s.replace("${pill} bg-foreground text-background hover:opacity-80", "${pill} brand-cta")
    s = s.replace('"microlabel text-muted"', '"microlabel text-muted brand-label"')
    s = s.replace("border-t border-foreground/80 pt-5", "brand-rule border-t pt-5")
    return s

if __name__ == "__main__":
    slug, fill, on, ink, ink_dark = sys.argv[1:6]
    glow = len(sys.argv) > 6 and sys.argv[6] == "1"
    p = os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx")
    s = brand_text(open(p).read(), fill, on, ink, ink_dark, glow)
    assert "brand-page" in s and "brand-cta" in s, slug
    open(p, "w").write(s)
    print("branded", slug)
