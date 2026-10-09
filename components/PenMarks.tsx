"use client";

import { useEffect } from "react";

// Red pen on a case study: <mark class="pen" data-note="..."> in the MDX gets
// a hand-drawn circle and a handwritten note in the margin (below the
// paragraph on narrow screens). The circle draws once, when it scrolls into
// view; with reduced motion it is simply there.
const CIRCLE = "M8 16 C 6 4, 60 -2, 92 8 C 104 14, 90 28, 50 28 C 14 28, 2 20, 12 9";

export default function PenMarks() {
  useEffect(() => {
    const marks = [...document.querySelectorAll<HTMLElement>("[data-case-body] mark.pen")];
    if (!marks.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const placed: { mark: HTMLElement; note: HTMLElement; host: HTMLElement }[] = [];

    marks.forEach((mark) => {
      if (!mark.querySelector("svg")) {
        mark.insertAdjacentHTML(
          "beforeend",
          `<svg class="pen-svg" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${CIRCLE}"/></svg>`
        );
      }
      const text = mark.dataset.note;
      const host = mark.closest("p");
      if (text && host && !host.querySelector(".pen-note")) {
        const note = document.createElement("span");
        note.className = "pen-note";
        note.textContent = text;
        host.classList.add("has-pen-note");
        host.appendChild(note);
        placed.push({ mark, note, host });
      }
    });

    // Margin notes line up with their mark.
    const place = () =>
      placed.forEach(({ mark, note, host }) => {
        const top = mark.getBoundingClientRect().top - host.getBoundingClientRect().top;
        note.style.setProperty("--pen-top", `${Math.round(top) - 6}px`);
      });
    place();
    addEventListener("resize", place);

    if (reduce) return () => removeEventListener("resize", place);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.closest("p")?.classList.add("pen-drawn");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -25% 0px" }
    );
    marks.forEach((m) => {
      m.closest("p")?.classList.add("pen-wait");
      io.observe(m);
    });
    return () => {
      io.disconnect();
      removeEventListener("resize", place);
    };
  }, []);

  return null;
}
