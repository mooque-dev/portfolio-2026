import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Allen Kang — Product design leader with a Fine Arts background, building systems that help teams ship more thoughtful products.",
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            About
          </h1>
        </FadeIn>

        {/* Photo placeholder */}
        <FadeIn delay={0.1}>
          <Skeleton
            className="mt-12 aspect-[3/2] w-full rounded-sm"
            role="img"
            aria-label="Portrait of Allen Kang — photo coming soon"
          />
        </FadeIn>

        {/* Bio */}
        <FadeIn delay={0.2}>
          <div className="mt-12 space-y-6 text-lg leading-relaxed">
            <p>
              I&apos;m Allen. I studied Fine Arts before I ever touched a
              wireframe, and that background still shapes everything I do — I see
              composition in complex systems, rhythm in interaction patterns, and
              I care deeply about whether something feels right, not just whether
              it tests well.
            </p>
            <p>
              For the past 7+ years, I&apos;ve been designing products across
              education, healthcare, food tech, and nonprofit tools. Most
              recently, I led product design at Keela (acquired by Aplos) —
              responsible for the design direction of a CRM platform that 5,000+
              nonprofits rely on to manage donors, track finances, and run
              their operations. I was effectively the founding designer: I built
              the research practice, the design system, and the culture from
              scratch, then scaled it across three product teams post-acquisition.
            </p>
            <p>
              The most interesting challenge of that period was merging three
              separate products into one coherent experience. That meant building
              a design system from the ground up, figuring out how to get teams
              who didn&apos;t choose to work together to collaborate genuinely,
              and making hard calls about which patterns to keep and which to let
              go. The work I&apos;m proudest of isn&apos;t any single feature —
              it&apos;s the shared language and design culture that let the whole
              org move faster.
            </p>
            <p>
              I&apos;m at my best in the messy, ambiguous early stages of a
              project — where the problem isn&apos;t well-defined yet and the
              right approach could go several directions. That&apos;s where my
              Fine Arts training kicks in. Before I open Figma, I sketch, I map
              systems on whiteboards, I talk to people. The pixel work comes
              later, after the thinking.
            </p>
          </div>
        </FadeIn>

        {/* Design Philosophy */}
        <FadeIn delay={0.25}>
          <div className="mt-20">
            <Separator className="mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
              How I Think About Design
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-semibold mb-2">Systems over screens</h3>
                <p className="text-muted leading-relaxed">
                  A beautiful screen that doesn&apos;t fit the system
                  it lives in is just a picture. I design the
                  connections — the data flows, the edge cases, the
                  way one decision cascades into the next. The
                  highest-leverage work is usually invisible.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Make the better thing the easier thing</h3>
                <p className="text-muted leading-relaxed">
                  I don&apos;t believe in mandating design standards.
                  I believe in building tools and systems so good that
                  people adopt them because they genuinely want to.
                  That&apos;s how Orchid got adopted — not through
                  governance, but through craft.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Sketch before you pixel
                </h3>
                <p className="text-muted leading-relaxed">
                  I start every project with ugly whiteboard maps and
                  hard questions, not polished mockups. The goal is to
                  find the problems early, when changing direction is
                  cheap. Pretty comes later.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Leave things better than you found them
                </h3>
                <p className="text-muted leading-relaxed">
                  Every project is a chance to build something that
                  outlasts you — a reusable pattern, a better process,
                  a piece of documentation that helps the next person.
                  I want my work to compound.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Side Projects & Interests */}
        <FadeIn delay={0.3}>
          <div className="mt-20">
            <Separator className="mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
              Outside of Work
            </h2>
            <p className="text-muted leading-relaxed mb-10">
              The best ideas I&apos;ve had at work came from
              somewhere else entirely.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="font-semibold mb-2">
                  Cooking
                </h3>
                <p className="text-muted leading-relaxed">
                  I cook almost every day. It&apos;s the one creative practice
                  where the feedback loop is immediate — you taste it, you know.
                  I got curious enough about the intersection of food and
                  technology to{" "}
                  <Link
                    href="/work/ai-recipe-book"
                    className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                  >
                    build an AI-powered recipe app
                  </Link>{" "}
                  that adapts recipes conversationally. It was also my way of
                  getting hands-on with AI interaction patterns before they
                  became central to our roadmap at Keela.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Art &amp; Volunteering
                </h3>
                <p className="text-muted leading-relaxed">
                  I still paint and draw, though less than I&apos;d like. My
                  Fine Arts background keeps me connected to creative communities
                  — I&apos;ve{" "}
                  <Link
                    href="/work/artist-merchandise"
                    className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                  >
                    helped emerging artists
                  </Link>{" "}
                  develop visual identities and launch merchandise lines. I care
                  about making design accessible to people who can&apos;t afford
                  agencies.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Building Things
                </h3>
                <p className="text-muted leading-relaxed">
                  I like building things end-to-end — design through code through
                  deployment. It keeps me honest about engineering trade-offs
                  instead of just theorizing about them. This portfolio is one of
                  those projects (Next.js, Tailwind, shipped from scratch).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  Writing
                </h3>
                <p className="text-muted leading-relaxed">
                  I{" "}
                  <Link
                    href="/writing"
                    className="underline underline-offset-3 decoration-1 hover:opacity-70 transition-opacity text-foreground"
                  >
                    write occasionally
                  </Link>{" "}
                  about things I&apos;m working through — design systems after an
                  acquisition, how systems thinking changes the way you design,
                  what it actually takes to get adoption without authority.
                  Mostly for my own clarity, but maybe useful to others.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={0.35}>
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

        {/* CTA */}
        <FadeIn delay={0.4}>
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
      </div>
    </section>
  );
}
