#!/usr/bin/env python3
"""Role variants of the résumé, built from resume.html.

Every variant is the same résumé: same facts, same jobs, same dates. Only
one clause of the summary, the order of bullets and projects, a few
wordings and the site link change, so the tailoring stays quiet.

    python3 drafts/resume/make-variants.py    # writes resume-<slug>.html here
"""
import re
from pathlib import Path

HERE = Path(__file__).parent
BASE = (HERE / "resume.html").read_text()

SUMMARY = ("Senior product designer with 8 years in product design, the last 5 in {domain}. "
           "I take features from first research to release, {clause}, and build design systems that teams actually adopt.")

# Aplos bullets, by key. Some have a second wording a role can pick.
APLOS = {
    "own": "Owned end-to-end design for payments and transactions across Aplos, Keela and Raisely as the three products merged into one suite.",
    "split": "Redesigned split transactions so one payment can be a donation, a gift and a ticket at once, cutting categorization tickets by 70% in the first month.",
    "split_tax": "Learned tax rules in three countries from accountants, then redesigned split transactions, cutting categorization tickets by 70%.",
    "fee": "Ran an A/B test on the donation fee flow that raised fee opt-in from 75% to 92%, with conversion steady.",
    "fee_code": "Prototyped the donation fee flow in code, then A/B tested it; fee opt-in rose from 75% to 92%.",
    "integ": "Led integration design between the merged products, making data mapping visible and auditable.",
    "orchid": "Grew Orchid into a shared library of 340+ components used by three engineering teams.",
    "partner": "Partnered with Product, Engineering and leadership on roadmap, experiments and delivery. Mentored two designers.",
}
LEAD = {
    "core": "Led product design for the CRM&rsquo;s core: the contact record, Pipelines, and Reports &amp; Dashboards.",
    "pitch": "Pitched the Orchid design system to leadership and earned two dedicated front-end engineers.",
    "process": "Set up the design-to-launch process. Mentored one designer.",
}
PD = {
    "auto": "Designed Automation, a no-code workflow builder, from first interview to release (0 to 1).",
    "auto_test": "Designed Automation, a no-code workflow builder, from interviews and testing to release (0 to 1).",
    "adopt": "Reached 30% adoption across 355 organizations, contributing to a 13% ARR increase.",
    "pm": "Stepped in as Associate PM to ship Pipelines.",
}
PROJECTS = {
    "arnd": ("ARND", "Founder, live-music discovery app", "2025 – Present",
             "Designed and built a live-music app for Toronto&rsquo;s small shows, now in public beta at arnd.app."),
    "arnd_code": ("ARND", "Founder, live-music discovery app", "2025 – Present",
                  "Designed and built a map-first app with AI coding tools; 160+ merged pull requests so far."),
    "yuwol": ("Yuwol Productions", "Internal tools for a Toronto musical company", "Oct 2025 – Present",
              "Built scheduling, a bilingual script reader and a bill splitter, used daily by a forty-person company."),
    "fork": ("Forkestrate", "Co-founder and founding designer, AI recipe app", "2025 – Present",
             "Co-founded and designed a recipe app, taking it from zero to MVP in under three months with a PM and two engineers."),
    "arnd_mobile": ("ARND", "Founder, live-music discovery app", "2025 – Present",
                    "Designed and built a map-first app for iOS, Android and web with AI tools; 160+ merged pull requests."),
    "arnd_system": ("ARND", "Founder, live-music discovery app", "2025 – Present",
                    "Designed and built a map-first app with AI coding tools: five themes, one system, 160+ merged pull requests."),
    "demello": ("De Mello Coffee", "Brand designer and consultant", "2020",
                "Helped a Toronto specialty coffee roaster build the brand system to run its own brand."),
    "artsgaze": ("ArtsGaze", "Design lead, volunteer", "2025",
                 "Design systems emerging artists can run themselves, for a platform that helps them get seen."),
}

