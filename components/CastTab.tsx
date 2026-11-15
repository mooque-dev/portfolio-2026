"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// The Google page's personal aside: the musical I was in, and the bill
// splitter I built for its company. The toy on the right splits one sample
// bill between a cast you can grow to forty; the people who cover the
// leftover cents light up. Sample amounts, labelled as such. No company marks.
const TOTAL = 48650; // cents
const MIN = 2;
const MAX = 40;
const money = (c: number) => `$${(c / 100).toFixed(2)}`;

export default function CastTab() {
  const [n, setN] = useState(12);
  const base = Math.floor(TOTAL / n);
  const extra = TOTAL - base * n;
  const set = (v: number) => setN(Math.min(MAX, Math.max(MIN, v)));

  return (
    <section aria-labelledby="ct-title" className="ct mt-20 md:mt-28">
      <div className="ct-text">
        <Image src="/stickers/stage-mic.png" alt="" width={72} height={72} className="ct-sticker" />
        <h2 id="ct-title">I also split bills for a forty-person musical</h2>
        <p>
          This August I was on stage in an amateur musical: forty people, two languages, 350 tickets sold. For ten months the company ran its schedule, its Korean and English script, and its shared costs on tools I built, one annoyance at a time.
        </p>
        <p>
          The bill splitter is the smallest of them and the one I&rsquo;d show a payments team first. Nobody mandated it. People used it because it kept the math out of the group chat. <Link href="/work/torontoyuwol">Toronto Yuwol</Link>
        </p>
      </div>
      <div className="ct-toy">
        <div className="ct-bill">
          <span>Dinner after rehearsal</span>
          <b>{money(TOTAL)}</b>
        </div>
        <div className="ct-step">
          <button type="button" onClick={() => set(n - 1)} disabled={n <= MIN} aria-label="One fewer person">&minus;</button>
          <p aria-live="polite"><b>{n}</b> people</p>
          <button type="button" onClick={() => set(n + 1)} disabled={n >= MAX} aria-label="One more person">+</button>
          <button type="button" className="ct-all" onClick={() => set(MAX)} disabled={n >= MAX}>Whole cast</button>
        </div>
        <div className="ct-dots" aria-hidden>
          {Array.from({ length: n }, (_, i) => (
            <i key={i} className={i < extra ? "x" : ""} />
          ))}
        </div>
        <p className="ct-each" aria-live="polite">
          <b>{money(base)}</b> each
          {extra > 0 ? (
            <span>, and {extra} {extra === 1 ? "person covers" : "people cover"} one more cent so the total adds up.</span>
          ) : (
            <span>, to the cent.</span>
          )}
        </p>
        <p className="ct-note">A sample bill, to show the idea. The leftover cents have to land somewhere.</p>
      </div>
    </section>
  );
}
