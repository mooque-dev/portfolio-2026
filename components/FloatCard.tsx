// The Float page's card: matte black like a corporate card, a silver chip,
// and large faint panels across the face. The panels draw an "A" for Allen;
// there is no Float or network mark, just a name block where one would sit.

// One A, drawn on a 100x100 grid: two slanted legs and a crossbar. The small
// mark by the wordmark and the large panels across the card are this same
// shape at two sizes.
function A({ legs = 1, back = 0.7, bar = 0.55, fill }: { legs?: number; back?: number; bar?: number; fill: string }) {
  return (
    <>
      <polygon points="0,100 24,100 56,0 38,0" fill={fill} opacity={legs} />
      <polygon points="56,0 70,0 100,100 76,100" fill={fill} opacity={back} />
      <polygon points="25,70 80,70 76,56 29,56" fill={fill} opacity={bar} />
    </>
  );
}

export default function FloatCard() {
  return (
    <div
      className="relative aspect-[1.586] w-full max-w-[400px] overflow-hidden rounded-[16px] text-white shadow-[0_28px_48px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      style={{ background: "linear-gradient(135deg, #1d1d1f 0%, #0d0d0e 55%, #151517 100%)" }}
      role="img"
      aria-label="A matte black card prepared for Float: mooque, Allen Kang, product design. Card number: 1994, 2007, 2018, 2026."
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 252" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="fc-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a3a3d" stopOpacity="0.85" />
            <stop offset="1" stopColor="#1a1a1c" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="fc-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* The A, large and faint, running off the card's right and bottom edges. */}
        <g transform="translate(190 26) scale(2.3 2.6)">
          <A fill="url(#fc-panel)" />
        </g>
        <rect x="-60" y="0" width="160" height="252" fill="url(#fc-sheen)" transform="rotate(18 200 126)" />
      </svg>

      <div className="absolute left-[7%] top-[11%] flex items-center gap-2">
        <svg viewBox="0 0 100 100" className="h-[18px] w-[18px]" aria-hidden>
          <A fill="#fff" back={0.75} bar={0.75} />
        </svg>
        <span className="text-[19px] font-semibold tracking-[-0.01em]">mooque</span>
      </div>

      <svg viewBox="0 0 44 34" className="absolute left-[8%] top-[34%] h-[30px] w-auto" aria-hidden>
        <defs>
          <linearGradient id="fc-chip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9d9dc" />
            <stop offset="1" stopColor="#9c9ca1" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="43" height="33" rx="6" fill="url(#fc-chip)" stroke="#88888d" />
        <path d="M0.5 12h14M0.5 22h14M29.5 12h14M29.5 22h14M14.5 0.5v33M29.5 0.5v33M14.5 17h15" stroke="#7d7d82" fill="none" />
      </svg>

      <p className="absolute left-[7%] top-[55%] m-0 font-mono text-[clamp(13px,4.2vw,18px)] tracking-[0.12em] text-white/90 tabular-nums">
        1994 2007 2018 2026
      </p>

      <svg viewBox="0 0 24 24" className="absolute right-[6%] top-[38%] h-5 w-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a10 10 0 0 1 0 14M5 10a2.5 2.5 0 0 1 0 4" />
      </svg>

      <p className="absolute bottom-[10%] left-[7%] m-0 text-[9.5px] uppercase tracking-[0.16em] text-white/50">Prepared for Float</p>
      <div className="absolute bottom-[8%] right-[7%] text-right">
        <p className="m-0 text-[21px] font-extrabold italic leading-none tracking-[-0.01em]">ALLEN KANG</p>
        <p className="m-0 mt-1 text-[11.5px] font-medium text-white/80">Product design</p>
      </div>
    </div>
  );
}