ROLES = {
    "jeppesen-foreflight": dict(
        url="mooque-dev.github.io/jeppesen-foreflight",
        domain="complex financial and data-heavy tools", clause="prototype in code",
        aplos=["split_tax", "integ", "orchid", "fee_code", "own", "partner"],
        lead=["core", "pitch", "process"], pd=["auto", "adopt", "pm"],
        projects=["arnd_code", "fork", "yuwol"],
        skills="Data visualization &middot; Research and usability testing &middot; Prototyping in code (React, TypeScript) with AI tools &middot; Design systems &middot; A/B testing &middot; Figma, Storybook, Pendo, Amplitude"),
    "bridgit": dict(
        url="mooque-dev.github.io/bridgit",
        domain="payments and transaction-heavy products", clause="prototype with AI tools",
        aplos=["split_tax", "fee_code", "orchid", "own", "integ", "partner"],
        lead=["pitch", "process", "core"], pd=["auto_test", "adopt", "pm"],
        projects=["arnd_code", "yuwol", "fork"],
        skills="Research and usability testing &middot; Prototyping with AI tools (Claude Code, Cursor) and React &middot; Design systems &middot; Data visualization &middot; A/B testing &middot; Figma, Storybook, Pendo"),
    "7shifts": dict(
        url="mooque-dev.github.io/7shifts",
        domain="B2B SaaS", clause="test early with real users",
        aplos=["split", "fee", "own", "orchid", "integ", "partner"],
        lead=["core", "process", "pitch"], pd=["auto_test", "adopt", "pm"],
        projects=["yuwol", "arnd_code", "fork"],
        skills="Research and usability testing &middot; Rapid prototyping with AI tools (Claude Code, Cursor) &middot; A/B testing &middot; Design systems &middot; React, TypeScript &middot; Figma, Storybook, Pendo"),
    "autotrader": dict(
        url="mooque-dev.github.io",
        domain="payments and transaction-heavy products", clause="run experiments on checkout flows",
        aplos=["fee", "split", "own", "orchid", "integ", "partner"],
        lead=["core", "pitch", "process"], pd=["auto", "adopt", "pm"],
        projects=["arnd", "fork", "yuwol"],
        skills="A/B testing &middot; Design systems &middot; Research and usability testing &middot; Data visualization &middot; Prototyping in code (React, TypeScript) &middot; Figma, Storybook, Pendo, Amplitude"),
    "apply-digital": dict(
        url="mooque-dev.github.io",
        domain="payments and transaction-heavy products", clause="use AI tools from concept to code",
        aplos=["orchid", "own", "split", "fee", "integ", "partner"],
        lead=["pitch", "core", "process"], pd=["auto", "adopt", "pm"],
        projects=["demello", "artsgaze", "arnd_code"],
        skills="Brand and visual identity &middot; Typography and layout &middot; Design systems &middot; AI tools (Claude Code, Cursor, MagicPatterns) &middot; Prototyping in code (React, TypeScript) &middot; Figma, Storybook"),
    "ashby": dict(
        url="mooque-dev.github.io",
        domain="payments and transaction-heavy products", clause="build what I design",
        aplos=["orchid", "split", "fee_code", "own", "integ", "partner"],
        lead=["pitch", "core", "process"], pd=["auto", "adopt", "pm"],
        projects=["arnd_code", "fork", "yuwol"],
        skills="Design systems &middot; Front-end code (React, TypeScript) with Claude Code and Cursor &middot; Prototyping &middot; Research and usability testing &middot; A/B testing &middot; Figma, Storybook"),
    "ecobee": dict(
        url="mooque-dev.github.io/ecobee",
        domain="B2B SaaS", clause="design for mobile and web",
        aplos=["orchid", "own", "split", "fee_code", "integ", "partner"],
        lead=["pitch", "core", "process"], pd=["auto_test", "adopt", "pm"],
        projects=["arnd_mobile", "fork", "yuwol"],
        skills="Design systems &middot; Mobile (iOS, Android) and web &middot; Research and usability testing &middot; Prototyping with AI tools (Claude Code, Cursor) &middot; A/B testing &middot; Figma, Storybook"),
    "harvey": dict(
        url="mooque-dev.github.io/harvey",
        domain="complex financial and data-heavy tools", clause="prototype in code",
        aplos=["split_tax", "own", "orchid", "fee_code", "integ", "partner"],
        lead=["core", "pitch", "process"], pd=["auto", "adopt", "pm"],
        projects=["arnd_code", "fork", "yuwol"],
        skills="Research with domain experts &middot; Interaction and visual design &middot; Design systems &middot; Prototyping in code (React, TypeScript) with AI tools &middot; A/B testing &middot; Figma, Storybook"),
    "openloop": dict(
        url="mooque-dev.github.io/openloop",
        domain="B2B SaaS", clause="prototype in code",
        aplos=["orchid", "integ", "own", "fee_code", "split", "partner"],
        lead=["pitch", "process", "core"], pd=["auto", "adopt", "pm"],
        projects=["arnd_system", "yuwol", "fork"],
        skills="Design systems (tokens, theming, documentation) &middot; Prototyping in code (React, TypeScript) &middot; AI coding tools (Claude Code, Cursor) &middot; Research and usability testing &middot; Figma, Storybook"),
    "apply-digital-lead": dict(
        url="mooque-dev.github.io",
        domain="B2B SaaS", clause="mentor designers",
        aplos=["orchid", "partner", "own", "fee_code", "integ", "split"],
        lead=["pitch", "process", "core"], pd=["auto", "adopt", "pm"],
        projects=["arnd_code", "demello", "artsgaze"],
        skills="Design systems and tokens &middot; UI and visual design &middot; Brand and typography &middot; AI tools (Claude Code, Cursor, MagicPatterns) &middot; Prototyping in code &middot; Figma, Storybook"),
}


