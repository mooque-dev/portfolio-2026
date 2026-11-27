import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

// Content used to fade and slide in here. It now just shows: the page is
// there when it loads. The wrapper stays so every caller keeps its layout.
export default function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={className || undefined}>{children}</div>;
}
