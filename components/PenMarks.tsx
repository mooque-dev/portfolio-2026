"use client";

import { useEffect } from "react";

// Red pen on a case study: <mark class="pen" data-note="..."> in the MDX gets
// a see-through marker swipe behind the phrase and a handwritten note in the
// margin (below the paragraph on narrow screens). The swipe draws once, when
// it scrolls into view; with reduced motion it is simply there.

// The swipe runs along the lower part of the words, a little uneven, as a
// marker would. Drawn on a 100x10 grid and rescaled in coordinates to each
// phrase's real size, so it fits any length at one even thickness.
const SWIPE = "M1 5.3 C 30 4.9, 70 5.4, 99 5";

function fit(mark: HTMLElement) {
  const svg = mark.querySelector<SVGSVGElement>("svg.pen-svg");
  const path = svg?.querySelector("path");
  if (!svg || !path) return;
  const w = mark.offsetWidth + 8;
  const h = mark.offsetHeight * 0.62;
  let i = 0;
  const d = SWIPE.replace(/-?\d+(\.\d+)?/g, (n) => String(+(+n * (i++ % 2 === 0 ? w / 100 : h / 10)).toFixed(1)));
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  Object.assign(svg.style, { left: "-4px", top: `${mark.offsetHeight * 0.32}px`, width: `${w}px`, height: `${h}px` });
  path.setAttribute("d", d);
  path.style.strokeWidth = `${h * 0.92}px`;
}

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
          `<svg class="pen-svg" aria-hidden="true"><path pathLength="1"/></svg>`
        );
      }
      fit(mark);
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
    const place = () => {
      marks.forEach(fit);
      placed.forEach(({ mark, note, host }) => {
        const top = mark.getBoundingClientRect().top - host.getBoundingClientRect().top;
        note.style.setProperty("--pen-top", `${Math.round(top) - 6}px`);
      });
    };
    place();
    addEventListener("resize", place);
    // The web font can land after the first measure and change each
    // phrase's width, so measure again once it has. (A ResizeObserver can't
    // watch inline text.)
    document.fonts?.ready.then(place);

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
