"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";
import { experience, sideProjects, education, certifications } from "@/lib/resumeData";
import { QUOTES, HOW_I_WORK, READING } from "@/lib/identity";

type Tab = "bio" | "resume";

export default function AboutTabs() {
  const [active, setActive] = useState<Tab>("bio");

  return (
    <>
      <div className="flex items-center gap-2 mt-10">
        {(["bio", "resume"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.1em] uppercase transition-colors ${
              active === tab
                ? "bg-foreground text-background"
                : "text-muted border border-border hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {tab === "bio" ? "Bio" : "Resume"}
          </button>
        ))}
      </div>

      {active === "bio" && (
        <div>
          <FadeIn delay={0.05}>
            <div className="mt-10 relative aspect-[3/4] max-w-xs overflow-hidden rounded-sm">
              <Image
                src="/allen-kang-portrait.png"
                alt="Portrait of Allen Kang"
                fill
                className="object-cover object-[center_20%]"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 space-y-7 text-[22px] md:text-[30px] leading-[1.4] font-light tracking-[-0.01em] text-balance">
              <p>
                I grew up wanting to illustrate children&apos;s books, the
                painted kind, with stories that didn&apos;t talk down to kids.
                Fine Arts pulled me sideways, photography pulled me further, and
                I spent a few years shooting weddings until someone stole my
                camera gear. I took it as a reason to stop chasing tools and
                start chasing problems. Design is where I landed, eight years
                ago and still here.
              </p>
              <p>
                I&apos;ve spent those years on nonprofit software, healthcare,
                and a few early-stage startups, building for the people most
                software forgets. Somewhere in there I realized the work
                was never really about screens. It&apos;s about how people feel:
                the person using the thing, and the team in the room making it.
              </p>
              <p>
                I&apos;m an optimist, and I&apos;ve come to believe optimism is
                a design tool. It&apos;s how you get people to believe a better
                version is possible, then go build it. AI can make the screens
                now. I&apos;m here for the part it can&apos;t.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="mt-10 text-base text-muted leading-relaxed max-w-2xl">
              Most recently, at Aplos, that meant designing across Aplos,
              Keela, and Raisely as three products merged into one (they now
              operate together as Velora), including the shared component
              library they build on. Systems that
              have to reconcile with each other are my favorite kind of problem.
            </p>
          </FadeIn>

          <FadeIn delay={0.13}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                How I work
              </h2>
              <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-3 max-w-4xl">
                {HOW_I_WORK.map((h, i) => (
                  <li key={h.title} className="border-t border-border pt-5 min-w-0">
                    <span className="font-serif text-2xl font-bold text-[var(--seal)]" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-semibold">{h.title}</h3>
                    <p className="mt-2 text-muted leading-relaxed">{h.text}</p>
                    <Link
                      href={h.href}
                      className="mt-2 inline-block text-sm underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      {h.link} &rarr;
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="mt-20 scroll-mt-28" id="colleagues">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                What people I&apos;ve worked with say
              </h2>
              <div className="flex flex-col gap-8 max-w-3xl">
                {QUOTES.map((t) => (
                  <figure key={t.who} className="m-0 border-l-2 border-border pl-6">
                    <blockquote className="m-0 font-serif text-lg md:text-xl leading-snug">
                      &ldquo;{t.q}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 text-sm text-muted">
                      <span className="text-foreground font-medium">{t.who}</span> · {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <a
                href="https://www.linkedin.com/in/mooque/details/recommendations/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity"
              >
                Read them in full on LinkedIn<span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                On the name
              </h2>
              <div className="space-y-7 text-base text-muted leading-relaxed max-w-2xl">
                <p>
                  Seoul, 1994. Hamilton, 2007. Toronto since 2012. My Korean
                  name is Sung Mook. Over time it became{" "}
                  <span className="text-foreground font-medium">mooque</span>,
                  a handle I&apos;ve worn long enough that it&apos;s mine. The red
                  seal on this site&apos;s browser tab is 묵, the Mook in Sung
                  Mook. Another handle, ncsstyco, is short for Necessity Company:
                  good work should create real necessity, not manufactured
                  urgency. You can reach me at{" "}
                  <a
                    href="mailto:allensmkang@gmail.com"
                    className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                  >
                    allensmkang@gmail.com
                  </a>.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                Outside of Work
              </h2>
              <p className="text-muted leading-relaxed mb-10">
                The best ideas I&apos;ve had at work came from somewhere else
                entirely.
              </p>
              <div className="space-y-10">
                <div>
                  <h3 className="font-semibold mb-2">Food &amp; people</h3>
                  <p className="text-muted leading-relaxed">
                    My family are the cooks, and many of my friends are
                    musicians. Most of my ideas start there, including{" "}
                    <Link
                      href="/work/forkestrate"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      an AI-powered recipe app
                    </Link>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Paint &amp; a camera</h3>
                  <p className="text-muted leading-relaxed">
                    I trained in watercolour and oil and shot weddings before
                    design took over. Now I build for the arts scene: Toronto
                    Yuwol, ARND, and volunteering as design lead at{" "}
                    <Link
                      href="/work/artist-merchandise"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      ArtsGaze
                    </Link>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Running, giving &amp; a stage</h3>
                  <p className="text-muted leading-relaxed">
                    I started running just before COVID and ran a{" "}
                    <a
                      href="https://www.strava.com/athletes/68085439"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      half-marathon
                      <span className="sr-only"> (Strava, opens in new tab)</span>
                    </a>{" "}
                    on my own, and separately raised $1,000 for SickKids. In
                    August 2026 I went on stage in a 40-person musical: 350
                    tickets sold, running on apps I built. Season two is
                    underway.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">A daily streak</h3>
                  <p className="text-muted leading-relaxed">
                    Years of daily streaks, first French, now chess. I also{" "}
                    <Link
                      href="/writing"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      write
                    </Link>{" "}
                    about what I&apos;m working through.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">On my shelf</h3>
                  <p className="text-muted leading-relaxed">
                    <span className="text-foreground">Reading now:</span>{" "}
                    {READING.now.join("; ")}.
                  </p>
                  <p className="mt-2 text-muted leading-relaxed">
                    <span className="text-foreground">Kept close:</span>{" "}
                    {READING.shelf.join("; ")}.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <p className="text-lg leading-relaxed">
                I&apos;m currently open to senior and staff product design roles,
                particularly where transaction-heavy flows, design systems, or
                0→1 platform work is at the center. If you&apos;re
                building something interesting,{" "}
                <a
                  href="mailto:allensmkang@gmail.com"
                  className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity"
                >
                  I&apos;d love to talk
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      )}

      {active === "resume" && (
        <div>
          <FadeIn delay={0.05}>
            <div className="mt-10">
              <h2 className="text-xs tracking-widest uppercase text-muted mb-8">
                Experience
              </h2>
              <div className="space-y-0">
                {experience.map((job, i) => (
                  <div
                    key={i}
                    className="py-8 border-t border-border first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                      <h3 className="font-serif text-lg font-semibold">
                        {job.company}
                      </h3>
                      <span className="text-sm text-muted">{job.period}</span>
                    </div>
                    <p className="text-sm text-muted mb-4">
                      {job.role} &middot; {job.location}
                    </p>
                    <ul className="space-y-2">
                      {job.description.map((item, j) => (
                        <li
                          key={j}
                          className="text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-xs tracking-widest uppercase text-muted mb-8">
                Side Projects
              </h2>
              <div className="space-y-6">
                {sideProjects.map((project, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-semibold">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity"
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <span className="text-sm text-muted">{project.year}</span>
                    </div>
                    <p className="text-sm text-muted mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-xs tracking-widest uppercase text-muted mb-8">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-semibold">{edu.school}</h3>
                    <p className="text-sm text-muted mt-1">{edu.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-xs tracking-widest uppercase text-muted mb-8">
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold">
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                          {cert.title} <span aria-hidden className="text-muted">&#8599;</span>
                          <span className="sr-only"> (certificate, opens in new tab)</span>
                        </a>
                      ) : (
                        cert.title
                      )}
                    </h3>
                    <span className="text-sm text-muted">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-xs tracking-widest uppercase text-muted mb-6">
                Get in touch
              </h2>
              <div className="flex flex-wrap gap-6 text-sm">
                <a
                  href="mailto:allensmkang@gmail.com"
                  className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                >
                  allensmkang@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/mooque/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                >
                  LinkedIn
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a
                  href="/allen-kang-resume.pdf"
                  download
                  className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
}
