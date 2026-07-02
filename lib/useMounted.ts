"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// True after hydration, false during SSR and the hydration render.
// useSyncExternalStore replaces the setMounted(true)-in-effect pattern
// without the cascading re-render lint complaint.
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
