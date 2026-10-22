// A metal card with fine engraved wave lines, a serif monogram, a chip and a
// contactless mark. Our own card: no bank or network marks. The number is
// four years of Allen's life, as on the Float and Mastercard cards. Sized in
// container units, so it scales with its column.
const WAVES = Array.from({ length: 34 }, (_, i) => i);

export default function EngravedCard() {
  return (
    <div className="ec-wrap">
      <div
        className="ec"
        role="img"
        aria-label="A plum metal card engraved with fine wave lines: monogram AK, Allen Kang, designer since 2018. Card number: 1994, 2007, 2018, 2026."
      >
        <svg className="ec-lines" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden>
          {WAVES.map((i) => {
            const y = 8 + i * 7.4;
            const a = 9 + (i % 7);
            return (
              <path
                key={i}
                d={`M-10 ${y} C 70 ${y - a}, 130 ${y + a}, 200 ${y} S 330 ${y - a}, 410 ${y}`}
                fill="none"
                stroke="url(#ec-line)"
                strokeWidth="0.7"
              />
            );
          })}
          <defs>
            <linearGradient id="ec-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0.05" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.06" />
            </linearGradient>
          </defs>
        </svg>
        <span className="ec-mono">AK</span>
        <span className="ec-chip" aria-hidden />
        <svg className="ec-tap" viewBox="0 0 24 24" aria-hidden>
          <path d="M8 7.5c2.2 2.6 2.2 6.4 0 9M11.5 5c3.6 4.1 3.6 9.9 0 14M15 2.6c5 5.6 5 13.2 0 18.8" />
        </svg>
        <div className="ec-num">1994 2007 2018 2026</div>
        <div className="ec-foot">
          <span>Allen Kang</span>
          <span>Designer since 2018</span>
        </div>
      </div>
    </div>
  );
}
