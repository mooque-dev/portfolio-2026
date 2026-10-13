import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PaymentCard from "@/components/PaymentCard";
import FadeIn from "@/components/FadeIn";
import Arrow from "@/components/Arrow";
import FloatRoles from "@/components/FloatRoles";

// A tailored, unlisted view of the portfolio for Float's Senior Product
// Designer roles (Banking and Growth). Not in the sitemap, not in the nav,
// and kept out of search results on purpose. Same shape as /mastercard:
// a card, the work, a way to reach me. Float designs in code rather than in
// Figma, so the middle block points at things that run.
export const metadata: Metadata = {
  title: { absolute: "Allen Kang for Float" },
  description: "A short path through Allen Kang's work, ordered for Float's Banking and Growth design roles.",
  robots: { index: false, follow: false },
};

const BUILT: { label: string; text: string; links: { href: string; name: string; external?: boolean }[] }[] = [
  {
    label: "At work",
    text: "Fee Opt-In was prototyped in Cursor and MagicPatterns, so PMs and engineers could change the logic and watch it. The rebuilt checkout runs on phone, tablet and desktop.",
    links: [{ href: "/work/fee-opt-in-experimentation#try", name: "Play with the checkout" }],
  },
  {
    label: "On my own",
    text: "ARND, a React Native app for Toronto's small live shows, designed and built from the database to App Store prep. In public beta.",
    links: [
      { href: "https://arnd.app", name: "arnd.app", external: true },
      { href: "/work/arnd", name: "The case" },
    ],
  },
  {
    label: "Working rebuilds",
    text: "Two case studies rebuilt as software instead of screenshots: a contact record that shipped at Keela, and cancer-care dashboards you can filter and click.",
    links: [
      { href: "/case/keela-contacts/index.html", name: "Keela Contacts" },
      { href: "/case/care-pathway/index.html", name: "MyJourney" },
    ],
  },
];

const OWN = [
  { slug: "forkestrate", name: "Forkestrate" },
  { slug: "arnd", name: "ARND" },
  { slug: "torontoyuwol", name: "Toronto Yuwol" },
];

const pill = "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition";
const link = "inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-70 transition-opacity";

function Block({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 mt-24 md:mt-32">
      <p className="microlabel text-muted">{label}</p>
      <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function FloatPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div className="min-w-0">
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                Making business money simple to move and easy to trust.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I&rsquo;m Allen, a senior product designer in Toronto. Eight years designing, the last five on
                payments, and I prototype in code when a mock can&rsquo;t answer the question.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/allen-kang-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${pill} gap-1.5 border border-border hover:border-foreground/40`}
                >
                  Résumé (PDF) <Arrow dir="up-right" />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                <a href="#fl-work" className={`${pill} border border-border hover:border-foreground/40`}>
                  See the work
                </a>
              </div>
            </div>
            <div className="min-w-0 max-w-[400px]">
              <PaymentCard preparedFor="Float" circles={false} />
            </div>
          </div>
        </FadeIn>

        <Block id="fl-work" label="The work" title="Two teams are hiring. Here's the work for each.">
          <FloatRoles />
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted">
            <span>Built on my own:</span>
            {OWN.map((o, i) => (
              <span key={o.slug}>
                <Link href={`/work/${o.slug}`} className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  {o.name}
                </Link>
                {i < OWN.length - 1 ? "," : ""}
              </span>
            ))}
            <span aria-hidden>·</span>
            <Link href="/work" className={`text-foreground ${link}`}>
              All work <Arrow />
            </Link>
          </p>
        </Block>

        <Block id="fl-code" label="Designing in code" title="You design on the real codebase. Most of what I'd show you already runs.">
          <ul className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
            {BUILT.map((b) => (
              <li key={b.label} className="flex flex-col border-t border-foreground/80 pt-5">
                <p className="microlabel text-muted">{b.label}</p>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed">{b.text}</p>
                <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {b.links.map((l) =>
                    l.external ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                        {l.name} <Arrow dir="up-right" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className={link}>
                        {l.name} <Arrow />
                      </Link>
                    )
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <section
          aria-labelledby="fl-contact"
          className="mt-24 md:mt-32 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <h2 id="fl-contact" className="max-w-xl text-2xl md:text-3xl font-semibold leading-snug tracking-[-0.015em] text-balance">
            I&rsquo;d like to help more Canadian businesses run on Float.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:allensmkang@gmail.com" className={`${pill} bg-foreground text-background hover:opacity-80`}>
              allensmkang@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mooque/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${pill} border border-border hover:border-foreground/40`}
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
        <p className="mt-10 text-xs text-muted">An independent portfolio page. Not affiliated with or endorsed by Float.</p>
      </div>
    </article>
  );
}
