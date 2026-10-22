# Matcha: visual brand brief

Source: https://matcha.fm/ (studied 2026-10-22, 1440x900, no cookie banner). The home page is a single screen. Screenshots: `/private/tmp/claude-501/-Users-mooque-Claude-arnd/efda517d-9b7b-4d0f-9f1f-93fc1f66b813/scratchpad/brand-shots/matcha-1..3.png` (all show the same view).

## Canvas
Light and bare. Background `#FFFFFF`. Headline `#0A0A0A`, body `#4B5563`, quiet text and footer links `#9CA3AF`. A light chip fill `#F3F4F6`. This is the stock Tailwind gray scale.

## Type
- One family: **JetBrains Mono** for everything, 400 and 700 (h1 renders at 800 synthetic).
- h1 36/49px, weight 800, tracking -0.9px (-0.025em), centered.
- Body 14/20px 400; stats 16px 700 over 14px grey labels; footer 12px grey.
- Wordmark is just "Matcha" in the same mono, 16px 700.
- Google Fonts: `JetBrains Mono` is itself free. Exact match.

## Colour
- Primary surface: green `#22C55E` (Tailwind green-500) as the header strip and 4px frame of the main input card, white text on it.
- Submit control: a circular grey `#E5E7EB` arrow button that activates when you type.
- Accent chip: `#F3F4F6` pill holding a one-line stat with small leaf/emoji ornaments.
- Text greys `#4B5563` and `#9CA3AF`.
There is no other colour.

## Shape
- Main card: `border-radius: 16px` outer (green), 12px inner white textarea, large soft shadow (about `0 25px 50px -12px rgba(0,0,0,.25)`).
- Chips: full pill (`9999px`).
- Buttons: circle. No borders anywhere else.

## Composition
Everything centered in one viewport: tiny wordmark top left and "Login" top right; centered headline; two-line grey subhead; a pill chip; then the hero object, a green-framed prompt box with a typewriter placeholder and blinking caret; a faint one-line testimonial; a four-column stat row (bold value, grey label). Footer links in a single centered grey row. Extremely sparse, product-as-hero.

## Signature details
- Monospace for absolutely everything, like a terminal.
- The green-framed prompt box with a live typing placeholder.
- Tailwind-grey restraint with one green.
- Four-up stat row of bold numbers and grey captions.
- Single-screen page, no scroll.

## For our page
1. Set the whole page in JetBrains Mono; h1 at 36px 800, tracking -0.025em, centered.
2. Make the hero a green `#22C55E` framed "prompt" card (16px radius, 4px frame) that types out what you build, with a caret.
3. Add a `#F3F4F6` pill under the subhead with one quiet fact about you.
4. A four-column stat row (years, shipped products, users, city) in 16px bold over grey 14px.
5. Keep it to one viewport above the fold; push detail below a quiet footer-style link row.
