// The title block every technical drawing carries in its corner, filled in
// for this page. Decorative; the same facts are in the page text.
const CELLS: [string, string][] = [
  ["Drawn by", "A. Kang"],
  ["Checked by", "You"],
  ["Scale", "1 : 1"],
  ["Sheet", "1 of 1"],
  ["Location", "Toronto"],
  ["Rev", "2026"],
];

export default function TitleBlock() {
  return (
    <dl className="tb" aria-hidden>
      {CELLS.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
