import Image from "next/image";
import Link from "next/link";

// The Google page's personal aside: the musical I was in, and the script
// reader I built for its company. The picture is the real public demo, with
// one part picked so that character's lines stay lit. The demo uses a short
// script written for it, not the production script. No company marks.
export default function CastTab() {
  return (
    <section aria-labelledby="ct-title" className="ct mt-20 md:mt-28">
      <div className="ct-text">
        <Image src="/stickers/stage-mic.png" alt="" width={72} height={72} className="ct-sticker" />
        <h2 id="ct-title">I also built the tools a forty-person musical ran on</h2>
        <p>
          This August I was on stage in an amateur musical: forty people, two languages, 350 tickets sold. For ten months the company ran its schedule, its Korean and English script, and its shared costs on tools I built, one annoyance at a time.
        </p>
        <p>
          The one the cast loved most was the script reader. Half the room rehearsed in Korean and half in English, so both scripts live in one place, and each actor picks their part to see their own lines light up. It was used daily through the run, and nobody was told to. <Link href="/work/torontoyuwol">Toronto Yuwol</Link>
        </p>
      </div>
      <figure className="ct-shot">
        <a href="https://torontoyuwol-brown.vercel.app/demo.html" target="_blank" rel="noopener noreferrer" aria-label="Try the script reader demo (opens in a new tab)">
          <Image src="/case-studies/torontoyuwol/script-reader.jpg" alt="The script reader with the part of Haru picked: Haru's lines are highlighted, every other line stays plain" width={1600} height={1093} sizes="(max-width: 899px) 92vw, 460px" />
        </a>
        <figcaption>One part picked, so its lines stay lit. A demo script written for the reader. <a href="https://torontoyuwol-brown.vercel.app/demo.html" target="_blank" rel="noopener noreferrer">Try it<span className="sr-only"> (opens in new tab)</span></a></figcaption>
      </figure>
    </section>
  );
}
