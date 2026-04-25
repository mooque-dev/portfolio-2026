import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Allen Kang — 7+ years designing products, systems, and teams across education, healthcare, food tech, and nonprofit platforms.",
};

const experience = [
  {
    company: "Keela — acquired by Aplos",
    role: "Product Design Lead",
    location: "Toronto, ON",
    period: "February 2023 — Present",
    description: [
      "Own design direction for a platform serving 5,000+ nonprofit organizations — CRM, accounting, and donor management all under one roof.",
      "Built Orchid, a design system that consolidated 340+ scattered components into 86 shared primitives. Adopted across all three products within 6 months, cutting component development time by 40%.",
      "Led the first cross-product initiative post-acquisition — designed the integration experience and established the collaboration framework that every subsequent cross-team project has followed.",
      "Designed a 0→1 automation platform. 45% of active accounts adopted within 3 months. Became a competitive differentiator in sales conversations.",
      "Grew and mentored a design team of 3. Established critique processes, a contribution model with 12+ active contributors, and research operations that didn't exist before.",
    ],
  },
  {
    company: "Keela & KIT",
    role: "Product Designer",
    location: "Vancouver, BC",
    period: "February 2021 — January 2023",
    description: [
      "Redesigned the transaction workflow — the #1 driver of tax-season churn. Cut monthly reconciliation time by 60% and moved feature NPS from −12 to +34.",
      "Ran 40+ user research sessions that directly shaped what the product team built next. Built the research practice from nothing.",
      "Created the design system foundations that later became Orchid after the acquisition.",
    ],
  },
  {
    company: "Forkable",
    role: "UI/UX Designer — Design Systems",
    location: "San Francisco, CA",
    period: "January 2020 — September 2022",
    description: [
      "Built and maintained a design system for a food-tech platform. Improved feature delivery speed by 35% through reusable components and documented patterns.",
      "Established component API standards and a design-engineering handoff process that the entire product team adopted.",
    ],
  },
  {
    company: "Xperly",
    role: "UI/UX Designer",
    location: "Toronto, ON",
    period: "October 2018 — December 2019",
    description: [
      "Designed an expert-matching platform from 0→1 through product-market fit — connecting businesses with industry professionals.",
      "Led competitive analysis and usability testing, iterating on core matching and onboarding flows. Improved activation rate by 22%.",
    ],
  },
];

const education = [
  {
    school: "Graphic Design",
    detail:
      "Diploma — Visual communication, interactive design, and systematic thinking",
  },
  {
    school: "Fine Arts",
    detail:
      "Foundation in visual composition, color theory, and creative problem-solving",
  },
];

export default function ResumePage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Resume
          </h1>
          <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
            Fine Arts trained, systems minded. 7+ years designing products
            and building the teams that ship them — from startup through
            acquisition and growth.
          </p>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={0.15}>
          <div className="mt-16">
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

        {/* Side Projects */}
        <FadeIn delay={0.18}>
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-xs tracking-widest uppercase text-muted mb-8">
              Side Projects
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">
                    AI Recipe Book
                  </h3>
                  <span className="text-sm text-muted">2024</span>
                </div>
                <p className="text-sm text-muted mt-1">
                  Solo project — designed and built a conversational recipe app
                  exploring AI trust patterns. React, Supabase, OpenAI API.
                  Also: I just really like cooking.
                </p>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold">
                    Artist Brand Systems
                  </h3>
                  <span className="text-sm text-muted">2022 — 2023</span>
                </div>
                <p className="text-sm text-muted mt-1">
                  Volunteered design skills to help 4 emerging artists develop
                  visual identities and merchandise — building reusable systems,
                  not one-off deliverables.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={0.2}>
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

        {/* Contact */}
        <FadeIn delay={0.25}>
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
      </div>
    </section>
  );
}
