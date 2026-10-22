# Stripe: visual brand brief

Source: https://stripe.com/ (redirects to /en-ca; studied 2026-10-22, 1440x900, "Reject all" cookies). Screenshots: `/private/tmp/claude-501/-Users-mooque-Claude-arnd/efda517d-9b7b-4d0f-9f1f-93fc1f66b813/scratchpad/brand-shots/stripe-1..3.png`.

## Canvas
Light. Background `#FFFFFF` with cool tints `#F8FAFD` and `#F6F9FC`-family panels, hairlines `#E5EDF5`. Heading text `#061B31` (deep navy, not black), body `#50617A` / `#64748D` (slate). Dark sections `#0D1738` / `#0A2540` with white and periwinkle text `#839BC8` / `#A3B5D6`.

## Type
- One family everywhere: **Söhne** (variable, served as `sohne-var`).
- Display: weight **300** (light), h1 48/55px tracking -0.96px (-0.02em); big h2 56px tracking -1.4px (-0.025em); section h2 32/35px. Light weight at large sizes is the tell.
- Text and UI: Söhne 400, 14 to 16px; buttons 16px 400 (not bold).
- Google Fonts: `Inter Tight` at 300/400 with -0.02em tracking is the closest free match (neutral Akzidenz-style grotesk, similar x-height, the light weight holds up at display size). `Geist` is a fine alternative.

## Colour
- Primary CTA: blurple `#533AFD` background, `#FFFFFF` text.
- Secondary CTA: white (65% opacity) with 1px `#B9B9F9` border and `#533AFD` text.
- Navy `#0A2540`: dark CTA ("Chat now") and dark sections (`#0D1738`).
- Gradient ribbon and orbs: orange `#FD9318` / `#FD6F2C` (sampled from the hero ribbon image) into pink `#FE82E2`, magenta `#F44BCC` / `#F363F3` and violet `#7F7DFC`, plus sunshine `#FFCF5E` in radial orbs.
- Green `#00D66F`: tiny live indicators.

## Shape
- Buttons: `border-radius: 4px`, 48px tall, `16px 24px` padding, trailing small chevron `›`.
- Cards: 6px radius, 1px `#E5EDF5` borders, soft layered shadows like `0 30px 60px -10px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3)` and `0 16px 32px rgba(50,50,93,.12)`.
- Thin vertical guide lines frame the content column; dashed horizontal dividers.

## Composition
Left-aligned hero over white, with an oversized silky gradient ribbon sweeping diagonally in from the top right. Small live stat line above the headline. Headline is one long paragraph: dark lead sentence followed by slate continuation. Two buttons, then a logo row bounded by hairlines. Sections repeat the two-tone heading pattern, then product UI, diagrams, or a wide photo with rounded corners. Dark navy band for developers with node diagrams. Very ordered, generous whitespace, medium density.

## Signature details
- Two-tone headlines: lead sentence in `#061B31`, continuation in slate `#64748D`, same size.
- Flowing gradient ribbon / mesh in orange, pink and violet.
- Visible vertical gridlines framing the page column.
- Light-weight (300) large type with tight tracking.
- Live-ticking numbers with many decimals.

## For our page
1. Write the intro as a two-tone paragraph: name and role in `#061B31`, the rest in `#64748D`, Inter Tight 300 at 44 to 48px.
2. `#533AFD` primary button, 4px radius, chevron, plus a white bordered secondary.
3. Add 1px `#E5EDF5` vertical rails at the content edges and dashed section dividers.
4. One abstract CSS/SVG gradient ribbon (violet to pink to orange) bleeding off the top right; draw your own, do not trace theirs.
5. A small live counter line above the headline (e.g. days shipping, commits) in 14px.
6. Dark `#0A2540` band for technical work with node-and-line diagrams.
