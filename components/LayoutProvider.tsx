"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type LayoutMode =
  | "editorial"
  | "index"
  | "magazine"
  | "minimal"
  | "bento"
  | "timeline"
  | "dense";

const ALL_MODES: LayoutMode[] = [
  "editorial",
  "index",
  "magazine",
  "minimal",
  "bento",
  "timeline",
  "dense",
];

interface LayoutContextValue {
  layout: LayoutMode;
  setLayout: (mode: LayoutMode) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  layout: "editorial",
  setLayout: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

function getInitialLayout(): LayoutMode {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.dataset.layout as LayoutMode | undefined;
    if (attr && ALL_MODES.includes(attr)) return attr;
  }
  return "editorial";
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutMode>(getInitialLayout);

  useEffect(() => {
    const stored = localStorage.getItem("layout") as LayoutMode | null;
    if (stored && ALL_MODES.includes(stored) && stored !== layout) {
      setLayoutState(stored);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
