"use client";

import { useLayout, LayoutMode } from "./LayoutProvider";
import { useState } from "react";
import { motion } from "framer-motion";

const options: { value: LayoutMode; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "magazine", label: "Magazine" },
  { value: "bento", label: "Bento" },
  { value: "dense", label: "Dense" },
];

export default function ControlPanel() {
  const { layout, setLayout } = useLayout();
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center text-xs shadow-lg hover:scale-105 transition-transform"
        aria-label="Open layout switcher"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <rect x="1" y="1" width="5" height="5" rx="0.5" />
          <rect x="8" y="1" width="5" height="5" rx="0.5" />
          <rect x="1" y="8" width="5" height="5" rx="0.5" />
          <rect x="8" y="8" width="5" height="5" rx="0.5" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground rounded-2xl p-1.5 shadow-lg max-w-[calc(100vw-2rem)]"
      role="group"
      aria-label="Layout switcher"
    >
      <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
        {options.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setLayout(value)}
            aria-pressed={layout === value}
            className={`relative px-3 py-1.5 rounded-xl text-[11px] font-medium tracking-wide transition-colors min-h-[32px] whitespace-nowrap ${
              layout === value
                ? "text-foreground"
                : "text-background/50 hover:text-background"
            }`}
          >
            {layout === value && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-xl bg-background"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
        <button
          onClick={() => setCollapsed(true)}
          className="ml-0.5 px-1.5 py-1.5 min-h-[32px] text-background/30 hover:text-background/60 transition-colors shrink-0"
          aria-label="Collapse layout switcher"
        >
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M2 4l3 3 3-3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
