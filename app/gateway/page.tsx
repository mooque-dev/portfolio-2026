"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions, getDailyIndex } from "@/lib/questions";
import FluidCursor from "@/components/FluidCursor";

type Phase = "browse" | "submitting" | "responses" | "asking" | "entering";

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
  exit:  (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
};

export default function GatewayPage() {
  const router = useRouter();

  // ── Question navigation ──────────────────────────────────────────────────
  const [index, setIndex]       = useState(getDailyIndex);
  const [direction, setDir]     = useState(0);

  // ── Flow ─────────────────────────────────────────────────────────────────
  const [phase, setPhase]       = useState<Phase>("browse");

  // ── Browse form ───────────────────────────────────────────────────────────
  const [answer, setAnswer]       = useState("");
  const [displayName, setDisplay] = useState("");
  const [showName, setShowName]   = useState(false);
  const [showHint, setShowHint]   = useState(true);

  // ── Responses ─────────────────────────────────────────────────────────────
  const [responses, setResponses]         = useState<Response[]>([]);
  const [responseCount, setResponseCount] = useState<number | null>(null);

  // ── Ask Allen ─────────────────────────────────────────────────────────────
  const [visitorQ, setVisitorQ]           = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [askSent, setAskSent]             = useState(false);
  const [askExpanded, setAskExpanded]     = useState(false);

  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const inputFocused = useRef(false);
  const currentQ     = questions[index];

  // Fade keyboard hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Lazily fetch response count (debounced 400 ms)
  useEffect(() => {
    if (phase !== "browse") return;
    setResponseCount(null);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/responses?questionId=${currentQ.id}&count=true`);
        const data = await res.json();
        setResponseCount(typeof data.count === "number" ? data.count : null);
      } catch { /* silent */ }
    }, 400);
    return () => clearTimeout(t);
  }, [index, currentQ.id, phase]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setDir(1);
    setIndex(i => (i + 1) % questions.length);
    setAnswer(""); setDisplay(""); setShowName(false);
  }, []);

  const goPrev = useCallback(() => {
    setDir(-1);
    setIndex(i => (i - 1 + questions.length) % questions.length);
    setAnswer(""); setDisplay(""); setShowName(false);
  }, []);

  const handleEnter = useCallback(() => {
    setVisitedCookie();
    setPhase("entering");
    setTimeout(() => router.push("/"), 650);
  }, [router]);

  // Keyboard nav (disabled when input focused)
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
  function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  // ── Submit answer ─────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) { handleEnter(); return; }

    setPhase("submitting");

    try {
      await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId:  currentQ.id,
          answer:      answer.trim(),
          displayName: displayName.trim() || null,
        }),
      });
    } catch { /* offline */ }

    try {
      const res  = await fetch(`/api/responses?questionId=${currentQ.id}`);
      const data = await res.json();
      setResponses(data.responses ?? []);
    } catch { setResponses([]); }

    setPhase("responses");
  }

  // ── Ask Allen ─────────────────────────────────────────────────────────────
  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!visitorQ.trim()) return;

    try {
      await fetch("/api/questions-for-allen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question:          visitorQ.trim(),
          contact:           visitorContact.trim() || null,
          contextQuestionId: currentQ.id,
        }),
      });
    } catch { /* silent */ }

    setAskSent(true);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {phase !== "entering" && (
        <motion.div
          key="shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background flex flex-col items-center
                     justify-center px-6 pb-16 relative"
        >
          <FluidCursor />

          {/* ── Browse / Answer phase ─────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {(phase === "browse" || phase === "submitting") && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
              >
                {/* Byline */}
                <p className="text-center text-[11px] tracking-widest uppercase
                              text-muted mb-14">
                  Allen Kang
                </p>

                {/* Question + arrows */}
                <div className="flex items-center gap-3">
                  <button onClick={goPrev} aria-label="Previous question"
                    className="shrink-0 p-2 -ml-2 text-muted hover:text-foreground
                               transition-colors rounded-full hover:bg-foreground/[0.04]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

                  <button onClick={goNext} aria-label="Next question"
                    className="shrink-0 p-2 -mr-2 text-muted hover:text-foreground
                               transition-colors rounded-full hover:bg-foreground/[0.04]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 2.5L9.5 7 5 11.5" />
                    </svg>
                  </button>
                </div>

                {/* Counter */}
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

                {/* Hint */}
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="text-center text-[10px] text-muted/40 mt-1 select-none"
                      aria-hidden="true"
                    >
                      ← → to browse · esc to enter
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-10 space-y-3" noValidate>
                  <textarea
                    ref={textareaRef}
                    value={answer}
                    onChange={onTextChange}
                    onFocus={() => { inputFocused.current = true; setShowHint(false); }}
                    onBlur={() => { inputFocused.current = false; }}
                    placeholder="Your answer (optional)"
                    rows={1}
                    maxLength={500}
                    style={{ resize: "none", overflow: "hidden" }}
                    className="w-full bg-transparent border-b border-border text-[15px]
                               leading-relaxed outline-none focus-visible:outline-none
                               focus:border-foreground transition-colors duration-300
                               placeholder:text-muted/50 py-3 min-h-[48px]"
                    disabled={phase === "submitting"}
                  />

                  <AnimatePresence>
                    {showName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
                        <input
                          type="text"
                          value={displayName}
                          onChange={e => setDisplay(e.target.value)}
                          onFocus={() => { inputFocused.current = true; }}
                          onBlur={() => { inputFocused.current = false; }}
                          placeholder="Your name"
                          maxLength={80}
                          className="w-full bg-transparent border-b border-border text-sm
                                     outline-none focus-visible:outline-none focus:border-foreground
                                     transition-colors duration-300 placeholder:text-muted/50 py-2.5"
                          disabled={phase === "submitting"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-2">
                    {!showName ? (
                      <button type="button" onClick={() => setShowName(true)}
                        className="text-xs text-muted hover:text-foreground transition-colors">
                        + add your name
                      </button>
                    ) : (
                      <button type="button"
                        onClick={() => { setShowName(false); setDisplay(""); }}
                        className="text-xs text-muted hover:text-foreground transition-colors">
                        − remove name
                      </button>
                    )}

                    <div className="flex items-center gap-5">
                      {answer.trim() && (
                        <button type="button"
                          onClick={() => { setAnswer(""); if (textareaRef.current) textareaRef.current.style.height = "auto"; }}
                          className="text-xs text-muted hover:text-foreground transition-colors">
                          clear
                        </button>
                      )}
                      <button type="submit" disabled={phase === "submitting"}
                        className="text-[13px] font-medium underline underline-offset-4
                                   decoration-1 hover:opacity-60 transition-opacity disabled:opacity-40">
                        {phase === "submitting" ? "saving…"
                          : answer.trim()        ? "submit →"
                          :                        "enter →"}
                      </button>
                    </div>
                  </div>

                  {/* Expectation-setter — only when there's something to reveal */}
                  {currentQ.allenAnswer && (
                    <p className="text-[11px] text-muted/50 text-right pt-1">
                      Submit to see Allen&apos;s answer
                    </p>
                  )}
                </form>
              </motion.div>
            )}

            {/* ── Responses phase ──────────────────────────────────────── */}
            {phase === "responses" && (
              <motion.div
                key="responses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md"
              >
                {/* Echo */}
                <p className="text-[11px] tracking-widest uppercase text-muted
                              text-center mb-10">
                  {currentQ.text}
                </p>

                {/* Allen's answer — first, prominent */}
                {currentQ.allenAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 pb-8 border-b border-border"
                  >
                    <p className="text-[11px] tracking-widest uppercase text-muted mb-3">
                      Allen said
                    </p>
                    <p className="font-serif text-[1.15rem] leading-relaxed">
                      &ldquo;{currentQ.allenAnswer}&rdquo;
                    </p>
                  </motion.div>
                )}

                {/* Others */}
                {responses.length > 0 ? (
                  <>
                    <p className="text-xs text-muted mb-6">Others said</p>
                    <div className="space-y-7 max-h-[36vh] overflow-y-auto no-scrollbar pr-1">
                      {responses.map((r, i) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.055, duration: 0.35 }}
                          className="border-b border-border pb-5 last:border-0 last:pb-0"
                        >
                          <p className="font-serif text-[1rem] leading-relaxed">
                            &ldquo;{r.answer}&rdquo;
                          </p>
                          <p className="text-[11px] text-muted mt-1.5">
                            — {r.display_name ?? "anonymous"}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  !currentQ.allenAnswer && (
                    <p className="text-sm text-muted mb-8">
                      You&apos;re the first to answer this.
                    </p>
                  )
                )}

                {/* Ask Allen section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 border-t border-border pt-8"
                >
                  {!askSent ? (
                    <>
                      <button
                        onClick={() => setAskExpanded(v => !v)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="text-sm text-muted hover:text-foreground transition-colors">
                          Have a question for Allen?
                        </span>
                        <motion.span
                          animate={{ rotate: askExpanded ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-muted text-lg leading-none"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {askExpanded && (
                          <motion.form
                            key="ask-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleAsk}
                            className="space-y-3 mt-5 overflow-hidden"
                          >
                            <textarea
                              value={visitorQ}
                              onChange={e => setVisitorQ(e.target.value)}
                              onFocus={() => { inputFocused.current = true; }}
                              onBlur={() => { inputFocused.current = false; }}
                              placeholder="What's your question?"
                              rows={2}
                              maxLength={1000}
                              style={{ resize: "none" }}
                              className="w-full bg-transparent border-b border-border text-[14px]
                                         leading-relaxed outline-none focus-visible:outline-none
                                         focus:border-foreground transition-colors placeholder:text-muted/50
                                         py-2.5"
                            />
                            <input
                              type="text"
                              value={visitorContact}
                              onChange={e => setVisitorContact(e.target.value)}
                              onFocus={() => { inputFocused.current = true; }}
                              onBlur={() => { inputFocused.current = false; }}
                              placeholder="Email, LinkedIn, or phone — if you want Allen to respond"
                              maxLength={200}
                              className="w-full bg-transparent border-b border-border text-[13px]
                                         outline-none focus-visible:outline-none focus:border-foreground
                                         transition-colors placeholder:text-muted/40 py-2.5"
                            />
                            <div className="flex items-center justify-between pt-1">
                              <p className="text-[11px] text-muted/50">
                                {visitorContact.trim()
                                  ? "Allen will try to reach you."
                                  : "No contact? Allen may answer publicly."}
                              </p>
                              <button
                                type="submit"
                                disabled={!visitorQ.trim()}
                                className="text-[13px] font-medium underline underline-offset-4
                                           decoration-1 hover:opacity-60 transition-opacity
                                           disabled:opacity-30"
                              >
                                send →
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-sm text-muted"
                    >
                      {visitorContact.trim()
                        ? "Sent. Allen will be in touch."
                        : "Sent. Keep an eye on this page — Allen may answer publicly."}
                    </motion.p>
                  )}
                </motion.div>

                {/* Footer row */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10 flex items-center justify-between"
                >
                  <button
                    onClick={() => {
                      setPhase("browse"); setAnswer("");
                      setDisplay(""); setShowName(false);
                      setAskExpanded(false); setAskSent(false);
                      setVisitorQ(""); setVisitorContact("");
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

          {/* Persistent escape */}
          {phase === "browse" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={handleEnter}
              className="absolute bottom-7 text-[11px] text-muted/50
                         hover:text-muted transition-colors tracking-wide"
            >
              Enter without answering
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
