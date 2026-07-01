import { CSSProperties, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

// CSS-first reveal. The animation is plain CSS (see .fi in globals.css), so
// content is visible and animating as soon as styles load: no hydration wait,
// no blank first paint. Reduced motion is handled by a media query.
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
}: FadeInProps) {
  return (
    <div
      className={`fi fi-${direction} ${className}`}
      style={
        {
          "--fi-delay": `${delay}s`,
          "--fi-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
