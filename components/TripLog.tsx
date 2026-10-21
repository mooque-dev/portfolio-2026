// The Samsara page's opening object: a trip report, the way a fleet app
// logs a route. Each stop is a job, with the year Allen arrived and what shipped
// there; the last stop is still ahead. Container units, so it
// scales with its column.
const STOPS: { year: string; place: string; note: string }[] = [
  { year: "2018", place: "ROSSUL", note: "Junior UX/UI designer" },
  { year: "2019", place: "MyJourney", note: "Dashboards clinicians used to track patients" },
  { year: "2020", place: "Forkable", note: "Moved design to Figma, built the component library" },
  { year: "2021", place: "Keela", note: "Automation from zero to a paid add-on, +13% ARR" },
  { year: "2025", place: "Aplos", note: "Payments across three products merging into one" },
  { year: "2025", place: "ARND", note: "161 pull requests shipped with AI coding tools" },
];

export default function TripLog() {
  return (
    <div className="tl-wrap">
      <div className="tl">
        <div className="tl-head">
          <div>
            <p className="tl-k">Trip report</p>
            <p className="tl-t">Unit AK-08 &middot; Toronto</p>
          </div>
          <span className="tl-live">En route</span>
        </div>
        <div className="tl-stats" aria-label="Trip totals">
          <div><b>8</b><span>years</span></div>
          <div><b>6</b><span>stops</span></div>
          <div><b>340+</b><span>components</span></div>
        </div>
        <ol className="tl-route">
          {STOPS.map((s) => (
            <li key={s.place}>
              <span className="tl-year">{s.year}</span>
              <span className="tl-dot" aria-hidden />
              <span className="tl-stop">
                <b>{s.place}</b>
                <span>{s.note}</span>
              </span>
            </li>
          ))}
          <li className="tl-next">
            <span className="tl-year">Next</span>
            <span className="tl-dot" aria-hidden />
            <span className="tl-stop">
              <b>Next stop</b>
              <span>Arriving soon</span>
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
