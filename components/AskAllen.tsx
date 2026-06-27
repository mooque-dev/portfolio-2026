"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { STARTERS } from "@/lib/ask-allen";

type Msg = { role: "user" | "assistant"; content: string };

export default function AskAllen() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((m) => {
          const next = m.slice();
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch {
      setMessages((m) => {
        const next = m.slice();
        next[next.length - 1] = {
          role: "assistant",
          content: "Sorry — I couldn't reach the server. Try again, or email allen@mooque.xyz.",
        };
        return next;
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-2 print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="flex w-[88vw] max-w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-sm shadow-xl"
            role="dialog"
            aria-label="Ask Allen"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-[13px] font-medium">Ask about Allen</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted hover:text-foreground transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div ref={scrollRef} className="max-h-[48vh] min-h-[140px] overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-[13px] leading-relaxed text-muted">
                    Hi — ask me anything about Allen&apos;s work, background, or where to look.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted hover:text-foreground hover:border-foreground/40 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-foreground text-background rounded-br-sm"
                          : "border border-border text-foreground rounded-bl-sm"
                      }`}
                    >
                      {m.content || (
                        <span className="inline-flex gap-1" aria-label="Thinking">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Your question"
                maxLength={500}
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted/55"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="text-[11px] tracking-[0.12em] uppercase text-foreground/65 hover:text-foreground transition-colors disabled:opacity-30 min-h-[44px] inline-flex items-center px-1"
              >
                {busy ? "…" : "Send"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 backdrop-blur-sm px-3.5 py-2 text-[12px] shadow-sm hover:border-foreground/40 transition-colors min-h-[44px]"
          aria-label="Ask about Allen"
        >
          <span aria-hidden className="text-[13px]">✦</span>
          Ask about Allen
        </button>
      )}
    </div>
  );
}
