# DESIGN.md, Allen Kang's portfolio

The rules this site is designed by. Written for anyone building on it, a
person or an AI agent. If a rule here and a page disagree, the page is wrong.

Every rule below came from a real correction Allen made. Add to it the same
way: when something looks off, fix it, then write down the rule.

## Start here: who it's for

A hiring manager or design lead with a few minutes, deciding whether to talk
to Allen. They should be able to tell what he did from the first line of any
page, then check it against the work.

Allen designs complex tools for people whose expertise isn't software:
the people who do the books at nonprofits, clinicians, fundraisers. The site
should feel like that work: plain, exact, nothing to decode.

Before adding anything, answer: what does this help that reader decide? If
the answer is "it looks nice", leave it out.

## The look

Quiet and editorial. White page, near-black text, a lot of space, the work
shown large. The reference is the portfolio of a senior designer at a large
product company, not a template or a landing page.

One loud moment per page at most. On the home page that is the curtain at
the end.

## Layout

- One container for the whole site: `max-w-6xl` with `px-6`. The header,
  headings, text, pictures and footer share its left edge.
- Text may run narrower than the container, on the same left edge. Every
  picture, table and demo spans the full column, so both edges line up.
- Nothing goes edge to edge. A picture that breaks the container needs a
  reason beyond decoration.
- At phone width: one column, a 24px gutter, no sideways scroll.
- Measure the left and right edges in a browser before shipping layout work.

## Type

- Two families. Playfair Display, the serif, for the home headline, page
  titles, section headings and the quote on home. Geist for everything
  else: body text, project titles, numbers, navigation.
- Home headline: 76px, weight 600. Page titles: 48px.
  Section headlines: 38px. Body: 16 to 18px.
- Headlines are sentences that state a fact ("All eight kept a side
  spreadsheet"), set in sentence case.
- No label above a headline. No numeral above a headline. The headline
  says what the section is.
- A section name ("Selected work") is a real heading in the serif, not a
  small grey label.
- Bold is for result numbers and for the label that starts a list item.
  Never for emphasis inside a sentence.
- No em-dashes, anywhere.

## Colour

- Page: warm paper, `#f7f4ec`, with a fine grain behind the content.
  Text: `#1a1a1a`. Secondary text: `#636360`. Lines: `#e0dccf`. Dark
  mode: warm ink `#141210`, `#ededeb`, `#9a9a97`, `#2a2a28`. Never flat
  white or pure black for the page.
- One accent, the seal red (`#cd2e3a`, dark `#ef5350`). It is Allen's
  hand: the 묵 seal beside his name, and the red pen. It also marks the
  keyboard focus ring and the row numbers in a comparison table. Nothing
  else is red.
- Colour otherwise comes from the work: each project cover sits on its
  own soft background.
- No gradients, glows or dot-grid backdrops.

## Pictures

- Real screens and real artefacts. No stock images, no decorative
  illustration standing in for evidence.
- A picture on a coloured background keeps visible padding on all four
  sides. Fit the frame to the picture and use `object-contain`. Never crop
  into the margin.
- Every picture in a case study has a caption that says what it is.
- A screen captioned as "shipped" must be the shipped screen.

## Components

- **A project** looks the same wherever it is listed: picture, where and
  when, title, one line, and one number (`components/CaseRow.tsx`).
- **Quotes** are larger text in quotation marks, with the person's name
  and role under them. No stripe down the side.
- **Notes and alerts** are a full box: a border on all sides, rounded
  corners, an icon, and a tint for the tone. Never a stripe down one side.
- **Groups of short points** are plain text in columns. No row of cards,
  and no rule or coloured bar on top of each one.
- **Dropdowns** get a custom chevron 12px from the right edge.
- **"Interactive" and "Live app"** are words at the end of the line under
  a cover. Nothing sits on the cover itself.
- **Results** are plain rows: what changed on the left, the number on the
  right (`components/ResultsList.tsx`). No till receipt, no boarding pass.
- **Status** ("Submitted Oct 30, 2026") is plain text. No pill, no coloured dot.
- **A first visit** is handled on the page: the home page says who Allen
  is and where (the line with the résumé link), then gives four ways in by
  time and reason. No tour and no guide bubble.
- **Case films** (`components/CaseFilm.tsx`, built by `drafts/case-films`)
  are silent, under a minute, and never start by themselves. Every word
  and number in one comes from its case study, and it shows real screens
  or the working demo. The film sits under the case's opening lines; the
  case is its text version.
- **The home page opens on Allen's own stickers** (`components/StickerSheet.tsx`),
  beside the headline. Each is shown at a whole multiple of its 8px pixel
  grid, so the pixels stay square. Picking one shows its line; the stage
  mic also dims the lights. No stock illustration ever stands in for them.
- **The red pen** marks one phrase in the home headline and one phrase per
  case study. One swipe per page, never a row of them.
- **The 묵 seal** sits beside his name in the header at its native 22px, and
  signs off each case study.
- **Sections do not fade or slide in** as the page loads or scrolls.
- **Pages made for one employer** (Blue J, Float, Mastercard and the
  brand-themed ones) keep their own sans headings on the same paper.
- **Controls that belong to the page** (a before and after toggle) sit
  outside the product picture, so nobody mistakes them for the product.

## Case studies

- Five parts, in this order: the moment, what I found, the call, what
  changed, looking back. The names show only in the bar at the top.
- Open on one concrete moment, with a real example and real amounts.
- Say what was seen, then what shipped. Keep the two apart.
- Name what each decision cost.
- State the limits of every number: over what period, compared with what.
- End on a real mistake and what would be tested next.
- The first sentence under a headline never repeats the headline.

## Writing

- Plain, human, feature first. Say what changed and what the person can
  now do.
- Facts only. Every number and quote must trace to Allen's own notes. If
  it can't be confirmed, it stays out.
- Keep shipped and planned apart. A feature that didn't ship is never
  listed as shipped.
- Allen builds with AI coding tools: he directs the work, reviews it and
  tests it. Never "I write code".
- No reveals ("it wasn't X, it was Y"), no one-line morals closing a
  section, no slogans as headlines.
- No buzzwords: leverage, seamless, unlock, elevate, robust, delightful.

## The tells

These make a page read as machine-made. None of them ship.

1. A small label sitting above a heading.
2. Big section numbers: 01, 02, 03.
3. A first sentence that repeats its headline.
4. Bold keywords scattered through a paragraph.
5. A row of three or four cards, each with a rule or coloured bar on top.
6. A coloured stripe down the left of a quote, note or alert.
7. Gradient glows and dot-grid backgrounds.
8. A clever subhead under every title.
9. Em-dashes.
10. A title built as "Name: A Dramatic Phrase".
11. A pill with a small coloured dot.
12. Facts dressed up as a prop: a till receipt, a boarding pass.
13. Sections that fade in as you scroll.

## Before it ships

1. Open the page in a browser at desktop and phone width, and look at it.
2. Check the left and right edges against the header.
3. Run the list of tells above.
4. Check every claim against the source.
5. After publishing, read the live page. A page that loads is not proof
   that it changed.
