"""Strip a tailored page back to a plain portfolio layout: no eyebrow labels,
no feature cards, no decorative backdrops. Used by brand.py."""
import re

CODE_SECTION = '''        <section aria-label="Built in code" className="mt-20 md:mt-28 grid max-w-2xl gap-5">
          {BUILT.slice(0, 2).map((b) => (
            <p key={b.label} className="text-[16px] leading-relaxed text-muted">
              {b.text}{" "}
              {b.links.map((l, i) => (
                <span key={l.href}>
                  {i ? " \\u00b7 " : ""}
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                      {l.name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                      {l.name}
                    </Link>
                  )}
                </span>
              ))}
            </p>
          ))}
        </section>
'''

def minimal(s):
    # Section heading: a plain title, no eyebrow label.
    s = s.replace("function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {",
                  "function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {")
    s = re.sub(r'\n      <p className="microlabel text-muted( brand-label)?">\{label\}</p>', "", s)
    s = s.replace('className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance"',
                  'className="text-lg md:text-xl font-medium tracking-[-0.01em]"')
    s = s.replace('<div className="mt-10">{children}</div>', '<div className="mt-6">{children}</div>')
    s = s.replace('className="scroll-mt-24 mt-24 md:mt-32"', 'className="scroll-mt-24 mt-20 md:mt-28"')
    # Work: "Selected work", and only an "All work" link under it.
    s = re.sub(r'(<Block id="[a-z0-9]+-work")[^>]*>', r'\1 title="Selected work">', s, count=1)
    s = re.sub(r'\n          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-\[14px\] text-muted">\n            <span>Built on my own:</span>.*?\n          </p>',
               '\n          <p className="mt-4 text-[14px]">\n            <Link href="/work" className={`text-muted ${link}`}>\n              All work <Arrow />\n            </Link>\n          </p>', s, count=1, flags=re.S)
    s = re.sub(r"\nconst OWN = \[.*?\];\n", "\n", s, count=1, flags=re.S)
    # The three feature cards become two plain paragraphs.
    s = re.sub(r'        <Block id="[a-z0-9]+-code"[^>]*>.*?        </Block>\n', lambda m: CODE_SECTION, s, count=1, flags=re.S)
    # No decorative backdrops; the brand band does that job.
    s = re.sub(r'\n      <div className="(eb-air|jf-sky|ol-dots|bg-blueprint|stripe-glow|matcha-glow|brand-glow|bj-glow)" aria-hidden />', "", s)
    return s
