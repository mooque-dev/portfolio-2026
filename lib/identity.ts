// Shared identity content: the two-worlds pairs, colleague quotes, and life
// off the clock. Used by the home and About pages so they never drift apart.

// Each pair is backed by real work, linked, so the theme reads as evidence.
export const WORLDS = [
  { a: "Fine art", b: "Product design", text: "I trained in pencil, watercolour and oil before I opened Figma. It's why I sweat the visual craft in dense, data-heavy screens.", href: "/illustration", link: "Where it started" },
  { a: "Korean", b: "English", text: "I built a Korean and English script reader that a forty-person musical company rehearsed with every day through a ten-month production.", href: "/work/torontoyuwol", link: "Toronto Yuwol" },
  { a: "Design", b: "Engineering", text: "I prototype in code, and I sat on the bridge between our design system and Keela's frontend, reviewing pull requests with engineers.", href: "/work/orchid-design-system", link: "Orchid" },
  { a: "Software", b: "The people it forgets", text: "Most of my users never asked for software: nonprofit accountants, clinicians, donors, an amateur musical company. I design so they don't need a manual.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
];

// How I work: three habits, each linked to the case that shows it in practice.
export const HOW_I_WORK = [
  { title: "Agree on the constraints before designing", text: "Before Transaction Workflows had a screen, the PM, the engineering lead and I agreed what we couldn't do: no backend refactor, no breaking reporting. Then we shipped in phases.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
  { title: "Make the system visible", text: "Finance teams had been burned by data that moved silently. Instead of hiding the mapping behind defaults, I showed every field and where it lands.", href: "/work/aplos-keela-integration", link: "Aplos × Keela" },
  { title: "Measure after launch", text: "A 75% to 82% win hid a leak in the fallback flow. I argued to pause, tested four variations, and shipped the one that reached 92%.", href: "/work/fee-opt-in-experimentation", link: "Fee Opt-In" },
];

// Life outside the work, from the About page, with the site's own stickers.
export const OFF_CLOCK = [
  { img: "/stickers/stage-mic.png", text: "Performed in a 40-person amateur musical this August, with 350 tickets sold. I built its scheduling, bill-splitting and script-reader apps, and I'm back for season two." },
  { img: "/stickers/palette.png", text: "The kid who wanted to make art now builds for the arts scene: Toronto Yuwol, ARND, and volunteering as design lead at ArtsGaze." },
  { img: "/stickers/rainbow-flower.png", text: "Grew up around cooks, and many of my friends are musicians. That world is where most of my ideas come from." },
  { img: "/stickers/running-shoe.png", text: "Ran a half-marathon on my own." },
  { img: "/stickers/bear-heart.png", text: "Raised $1,000 for SickKids Hospital." },
  { img: "/stickers/invader.png", text: "Kept a daily streak for years, first French, now chess. Streak apps are a good on-ramp to a language, not a way to learn one." },
];

// Exact excerpts from LinkedIn recommendations.
export const QUOTES = [
  { q: "Allen has this rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking without missing a beat.", who: "Natalie Freckleton", role: "Director of Product Management, Velora" },
  { q: "He treats the design system as a shared product, not someone else's problem.", who: "Max Galchenko", role: "Senior React developer, Velora, on a different product team" },
  { q: "I learned a great deal from him during our time working together… his ability to distill complex problems into simple, elegant solutions set a high standard for design excellence.", who: "Dick De Leon", role: "Senior to Allen at Aplos" },
  { q: "Even while supporting multiple teams, he is always responsive, reliable, and easy to work with.", who: "Randy Douglas", role: "Software engineer, same team" },
  { q: "Allen's forward-thinking, North Star-guided approach and user-centric designs were also instrumental in crafting/communicating a motivational product vision for our teams.", who: "Eric Hua", role: "Product manager and founder, Forkestrate" },
];
