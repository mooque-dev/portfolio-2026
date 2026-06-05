"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const RING = 28; // outer ring diameter px
const DOT  = 5;  // inner dot diameter px

export default function FluidCursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const opacity = useMotionValue(0);
  const hoverScale = useMotionValue(1);

  // Spring-lagged ring — the "water trailing" effect
  const sx = useSpring(mx, { stiffness: 130, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 130, damping: 18, mass: 0.9 });
  const ss = useSpring(hoverScale, { stiffness: 220, damping: 18 });

  // Offset so the centre of each element tracks the pointer
  const ringX = useTransform(sx, v => v - RING / 2);
  const ringY = useTransform(sy, v => v - RING / 2);
  const dotX  = useTransform(mx, v => v - DOT  / 2);
  const dotY  = useTransform(my, v => v - DOT  / 2);

  useEffect(() => {
    // Don't activate on touch-only or reduced-motion devices
    const noHover   = !window.matchMedia("(hover: hover)").matches;
    const noMotion  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || noMotion) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      opacity.set(1);
    };

    const onEnter = () => hoverScale.set(2.8);
    const onLeave = () => hoverScale.set(1);

    window.addEventListener("mousemove", onMove);

    // Attach to all interactive elements already in the DOM
    function attachMagnetic() {
      document
        .querySelectorAll("a, button, input, textarea, [role='button']")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    }
    attachMagnetic();

    // Re-attach when the DOM changes (SPA navigation, dynamic content)
    const obs = new MutationObserver(attachMagnetic);
    obs.observe(document.body, { childList: true, subtree: true });

    // Hide the system cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
      document.body.style.cursor = "";
    };
  }, [mx, my, opacity, hoverScale]);

  return (
    <>
      {/* Trailing ring — springs behind the dot */}
      <motion.div
        style={{ x: ringX, y: ringY, scale: ss, opacity }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]
                   rounded-full border border-foreground/35"
        aria-hidden="true"
        role="presentation"
        // physical size sits on the element so scale looks right
        initial={false}
      >
        <div style={{ width: RING, height: RING }} />
      </motion.div>

      {/* Immediate dot — zero lag */}
      <motion.div
        style={{ x: dotX, y: dotY, opacity }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]
                   rounded-full bg-foreground"
        aria-hidden="true"
        role="presentation"
        initial={false}
      >
        <div style={{ width: DOT, height: DOT }} />
      </motion.div>
    </>
  );
}
