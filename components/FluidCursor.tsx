"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const RING = 28;
const DOT  = 4;
const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [role="link"]';

export default function FluidCursor() {
  const mx      = useMotionValue(-200);
  const my      = useMotionValue(-200);
  const opacity = useMotionValue(0);
  const scale   = useMotionValue(1);

  // Critically-damped: ratio = damping / (2 * sqrt(stiffness * mass)) = 28/(2*√196) = 1.0
  // Higher stiffness = ring follows closer; ratio still 1.0 so no overshoot
  const sx = useSpring(mx,    { stiffness: 300, damping: 35, mass: 1 });
  const sy = useSpring(my,    { stiffness: 300, damping: 35, mass: 1 });
  const ss = useSpring(scale, { stiffness: 280, damping: 28 });

  const ringX = useTransform(sx, v => v - RING / 2);
  const ringY = useTransform(sy, v => v - RING / 2);
  const dotX  = useTransform(mx, v => v - DOT  / 2);
  const dotY  = useTransform(my, v => v - DOT  / 2);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    html.classList.add("fluid-cursor");

    // Event delegation, one listener, no stacking, no MutationObserver needed
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      opacity.set(1);
      const isInteractive = !!(e.target as Element)?.closest(INTERACTIVE);
      scale.set(isInteractive ? 2.0 : 1);
    };

    // Hide when mouse exits the browser window
    const onLeave = () => { opacity.set(0); scale.set(1); };

    window.addEventListener("mousemove", onMove, { passive: true });
    html.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      html.removeEventListener("mouseleave", onLeave);
      html.classList.remove("fluid-cursor");
    };
  }, [mx, my, opacity, scale]);

  return (
    <>
      {/* Trailing ring, springs behind the pointer */}
      <motion.div
        style={{ x: ringX, y: ringY, scale: ss, opacity }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full
                   border border-foreground/25"
        aria-hidden="true"
      >
        <div style={{ width: RING, height: RING }} />
      </motion.div>

      {/* Dot, tracks cursor precisely, no spring */}
      <motion.div
        style={{ x: dotX, y: dotY, opacity }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-foreground"
        aria-hidden="true"
      >
        <div style={{ width: DOT, height: DOT }} />
      </motion.div>
    </>
  );
}
