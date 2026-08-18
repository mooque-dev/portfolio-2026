"use client";

import dynamic from "next/dynamic";

// The guide is a floating, below-the-fold helper with no first-paint value, so
// it loads lazily. This keeps its framer-motion animation code out of every
// page's initial bundle; ssr:false skips rendering it on the server entirely.
// (This wrapper exists because ssr:false is not allowed directly inside the
// server-component layout.)
const CapyCompanion = dynamic(() => import("@/components/CapyCompanion"), {
  ssr: false,
});

export default function DeferredGuide() {
  return <CapyCompanion />;
}
