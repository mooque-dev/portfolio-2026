"use client";

import { useSyncExternalStore } from "react";

function fmt(date: Date, tz: string) {
  return date.toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// The store is "the current minute": stable within a minute (so snapshots
// don't churn) and ticking via the interval subscription. Server snapshot is
// null so nothing renders until the client knows the time.
function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 60_000);
  return () => clearInterval(id);
}

function getMinute() {
  return Math.floor(Date.now() / 60_000);
}

export default function WorldClock() {
  const minute = useSyncExternalStore(subscribe, getMinute, () => null);

  if (minute === null) return null;
  const now = new Date(minute * 60_000);

  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-2.5 text-[10px] tracking-wide text-muted/40 select-none tabular-nums pointer-events-none"
    >
      <span>
        <span className="text-muted/30 mr-1.5">YYZ</span>
        {fmt(now, "America/Toronto")}
      </span>
      <span className="text-muted/20">·</span>
      <span>
        <span className="text-muted/30 mr-1.5">ICN</span>
        {fmt(now, "Asia/Seoul")}
      </span>
    </div>
  );
}
