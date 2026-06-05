"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const RING = 28;
const DOT  = 5;

export default function FluidCursor() {
  const mx          = useMotionValue(-200);
  const my          = useMotionValue(-200);
  const opacity     = useMotionValue(0);
  const hoverScale  = useMotionValue(1);

  // The ring springs behind the raw pointer — this lag is the "water" feel
  const sx = useSpring(mx, { stiffness: 130, damping: 18, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 130, damping: 18, mass: 0.9 });
  const ss = useSpring(hoverScale, { stiffness: 220, damping: 18 });

  // Centre the elements on the pointer
  const ringX = useTransform(sx, v => v - RING / 2);
  const ringY = useTransform(sy, v => v - RING / 2);
  const dotX  = useTransform(mx, v => v - DOT  / 2);
  const dotY  = useTransform(my, v => v - DOT  / 2);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      opacity.set(1);
    };

    const onEnter = () => hoverScale.set(2.8);
    const onLeave = () => hoverScale.set(1);

    window.addEventListener("mousemove", onMove, { passive: true });

    function attachHover() {
      document
        .querySelectorAll("a, button, input, textarea, [role='button'], select, label")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    }
    attachHover();

    // Re-attach when the DOM changes (route transitions, dynamic content)
    const obs = new MutationObserver(attachHover);
    obs.observe(document.body, { childList: true, subtree: true });

    html.classList.add("fluid-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
      html.classList.remove("fluid-cursor");
    };
  }, [mx, my, opacity, hoverScale]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY, scale: ss, opacity }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full
                   border border-foreground/35"
        aria-hidden="true"
      >
        <div style={{ width: RING, height: RING }} />
      </motion.div>

      {/* Immediate dot */}
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
