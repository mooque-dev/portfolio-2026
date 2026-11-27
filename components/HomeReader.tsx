"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import CarePathwayMini from "@/components/CarePathwayMini";
import type { ProjectSummary } from "@/lib/types";
import { WORLDS, OFF_CLOCK, RESULTS, RESULTS_TOTAL } from "@/lib/identity";
import ResultsList from "@/components/ResultsList";
import Arrow from "@/components/Arrow";
import CurtainCall from "@/components/CurtainCall";
import AudienceIntro from "@/components/AudienceIntro";
import CaseRow, { hrefOf } from "@/components/CaseRow";
import StickerSheet from "@/components/StickerSheet";
import { FILMS } from "@/lib/films";

interface Props {
  allProjects: ProjectSummary[];
}

// The professional stories first, led by the design system and Automation so
// the home page reads broader than payments, then the work built end to end.
const SELECTED = [
  "orchid-design-system",
  "automation-nonprofits",
  "transaction-workflows",
  "aplos-keela-integration",
  "fee-opt-in-experimentation",
];
const DATAVIZ = ["care-pathway-dashboards", "keela-contacts"];
const BUILT = ["arnd", "torontoyuwol", "forkestrate"];
// A team hackathon project, shown on its own so it isn't read as main work.
// Submitted on Oct 30; add the result here once it's announced.
const HACKATHON = { slug: "goldito", event: "Nebius × NVIDIA Global AI Hackathon", submitted: true };

// Four ways in for a first visit. The film length comes from the film itself.
const START = [
  {
    when: "One minute",
    text: `Watch Transaction Workflows: ${FILMS["transaction-workflows"]?.seconds ?? 50} seconds, no sound, then try the split payment yourself.`,
    href: "/work/transaction-workflows",
    link: "Watch it",
  },
  {
    when: "Ten minutes",
    text: "Read Fee Opt-In, the study I'm proudest of: an A/B test that took opt-in from 75% to 92%.",
    href: "/work/fee-opt-in-experimentation",
    link: "Read it",
  },
  {
    when: "Hiring",
    text: "Senior product designer in Toronto, eight years in. The résumé is one page, and five colleagues say what I'm like to work with.",
    href: "/about#colleagues",
    link: "What colleagues say",
  },
  {
    when: "Have a project",
    text: "Tell me what you're trying to fix and who it's for. I'll answer with what I'd look at first.",
    href: "mailto:allensmkang@gmail.com",
    link: "allensmkang@gmail.com",
    external: true,
  },
];

// Lists on home show in the order written above. The Work page sorts by each
// case study's `order` number, so keep the two in step when either changes.
const pick = (all: ProjectSummary[], slugs: string[]) =>
  slugs.map((slug) => all.find((p) => p.slug === slug)).filter((p): p is ProjectSummary => Boolean(p));

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
      <p className="mt-3 text-[14px] text-muted">
        {[project.category, project.tryTag].filter(Boolean).join(" · ")}
      </p>
      <h3 className="mt-1 font-semibold text-[17px] leading-snug group-hover:opacity-70 transition-opacity">
        {project.title.split(":")[0]}
      </h3>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted line-clamp-3">{project.subtitle}</p>
    </Link>
  );
}

