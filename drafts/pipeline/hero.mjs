// node hero.mjs <url> <out.png> [width] [height] [dark] [clickSel]: viewport shot at 1x.
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [url, out, width = "1280", height = "860", dark = "", click = ""] = process.argv.slice(2);
const PORT = 9400 + Math.floor(Math.random() * 90);
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
await send("Emulation.setDeviceMetricsOverride", { width: +width, height: +height, deviceScaleFactor: 1, mobile: +width < 600 });
await send("Page.navigate", { url }); await sleep(5000);
await ev(dark ? 'document.documentElement.classList.add("dark")' : 'document.documentElement.classList.remove("dark")');
await ev("document.fonts && document.fonts.ready.then(()=>1)");
await ev("window.dispatchEvent(new Event('resize'))");
if (click) { await ev(`(()=>{const b=document.querySelectorAll(${JSON.stringify(click.split("@")[0])})[${+(click.split("@")[1]||0)}]; b && b.click(); return !!b})()`); }
await sleep(1800);
const { result } = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(out, Buffer.from(result.data, "base64"));
const errs = await ev("JSON.stringify([document.title, document.querySelector('h1')?.textContent?.trim()])"); console.log(errs);
chrome.kill(); process.exit(0);
