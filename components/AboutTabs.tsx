"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { experience, sideProjects, education } from "@/lib/resumeData";

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
          {/* Photo placeholder */}
          <FadeIn delay={0.05}>
            <Skeleton
              className="mt-10 aspect-[3/2] w-full rounded-sm"
              role="img"
              aria-label="Portrait of Allen Kang — photo coming soon"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12 space-y-6 text-lg leading-relaxed">
              <p>
                I&apos;m Allen. I studied Fine Arts before I ever touched a
                wireframe, and that background still shapes everything I do — I
                see composition in complex systems, rhythm in interaction
                patterns, and I care deeply about whether something feels right,
                not just whether it tests well.
              </p>
              <p>
                For the past eight years, I&apos;ve been designing products
                across education, healthcare, food tech, and nonprofit tools —
                mission-driven work for people the industry usually designs
                around. Today I
                lead design at Velora, where I&apos;m merging three nonprofit
                SaaS products — Keela, Raisely, and Aplos — into one connected
                system used by 85,600+ campaigns across 102 countries. I was
                effectively the founding designer on this effort: I built the
                research practice, the design system, and the culture from
                scratch, then scaled it across three product teams.
              </p>
              <p>
                The most interesting challenge of that period was merging three
                separate products into one coherent experience. That meant
                building a design system from the ground up, figuring out how to
                get teams who didn&apos;t choose to work together to collaborate
                genuinely, and making hard calls about which patterns to keep and
                which to let go. The work I&apos;m proudest of isn&apos;t any
                single feature — it&apos;s the shared language and design culture
                that let the whole org move faster.
              </p>
              <p>
                I&apos;m at my best in the messy, ambiguous early stages of a
                project — where the problem isn&apos;t well-defined yet and the
                right approach could go several directions. That&apos;s where my
                Fine Arts training kicks in. Before I open Figma, I sketch, I
                map systems on whiteboards, I talk to people. The pixel work
                comes later, after the thinking.
              </p>
            </div>
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
                    in is just a picture. I design the connections — the data
                    flows, the edge cases, the way one decision cascades into the
                    next. The highest-leverage work is usually invisible.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Make the better thing the easier thing
                  </h3>
                  <p className="text-muted leading-relaxed">
                    I don&apos;t believe in mandating design standards. I believe
                    in building tools and systems so good that people adopt them
                    because they genuinely want to. That&apos;s how Orchid got
                    adopted — not through governance, but through craft.
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
                    you — a reusable pattern, a better process, a piece of
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
                    where the feedback loop is immediate — you taste it, you
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
                  <h3 className="font-semibold mb-2">Art &amp; Volunteering</h3>
                  <p className="text-muted leading-relaxed">
                    I still paint and draw, though less than I&apos;d like. I
                    &apos;ve{" "}
                    <Link
                      href="/work/artist-merchandise"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      helped emerging artists
                    </Link>{" "}
                    develop visual identities and launch merchandise lines.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Building Things</h3>
                  <p className="text-muted leading-relaxed">
                    I like building things end-to-end — design through code
                    through deployment. It keeps me honest about engineering
                    trade-offs instead of just theorizing about them. This
                    portfolio is one of those projects.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Writing</h3>
                  <p className="text-muted leading-relaxed">
                    I{" "}
                    <Link
                      href="/writing"
                      className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                    >
                      write occasionally
                    </Link>{" "}
                    about things I&apos;m working through — design systems after
                    an acquisition, systems thinking, what it actually takes to
                    get adoption without authority.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                Tools &amp; Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">
                    Design
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>Product &amp; Design Strategy</li>
                    <li>Design Systems</li>
                    <li>User Research &amp; Synthesis</li>
                    <li>Interaction Design</li>
                    <li>Information Architecture</li>
                    <li>Visual Design &amp; Typography</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">
                    Tools
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>Figma &amp; FigJam</li>
                    <li>Storybook &amp; Chromatic</li>
                    <li>Amplitude &amp; Mixpanel</li>
                    <li>React &amp; Next.js</li>
                    <li>Illustrator &amp; Procreate</li>
                    <li>Jira, Linear &amp; Notion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">
                    Leadership
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>Team Building &amp; Mentorship</li>
                    <li>Design Operations</li>
                    <li>Stakeholder Communication</li>
                    <li>Workshop Facilitation</li>
                    <li>Design Critique</li>
                    <li>Research Operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-20">
              <Separator className="mb-12" />
              <p className="text-lg leading-relaxed">
                I&apos;m currently open to Staff and Principal design roles —
                particularly where design systems, cross-functional product
                thinking, or 0→1 platform work is at the center. If you&apos;re
                building something interesting,{" "}
                <a
                  href="mailto:hello@mooque.xyz"
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
                      <h3 className="font-semibold">{project.title}</h3>
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

          <FadeIn delay={0.2}>
            <div className="mt-16">
              <Separator className="mb-8" />
              <h2 className="text-xs tracking-widest uppercase text-muted mb-6">
                Get in touch
              </h2>
              <div className="flex flex-wrap gap-6 text-sm">
                <a
                  href="mailto:hello@mooque.xyz"
                  className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
                >
                  hello@mooque.xyz
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
              </div>
            </div>
          </FadeIn>
        </div>
      )}
    </>
  );
}
