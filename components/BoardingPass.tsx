// The Jeppesen ForeFlight page's opening object: a boarding pass, the way
// the Mastercard and Float pages open with a card. Toronto to the next role,
// seat 8Y for eight years designing, and the gate is the next pull request
// on ARND (161 merged so far). Our own pass: no airline or company marks.
// Sizes are in container units, so the whole pass scales with its column.
const BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1];

export default function BoardingPass() {
  return (
    <div className="bp-wrap">
      <div
        className="bp"
        role="img"
        aria-label="A boarding pass for Allen Kang: Toronto (YYZ) to his next role, Senior class, seat 8Y, gate PR 162."
      >
        <div className="bp-main">
          <div className="bp-head">
            <span>mooque · boarding pass</span>
            <span>Product design</span>
          </div>
          <div className="bp-band" aria-hidden />
          <div className="bp-route">
            <div>
              <div className="bp-code">YYZ</div>
              <div className="bp-city">Toronto</div>
            </div>
            <svg className="bp-plane" viewBox="0 0 48 24" aria-hidden>
              <path d="M2 12h34" strokeDasharray="3 4" />
              <path d="M30 4l14 8-14 8 4-8z" className="bp-plane-fill" />
            </svg>
            <div>
              <div className="bp-code">NXT</div>
              <div className="bp-city">Next role</div>
            </div>
          </div>
          <div className="bp-grid">
            <div><span>Passenger</span><b>Allen Kang</b></div>
            <div><span>Class</span><b>Senior</b></div>
            <div><span>Seat</span><b>8Y</b></div>
            <div><span>Gate</span><b>PR #162</b></div>
          </div>
        </div>
        <div className="bp-stub">
          <div className="bp-head"><span>Allen Kang</span></div>
          <div className="bp-stub-route">YYZ → NXT</div>
          <div className="bp-stub-meta">Seat 8Y · Senior</div>
          <div className="bp-bars" aria-hidden>
            {BARS.map((w, i) => (
              <i key={i} style={{ width: `${w * 0.45}cqw` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
