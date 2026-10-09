import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

// The site's one arrow: a drawn icon with a real arrowhead, sized to the
// text around it, instead of the thin text glyphs (← → ↑ ↗).
const ICONS = { left: ArrowLeft, right: ArrowRight, up: ArrowUp, "up-right": ArrowUpRight };

export default function Arrow({
  dir = "right",
  className = "",
}: {
  dir?: keyof typeof ICONS;
  className?: string;
}) {
  const Icon = ICONS[dir];
  return (
    <Icon
      aria-hidden
      strokeWidth={2.25}
      className={`inline-block h-[0.95em] w-[0.95em] shrink-0 align-[-0.13em] ${className}`}
    />
  );
}
