"use client";

import { useState } from "react";
import Arrow from "@/components/Arrow";

// The Goldito design site, played inside the case. Both sites live on
// mooque-dev.github.io, so each piece runs live in a frame. Only the chosen
// tab loads, so the case stays light; each says honestly whether it shipped.
const BASE = "https://mooque-dev.github.io/goldito-design/";

const PIECES = [
  {
    key: "tamagotchi",
    label: "Tamagotchi",
    file: "pawnote-concept-b-full-tamagotchi.html",
    status: "In the app as the pet room",
    note: "My first concept, on Oct 7: the whole app takes its colors from the pet's photo, and care plays like a tiny game. Minsik built the pet room from it in #261.",
  },
  {
    key: "pet-maker",
    label: "Pet maker",
    file: "pet-maker.html",
    status: "Shipped in #401",
    note: "Paste a photo or pick a breed and get a pixel pet you can tune: 37 dogs, 37 cats, 11 expressions. The same generator now draws every pet in the app.",
  },
  {
    key: "paw-drawer",
    label: "Paw drawer",
    file: "paw-drawer.html",
    status: "Idea",
    note: "Tap ≡ in the phone and a paw pulls the menu in. Four timings to compare, a slow-motion view, and a still version for Reduce motion.",
  },
  {
    key: "delights",
    label: "Little delights",
    file: "delights.html",
    status: "Proposal for after the freeze",
    note: "Every micro-interaction in one library: paw walks for welcome, loading and progress, rewards and hints. Each is calm by default and has a still version.",
  },
  {
    key: "prototype",
    label: "Prototype",
    file: "prototype.html",
    status: "Design target",
    note: "The Draft: every screen of the app next to the design it's heading toward, with notes.",
  },
  {
    key: "brand",
    label: "Brand",
    file: "brand.html",
    status: "Logo in the app",
    note: "The gold coin logo, icons, colors and type, and the rules for when things go wrong.",
  },
] as const;

export default function GolditoPlay() {
  const [key, setKey] = useState<(typeof PIECES)[number]["key"]>("tamagotchi");
  const piece = PIECES.find((p) => p.key === key)!;
  const url = BASE + piece.file;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pieces of the Goldito design site">
        {PIECES.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            id={`gp-tab-${p.key}`}
            aria-selected={key === p.key}
            aria-controls="gp-panel"
            onClick={() => setKey(p.key)}
            className={`rounded-full border px-3.5 py-1.5 text-[14px] font-medium transition-colors ${
              key === p.key ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div id="gp-panel" role="tabpanel" aria-labelledby={`gp-tab-${key}`} className="mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="m-0 max-w-[62ch] text-[15px] leading-relaxed">
            <span className="mr-2 inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[12.5px] font-medium text-muted">
              {piece.status}
            </span>
            {piece.note}
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[14px] font-medium">
            <span className="underline underline-offset-4">Open full page</span> <Arrow dir="up-right" />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-[#e9e7e2]">
          <iframe
            key={key}
            src={url}
            title={`Goldito design site: ${piece.label}`}
            loading="lazy"
            className="block h-[640px] w-full border-0 md:h-[820px]"
          />
        </div>
        <p className="mt-2 text-[13px] text-muted">Live from the Goldito design site. Everything in it is demo data.</p>
      </div>
    </div>
  );
}
