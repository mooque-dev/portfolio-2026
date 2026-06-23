"use client";

import { useLayout, LayoutMode } from "./LayoutProvider";
import { motion } from "framer-motion";

const options: { value: LayoutMode; label: string; icon: React.ReactNode }[] = [
  {
    value: "reader",
    label: "Reader",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true" focusable="false">
        <rect x="1" y="2.5" width="13" height="1.5" rx="0.5" />
        <rect x="1" y="6" width="13" height="1.5" rx="0.5" />
        <rect x="1" y="9.5" width="9" height="1.5" rx="0.5" />
      </svg>
    ),
  },
  {
    value: "gallery",
    label: "Gallery",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="5.5" height="5.5" rx="0.5" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="0.5" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="0.5" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.5" />
      </svg>
    ),
  },
  {
    value: "index",
    label: "Index",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true" focusable="false">
        <rect x="1" y="2" width="13" height="1.5" rx="0.5" />
        <rect x="1" y="5" width="13" height="1.5" rx="0.5" />
        <rect x="1" y="8" width="13" height="1.5" rx="0.5" />
        <rect x="1" y="11" width="13" height="1.5" rx="0.5" />
      </svg>
    ),
  },
];

export default function LayoutToggle() {
  const { layout, setLayout } = useLayout();

  return (
    <div
      className="flex items-center gap-0.5"
      role="group"
      aria-label="Homepage layout"
    >
      {options.map(({ value, label, icon }) => {
        const active = layout === value;
        return (
          <button
            key={value}
            onClick={() => setLayout(value)}
            aria-pressed={active}
            title={label}
            className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              active
                ? "text-foreground"
                : "text-muted/40 hover:text-muted hover:bg-foreground/[0.06]"
            }`}
          >
            {active && (
              <motion.span
                layoutId="layout-toggle-bg"
                className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{icon}</span>
          </button>
        );
      })}
    </div>
  );
}
