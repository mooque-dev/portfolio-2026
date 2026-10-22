// node cap.mjs <url> <out.png> <selector> [width] — captures one element at 2x.
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [url, out, sel, width = "1100"] = process.argv.slice(2);
const PORT = 9300 + Math.floor(Math.random() * 90);
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
await send("Emulation.setDeviceMetricsOverride", { width: +width, height: 1000, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url }); await sleep(2500);
const r = await ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return {x:b.left+scrollX,y:b.top+scrollY,w:b.width,h:b.height}})()`);
const { result } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
writeFileSync(out, Buffer.from(result.data, "base64")); console.log(JSON.stringify(r));
chrome.kill(); process.exit(0);
