"""Write a tailored page as a short settings file on the shared frame
(components/tailored/TailoredPage.tsx). Colours come from brands.json, type
and the signature detail from themes.json, everything else from the spec."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
VARS = [("fill", "--brand"), ("on", "--brand-on"), ("ink", "--brand-ink"), ("inkDark", "--brand-ink-dark"),
        ("heroBg", "--hb"), ("heroFg", "--hf"), ("heroBgDark", "--hb-d"), ("heroFgDark", "--hf-d"),
        ("heroMark", "--hm"), ("heroCta", "--hc"), ("heroCtaOn", "--hco")]

def headline(h1, sig):
    t = sig.get("type", "none")
    if t in ("em", "brace", "scribble"):
        assert sig["phrase"] in h1, "sig phrase must be in h1"
        return h1.replace(sig["phrase"], f'<span className="sig-{t}">{sig["phrase"]}</span>', 1)
    if t == "tone":
        k = h1.index(sig["lead"]) + len(sig["lead"])
        return h1[:k] + f'<span className="sig-tone">{h1[k:]}</span>'
    if t == "cursor":
        return h1 + '<span className="sig-cursor" aria-hidden />'
    return h1

def build_page(slug, spec, brand, theme):
    fonts, decl, cls = [], "", ""
    if theme:
        roles = [r for r in ("display", "text", "mono", "hand") if r in theme["fonts"]]
        for r in roles:
            fam, opts = theme["fonts"][r]
            if fam not in fonts:
                fonts.append(fam)
            o = {"subsets": ["latin"], "display": "swap", "variable": f"--bd-{r}"}
            o.update(opts)
            decl += f"const f{r} = {fam}({{ " + ", ".join(f"{k}: {json.dumps(v)}" for k, v in o.items()) + " });\n"
        cls = f"themed theme-{slug} " + " ".join("${f%s.variable}" % r for r in roles)
    sig = (theme or {}).get("sig", {"type": "none"})
    fn = "".join(w.capitalize() for w in re.split(r"[^a-zA-Z0-9]+", slug) if w) + "Page"
    if fn[0].isdigit():
        fn = "P" + fn
    body = ", ".join(f'"{v}": "{brand[k]}"' for k, v in VARS if brand.get(k))
    out = 'import type { Metadata } from "next";\nimport type { CSSProperties } from "react";\n'
    if "<Link" in spec["hero_jsx"] + spec.get("caption", ""):
        out += 'import Link from "next/link";\n'
    if fonts:
        out += 'import { %s } from "next/font/google";\n' % ", ".join(fonts)
    out += spec["hero_import"] + "\n" + 'import TailoredPage from "@/components/tailored/TailoredPage";\n\n'
    out += (f"// A tailored, unlisted view of the portfolio for {spec['company']}, built on the\n"
            f"// shared frame (components/tailored/TailoredPage.tsx). The object is\n// {spec['object']}.\n")
    desc = spec["desc"].replace('"', '\\"')
    out += ("export const metadata: Metadata = {\n"
            f'  title: {{ absolute: "Allen Kang for {spec["company"]}" }},\n'
            f'  description:\n    "{desc}",\n'
            "  robots: { index: false, follow: false },\n};\n\n")
    out += decl + f"const BRAND = {{ {body} }} as CSSProperties;\n\n"
    out += f"export default function {fn}() {{\n  return (\n    <TailoredPage\n"
    out += f'      slug="{slug}"\n      company="{spec["company"]}"\n      style={{BRAND}}\n'
    if cls:
        out += f"      className={{`{cls}`}}\n"
    if sig.get("type") == "label":
        out += f'      label="{sig["text"]}"\n'
    out += f"      headline={{<>{headline(spec['h1'], sig)}</>}}\n"
    out += f"      lede={{<>{spec['lede']}</>}}\n      hero={{<>{spec['hero_jsx']}</>}}\n"
    if spec.get("caption"):
        out += f"      caption={{<>{spec['caption']}</>}}\n"
    out += f"      cases={{{json.dumps(spec['cases'])}}}\n"
    if spec.get("built") and spec["built"] != "default":
        out += f'      built="{spec["built"]}"\n'
    out += f"      contact={{<>{spec['contact']}</>}}\n    />\n  );\n}}\n"
    assert "—" not in out, "no em-dashes"
    return out
