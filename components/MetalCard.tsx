// The Mercury page's opening object: a brushed metal card, our own, with no
// bank or network marks. The number is four years of Allen's life, the same
// as on the Float and Mastercard cards. Container units, so it scales with
// its column; the card is the same in both themes.
export default function MetalCard() {
  return (
    <div className="mc-wrap">
      <div
        className="mc"
        role="img"
        aria-label="A brushed metal card: mooque, Allen Kang, designer since 2018. Card number: 1994, 2007, 2018, 2026."
      >
        <div className="mc-top">
          <span className="mc-mark">mooque</span>
          <span className="mc-kind">Product design</span>
        </div>
        <span className="mc-chip" aria-hidden />
        <div className="mc-num">1994 2007 2018 2026</div>
        <div className="mc-foot">
          <span>Allen Kang</span>
          <span>Designer since 2018</span>
        </div>
      </div>
    </div>
  );
}
