import { FILMS } from "@/lib/films";

// The short version of a case study: a silent film of under a minute, made
// from the case's own words, numbers and screens. It never plays by itself:
// the reader presses play. The case below it is the full text alternative.
export default function CaseFilm({ slug, title, className = "" }: { slug: string; title: string; className?: string }) {
  const film = FILMS[slug];
  if (!film) return null;
  return (
    <figure className={`m-0 ${className}`}>
      <video
        controls
        playsInline
        preload="none"
        poster={`/films/${slug}.jpg`}
        width={1920}
        height={1080}
        className="block aspect-video w-full rounded-md bg-surface ring-1 ring-inset ring-black/[0.07] dark:ring-white/10"
        aria-label={`${title}, the short version. A silent film of ${film.seconds} seconds.`}
      >
        <source src={`/films/${slug}.mp4`} type="video/mp4" />
      </video>
      <figcaption className="mt-3 text-[14px] text-muted">
        The short version: {film.seconds} seconds, no sound. Everything in it is from the case study below.
      </figcaption>
    </figure>
  );
}
