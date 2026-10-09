"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// 묵 means ink, and a seal is how a Korean document gets signed off. A reader
// who reaches the end of a case gets it stamped once. If the end is already
// on screen, or motion is reduced, the seal is simply there.
export default function CaseSeal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add("seal-wait");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("seal-on");
        io.disconnect();
      },
      { threshold: 0.8 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="case-seal mt-16 flex items-center gap-4">
      <Image src="/stickers/seal.png" alt="" width={52} height={52} className="seal-mark h-[52px] w-[52px] [image-rendering:pixelated]" />
      <p className="m-0 text-[15px] font-medium text-[var(--seal)]">Thanks for reading.</p>
    </div>
  );
}
