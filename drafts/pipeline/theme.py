#!/usr/bin/env python3
"""Give a tailored page its company's typography and one signature detail:
python3 drafts/pipeline/theme.py [slug ...]

Reads drafts/pipeline/themes.json (built from drafts/pipeline/brand-briefs/):
fonts (next/font/google family names and options for display, text, and an
optional mono or hand face) and sig, the brand's signature detail:
  glass     the hero object on a frosted glass panel
  label     a [ bracketed mono ] label above the headline (text)
  tone      two-tone headline: the lead phrase dark, the rest slate
  cursor    a blinking block cursor after the headline
  em        a phrase of the headline in pink italic
  brace     a phrase of the headline in orange {curly braces}
  scribble  a hand-drawn underline under a phrase
  trail     a dotted trail with a dot along the hero
  none      type and colour carry it
The colours themselves stay in brands.json (brand.py). Safe to re-run.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))

def unwrap(h):
    h = re.sub(r'<span className="brand-mark">(.*?)</span>', r"\1", h)
    h = re.sub(r'<span className="sig-[a-z]+">(.*?)</span>', r"\1", h)
    h = re.sub(r'<span className="sig-cursor" aria-hidden />', "", h)
    return h

def theme_text(s, slug, t):
    roles = [r for r in ("display", "text", "mono", "hand") if r in t["fonts"]]
    fams = []
    for r in roles:
        fam = t["fonts"][r][0]
        if fam not in fams:
            fams.append(fam)
    s = re.sub(r'import \{[^}]*\} from "next/font/google";\n', "", s)
    s = re.sub(r"^const f(display|text|mono|hand) = [^\n]*\n", "", s, flags=re.M)
    s = s.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { %s } from "next/font/google";' % ", ".join(fams), 1)
    decl = ""
    seen = {}
    for r in roles:
        fam, opts = t["fonts"][r]
        o = {"subsets": ["latin"], "display": "swap", "variable": f"--bd-{r}"}
        o.update(opts)
        js = ", ".join(f"{k}: {json.dumps(v)}" for k, v in o.items())
        decl += f"const f{r} = {fam}({{ {js} }});\n"
    s = s.replace("const BRAND = ", decl + "const BRAND = ", 1)
    vars_ = " ".join("${f%s.variable}" % r for r in roles)
    s = re.sub(r'<article style=\{BRAND\} className=(\{`[^`]*`\}|"[^"]*")',
               lambda m: '<article style={BRAND} className={`brand-page themed theme-%s %s relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32`}' % (slug, vars_), s, count=1)
    # headline signature
    i = s.index('<h1 className="text-4xl'); i2 = s.index(">", i) + 1; j = s.index("</h1>", i2)
    h = unwrap(s[i2:j])
    sig = t.get("sig", {"type": "none"})
    if sig["type"] in ("em", "brace", "scribble"):
        assert sig["phrase"] in h, (slug, sig["phrase"])
        h = h.replace(sig["phrase"], f'<span className="sig-{sig["type"]}">{sig["phrase"]}</span>', 1)
    elif sig["type"] == "tone":
        assert sig["lead"] in h, slug
        k = h.index(sig["lead"]) + len(sig["lead"])
        rest = h[k:].rstrip()
        h = h[:k] + f'<span className="sig-tone">{rest}</span>\n              '
    elif sig["type"] == "cursor":
        h = h.rstrip() + '<span className="sig-cursor" aria-hidden />\n              '
    s = s[:i2] + h + s[j:]
    # bracket label
    s = re.sub(r'\n              <p className="sig-label">[^<]*</p>', "", s)
    if sig["type"] == "label":
        s = s.replace('              <h1 className="text-4xl', f'              <p className="sig-label">{sig["text"]}</p>\n              <h1 className="text-4xl', 1)
    # object column hook (second min-w-0 inside the hero grid)
    if 'className="min-w-0 sig-obj"' not in s:
        a = s.index('<div className="min-w-0">'); b = s.index('<div className="min-w-0">', a + 5)
        s = s[:b] + '<div className="min-w-0 sig-obj">' + s[b + len('<div className="min-w-0">'):]
    return s

if __name__ == "__main__":
    themes = json.load(open(os.path.join(HERE, "themes.json")))
    for slug in sys.argv[1:] or themes:
        p = os.path.join(REPO, "app", "(portfolio)", slug, "page.tsx")
        out = theme_text(open(p).read(), slug, themes[slug])
        open(p, "w").write(out)
        print("themed", slug)
