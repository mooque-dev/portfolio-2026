"""Shared project cases for tailored pages. The order does the tailoring.

Keys: tw Transaction Workflows, ak Aplos x Keela, au Automation, mj MyJourney,
or Orchid, fe Fee Opt-In, ar ARND, yu Toronto Yuwol.
"""
import os
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..","..","app","(portfolio)")
# One neutral line per case, used on every page; the order does the tailoring.
CASES = {
 "tw": '''  {
    tag: "Accounting",
    title: "Transaction Workflows",
    line: "One payment can be a donation, a gift and a ticket at once. I sat with accountants until that made sense, then redesigned how it's recorded under three countries' tax rules.",
    value: "-70% tickets",
    note: "fewer categorization support tickets, first month",
    href: "/work/transaction-workflows",
  },''',
 "ak": '''  {
    tag: "Data sync",
    title: "Aplos × Keela",
    line: "Twelve interviews with finance managers turned a data sync into a trust problem, so every field mapping became visible before anything moved.",
    value: "1st joint launch",
    note: "the first feature the merged companies shipped together",
    href: "/work/aplos-keela-integration",
  },''',
 "au": '''  {
    tag: "0 to 1",
    title: "Automation for Nonprofits",
    line: "Fifteen interviews and three rounds of prototype testing, from a product area that didn't exist to a paid add-on in five months.",
    value: "+13% ARR",
    note: "for the product, with 30% of 355 organizations using it",
    href: "/work/automation-nonprofits",
  },''',
 "mj": '''  {
    tag: "Healthcare",
    title: "MyJourney dashboards",
    line: "Dashboards clinicians used to track cancer patients through treatment, rebuilt as working redesigns you can filter and click.",
    value: "4 screens",
    note: "rebuilt as working software",
    href: "/case/care-pathway/index.html",
  },''',
 "or": '''  {
    tag: "Design system",
    title: "Orchid design system",
    line: "I pitched it with surveys from five departments, earned two dedicated front-end engineers, and got three teams onto one system.",
    value: "340+ components",
    note: "merged into one library three teams use",
    href: "/work/orchid-design-system",
  },''',
 "fe": '''  {
    tag: "Experiment",
    title: "Fee Opt-In",
    line: "I paused a launch that looked like a win, prototyped three fixes in code, then A/B tested them. Has a checkout you can play with.",
    value: "75→92%",
    note: "donors who chose to cover the fee",
    href: "/work/fee-opt-in-experimentation",
  },''',
 "ar": '''  {
    tag: "Side project",
    title: "ARND",
    line: "A map-first app for Toronto's small live shows that I designed and built end to end.",
    value: "161 pull requests",
    note: "merged since April, in public beta",
    href: "/work/arnd",
  },''',
 "yu": '''  {
    tag: "Side project",
    title: "Toronto Yuwol",
    line: "Scheduling, attendance and a bill splitter for a forty-person company putting on a musical.",
    value: "10 months",
    note: "used daily through the run",
    href: "/work/torontoyuwol",
  },''',
}
BUILT_LABELS = [('label: "Shipping code",','label: "On my own",'), ('label: "Shipping with AI",','label: "On my own",'),
                ('label: "Prototyping at work",','label: "At work",')]

def apply(slug, order, h1, contact, extra=()):
    p=f"{ROOT}/{slug}/page.tsx"; s=open(p).read()
    a=s.index("const STATEMENT: StatementLine[] = ["); b=s.index("];\n",a)+3
    s=s[:a]+"const STATEMENT: StatementLine[] = [\n"+"\n".join(CASES[k] for k in order)+"\n];\n"+s[b:]
    i=s.index('<h1 className="text-4xl md:text-6xl'); i=s.index(">",i)+1; j=s.index("</h1>",i)
    s=s[:i]+"\n                "+h1+"\n              "+s[j:]
    import re
    s=re.sub(r'label="(In code|AI-first|AI every day)" title="[^"]*"','label="Built, not just drawn" title="Most of what I\'d show you already runs."',s)
    for a_,b_ in BUILT_LABELS: s=s.replace(a_,b_)
    k=s.index("max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance\">"); k=s.index(">",k)+1; l=s.index("</h2>",k)
    s=s[:k]+"\n            "+contact+"\n          "+s[l:]
    for a_,b_ in extra:
        assert a_ in s,(slug,a_[:50]); s=s.replace(a_,b_)
    open(p,"w").write(s)

