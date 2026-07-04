// Dated "now" snapshots. Newest first. Never overwrite an old snapshot:
// append a new one and let the history stand. That history IS the record.
// The home Now rail shows the latest; /now shows them all.

export interface NowSnapshot {
  date: string; // ISO, the day the snapshot was taken or revised
  items: { text: string; href?: string }[];
}

export const nowSnapshots: NowSnapshot[] = [
  {
    date: "2026-07-03",
    items: [
      { text: "Leading design at Velora" },
      { text: "Rehearsing a 40-person musical for an August debut" },
      { text: "Latest writing: Earned Black", href: "/writing/earned-black" },
      { text: "Turning this site into a vault", href: "/vault" },
    ],
  },
  {
    date: "2026-06-27",
    items: [
      { text: "Leading design at Velora" },
      { text: "Rehearsing a 40-person musical for an August debut" },
      { text: "Rebuilding this portfolio in the open with an AI pair" },
    ],
  },
];

export function latestNow(): NowSnapshot {
  return nowSnapshots[0];
}
