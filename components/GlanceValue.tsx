import type { CSSProperties } from "react";

// A headline number on a case study that counts up once as the page opens.
// Pure CSS (an animated @property integer shown through a counter), so the
// first paint already animates and nothing flashes the final value first.
// Before-and-after values count from the before ("75% → 92%"). Small numbers,
// decimals and ranges stay still: counting to 3 is noise.
export default function GlanceValue({ value, index }: { value: string; index: number }) {
  const shift = value.match(/^(\d+)(%?)\s*→\s*(\d+)(%?)$/);
  const plain = value.match(/^([^\d.]*)(\d+)([^\d.–-]*)$/);
  const from = shift ? Number(shift[1]) : 0;
  const to = shift ? Number(shift[3]) : plain ? Number(plain[2]) : NaN;
  const moves = shift ? true : plain ? to >= 10 : false;

  if (!moves) return <>{value}</>;

  const prefix = shift ? `${shift[1]}${shift[2]} → ` : plain![1];
  const suffix = shift ? shift[4] : plain![3];
  const style = {
    "--from": from,
    "--to": to,
    "--count-delay": `${0.3 + index * 0.12}s`,
  } as CSSProperties;

  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {prefix}
        {/* An invisible copy of the final number holds its exact width, so
            the suffix never shifts while the count runs over it. */}
        <span className="relative inline-block">
          <span className="invisible">{to}</span>
          <span className="glance-count absolute left-0 top-0" style={style} />
        </span>
        {suffix}
      </span>
    </>
  );
}
