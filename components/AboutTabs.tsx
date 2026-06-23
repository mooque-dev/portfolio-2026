"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";
import { experience, sideProjects, education, certifications } from "@/lib/resumeData";

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
                : "text-muted/70 border border-border hover:border-foreground/40 hover:text-foreground"
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
                I wanted to be a children&apos;s book illustrator. I studied
                Fine Arts instead, almost became a wedding photographer. Someone
                stole my camera gear, and I took it as a sign to chase ideas
                instead of equipment. Design is where I landed, and where
                I&apos;ve stayed for eight years.
              </p>
              <p>
                I&apos;ve spent those years on products in education,
                healthcare, and nonprofits, building for the people most
                software forgets. Somewhere in there I realized the work
                was never really about screens. It&apos;s about how people feel:
                the person using the thing, and the team in the room making it.
              </p>
              <p>
                Most of what I know about designing with AI I learned by
                breaking things. I built a conversational recipe app in my own
                time, not because it fit any roadmap, but because I wanted to
                understand what happens when a model can take a conversation
                anywhere. The friction I kept hitting was always the same
                problem: the interface had to set expectations without killing
                the open-endedness. That tension fed directly into how I thought
                about AI features when they showed up seriously on the Keela
                roadmap. By the time the PMs were asking how we should handle
                this, I had opinions grounded in something I&apos;d actually
                made.
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
              Most recently that meant leading design at Velora: merging
              Keela, Raisely, and Aplos into one shared platform. I came in
              to build the design practice and the system from scratch, which
              is my favorite kind of problem.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                How I Think About Design
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-semibold mb-2">Systems over screens</h3>
                  <p className="text-muted leading-relaxed">
                    A beautiful screen that doesn&apos;t fit the system it lives
                    in is just a picture. I design the connections: the data
                    flows, the edge cases, the way one decision cascades into the
                    next. That&apos;s usually where the actual work is.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Make the better thing the easier thing
                  </h3>
                  <p className="text-muted leading-relaxed">
                    I don&apos;t believe in mandating design standards. I believe
                    in making the right thing the easier thing, building tools
                    people actually want to use. Orchid spread because designers
                    reached for it, not because anyone told them to.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sketch before you pixel</h3>
                  <p className="text-muted leading-relaxed">
                    I start every project with ugly whiteboard maps and hard
                    questions, not polished mockups. The goal is to find the
                    problems early, when changing direction is cheap. Pretty comes
                    later.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Leave things better than you found them
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Every project is a chance to build something that outlasts
                    you: a reusable pattern, a better process, a piece of
                    documentation that helps the next person. I want my work to
                    compound.
                  </p>
                </div>
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
                  <h3 className="font-semibold mb-2">Cooking</h3>
                  <p className="text-muted leading-relaxed">
                    I cook almost every day. It&apos;s the one creative practice
                    where the feedback loop is immediate. You taste it, you
                    know. I got curious enough about the intersection of food and
                    technology to{" "}
                    <Link
                      href="/work/ai-recipe-book"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      build an AI-powered recipe app
                    </Link>{" "}
                    that adapts recipes conversationally.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Paint &amp; a camera</h3>
                  <p className="text-muted leading-relaxed">
                    I trained in illustration, watercolour, and oil painting,
                    and shot weddings on the side before design took over. I
                    still pick up a brush when I can, and I&apos;ve{" "}
                    <Link
                      href="/work/artist-merchandise"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      helped emerging artists
                    </Link>{" "}
                    build visual identities of their own.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Running &amp; a stage</h3>
                  <p className="text-muted leading-relaxed">
                    I started running just before COVID and ran a half-marathon
                    on my birthday, fundraising for SickKids Hospital. And in
                    August 2026 I&apos;ll be on stage. I joined a 40-person
                    amateur musical, somewhere well outside my comfort zone.
                    Optimism in practice, I suppose.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">A daily streak</h3>
                  <p className="text-muted leading-relaxed">
                    I&apos;ve done French on Duolingo every day since December
                    2020. In 2026 I&apos;m finally trading the streak for real
                    language school. I also{" "}
                    <Link
                      href="/writing"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      write
                    </Link>{" "}
                    about what I&apos;m working through: systems, adoption
                    without authority, design after an acquisition.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <p className="text-lg leading-relaxed">
                I&apos;m currently open to Staff and Principal design roles,
                particularly where design systems, working across product and
                engineering, or 0→1 platform work is at the center. If you&apos;re
                building something interesting,{" "}
                <a
                  href="mailto:ncsstyco@gmail.com"
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
                    <h3 className="text-sm font-semibold">{cert.title}</h3>
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
                  href="mailto:ncsstyco@gmail.com"
                  className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                >
                  ncsstyco@gmail.com
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
