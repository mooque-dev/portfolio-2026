"use client";

import { useEffect, useState } from "react";
import Arrow from "@/components/Arrow";

// One line in the footer fed by ARND's real listings. ARND's show table is
// publicly readable (it is what arnd.app itself reads), so this counts rows
// straight from it. Without the env vars, or if the request fails, the line
// stays a plain link to arnd.app.
const URL_ = process.env.NEXT_PUBLIC_ARND_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_ARND_SUPABASE_KEY;
const CACHE = "arnd-live-v1";

type Live = { kind: "tonight" | "week" | "mapped"; n: number };

// Midnight tonight in Toronto, as an ISO instant.
function torontoMidnight(): string {
  const now = new Date();
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  const hoursLeft = 24 - Number(parts.hour);
  const end = new Date(now.getTime() + hoursLeft * 3600_000);
  end.setMinutes(0, 0, 0);
  return end.toISOString();
}

async function count(filter: string): Promise<number> {
  const res = await fetch(`${URL_}/rest/v1/performances?select=id${filter}`, {
    headers: { apikey: KEY!, Prefer: "count=exact", Range: "0-0" },
  });
  if (!res.ok) throw new Error(String(res.status));
  return Number(res.headers.get("content-range")?.split("/")[1] ?? 0);
}

async function load(): Promise<Live> {
  const now = new Date();
  const soon = new Date(now.getTime() - 3 * 3600_000).toISOString();
  const tonight = await count(`&end_time=gte.${now.toISOString()}&start_time=gte.${soon}&start_time=lt.${torontoMidnight()}`);
  if (tonight > 0) return { kind: "tonight", n: tonight };
  const week = await count(`&start_time=gte.${now.toISOString()}&start_time=lt.${new Date(now.getTime() + 7 * 86400_000).toISOString()}`);
  if (week > 0) return { kind: "week", n: week };
  return { kind: "mapped", n: await count("") };
}

export default function ArndLive() {
  const [live, setLive] = useState<Live | null>(null);

  useEffect(() => {
    if (!URL_ || !KEY) return;
    try {
      const hit = JSON.parse(sessionStorage.getItem(CACHE) ?? "null");
      if (hit && Date.now() - hit.at < 10 * 60_000) {
        // sessionStorage only exists after mount, so the cached line lands here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLive(hit.live);
        return;
      }
    } catch {}
    let gone = false;
    load()
      .then((l) => {
        if (gone) return;
        setLive(l);
        try {
          sessionStorage.setItem(CACHE, JSON.stringify({ at: Date.now(), live: l }));
        } catch {}
      })
      .catch(() => {});
    return () => {
      gone = true;
    };
  }, []);

  const text = !live
    ? "ARND: live music around you, in beta"
    : live.kind === "tonight"
      ? `Tonight on ARND: ${live.n} small ${live.n === 1 ? "show" : "shows"} in Toronto`
      : live.kind === "week"
        ? `This week on ARND: ${live.n} small ${live.n === 1 ? "show" : "shows"} in Toronto`
        : `ARND has mapped ${live.n.toLocaleString("en-US")} small shows in Toronto`;

  return (
    <a
      href="https://arnd.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-2 text-[13px] hover:border-foreground/40 transition-colors"
    >
      <span className={`arnd-dot ${live && live.kind !== "mapped" ? "is-live" : ""}`} aria-hidden />
      <span aria-live="polite">{text}</span>
      <Arrow dir="up-right" className="text-muted group-hover:text-foreground transition-colors" />
      <span className="sr-only"> (opens arnd.app in a new tab)</span>
    </a>
  );
}
