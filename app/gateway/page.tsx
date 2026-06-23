"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions, getDailyIndex } from "@/lib/questions";
import Magnetic from "@/components/Magnetic";

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
  enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0 }),
};

export default function GatewayPage() {
  const router = useRouter();

  const [index, setIndex]     = useState(getDailyIndex);
  const [direction, setDir]   = useState(0);
  const [phase, setPhase]     = useState<Phase>("browse");

  const [answer, setAnswer]       = useState("");
  const [displayName, setDisplay] = useState("");
  const [showName, setShowName]   = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [responseCount, setCount] = useState<number | null>(null);

  const [visitorQ, setVisitorQ]             = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [askSent, setAskSent]               = useState(false);
  const [askExpanded, setAskExpanded]       = useState(false);

  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const inputFocused = useRef(false);
  const currentQ     = questions[index];

  // Lazy response count
  useEffect(() => {
    if (phase !== "browse") return;
    setCount(null);
    const t = setTimeout(async () => {
      try {
        const res  = await fetch(`/api/responses?questionId=${currentQ.id}&count=true`);
        const data = await res.json();
        setCount(typeof data.count === "number" ? data.count : null);
      } catch { /* silent */ }
    }, 400);
    return () => clearTimeout(t);
  }, [index, currentQ.id, phase]);

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
    setTimeout(() => router.push("/"), 700);
  }, [router]);

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

  function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
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

  return (
    <AnimatePresence>
      {phase !== "entering" && (
        <motion.div
          key="shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-background"
          style={{
            backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          {/* Attribution — top anchor */}
          <div className="absolute top-0 inset-x-0 h-20 flex items-end justify-center pb-2 pointer-events-none z-10">
            <p className="text-[9px] tracking-[0.28em] uppercase text-muted/55 select-none">
              Allen Kang
            </p>
          </div>

          {/* Main content — absolutely centered vertically */}
          <div className="absolute inset-x-0 px-8 md:px-16 lg:px-24"
               style={{ top: "50%", transform: "translateY(-50%)" }}>
          <AnimatePresence mode="wait">

            {/* ── Browse / Answer ──────────────────────────────────── */}
            {(phase === "browse" || phase === "submitting") && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-2xl"
              >
                {/* ── Question ── */}
                <Magnetic strength={0.025} radius={320}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.h1
                      key={index}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                      className="font-serif font-normal leading-[1.1]
                                 tracking-[-0.015em]
                                 text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]"
                    >
                      {currentQ.text}
                    </motion.h1>
                  </AnimatePresence>
                </Magnetic>

                {/* ── Meta row — floating pills ── */}
                <div className="mt-6 flex items-center gap-2 flex-wrap">
                  {/* Question counter pill */}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full
                                   bg-background/90 backdrop-blur-sm
                                   border border-foreground/[0.08]
                                   shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                                   text-[10px] tabular-nums text-muted/60 select-none">
                    {index + 1}&thinsp;/&thinsp;{questions.length}
                  </span>

                  {/* Response count pill — green tint, only when there are responses */}
                  {responseCount !== null && responseCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                                     bg-emerald-50 dark:bg-emerald-950/30
                                     border border-emerald-200/70 dark:border-emerald-800/40
                                     shadow-[0_1px_4px_rgba(0,0,0,0.05)]
                                     text-[10px] text-emerald-700 dark:text-emerald-400 select-none">
                      <span aria-hidden="true">↑</span>
                      {responseCount}
                    </span>
                  )}

                  {/* Navigation pill button */}
                  <Magnetic strength={0.38} radius={80}>
                    <button
                      onClick={goNext}
                      className="inline-flex items-center px-2.5 py-1 rounded-full
                                 bg-background/90 backdrop-blur-sm
                                 border border-foreground/[0.08]
                                 shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                                 text-[10px] text-muted/50
                                 hover:text-foreground hover:border-foreground/20
                                 transition-all duration-200"
                    >
                      show me something else
                    </button>
                  </Magnetic>

                  {/* Portfolio entry — equal weight to browsing */}
                  <Magnetic strength={0.3} radius={72}>
                    <button
                      onClick={handleEnter}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                                 bg-foreground text-background
                                 shadow-[0_1px_4px_rgba(0,0,0,0.10)]
                                 text-[10px]
                                 hover:opacity-75
                                 transition-all duration-200"
                    >
                      portfolio →
                    </button>
                  </Magnetic>
                </div>

                {/* ── Form ── */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-14 w-full max-w-md"
                  noValidate
                >
                  {/* Answer field */}
                  <div className="group border-b border-foreground/[0.12] focus-within:border-foreground/40 transition-colors duration-300 pb-px">
                    <textarea
                      ref={textareaRef}
                      value={answer}
                      onChange={onTextChange}
                      onFocus={() => { inputFocused.current = true; }}
                      onBlur={() => { inputFocused.current = false; }}
                      placeholder="Your answer"
                      rows={1}
                      maxLength={500}
                      style={{ resize: "none", overflow: "hidden" }}
                      className="w-full bg-transparent text-[14px] leading-[1.8]
                                 placeholder:text-muted/35 outline-none
                                 focus-visible:outline-none py-3 min-h-[48px]"
                      disabled={phase === "submitting"}
                    />
                  </div>

                  {/* Name field */}
                  <AnimatePresence>
                    {showName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-b border-foreground/[0.12] focus-within:border-foreground/40
                                   transition-colors duration-300 mt-6 pb-px overflow-hidden"
                      >
                        <input
                          type="text"
                          value={displayName}
                          onChange={e => setDisplay(e.target.value)}
                          onFocus={() => { inputFocused.current = true; }}
                          onBlur={() => { inputFocused.current = false; }}
                          placeholder="Name (optional)"
                          maxLength={80}
                          className="w-full bg-transparent text-[14px]
                                     placeholder:text-muted/35 outline-none
                                     focus-visible:outline-none py-2.5"
                          disabled={phase === "submitting"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="mt-10 flex items-center justify-between">
                    {!showName ? (
                      <button
                        type="button"
                        onClick={() => setShowName(true)}
                        className="text-[10px] tracking-[0.14em] uppercase text-muted/50
                                   hover:text-muted transition-colors"
                      >
                        Add name
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => { setShowName(false); setDisplay(""); }}
                        className="text-[10px] tracking-[0.14em] uppercase text-muted/50
                                   hover:text-muted transition-colors"
                      >
                        Remove name
                      </button>
                    )}

                    <Magnetic strength={0.38} radius={72}>
                      <button
                        type="submit"
                        disabled={phase === "submitting"}
                        className="text-[10px] tracking-[0.14em] uppercase text-foreground/65
                                   hover:text-foreground transition-colors disabled:opacity-40"
                      >
                        {phase === "submitting"
                          ? "Saving"
                          : answer.trim()
                          ? "Submit"
                          : "Enter"}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── Responses ────────────────────────────────────────── */}
            {phase === "responses" && (
              <motion.div
                key="responses"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-md"
              >
                {/* Question echo */}
                <p className="text-[9px] tracking-[0.24em] uppercase text-muted/55 mb-12">
                  {currentQ.text}
                </p>

                {/* Allen's answer */}
                {currentQ.allenAnswer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-10 pb-10 border-b border-foreground/[0.1]"
                  >
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted/55 mb-5">
                      Allen
                    </p>
                    <p className="font-serif font-normal italic text-[1.2rem] leading-[1.65]
                                  text-foreground/90">
                      &ldquo;{currentQ.allenAnswer}&rdquo;
                    </p>
                  </motion.div>
                )}

                {/* Others */}
                {responses.length > 0 && (
                  <>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted/55 mb-7">
                      Others
                    </p>
                    <div className="space-y-8 max-h-[40vh] overflow-y-auto no-scrollbar">
                      {responses.map((r, i) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.06 }}
                          className="pb-7 border-b border-foreground/[0.08] last:border-0 last:pb-0"
                        >
                          <p className="text-[14px] leading-[1.75] text-foreground/85">
                            {r.answer}
                          </p>
                          <p className="text-[9px] tracking-[0.16em] uppercase text-muted/50 mt-2.5">
                            — {r.display_name ?? "Anonymous"}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}

                {!currentQ.allenAnswer && responses.length === 0 && (
                  <p className="text-[13px] text-muted/60 text-center mb-8">
                    You&apos;re the first to answer this.
                  </p>
                )}

                {/* Ask Allen */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mt-12 pt-8 border-t border-foreground/[0.1]"
                >
                  {!askSent ? (
                    <>
                      <button
                        onClick={() => setAskExpanded(v => !v)}
                        className="w-full flex items-center justify-between group"
                      >
                        <span className="text-[10px] tracking-[0.14em] uppercase text-muted/55
                                         group-hover:text-muted transition-colors">
                          Ask Allen a question
                        </span>
                        <motion.span
                          animate={{ rotate: askExpanded ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-muted/40 text-base leading-none"
                          aria-hidden="true"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {askExpanded && (
                          <motion.form
                            key="ask"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28 }}
                            onSubmit={handleAsk}
                            className="space-y-5 mt-7 overflow-hidden"
                          >
                            <div className="border-b border-foreground/[0.12] focus-within:border-foreground/40 transition-colors pb-px">
                              <textarea
                                value={visitorQ}
                                onChange={e => setVisitorQ(e.target.value)}
                                onFocus={() => { inputFocused.current = true; }}
                                onBlur={() => { inputFocused.current = false; }}
                                placeholder="Your question"
                                rows={2}
                                maxLength={1000}
                                style={{ resize: "none" }}
                                className="w-full bg-transparent text-[14px] leading-[1.75]
                                           placeholder:text-muted/35 outline-none
                                           focus-visible:outline-none py-2.5"
                              />
                            </div>
                            <div className="border-b border-foreground/[0.12] focus-within:border-foreground/40 transition-colors pb-px">
                              <input
                                type="text"
                                value={visitorContact}
                                onChange={e => setVisitorContact(e.target.value)}
                                onFocus={() => { inputFocused.current = true; }}
                                onBlur={() => { inputFocused.current = false; }}
                                placeholder="Email, LinkedIn, or phone (if you'd like a reply)"
                                maxLength={200}
                                className="w-full bg-transparent text-[13px]
                                           placeholder:text-muted/30 outline-none
                                           focus-visible:outline-none py-2.5"
                              />
                            </div>
                            <div className="flex justify-end pt-1">
                              <button
                                type="submit"
                                disabled={!visitorQ.trim()}
                                className="text-[10px] tracking-[0.14em] uppercase
                                           text-foreground/60 hover:text-foreground
                                           transition-colors disabled:opacity-25"
                              >
                                Send
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] tracking-[0.12em] uppercase text-muted/55"
                    >
                      {visitorContact.trim()
                        ? "Sent. Allen will be in touch."
                        : "Sent."}
                    </motion.p>
                  )}
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-14 flex items-center justify-between"
                >
                  <button
                    onClick={() => {
                      setPhase("browse"); setAnswer(""); setDisplay("");
                      setShowName(false); setAskExpanded(false);
                      setAskSent(false); setVisitorQ(""); setVisitorContact("");
                    }}
                    className="text-[10px] tracking-[0.14em] uppercase text-muted/50
                               hover:text-muted transition-colors"
                  >
                    Browse more
                  </button>
                  <Magnetic strength={0.45} radius={100}>
                    <button
                      onClick={handleEnter}
                      className="font-serif font-normal text-[1.2rem] leading-none
                                 hover:opacity-50 transition-opacity"
                    >
                      Enter
                    </button>
                  </Magnetic>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
          </div>

          {/* Skip — bottom anchor (fallback for those who missed the pill) */}
          <div className="absolute bottom-0 inset-x-0 h-16 flex items-center justify-center">
            <AnimatePresence>
              {phase === "browse" && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  onClick={handleEnter}
                  className="text-[9px] tracking-[0.22em] uppercase
                             text-muted/30 hover:text-muted/55 transition-colors"
                >
                  Skip
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
