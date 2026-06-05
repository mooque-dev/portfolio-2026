"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions, getDailyIndex } from "@/lib/questions";

type Phase = "browse" | "submitting" | "responses" | "entering";

interface Response {
  id: string;
  answer: string;
  display_name: string | null;
}

function setVisitedCookie() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `gateway-visited=1; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
};

export default function GatewayPage() {
  const router = useRouter();

  const [index, setIndex] = useState(getDailyIndex);
  const [direction, setDirection] = useState(0);
  const [phase, setPhase] = useState<Phase>("browse");
  const [answer, setAnswer] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showNameField, setShowNameField] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [responseCount, setResponseCount] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputFocused = useRef(false);
  const currentQ = questions[index];

  // Fade the keyboard hint after 4 s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Lazily fetch response count for current question (debounced 400 ms)
  useEffect(() => {
    if (phase !== "browse") return;
    setResponseCount(null);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/responses?questionId=${currentQ.id}&count=true`
        );
        const data = await res.json();
        setResponseCount(typeof data.count === "number" ? data.count : null);
      } catch {
        /* no Supabase configured — silent */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [index, currentQ.id, phase]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % questions.length);
    setAnswer("");
    setShowNameField(false);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + questions.length) % questions.length);
    setAnswer("");
    setShowNameField(false);
  }, []);

  const handleEnter = useCallback(() => {
    setVisitedCookie();
    setPhase("entering");
    setTimeout(() => router.push("/"), 650);
  }, [router]);

  // Keyboard navigation — only when textarea not focused
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (inputFocused.current) return;
      if (phase !== "browse") return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goPrev(); }
      if (e.key === "Escape")     handleEnter();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, goNext, goPrev, handleEnter]);

  // Auto-grow textarea
  function onTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) { handleEnter(); return; }

    setPhase("submitting");

    try {
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQ.id,
          answer: answer.trim(),
          displayName: displayName.trim() || null,
        }),
      });
    } catch { /* offline */ }

    try {
      const res = await fetch(`/api/responses?questionId=${currentQ.id}`);
      const data = await res.json();
      setResponses(data.responses ?? []);
    } catch {
      setResponses([]);
    }

    setPhase("responses");
  }

  return (
    <AnimatePresence>
      {phase !== "entering" && (
        <motion.div
          key="shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-16 relative"
        >
          {/* ── Browse + Answer phase ── */}
          <AnimatePresence mode="wait">
            {(phase === "browse" || phase === "submitting") && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md"
              >
                {/* Byline */}
                <p className="text-center text-[11px] tracking-widest uppercase text-muted mb-14">
                  Allen Kang
                </p>

                {/* Question carousel */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={goPrev}
                    aria-label="Previous question"
                    className="shrink-0 p-2 -ml-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-foreground/[0.04]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true">
                      <path d="M9 2.5L4.5 7 9 11.5" />
                    </svg>
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.h1
                        key={index}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                        className="font-serif text-[1.75rem] md:text-[2.1rem] font-normal
                                   leading-[1.25] tracking-tight text-center"
                      >
                        {currentQ.text}
                      </motion.h1>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={goNext}
                    aria-label="Next question"
                    className="shrink-0 p-2 -mr-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-foreground/[0.04]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true">
                      <path d="M5 2.5L9.5 7 5 11.5" />
                    </svg>
                  </button>
                </div>

                {/* Counter row */}
                <div className="mt-4 flex items-center justify-center gap-3 h-5">
                  <span className="text-[11px] tabular-nums text-muted/70">
                    {index + 1}&thinsp;/&thinsp;{questions.length}
                  </span>
                  {responseCount !== null && responseCount > 0 && (
                    <>
                      <span className="text-muted/30 text-[11px]">·</span>
                      <span className="text-[11px] text-muted/70">
                        {responseCount}{" "}
                        {responseCount === 1 ? "response" : "responses"}
                      </span>
                    </>
                  )}
                </div>

                {/* Keyboard hint */}
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="text-center text-[10px] text-muted/40 mt-1 select-none"
                      aria-hidden="true"
                    >
                      ← → to browse · esc to enter
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Answer form */}
                <form onSubmit={handleSubmit} className="mt-10 space-y-3" noValidate>
                  <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={onTextareaChange}
                    onFocus={() => { inputFocused.current = true; setShowHint(false); }}
                    onBlur={() => { inputFocused.current = false; }}
                    placeholder="Your answer (optional)"
                    rows={1}
                    maxLength={500}
                    style={{ resize: "none", overflow: "hidden" }}
                    className="w-full bg-transparent border-b border-border text-[15px]
                               leading-relaxed focus:outline-none focus:border-foreground
                               transition-colors duration-300 placeholder:text-muted/50
                               py-3 min-h-[48px]"
                    disabled={phase === "submitting"}
                  />

                  {/* Optional name */}
                  <AnimatePresence>
                    {showNameField && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          onFocus={() => { inputFocused.current = true; }}
                          onBlur={() => { inputFocused.current = false; }}
                          placeholder="Your name"
                          maxLength={80}
                          className="w-full bg-transparent border-b border-border text-sm
                                     focus:outline-none focus:border-foreground transition-colors
                                     duration-300 placeholder:text-muted/50 py-2.5"
                          disabled={phase === "submitting"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-2">
                    {!showNameField ? (
                      <button
                        type="button"
                        onClick={() => {
                          setShowNameField(true);
                          setTimeout(() => {
                            document
                              .querySelector<HTMLInputElement>('input[placeholder="Your name"]')
                              ?.focus();
                          }, 150);
                        }}
                        className="text-xs text-muted hover:text-foreground transition-colors"
                      >
                        + add your name
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setShowNameField(false); setDisplayName(""); }}
                        className="text-xs text-muted hover:text-foreground transition-colors"
                      >
                        − remove name
                      </button>
                    )}

                    <div className="flex items-center gap-5">
                      {answer.trim() && (
                        <button
                          type="button"
                          onClick={() => { setAnswer(""); if (textareaRef.current) { textareaRef.current.style.height = "auto"; }}}
                          className="text-xs text-muted hover:text-foreground transition-colors"
                        >
                          clear
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={phase === "submitting"}
                        className="text-[13px] font-medium underline underline-offset-4
                                   decoration-1 hover:opacity-60 transition-opacity
                                   disabled:opacity-40"
                      >
                        {phase === "submitting"
                          ? "saving…"
                          : answer.trim()
                          ? "submit →"
                          : "enter →"}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── Responses phase ── */}
            {phase === "responses" && (
              <motion.div
                key="responses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md"
              >
                {/* Echo the question */}
                <p className="text-[11px] tracking-widest uppercase text-muted text-center mb-10">
                  {currentQ.text}
                </p>

                {responses.length > 0 ? (
                  <>
                    <p className="text-xs text-muted text-center mb-8">
                      Others said
                    </p>
                    <div className="space-y-7 max-h-[48vh] overflow-y-auto no-scrollbar pr-1">
                      {responses.map((r, i) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.055, duration: 0.35 }}
                          className="border-b border-border pb-6 last:border-0 last:pb-0"
                        >
                          <p className="font-serif text-[1.05rem] leading-relaxed">
                            &ldquo;{r.answer}&rdquo;
                          </p>
                          <p className="text-[11px] text-muted mt-2">
                            — {r.display_name ?? "anonymous"}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted text-center mb-10">
                    You&apos;re the first to answer this.
                  </p>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 flex items-center justify-between"
                >
                  <button
                    onClick={() => {
                      setPhase("browse");
                      setAnswer("");
                      setDisplayName("");
                      setShowNameField(false);
                    }}
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    ← browse more
                  </button>
                  <button
                    onClick={handleEnter}
                    className="font-serif text-[1.4rem] font-normal hover:opacity-60 transition-opacity"
                  >
                    Come in →
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Persistent escape — always visible during browse ── */}
          {phase === "browse" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={handleEnter}
              className="absolute bottom-7 text-[11px] text-muted/50 hover:text-muted
                         transition-colors tracking-wide"
            >
              Enter without answering
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
