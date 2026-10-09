// Shared identity content: the two-worlds pairs, colleague quotes, and life
// off the clock. Used by the home and About pages so they never drift apart.

// Each pair is backed by real work, linked, so the theme reads as evidence.
export const WORLDS = [
  { a: "Fine art", b: "Product design", text: "Trained in pencil, watercolour and oil before Figma.", href: "/illustration", link: "Where it started" },
  { a: "Korean", b: "English", text: "Built the bilingual script reader a forty-person musical rehearsed with.", href: "/work/torontoyuwol", link: "Toronto Yuwol" },
  { a: "Design", b: "Engineering", text: "Prototype in code, and review pull requests with engineers.", href: "/work/orchid-design-system", link: "Orchid" },
  { a: "Software", b: "The people it forgets", text: "Design for accountants, clinicians and donors who never asked for software.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
];

// Results, as printed on the receipt (home and Mastercard). Only numbers on
// the resume belong here.
export const RESULTS = [
  { label: "Split transactions", value: "-70% tickets", href: "/work/transaction-workflows" },
  { label: "Fee opt-in, A/B", value: "75→92%", href: "/work/fee-opt-in-experimentation" },
  { label: "Automation ARR", value: "+13%", href: "/work/automation-nonprofits" },
  { label: "Adoption, 355 orgs", value: "30%", href: "/work/automation-nonprofits" },
  { label: "Components → 1 library", value: "340+", href: "/work/orchid-design-system" },
  { label: "Tax rules kept", value: "CA US AU", href: "/work/transaction-workflows" },
];
export const RESULTS_TOTAL = { label: "Designers mentored", value: "3", href: "/resume" };

// From the reading list on Allen's Notion.
export const READING = {
  now: ["Creative Selection, Ken Kocienda", "Nudge, Richard H. Thaler and Cass R. Sunstein"],
  shelf: ["The Psychology of Everyday Things, Don Norman", "The Creative Act, Rick Rubin"],
}

// How I work: three habits, each linked to the case that shows it in practice.
export const HOW_I_WORK = [
  { title: "Agree on the constraints before designing", text: "Before Transaction Workflows had a screen, the PM, the engineering lead and I agreed what we couldn't do: no backend refactor, no breaking reporting. Then we shipped in phases.", href: "/work/transaction-workflows", link: "Transaction Workflows" },
  { title: "Make the system visible", text: "Finance teams had been burned by data that moved silently. Instead of hiding the mapping behind defaults, I showed every field and where it lands.", href: "/work/aplos-keela-integration", link: "Aplos × Keela" },
  { title: "Measure after launch", text: "A 75% to 82% win hid a leak in the fallback flow. I argued to pause, tested four variations, and shipped the one that reached 92%.", href: "/work/fee-opt-in-experimentation", link: "Fee Opt-In" },
];

// Life outside the work, from the About page, with the site's own stickers.
export const OFF_CLOCK = [
  { img: "/stickers/stage-mic.png", text: "On stage in a 40-person musical this August, 350 tickets sold, running on apps I built." },
  { img: "/stickers/palette.png", text: "Building for the arts scene: Toronto Yuwol, ARND and ArtsGaze." },
  { img: "/stickers/rainbow-flower.png", text: "Grew up around cooks and musicians. Most of my ideas start there." },
  { img: "/stickers/running-shoe.png", text: "Ran a half-marathon on my own." },
  { img: "/stickers/bear-heart.png", text: "Raised $1,000 for SickKids Hospital." },
  { img: "/stickers/invader.png", text: "A daily streak for years: French, now chess." },
];

// Exact excerpts from LinkedIn recommendations.
export const QUOTES = [
  { q: "Allen has this rare ability to zoom from the tiniest UI detail all the way out to cross-product systems thinking without missing a beat.", who: "Natalie Freckleton", role: "Director of Product Management, Velora" },
  { q: "He treats the design system as a shared product, not someone else's problem.", who: "Max Galchenko", role: "Senior React developer, Velora, on a different product team" },
  { q: "I learned a great deal from him during our time working together… his ability to distill complex problems into simple, elegant solutions set a high standard for design excellence.", who: "Dick De Leon", role: "Senior to Allen at Aplos" },
  { q: "Even while supporting multiple teams, he is always responsive, reliable, and easy to work with.", who: "Randy Douglas", role: "Software engineer, same team" },
  { q: "Allen's forward-thinking, North Star-guided approach and user-centric designs were also instrumental in crafting/communicating a motivational product vision for our teams.", who: "Eric Hua", role: "Product manager and founder, Forkestrate" },
];
