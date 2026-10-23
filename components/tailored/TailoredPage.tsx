import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Statement } from "@/components/PaymentCard";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";
import { BUILT, CASES, type CaseKey } from "@/lib/tailored";

// The frame every tailored page is built on. A page only supplies what is
// specific to the company: its colours (style), fonts and theme (className),
// the headline and intro, the opening object, the order of the projects and
// the closing line. The layout, the bands, the work list, the code
// paragraphs and the contact block live here, so a fix here fixes them all.
export type TailoredPageProps = {
  slug: string;
  company: string;
  style: CSSProperties;
  className?: string;
  label?: string;
  headline: ReactNode;
  lede: ReactNode;
  hero: ReactNode;
  caption?: ReactNode;
  cases: CaseKey[];
  built?: keyof typeof BUILT;
  contact: ReactNode;
  /** Optional decoration drawn over the intro band (a grid, a cursor, a title block). */
  heroExtras?: ReactNode;
};

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";
const inline = "text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity";

export default function TailoredPage({ slug, company, style, className = "", label, headline, lede, hero, caption, cases, built = "default", contact, heroExtras }: TailoredPageProps) {
  const id = slug.replace(/[^a-z0-9]/g, "");
  return (
    <article style={style} className={`brand-page tp ${className} relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="brand-hero">
          {heroExtras}
          <FadeIn>
            <div className="tp-grid grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
              <div className="min-w-0">
                {label ? <p className="sig-label">{label}</p> : null}
                <h1 className="tp-h1 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">{headline}</h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{lede}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`/allen-kang-resume-${slug}.pdf`} target="_blank" rel="noopener noreferrer" className={`${pill} brand-cta gap-1.5`}>
                    Résumé (PDF) <Arrow dir="up-right" />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                  <a href={`#${id}-work`} className={`${pill} border border-border hover:border-foreground/40`}>
                    See the work
                  </a>
                </div>
              </div>
              <div className="min-w-0 sig-obj">
                {hero}
                {caption ? <p className="mt-3 text-[14px] text-muted">{caption}</p> : null}
              </div>
            </div>
          </FadeIn>
        </div>

        <section id={`${id}-work`} aria-labelledby={`${id}-work-title`} className="scroll-mt-24 mt-20 md:mt-28">
          <h2 id={`${id}-work-title`} className="text-lg md:text-xl font-medium tracking-[-0.01em]">
            Selected work
          </h2>
          <div className="mt-6">
            <Statement lines={cases.map((k) => CASES[k])} />
            <p className="mt-4 text-[14px]">
              <Link href="/work" className={`text-muted ${link}`}>
                All work <Arrow />
              </Link>
            </p>
          </div>
        </section>

        <section aria-label="Built in code" className="mt-20 md:mt-28 grid max-w-2xl gap-5">
          {BUILT[built].map((b) => (
            <p key={b.text} className="text-[16px] leading-relaxed text-muted">
              {b.text}{" "}
              {b.links.map((l, i) => (
                <span key={l.href}>
                  {i ? " · " : ""}
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={inline}>
                      {l.name}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className={inline}>
                      {l.name}
                    </Link>
                  )}
                </span>
              ))}
            </p>
          ))}
        </section>

        <section
          aria-labelledby={`${id}-contact`}
          className="brand-foot mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id={`${id}-contact`} className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            {contact}
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} brand-cta`}>
              allensmkang@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/mooque/" target="_blank" rel="noopener noreferrer" className={`${pill} border border-border hover:border-foreground/40`}>
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by {company}.</p>
      </div>
    </article>
  );
}
