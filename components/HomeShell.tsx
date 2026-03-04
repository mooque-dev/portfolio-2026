"use client";

import { LayoutProvider } from "./LayoutProvider";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ControlPanel = dynamic(() => import("./ControlPanel"), { ssr: false });

export default function HomeShell({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      {children}
      <ControlPanel />
    </LayoutProvider>
  );
}
