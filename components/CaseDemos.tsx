"use client";

import { useEffect, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import SplitPaymentDemo from "@/components/SplitPaymentDemo";

// Case studies are MDX rendered to HTML, so a live demo is placed with a
// marker, <div data-demo="name"></div>, and mounted here into that spot.
const DEMOS: Record<string, ComponentType> = {
  "split-payment": SplitPaymentDemo,
};

export default function CaseDemos() {
  const [slots, setSlots] = useState<{ el: Element; name: string }[]>([]);

  useEffect(() => {
    setSlots(
      [...document.querySelectorAll("[data-case-body] [data-demo]")].map((el) => ({
        el,
        name: el.getAttribute("data-demo") ?? "",
      }))
    );
  }, []);

  return (
    <>
      {slots.map(({ el, name }, i) => {
        const Demo = DEMOS[name];
        return Demo ? createPortal(<Demo />, el, `${name}-${i}`) : null;
      })}
    </>
  );
}