def ul(keys, table):
    return "<ul>\n" + "\n".join(f"<li>{table[k]}</li>" for k in keys) + "</ul></div>"


def replace_job(html, company_label, new_ul):
    """Swap the bullet list of the job whose row starts with company_label."""
    start = html.index(company_label)
    a = html.index("<ul>", start)
    b = html.index("</ul></div>", a) + len("</ul></div>")
    return html[:a] + new_ul + html[b:]


def build(slug, r):
    html = BASE
    html = html.replace('<a href="https://mooque-dev.github.io">mooque-dev.github.io</a>',
                        f'<a href="https://{r["url"]}/">{r["url"]}</a>' if r["url"] != "mooque-dev.github.io"
                        else '<a href="https://mooque-dev.github.io">mooque-dev.github.io</a>', 1)
    html = re.sub(r'<p class="summary">.*?</p>',
                  '<p class="summary">' + SUMMARY.format(domain=r["domain"], clause=r["clause"]) + "</p>", html, count=1, flags=re.S)
    html = replace_job(html, "<b>Aplos</b>", ul(r["aplos"], APLOS))
    html = replace_job(html, "Lead Product Designer</span>", ul(r["lead"], LEAD))
    html = replace_job(html, "Product Designer &amp; Associate PM</span>", ul(r["pd"], PD))
    a = html.index("<h2>Independent Projects</h2>")
    b = html.index("<h2>Skills</h2>")
    projects = "<h2>Independent Projects</h2>\n" + "\n".join(
        f'<div class="job"><div class="row"><span><b>{name}</b> <span class="r">&middot; {what}</span></span>'
        f'<span class="date">{when}</span></div><ul>\n<li>{line}</li></ul></div>'
        for name, what, when, line in (PROJECTS[k] for k in r["projects"])) + "\n\n"
    html = html[:a] + projects + html[b:]
    html = re.sub(r'(<h2>Skills</h2>\n<div class="small">).*?(</div>)', lambda m: m.group(1) + r["skills"] + m.group(2), html, count=1, flags=re.S)
    assert "—" not in html, slug
    (HERE / f"resume-{slug}.html").write_text(html)


if __name__ == "__main__":
    for slug, r in ROLES.items():
        build(slug, r)
        print("wrote", f"resume-{slug}.html")
