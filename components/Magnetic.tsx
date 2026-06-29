"use client";

/**
 * Magnetic: wraps any element and pulls it toward the cursor when
 * the cursor passes within `radius` pixels of its centre.
 *
 * Strength × distance × (1 - dist/radius) gives the offset, so the
 * pull peaks at radius/2 and falls to zero at the edge, like a water
 * surface tension gradient.
 *
 * Usage:
 *   <Magnetic strength={0.35} radius={90}>
 *     <button>Click me</button>
 *   </Magnetic>
 */

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  strength?: number;   // how far the element travels (higher = more)
  radius?: number;     // influence radius in px
  className?: string;
  style?: CSSProperties;
}

export default function Magnetic({
  children,
  strength = 0.3,
  radius = 100,
  className,
  style,
}: Props) {
  const ref   = useRef<HTMLDivElement>(null);
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const x     = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.7 });
  const y     = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.7 });

  useEffect(() => {
    // No effect on touch-only or reduced-motion devices
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        rawX.set(dx * pull);
        rawY.set(dy * pull);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [radius, strength, rawX, rawY]);

  return (
    <motion.div ref={ref} style={{ x, y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
