import Link from "next/link";
import Image from "next/image";
import type { ProjectSummary } from "@/lib/types";

// Edge to edge, no cards: the work itself is the page. Each tile is a cover
// at its own colour; the title shows on hover or focus, and always on touch.
export default function WorkWall({ projects }: { projects: ProjectSummary[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense" aria-label="Work">
      {projects.map((p, i) => (
        <li key={p.slug} className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}>
          <Link
            href={p.href ?? `/work/${p.slug}`}
            className="group relative block h-full aspect-[3/2] overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
            style={{ backgroundColor: p.coverColor }}
          >
            {p.coverImage && (
              <Image
                src={p.coverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={`object-contain p-[6%] transition-transform duration-700 group-hover:scale-[1.03] ${
                  p.wip ? "blur-md brightness-90" : ""
                }`}
              />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 text-[14px] md:text-[15px] font-medium text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity">
              {p.title.split(":")[0]}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
