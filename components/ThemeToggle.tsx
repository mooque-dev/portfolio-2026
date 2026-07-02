"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  // The head script already applied the right class before hydration, so the
  // DOM is the source of truth for the initial value; the override state
  // takes over once the visitor toggles.
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

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-foreground/[0.06] transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <circle cx="8" cy="8" r="3.5" />
              <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M13.5 9.2A5.5 5.5 0 1 1 6.8 2.5 4.5 4.5 0 0 0 13.5 9.2Z" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
