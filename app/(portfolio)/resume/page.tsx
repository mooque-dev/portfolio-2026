import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";
import { experience, sideProjects, education } from "@/lib/resumeData";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Allen Kang — 7+ years designing products, systems, and teams across education, healthcare, food tech, and nonprofit platforms.",
};

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
              {sideProjects.map((project, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted">{project.year}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{project.description}</p>
                </div>
              ))}
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
