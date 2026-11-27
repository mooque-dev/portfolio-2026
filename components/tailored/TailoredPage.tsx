import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Statement } from "@/components/PaymentCard";
import Arrow from "@/components/Arrow";
import CurtainCall from "@/components/CurtainCall";
import { BUILT, CASES, COVERS, type CaseKey } from "@/lib/tailored";

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
  hero?: ReactNode;
  caption?: ReactNode;
  cases: CaseKey[];
  built?: keyof typeof BUILT;
  contact: ReactNode;
  /** Optional decoration drawn over the intro band (a grid, a cursor, a title block). */
  heroExtras?: ReactNode;
  /** Optional rows after the work list: what the role asks for, and the work that answers it. */
  fit?: { ask: string; proof: ReactNode }[];
  /** "cards" shows the work as picture cards; the default is the statement list. */
  work?: "list" | "cards";
  /** Optional section between the role-fit rows and the code paragraphs (a personal aside). */
  aside?: ReactNode;
  /** "curtain" ends the page on the curtain call from home; the default is the contact band. */
  close?: "band" | "curtain";
  /** Optional section headings in the page's own voice. Defaults keep the plain ones. */
  titles?: { work?: ReactNode; fit?: ReactNode };
  /** Hide the closing "built in code" paragraphs when the page already covers them. */
  hideBuilt?: boolean;
  /** Drop the curtain's playful line and replay button, leaving just the contact links. */
  plainClose?: boolean;
};

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";
const inline = "text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity";

export default function TailoredPage({ slug, company, style, className = "", label, headline, lede, hero, caption, cases, built = "default", contact, heroExtras, fit, work = "cards", aside, close = "band", titles, hideBuilt = false, plainClose = false }: TailoredPageProps) {
  const id = slug.replace(/[^a-z0-9]/g, "");
  return (
    <article style={style} className={`brand-page tp ${className} relative isolate overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="brand-hero">
          {heroExtras}
          <div>
            <div className={hero ? "tp-grid grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16" : "tp-grid max-w-3xl"}>
              <div className="min-w-0">
                {label ? <p className="sig-label">{label}</p> : null}
                <h1 className="tp-h1 tp-in text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">{headline}</h1>
                <p className="tp-in mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--tp-in": "90ms" } as CSSProperties}>{lede}</p>
                <div className="tp-in mt-8 flex flex-wrap gap-3" style={{ "--tp-in": "180ms" } as CSSProperties}>
                  <a href={`/allen-kang-resume-${slug}.pdf`} target="_blank" rel="noopener noreferrer" className={`${pill} brand-cta gap-1.5`}>
                    Résumé (PDF) <Arrow dir="up-right" />
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                  <a href={`#${id}-work`} className={`${pill} border border-border hover:border-foreground/40`}>
                    See the work
                  </a>
                </div>
              </div>
              {hero ? (
                <div className="min-w-0 sig-obj tp-in" style={{ "--tp-in": "140ms" } as CSSProperties}>
                  {hero}
                  {caption ? <p className="mt-3 text-[14px] text-muted">{caption}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <section id={`${id}-work`} aria-labelledby={`${id}-work-title`} className="scroll-mt-24 mt-20 md:mt-28">
          <h2 id={`${id}-work-title`} className="tp-h2 text-lg md:text-xl font-medium tracking-[-0.01em]">
            {titles?.work ?? "Selected work"}
          </h2>
          <div className="mt-6">
            {work === "cards" ? (
              <ul className="tp-cards m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {cases.map((k) => {
                  const c = CASES[k];
                  const cover = COVERS[k];
                  return (
                    <li key={k} className="min-w-0">
                      <Link href={c.href} className="tp-card group flex h-full flex-col">
                        {cover ? (
                          <span className="tp-card-img" style={{ background: cover.color }}>
                            <Image src={cover.src} alt="" fill sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 360px" style={{ objectFit: "cover" }} />
                          </span>
                        ) : null}
                        <span className="flex flex-1 flex-col gap-1.5 p-5">
                          <span className="tp-card-title">{c.title}</span>
                          <span className="text-[14px] leading-snug text-muted">{c.line}</span>
                          <span className="mt-auto flex items-end justify-between gap-3 pt-4">
                            <span className="text-[13px] leading-snug text-muted">
                              <span className="tp-card-val tabular-nums">{c.value}</span>
                              {c.note ? <> {c.note}</> : null}
                            </span>
                            <span aria-hidden className="tp-card-go">&rarr;</span>
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Statement lines={cases.map((k) => CASES[k])} />
            )}
            <p className="mt-4 text-[14px]">
              <Link href="/work" className={`text-muted ${link}`}>
                All work <Arrow />
              </Link>
            </p>
          </div>
        </section>

        {fit ? (
          <section aria-labelledby={`${id}-fit`} className="tp-fit mt-20 md:mt-28 max-w-3xl">
            <h2 id={`${id}-fit`} className="tp-h2 text-lg md:text-xl font-medium tracking-[-0.01em]">
              {titles?.fit ?? <>What the role asks, and where I&rsquo;ve done it</>}
            </h2>
            <dl className="mt-6 border-t border-border">
              {fit.map((f) => (
                <div key={f.ask} className="grid gap-1 border-b border-border py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
                  <dt className="text-[15px] font-medium">{f.ask}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted">{f.proof}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {aside}

        {hideBuilt ? null : <section aria-label="Built in code" className="mt-20 md:mt-28 grid max-w-2xl gap-5">
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
        </section>}

        {close === "curtain" ? (
          <CurtainCall title={contact} sub={plainClose ? null : "Thanks for staying to the end. Encore?"} encore={!plainClose} resumeHref={`/allen-kang-resume-${slug}.pdf`} titleClassName="" linkedin />
        ) : (
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
        )}
        <p className="tp-rv mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by {company}.</p>
      </div>
    </article>
  );
}
