"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { formatDate } from "@/lib/utils";
import type { ProjectSummary, WritingSummary } from "@/lib/types";

interface Props {
  allProjects: ProjectSummary[];
  recentWriting: WritingSummary[];
}

// Curated to mirror the résumé: the professional stories first, in the order
// a reviewer would want them, then the work built end to end.
const SELECTED = [
  "aplos-keela-integration",
  "transaction-workflows",
  "orchid-design-system",
  "automation-nonprofits",
  "fee-opt-in-experimentation",
];
const DATAVIZ = ["care-pathway-dashboards", "keela-contacts"];
const BUILT = ["arnd", "torontoyuwol", "forkestrate"];

// Each pair is backed by real work, linked, so the theme reads as evidence.
const WORLDS = [
  { a: "Fine art", b: "Product design", text: "I trained in pencil, watercolour and oil before I opened Figma. It's why I sweat the visual craft in dense, data-heavy screens.", href: "/illustration", link: "Where it started" },
  { a: "Korean", b: "English", text: "I built a Korean and English script reader that a thirty-person musical company rehearsed with every day through a ten-month production.", href: "/work/torontoyuwol", link: "Toronto Yuwol" },
  { a: "Design", b: "Engineering", text: "I prototype in code, and I sat on the bridge between our design system and Keela's frontend, reviewing pull requests with engineers.", href: "/work/orchid-design-system", link: "Orchid" },
  { a: "Software", b: "The people it forgets", text: "Most of my users never asked for software: nonprofit accountants, clinicians, donors, an amateur musical company. I design so they don't need a manual.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
];

// Life outside the work, from the About page, with the site's own stickers.
const OFF_CLOCK = [
  { img: "/stickers/piano.png", text: "Performed in a 40-person amateur musical this August, with 350 tickets sold. I built its scheduling, bill-splitting and script-reader apps, and I'm back for season two." },
  { img: "/stickers/palette.png", text: "The kid who wanted to make art now builds for the arts scene: Toronto Yuwol, ARND, and volunteering as design lead at ArtsGaze." },
  { img: "/stickers/guitar.png", text: "Grew up around cooks, and many of my friends are musicians. That world is where most of my ideas come from." },
  { img: "/stickers/shoe.png", text: "Ran a half-marathon on my own." },
  { img: "/stickers/seal.png", text: "Raised $1,000 for SickKids Hospital." },
  { img: "/stickers/capybara.png", text: "Kept a daily streak for years, first French, now chess. Streak apps are a good on-ramp to a language, not a way to learn one." },
];

// Exact excerpts from LinkedIn recommendations.
const QUOTES = [
  { q: "Allen has this rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking without missing a beat.", who: "Natalie Freckleton", role: "Director of Product Management, Velora" },
  { q: "He treats the design system as a shared product, not someone else's problem.", who: "Max Galchenko", role: "Senior React developer, Velora, on a different product team" },
  { q: "I learned a great deal from him during our time working together… his ability to distill complex problems into simple, elegant solutions set a high standard for design excellence.", who: "Dick De Leon", role: "Senior to Allen at Aplos" },
  { q: "Even while supporting multiple teams, he is always responsive, reliable, and easy to work with.", who: "Randy Douglas", role: "Software engineer, same team" },
  { q: "Allen's forward-thinking, North Star-guided approach and user-centric designs were also instrumental in crafting/communicating a motivational product vision for our teams.", who: "Eric Hua", role: "Product manager and founder, Forkestrate" },
];

const IMPACT = [
  { value: "13%", label: "ARR increase from Automation, adopted by 30% of 355 organizations" },
  { value: "340+ → 86", label: "components consolidated into one library across three merged products" },
  { value: "75% → 92%", label: "donation fee opt-in in an A/B test, with conversion held steady" },
];

const pick = (all: ProjectSummary[], slugs: string[]) =>
  slugs.map((s) => all.find((p) => p.slug === s)).filter((p): p is ProjectSummary => !!p);

const hrefOf = (p: ProjectSummary) => p.href ?? `/work/${p.slug}`;

function CaseRow({ project }: { project: ProjectSummary }) {
  return (
    <li>
      <Link
        href={hrefOf(project)}
        className="group grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center py-7 border-b border-border"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={`object-cover object-center transition-transform duration-500 ${
                project.wip ? "blur-lg brightness-75" : "group-hover:scale-[1.03]"
              }`}
            />
          )}
          {project.wip && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2.5 py-1 microlabel text-white/85">
              Confidential visuals
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="microlabel text-muted">
            {[project.company, project.role, project.timeline].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-serif text-xl md:text-[22px] leading-snug group-hover:opacity-70 transition-opacity text-balance">
            {project.title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted line-clamp-3">
            {project.subtitle}
          </p>
          {project.featuredStat && (
            <p className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold tracking-tight">{project.featuredStat}</span>
              <span className="text-[13px] text-muted">{project.featuredStatLabel}</span>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

function BuiltCard({ project }: { project: ProjectSummary }) {
  return (
    <Link href={hrefOf(project)} className="group block min-w-0">
      <div
        className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
        style={{ backgroundColor: project.coverColor }}
      >
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <p className="mt-3 microlabel text-muted">{project.category}</p>
      <h3 className="mt-1 font-serif text-[17px] leading-snug group-hover:opacity-70 transition-opacity">
        {project.title.split(":")[0]}
      </h3>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted line-clamp-2">{project.subtitle}</p>
    </Link>
  );
}

export default function HomeReader({ allProjects, recentWriting }: Props) {
  const selected = pick(allProjects, SELECTED);
  const built = pick(allProjects, BUILT);
  const dataviz = pick(allProjects, DATAVIZ);

  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3">
            <Image
              src="/allen-kang-portrait.png"
              alt="Allen Kang"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover object-[center_20%] ring-1 ring-border"
              priority
            />
            <p className="microlabel text-muted">Allen Kang · Senior Product Designer · Toronto</p>
          </div>
          <h1 className="mt-4 text-[26px] md:text-[44px] leading-[1.15] font-light tracking-[-0.015em] text-balance max-w-4xl">
            I design transaction-heavy products: donation and payment flows,
            multi-entity financial data, and the systems that keep them consistent.
          </h1>
          <p className="mt-5 text-[17px] md:text-lg leading-relaxed text-muted max-w-3xl">
            Eight years across nonprofit software and healthcare, most recently on a
            three-product suite merging into one. I use research to cut friction in
            dense, high-stakes flows, ship end to end, and have mentored three designers.
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/allen-kang-resume.pdf"
              className="inline-flex items-center h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Résumé (PDF)
            </a>
            <a
              href="mailto:allensmkang@gmail.com"
              className="inline-flex items-center h-10 px-5 rounded-full border border-border text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center h-10 px-5 rounded-full border border-border text-sm font-medium hover:border-foreground/40 transition-colors"
            >
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
            <span className="text-sm text-muted">Open to senior and staff product design roles.</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <dl className="mt-14 grid gap-6 sm:grid-cols-3">
            {IMPACT.map((s) => (
              <div key={s.value} className="border-t-2 border-foreground pt-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl md:text-4xl font-semibold tracking-tight">{s.value}</span>
                  <span className="mt-2 block text-[13.5px] leading-snug text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="microlabel text-muted">Selected work</h2>
              <Link href="/work" className="text-xs text-muted hover:text-foreground transition-colors">
                All work &rarr;
              </Link>
            </div>
            <ol className="mt-2">
              {selected.map((p) => (
                <CaseRow key={p.slug} project={p} />
              ))}
            </ol>
          </div>
        </FadeIn>

        {dataviz.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-20">
              <h2 className="microlabel text-muted">Data visualization, interactive</h2>
              <p className="mt-2 text-[14.5px] text-muted max-w-2xl">
                Dashboards I designed, rebuilt with what I know now. Each one is a working version you can filter and explore.
              </p>
              <ol className="mt-2">
                {dataviz.map((p) => (
                  <CaseRow key={p.slug} project={p} />
                ))}
              </ol>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.16}>
          <div className="mt-20">
            <h2 className="microlabel text-muted">Between two worlds</h2>
            <p className="mt-3 font-serif text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m a builder and a translator. Most of my work happens where two sides don&rsquo;t share a language yet.
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {WORLDS.map((w) => (
                <div key={w.a} className="border-t border-border pt-5 min-w-0">
                  <p className="text-[15px] font-semibold">
                    {w.a} <span className="text-muted font-normal" aria-hidden>&harr;</span>
                    <span className="sr-only"> and </span> {w.b}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.text}</p>
                  <Link href={w.href} className="mt-2 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {w.link} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.17}>
          <div className="mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="microlabel text-muted">What people I&rsquo;ve worked with say</h2>
              <a href="https://www.linkedin.com/in/mooque/details/recommendations/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-foreground transition-colors">
                All on LinkedIn &rarr;<span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {QUOTES.map((t, i) => (
                <figure key={t.who} className={`m-0 rounded-lg border border-border p-6 ${i === 0 ? "md:col-span-2" : ""}`}>
                  <blockquote className={`m-0 font-serif leading-snug ${i === 0 ? "text-xl md:text-2xl" : "text-[17px]"}`}>
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[13px] text-muted">
                    <span className="text-foreground font-medium">{t.who}</span> &middot; {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </FadeIn>

        {built.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="mt-20">
              <h2 className="microlabel text-muted">Built end to end</h2>
              <p className="mt-2 text-[14.5px] text-muted max-w-2xl">
                Products I designed and shipped myself, from research to release.
              </p>
              <div className="mt-6 grid gap-8 sm:grid-cols-3">
                {built.map((p) => (
                  <BuiltCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-20">
            <h2 className="microlabel text-muted">Off the clock</h2>
            <p className="mt-3 font-serif text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m an optimist. Optimism is a design tool: it&rsquo;s how you get people to believe a better version is possible, then go build it.
            </p>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {OFF_CLOCK.map((o) => (
                <li key={o.img} className="flex flex-col gap-3 min-w-0">
                  <Image src={o.img} alt="" width={64} height={48} className="h-12 w-auto object-contain object-left [image-rendering:pixelated]" />
                  <p className="text-[14px] leading-relaxed text-muted">{o.text}</p>
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-6 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
              More about me &rarr;
            </Link>
          </div>
        </FadeIn>

        {recentWriting.length > 0 && (
          <FadeIn delay={0.22}>
            <div className="mt-20 max-w-3xl">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="microlabel text-muted">Writing</h2>
                <Link href="/writing" className="text-xs text-muted hover:text-foreground transition-colors">
                  All &rarr;
                </Link>
              </div>
              {recentWriting.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="group flex items-baseline justify-between py-4 border-b border-border"
                >
                  <span className="font-light text-[15px] md:text-base leading-snug group-hover:opacity-60 transition-opacity truncate min-w-0">
                    {post.title}
                  </span>
                  <time dateTime={post.date} className="text-xs text-muted shrink-0 ml-4 hidden sm:block">
                    {formatDate(post.date)}
                  </time>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
