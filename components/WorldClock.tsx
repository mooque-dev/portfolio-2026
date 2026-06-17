"use client";

import { useState, useEffect } from "react";

function fmt(date: Date, tz: string) {
  return date.toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function WorldClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <div className="flex items-center gap-2.5 text-[10px] tracking-wide text-muted/40 select-none tabular-nums pointer-events-none">
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
