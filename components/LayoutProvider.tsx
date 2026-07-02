"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type LayoutMode = "reader" | "gallery" | "index";

const ALL_MODES: LayoutMode[] = ["reader", "gallery", "index"];

// Maps retired/old stored values to their current equivalent so returning
// visitors keep a sensible layout after the rename.
const LEGACY_MODES: Record<string, LayoutMode> = {
  minimal: "reader",
  editorial: "reader",
  magazine: "gallery",
  bento: "gallery",
  dense: "index",
};

function normalizeMode(value: string | null | undefined): LayoutMode | null {
  if (!value) return null;
  if ((ALL_MODES as string[]).includes(value)) return value as LayoutMode;
  return LEGACY_MODES[value] ?? null;
}

interface LayoutContextValue {
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  layout: "reader",
  setLayout: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

// The head script copies localStorage onto <html data-layout> before
// hydration; localStorage is the fallback for the rare case it didn't run.
function getInitialLayout(): LayoutMode {
  if (typeof document === "undefined") return "reader";
  return (
    normalizeMode(document.documentElement.dataset.layout) ??
    normalizeMode(localStorage.getItem("layout")) ??
    "reader"
  );
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>(getInitialLayout);

  function setLayout(mode: LayoutMode) {
    setLayoutState(mode);
    localStorage.setItem("layout", mode);
    document.documentElement.dataset.layout = mode;
  }

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