export default function HomeReader({ allProjects }: Props) {
  const selected = pick(allProjects, SELECTED);
  const built = pick(allProjects, BUILT);
  const dataviz = pick(allProjects, DATAVIZ);
  const hackathon = allProjects.find((p) => p.slug === HACKATHON.slug);
  const { submitted } = HACKATHON;

  return (
    <section className="pt-32 md:pt-48 pb-4">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        <FadeIn>
          <AudienceIntro />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[16px]">
            <a href="/allen-kang-resume.pdf" className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity">
              Résumé
            </a>
            <a href="mailto:allensmkang@gmail.com" className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity">
              allensmkang@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-1 hover:opacity-60 transition-opacity"
            >
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </FadeIn>
        <StickerSheet items={OFF_CLOCK} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* For someone seeing the site for the first time: four ways in, by how
            much time they have and why they came. Plain text in columns. */}
        <section aria-labelledby="start-here" className="mt-16 md:mt-24 border-t border-border pt-10">
          <h2 id="start-here" className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">
            New here? Pick by how much time you have.
          </h2>
          <ul className="mt-8 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {START.map((x) => (
              <li key={x.when} className="min-w-0">
                <p className="text-[15px] font-semibold">{x.when}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{x.text}</p>
                {x.external ? (
                  <a href={x.href} className="mt-2 inline-block text-[14px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {x.link}
                  </a>
                ) : (
                  <Link href={x.href} className="mt-2 inline-block text-[14px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {x.link} <Arrow />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <FadeIn delay={0.08}>
          <div className="mt-16 md:mt-24 grid gap-10 border-t border-border pt-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:items-start md:gap-16">
            <figure className="m-0 min-w-0">
              <blockquote className="m-0 font-serif text-xl md:text-[26px] leading-snug font-medium text-balance">
                &ldquo;Allen has this rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking without missing a beat.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[13.5px] text-muted">
                <span className="text-foreground font-medium">Natalie Freckleton</span> · Director of Product Management
                <Link href="/about#colleagues" className="mt-2 block w-fit underline underline-offset-4 hover:text-foreground">
                  Four more colleagues <Arrow />
                </Link>
              </figcaption>
            </figure>
            <ResultsList lines={[...RESULTS, RESULTS_TOTAL]} />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-16">
            <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">Try a redesign</h2>
            <p className="mt-2 mb-5 text-[14.5px] text-muted max-w-2xl">
              A live slice of my cancer care redesign. Pick a stage.
            </p>
            <CarePathwayMini />
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">Selected work</h2>
              <Link href="/work" className="text-[14px] text-muted hover:text-foreground transition-colors">
                All work <Arrow />
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
              <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">Data visualization, interactive</h2>
              <p className="mt-2 text-[14.5px] text-muted max-w-2xl">
                Dashboards I designed, rebuilt as working versions.
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
            <h2 id="two-worlds" className="scroll-mt-28 font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m a builder and a translator. Most of my work happens where two sides don&rsquo;t share a language yet.
            </h2>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {WORLDS.map((w) => (
                <div key={w.a} className="min-w-0">
                  <p className="text-[15px] font-semibold">
                    {w.a} <span className="text-muted font-normal" aria-hidden>&harr;</span>
                    <span className="sr-only"> and </span> {w.b}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{w.text}</p>
                  <Link href={w.href} className="mt-2 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {w.link} <Arrow />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>


        {built.length > 0 && (
          <FadeIn delay={0.18}>
            <div className="mt-20">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">Built end to end</h2>
                <Link href="/playground" className="text-[14px] text-muted hover:text-foreground transition-colors">
                  Playground <Arrow />
                </Link>
              </div>
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

        {hackathon && (
          <FadeIn delay={0.19}>
            <div className="mt-20">
              <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug">Hackathon</h2>
              <Link
                href={`/work/${hackathon.slug}`}
                className="group mt-4 grid gap-5 border-t border-border pt-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center"
              >
                <div
                  className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
                  style={{ backgroundColor: hackathon.coverColor }}
                >
                  {hackathon.coverImage && (
                    <Image
                      src={hackathon.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-muted">
                    {submitted ? "Submitted Oct 30" : "Submitting Oct 30"} · {HACKATHON.event} · team of three
                  </p>
                  <h3 className="mt-3 font-semibold text-xl md:text-[22px] leading-snug group-hover:opacity-70 transition-opacity text-balance">
                    {hackathon.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                    I was the only designer on a team of three: the whole stay for owners and sitters, the design system, and playable trials the team decided from.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[13.5px]">
                    <span className="underline underline-offset-4">Read the case</span> <Arrow />
                  </span>
                </div>
              </Link>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-20">
            <h2 className="font-serif font-semibold tracking-[-0.01em] text-2xl md:text-3xl leading-snug max-w-3xl text-balance">
              I&rsquo;m an optimist. Optimism is a design tool: it&rsquo;s how you get people to believe a better version is possible, then go build it.
            </h2>
            <Link href="/about" className="mt-6 inline-block text-[13px] underline underline-offset-4 hover:opacity-70 transition-opacity">
              More about me <Arrow />
            </Link>
          </div>
        </FadeIn>

        <CurtainCall />
      </div>
    </section>
  );
}
