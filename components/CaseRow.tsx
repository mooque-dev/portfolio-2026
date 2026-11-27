import Link from "next/link";
import Image from "next/image";
import type { ProjectSummary } from "@/lib/types";
import TryTag from "@/components/TryTag";

// One case study as a row: its picture, where and when, the title, a line on
// what it was, and the one number. The home page and the Work page both list
// work this way, so a project looks the same wherever it shows up.
export const hrefOf = (p: ProjectSummary) => p.href ?? `/work/${p.slug}`;

export default function CaseRow({ project, heading: Heading = "h3" }: { project: ProjectSummary; heading?: "h2" | "h3" }) {
  return (
    <li>
      <Link
        href={hrefOf(project)}
        className="group grid gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center py-7 border-b border-border"
      >
        <div
          className="relative aspect-[3/2] overflow-hidden rounded-md ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
          style={{ backgroundColor: project.coverColor }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={`object-contain object-center transition-transform duration-500 ${
                project.wip ? "blur-lg brightness-75" : "group-hover:scale-[1.03]"
              }`}
            />
          )}
          {project.wip && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2.5 py-1 microlabel text-white/85">
              Confidential visuals
            </span>
          )}
          {project.tryTag && <TryTag kind={project.tryTag} className="absolute left-2.5 top-2.5 z-10" />}
        </div>
        <div className="min-w-0">
          <p className="microlabel text-muted">
            {[project.company, project.role, project.timeline].filter(Boolean).join(" · ")}
          </p>
          <Heading className="mt-2 font-semibold text-xl md:text-[22px] leading-snug group-hover:opacity-70 transition-opacity text-balance">
            {project.title}
          </Heading>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
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
