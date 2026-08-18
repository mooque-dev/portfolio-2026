"use client";

import { useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const SUN = (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="3.5" />
    <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
  </svg>
);

const MOON = (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M13.5 9.2A5.5 5.5 0 1 1 6.8 2.5 4.5 4.5 0 0 0 13.5 9.2Z" />
  </svg>
);

export default function ThemeToggle() {
  // The head script already applied the right class before hydration, so the
  // DOM is the source of truth for the initial value; the override state takes
  // over once the visitor toggles.
  const domDark = useSyncExternalStore(
    emptySubscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const dark = override ?? domDark;

  function toggle() {
    const next = !dark;
    setOverride(next);
    document.documentElement.classList.toggle("dark", next);
    sessionStorage.setItem("themeOverride", next ? "dark" : "light");
  }

  // Both icons stay in the DOM and crossfade with a CSS transition (rotate +
  // scale + opacity), so the swap needs no motion library. The reduced-motion
  // reset in globals.css collapses the transition for anyone who asks.
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="relative w-11 h-11 flex items-center justify-center rounded-full hover:bg-foreground/[0.06] transition-colors overflow-hidden"
    >
      <span
        className={`absolute flex transition-all duration-200 ease-out ${
          dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"
        }`}
      >
        {SUN}
      </span>
      <span
        className={`absolute flex transition-all duration-200 ease-out ${
          dark ? "opacity-0 rotate-45 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        {MOON}
      </span>
    </button>
  );
}
