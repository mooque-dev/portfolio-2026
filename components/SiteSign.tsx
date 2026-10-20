// The Bridgit page's opening object: the sign that goes up in front of a
// construction site, filled in for this project. Every number on it is on
// the résumé. Sized in container units, so it scales with its column.
const ROWS: [string, string][] = [
  ["Project", "Clearer planning tools for construction teams"],
  ["Designer", "Allen Kang, Senior Product Designer"],
  ["Built with", "Claude, Cursor, Figma, React"],
  ["Track record", "8 years · 161 pull requests · 340+ components"],
  ["Completion", "Shipping weekly"],
];

export default function SiteSign() {
  return (
    <div className="ss-wrap">
      <div
        className="ss"
        role="img"
        aria-label={"A construction site sign that reads Now building. " + ROWS.map(([k, v]) => `${k}: ${v}.`).join(" ")}
      >
        <div className="ss-board">
          <div className="ss-head">Now building</div>
          <dl className="ss-rows">
            {ROWS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="ss-hazard" aria-hidden />
        </div>
        <div className="ss-posts" aria-hidden>
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
