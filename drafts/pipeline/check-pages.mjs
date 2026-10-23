// node drafts/pipeline/check-pages.mjs <baseUrl> <outDir> slug [slug...]
// Loads each page at phone, tablet, laptop and wide widths and reports
// sideways scrolling, elements poking past the screen edge, the headline
// running into the opening object, and clipped headlines. Saves one contact
// sheet per page (the first screen at each width) for a visual pass.
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [base, outDir, ...slugs] = process.argv.slice(2);
const WIDTHS = [375, 768, 1024, 1280, 1440];
const DARK_WIDTH = 1280; // one extra pass in dark mode, for colours
mkdirSync(outDir, { recursive: true });
const PORT = 9700 + Math.floor(Math.random() * 90);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let info; for (let i = 0; i < 60; i++) { try { info = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (info.find((t) => t.type === "page")) break; } catch {} await sleep(200); }
const ws = new WebSocket(info.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable"); await send("Runtime.enable");

const PROBE = `(() => {
  const vw = innerWidth, out = [];
  const sw = document.documentElement.scrollWidth;
  if (sw > vw + 1) out.push("page scrolls sideways (" + sw + "px wide at " + vw + ")");
  const name = (el) => el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\\s+/).slice(0, 2).join(".") : "");
  const art = document.querySelector("article") || document.body;
  const pokes = [];
  for (const el of art.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    let clipped = false; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(s.overflowX)) { const pr = p.getBoundingClientRect(); if (pr.right <= vw + 1) { clipped = true; break; } } }
    if (!clipped && (r.right > vw + 1 || r.left < -1) && !el.closest(".brand-hero, .brand-foot")) pokes.push(name(el) + " " + Math.round(r.left) + "-" + Math.round(r.right));
  }
  if (pokes.length) out.push("past the edge: " + pokes.slice(0, 3).join(" | ") + (pokes.length > 3 ? " (+" + (pokes.length - 3) + ")" : ""));
  const h1 = art.querySelector("h1"), obj = art.querySelector(".sig-obj, .mx-card");
  if (h1 && obj) { const a = h1.getBoundingClientRect(), b = obj.getBoundingClientRect(); if (a.right > b.left + 2 && a.left < b.right && a.bottom > b.top && a.top < b.bottom) out.push("headline overlaps the opening object"); }
  if (h1 && h1.scrollWidth > h1.clientWidth + 2) out.push("headline is wider than its column");
  for (const el of art.querySelectorAll("a, button")) { const r = el.getBoundingClientRect(); if (vw < 600 && r.width > 0 && r.height > 0 && r.height < 32 && el.closest(".brand-hero, .brand-foot, .mx-hero, .mx-end") && /rounded-full|mx-btn|mx-ghost|brand-cta/.test(el.className)) { out.push("small tap target: " + el.textContent.trim().slice(0, 20)); break; } }
  if (vw < 600) {
    for (const el of art.querySelectorAll("p, li, span")) {
      const t = (el.innerText || "").trim(); const r = el.getBoundingClientRect();
      if (t.length > 70 && r.width > 0 && r.width < vw * 0.45 && getComputedStyle(el).display !== "inline") { out.push("text squeezed into a narrow column: " + t.slice(0, 30)); break; }
    }
  }
  return out;
})()`;

const DARK_PROBE = `(() => {
  const rgb = (c) => (c.match(/[\\d.]+/g) || []).slice(0, 4).map(Number);
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  // The nearest solid background behind an element; null when a gradient or pattern sits there (can't judge).
  const behind = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const cs = getComputedStyle(p); if (cs.backgroundImage !== "none") return null; const v = rgb(cs.backgroundColor); if (v.length && (v[3] === undefined || v[3] > 0.5)) return v; } return null; };
  const out = [];
  for (const el of document.querySelectorAll("article .brand-cta, article .mx-btn")) {
    const s = getComputedStyle(el); const bg = rgb(s.backgroundColor); if (!bg.length || bg[3] === 0) continue;
    const name = el.textContent.trim().slice(0, 18);
    if (ratio(bg, rgb(s.color)) < 3) { out.push("dark mode: button text hard to read (" + name + ")"); continue; }
    const back = behind(el); if (!back) continue;
    const outlined = parseFloat(s.borderTopWidth) >= 1 && ratio(rgb(s.borderTopColor), back) >= 1.5;
    if (!outlined && ratio(bg, back) < 1.15) out.push("dark mode: button blends into its background (" + name + ")");
  }
  return [...new Set(out)];
})()`;
const report = {};
for (const slug of slugs) {
  report[slug] = {};
  const shots = [];
  for (const w of WIDTHS) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 600 });
    await send("Page.navigate", { url: `${base}/${slug}/` }); await sleep(2600);
    await ev("document.fonts && document.fonts.ready.then(()=>1)"); await sleep(300);
    const issues = await ev(PROBE);
    report[slug][w] = issues;
    const { result } = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: w, height: 900, scale: 0.5 } });
    shots.push({ w, data: result.data });
  }
  // Dark mode: every button must stand out from what is behind it and its own text.
  await send("Emulation.setDeviceMetricsOverride", { width: DARK_WIDTH, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
  await send("Page.navigate", { url: `${base}/${slug}/` }); await sleep(2600);
  await ev(`localStorage.setItem("theme","dark"); document.documentElement.classList.add("dark")`); await sleep(400);
  report[slug].dark = await ev(DARK_PROBE);
  await send("Emulation.setEmulatedMedia", { features: [] });
  await ev(`localStorage.removeItem("theme")`);
  writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(shots.map((s) => s.w)));
  shots.forEach((s) => writeFileSync(join(outDir, `${slug}-${s.w}.png`), Buffer.from(s.data, "base64")));
  const bad = Object.entries(report[slug]).filter(([, v]) => v.length);
  console.log(bad.length ? `${slug}:\n` + bad.map(([w, v]) => `  ${w}px  ${v.join("; ")}`).join("\n") : `${slug}: ok`);
}
writeFileSync(join(outDir, "report.json"), JSON.stringify(report, null, 1));
chrome.kill(); process.exit(0);
