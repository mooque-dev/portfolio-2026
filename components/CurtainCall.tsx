"use client";

import { useEffect, useRef, useState } from "react";

// The last screen of home. The curtains close once when it scrolls into
// view, and the bow is on the curtain. Server-rendered closed, so without
// JavaScript, or with reduced motion, it is simply the end state.
export default function CurtainCall() {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"closed" | "open">("closed");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("open");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("closed");
        io.disconnect();
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const encore = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("open");
    setTimeout(() => setState("closed"), 700);
  };

  return (
    <section ref={ref} aria-label="Curtain call" className={`curtain-call mt-24 ${state === "closed" ? "is-closed" : ""}`}>
      <div className="cc-stage" aria-hidden />
      <div className="cc-drape cc-left" aria-hidden />
      <div className="cc-drape cc-right" aria-hidden />
      <div className="cc-valance" aria-hidden />
      <div className="cc-bow">
        <p className="cc-title font-serif">That&rsquo;s the show.</p>
        <p className="cc-sub">Thanks for staying to the end. Encore?</p>
        <div className="cc-actions">
          <a href="mailto:allensmkang@gmail.com">allensmkang@gmail.com</a>
          <a href="/allen-kang-resume.pdf">Résumé (PDF)</a>
          <button type="button" onClick={encore}>Play it again</button>
        </div>
      </div>
    </section>
  );
}
