"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// The last screen of home. The curtains close once when it scrolls into
// view, and the bow is on the curtain. Server-rendered closed, so without
// JavaScript, or with reduced motion, it is simply the end state.
// A tailored page can close on it too, with its own line and résumé.
type Props = { title?: ReactNode; sub?: ReactNode; resumeHref?: string; titleClassName?: string; linkedin?: boolean; encore?: boolean };

export default function CurtainCall({ title = <>That&rsquo;s the show.</>, sub = "Thanks for staying to the end. Encore?", resumeHref = "/allen-kang-resume.pdf", titleClassName = "font-serif", linkedin = false, encore: replay = true }: Props) {
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
        <p className={`cc-title ${titleClassName}`}>{title}</p>
        {sub ? <p className="cc-sub">{sub}</p> : null}
        <div className="cc-actions">
          <a href="mailto:allensmkang@gmail.com">allensmkang@gmail.com</a>
          <a href={resumeHref}>Résumé (PDF)</a>
          {linkedin ? (
            <a href="https://www.linkedin.com/in/mooque/" target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          ) : null}
          {replay ? <button type="button" onClick={encore}>Play it again</button> : null}
        </div>
      </div>
    </section>
  );
}
