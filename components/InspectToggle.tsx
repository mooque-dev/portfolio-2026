"use client";

import { INSPECT_EVENT } from "@/components/InspectMode";

// Footer switch for inspect mode. Hidden on touch screens, where there is no
// hover to inspect with.
export default function InspectToggle() {
  return (
    <button
      type="button"
      onClick={() => dispatchEvent(new Event(INSPECT_EVENT))}
      className="hidden [@media(hover:hover)]:inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors tracking-wide"
    >
      Inspect <kbd className="rounded border border-border px-1 text-[10.5px] leading-[1.4] font-sans">I</kbd>
    </button>
  );
}
