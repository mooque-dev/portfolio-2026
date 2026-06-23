import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { Separator } from "@/components/ui/separator";
import { experience, sideProjects, education } from "@/lib/resumeData";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Allen Kang, product designer. Eight years across education, healthcare, food tech, and nonprofits.",
};

export default function ResumePage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
        <FadeIn>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
                Resume
              </h1>
              <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
                Eight years across nonprofits, ed-tech, and food-tech. The work was
                always about the team as much as the product.
              </p>
            </div>
            <a
              href="/allen-kang-resume.pdf"
              download
              className="shrink-0 mt-2 px-4 py-2 text-xs tracking-[0.1em] uppercase border border-border rounded-full hover:border-foreground/40 hover:text-foreground text-muted/70 transition-colors"
            >
              Download PDF
            </a>
          </div>
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
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
