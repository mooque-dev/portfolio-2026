"use client";

/**
 * Magnetic: wraps any element and pulls it toward the cursor when the cursor
 * passes within `radius` pixels of its centre.
 *
 * strength × distance × (1 - dist/radius) gives the offset, so the pull peaks
 * around radius/2 and falls to zero at the edge, like surface tension.
 *
 * Implemented with a small requestAnimationFrame lerp instead of a motion
 * library, so it adds no framer-motion weight to the pages that use it (the
 * work grid). No effect on touch or reduced-motion devices.
 *
 * Usage:
 *   <Magnetic strength={0.35} radius={90}>
 *     <button>Click me</button>
 *   </Magnetic>
 */

import { useRef, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  strength?: number; // how far the element travels (higher = more)
  radius?: number; // influence radius in px
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No effect on touch-only or reduced-motion devices.
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      if (Math.abs(targetX - curX) < 0.1 && Math.abs(targetY - curY) < 0.1) {
        curX = targetX;
        curY = targetY;
        el.style.transform =
          curX === 0 && curY === 0 ? "" : `translate(${curX}px, ${curY}px)`;
        running = false;
        return;
      }
      el.style.transform = `translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        targetX = dx * pull;
        targetY = dy * pull;
      } else {
        targetX = 0;
        targetY = 0;
      }
      ensureRunning();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [radius, strength]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
