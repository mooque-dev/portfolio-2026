"use client";

import { useState } from "react";

// The home intro, said differently for whoever is reading. Every line is
// built from the case studies; nothing here is new information.
const AUDIENCES = [
  {
    key: "anyone",
    pen: "really work",
    label: "For anyone",
    text: "I learn how people really work, then design software they can rely on.",
  },
  {
    key: "recruiters",
    pen: "eight years in",
    label: "Recruiters",
    text: "Senior product designer, eight years in: CRM, payments, healthcare and design systems. Most recently at Aplos, now Velora.",
  },
  {
    key: "design",
    pen: "feel boring",
    label: "Design leads",
    text: "I learn a field from the people in it, then make the risky moment feel boring. I also grew a design system four engineering teams now use.",
  },
  {
    key: "product",
    pen: "pause a win",
    label: "Product managers",
    text: "I'll pause a win if the data hides a leak, write the hypothesis with you, and fill the PM seat when it's empty.",
  },
  {
    key: "engineering",
    pen: "prototype in code",
    label: "Engineers",
    text: "I draw the system map in week one, prototype in code when a mock can't answer the question, and ship my own apps end to end.",
  },
] as const;

// One phrase per line gets the red pen, the same swipe the case studies use.
function Penned({ text, phrase }: { text: string; phrase: string }) {
  const i = text.indexOf(phrase);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="pen-home">
        {phrase}
        <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M1 5.6 C 28 4.6, 71 6, 99 4.8" />
        </svg>
      </span>
      {text.slice(i + phrase.length)}
    </>
  );
}

export default function AudienceIntro() {
  const [active, setActive] = useState<(typeof AUDIENCES)[number]["key"]>("anyone");
  const current = AUDIENCES.find((a) => a.key === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Who is reading">
        {AUDIENCES.map((a) => (
          <button
            key={a.key}
            type="button"
            aria-pressed={active === a.key}
            onClick={() => setActive(a.key)}
            className={`text-[15px] md:text-[17px] transition-colors ${
              active === a.key ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>
      <h1
        aria-live="polite"
        className={`mt-5 font-serif leading-[1.06] font-semibold tracking-[-0.02em] text-balance ${
          current.text.length > 80
            ? "text-[30px] md:text-[52px] max-w-[24ch]"
            : "text-[40px] md:text-[76px] max-w-[20ch]"
        }`}
      >
        <Penned text={current.text} phrase={current.pen} />
      </h1>
    </div>
  );
}
