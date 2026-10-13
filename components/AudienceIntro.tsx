"use client";

import { useState } from "react";

// The home intro, said differently for whoever is reading. Every line is
// built from the case studies; nothing here is new information.
const AUDIENCES = [
  {
    key: "anyone",
    label: "For anyone",
    text: "I design the parts of software where money and records have to be right.",
  },
  {
    key: "recruiters",
    label: "Recruiters",
    text: "Senior product designer, eight years in, five on payments. Most recently at Aplos, now Velora. Open to senior and staff roles.",
  },
  {
    key: "design",
    label: "Design leads",
    text: "I learn a field from the people in it, then make the risky moment feel boring. I also grew a design system three teams chose to use.",
  },
  {
    key: "product",
    label: "Product managers",
    text: "I'll pause a win if the data hides a leak, write the hypothesis with you, and fill the PM seat when it's empty.",
  },
  {
    key: "engineering",
    label: "Engineers",
    text: "I draw the system map in week one, prototype in code when a mock can't answer the question, and ship my own apps end to end.",
  },
] as const;

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
        className={`mt-5 leading-[1.06] font-medium tracking-[-0.035em] text-balance ${
          current.text.length > 80
            ? "text-[30px] md:text-[52px] max-w-[24ch]"
            : "text-[40px] md:text-[76px] max-w-[17ch]"
        }`}
      >
        {current.text}
      </h1>
    </div>
  );
}
