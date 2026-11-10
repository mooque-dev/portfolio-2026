// node drafts/pipeline/audit-pages.mjs <baseUrl> <outDir> slug [slug...]
// The quality pass that check-pages.mjs doesn't do. Loads each page in light
// and dark and reports: errors in the console, files that fail to load,
// images with no alt text, links and buttons with no name, heading order,
// a missing title or description, and text too faint to read (WCAG AA).
// Writes every link it saw to <outDir>/links.json so they can be checked.
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [base, outDir, ...slugs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const PORT = 9800 + Math.floor(Math.random() * 90);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let info; for (let i = 0; i < 60; i++) { try { info = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (info.find((t) => t.type === "page")) break; } catch {} await sleep(200); }
const ws = new WebSocket(info.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map(); let events = [];
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } else if (m.method) events.push(m); });
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable"); await send("Log.enable");

const PROBE = `(() => {
  const out = [];
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && parseFloat(s.opacity) > 0.05; };
  const label = (el) => (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").trim() || [...el.querySelectorAll("img[alt], svg title")].map((x) => x.getAttribute("alt") || x.textContent).join("").trim();
  if (!document.title.trim()) out.push("no page title");
  const d = document.querySelector('meta[name="description"]'); if (!d || !d.content.trim()) out.push("no description");
  const h1s = [...document.querySelectorAll("h1")].filter(vis); if (h1s.length !== 1) out.push(h1s.length + " h1 headings");
  let last = 0; for (const h of [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter(vis)) { const n = +h.tagName[1]; if (last && n > last + 1) { out.push("heading jumps h" + last + " to h" + n + ": " + h.textContent.trim().slice(0, 30)); break; } last = n; }
  const noAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")); if (noAlt.length) out.push(noAlt.length + " images without alt: " + (noAlt[0].getAttribute("src") || "").slice(0, 60));
  const broken = [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute("src")); if (broken.length) out.push(broken.length + " images failed: " + broken[0].getAttribute("src").slice(0, 60));
  const unnamed = [...document.querySelectorAll("a, button")].filter((el) => vis(el) && !label(el)); if (unnamed.length) out.push(unnamed.length + " links or buttons with no name: " + unnamed[0].outerHTML.slice(0, 80));
  // Contrast: text against the nearest solid background. Skips text over images and gradients.
  // Any CSS colour (rgb, oklab, color-mix) painted onto a canvas pixel and read back as r, g, b, alpha.
  const cx = Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true });
  const seen = new Map();
  const rgb = (c) => { if (seen.has(c)) return seen.get(c); cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; const a = d[3] / 255; const v = a ? [d[0], d[1], d[2], a] : [0, 0, 0, 0]; seen.set(c, v); return v; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const over = (top, under) => { const a = top[3] === undefined ? 1 : top[3]; return [0, 1, 2].map((i) => top[i] * a + under[i] * (1 - a)); };
  const behind = (el) => { let stack = []; for (let p = el; p; p = p.parentElement) { const cs = getComputedStyle(p); if (cs.backgroundImage !== "none") return null; if (parseFloat(cs.opacity) < 1 && p !== el) return null; const v = rgb(cs.backgroundColor); if (v.length && (v[3] === undefined || v[3] > 0)) { stack.push(v); if (v[3] === undefined || v[3] === 1) break; } } if (!stack.length) return null; let base = stack[stack.length - 1]; if (base[3] !== undefined && base[3] < 1) base = over(base, [255, 255, 255]); for (let i = stack.length - 2; i >= 0; i--) base = over(stack[i], base); return base; };
  const faint = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode()); ) {
    const t = n.nodeValue.trim(); if (t.length < 3) continue;
    const el = n.parentElement; if (!el || !vis(el) || el.closest("[aria-hidden=true], svg, .sr-only, .skip-link")) continue;
    const cs = getComputedStyle(el); if (parseFloat(cs.opacity) < 1) continue;
    const bg = behind(el); if (!bg) continue;
    const fg = over(rgb(cs.color), bg); const size = parseFloat(cs.fontSize); const big = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight) >= 700);
    const r = ratio(fg, bg); if (r < (big ? 3 : 4.5)) { const k = cs.color + " on " + bg.map(Math.round).join(","); if (!faint.has(k)) faint.set(k, { r: r.toFixed(2), n: 0, eg: t.slice(0, 30), size }); faint.get(k).n++; }
  }
  for (const [k, v] of [...faint].sort((a, b) => a[1].r - b[1].r).slice(0, 4)) out.push("faint text " + v.r + ":1 (" + v.n + "x, " + v.size + "px) " + k + ' e.g. "' + v.eg + '"');
  const links = [...document.querySelectorAll("a[href]")].map((a) => a.href).filter((h) => /^https?:/.test(h));
  return { out, links };
})()`;

const allLinks = {}; const report = {};
for (const slug of slugs) {
  const found = [];
  for (const mode of ["light", "dark"]) {
    events = [];
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: mode }] });
    await send("Page.navigate", { url: `${base}/${slug}${slug ? "/" : ""}` }); await sleep(1500);
    await ev(mode === "dark" ? `localStorage.setItem("theme","dark"); document.documentElement.classList.add("dark")` : `localStorage.removeItem("theme"); document.documentElement.classList.remove("dark")`);
    await ev("window.scrollTo(0, document.body.scrollHeight)"); await sleep(700); await ev("window.scrollTo(0, 0)"); await sleep(300);
    const res = await ev(PROBE);
    for (const i of res?.out || []) found.push(`${mode}: ${i}`);
    for (const l of res?.links || []) { const on = (allLinks[l] ||= []); if (!on.includes(slug)) on.push(slug); }
    for (const m of events) {
      if (m.method === "Runtime.exceptionThrown") found.push(`${mode}: script error: ${(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 120)}`);
      if (m.method === "Log.entryAdded" && m.params.entry.level === "error" && !/favicon/.test(m.params.entry.url || "")) found.push(`${mode}: console error: ${m.params.entry.text.slice(0, 110)} ${(m.params.entry.url || "").slice(0, 70)}`);
      if (m.method === "Network.responseReceived" && m.params.response.status >= 400) found.push(`${mode}: ${m.params.response.status} ${m.params.response.url.slice(0, 100)}`);
    }
  }
  await ev(`localStorage.removeItem("theme")`);
  // The same finding in both modes prints once.
  const merged = new Map(); for (const f of found) { const [m, ...rest] = f.split(": "); const k = rest.join(": "); merged.set(k, merged.has(k) ? "both" : m); }
  report[slug] = [...merged].map(([k, m]) => `${m}: ${k}`);
  console.log(report[slug].length ? `${slug || "home"}:\n` + report[slug].map((v) => "  " + v).join("\n") : `${slug || "home"}: ok`);
}
writeFileSync(join(outDir, "audit.json"), JSON.stringify(report, null, 1));
writeFileSync(join(outDir, "links.json"), JSON.stringify(allLinks, null, 1));
chrome.kill(); process.exit(0);
