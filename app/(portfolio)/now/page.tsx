import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { nowSnapshots } from "@/lib/now";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Allen Kang is doing now, and every snapshot before it. The history stays readable on purpose.",
};

export default function NowPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Now
            </h1>
            <p className="mt-4 text-lg text-muted max-w-xl leading-relaxed">
              What I&apos;m doing at the moment. Old snapshots never get
              deleted, so scroll down and you can watch the path, not just the
              position.
            </p>
          </FadeIn>

          <div className="mt-16 space-y-14">
            {nowSnapshots.map((snap, i) => (
              <FadeIn key={snap.date} delay={Math.min(i * 0.06, 0.24)}>
                <div className={i === 0 ? "" : "opacity-70"}>
                  <p className="text-xs tracking-[0.14em] uppercase text-muted mb-4">
                    {i === 0 ? "Currently" : formatDate(snap.date)}
                    {i === 0 && (
                      <span className="ml-2 normal-case tracking-normal">
                        &middot; {formatDate(snap.date)}
                      </span>
                    )}
                  </p>
                  <ul className="space-y-2">
                    {snap.items.map((item) => (
                      <li key={item.text} className="text-[17px] leading-relaxed">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="underline underline-offset-4 decoration-border hover:opacity-70 transition-opacity"
                          >
                            {item.text}
                          </Link>
                        ) : (
                          item.text
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-16 text-sm text-muted leading-relaxed">
              Part of the <Link href="/vault" className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors">vault</Link>.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
