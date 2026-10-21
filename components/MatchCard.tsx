// The Matcha page's opening object: a candidate card, the way a job app
// shows a match, with the reasons it fits. Every reason links to the work
// behind it. Container units, so it scales with its column.
import Link from "next/link";

const TAGS = ["0 to 1", "Design systems", "Founder twice", "Remote"];
const WHY = [
  { text: "Founded ARND and co-founded Forkestrate", href: "/work/arnd" },
  { text: "Took Forkestrate from zero to MVP in under three months", href: "/work/forkestrate" },
  { text: "Built a design system three teams adopted", href: "/work/orchid-design-system" },
];

export default function MatchCard() {
  return (
    <div className="mt-wrap">
      <div className="mt">
        <div className="mt-who">
          <span className="mt-av" aria-hidden>AK</span>
          <div>
            <p className="mt-name">Allen Kang</p>
            <p className="mt-role">Founding designer &middot; Toronto</p>
          </div>
        </div>
        <ul className="mt-tags" aria-label="Strengths">
          {TAGS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-k">Why it&rsquo;s a match</p>
        <ul className="mt-why">
          {WHY.map((w) => (
            <li key={w.text}>
              <Link href={w.href}>{w.text}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-acts" aria-hidden>
          <span>Pass</span>
          <span className="mt-yes">Interested</span>
        </div>
      </div>
    </div>
  );
}
