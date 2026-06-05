"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyQuestion } from "@/lib/questions";

type Stage = "question" | "submitting" | "responses" | "entering";

interface Response {
  id: string;
  answer: string;
  display_name: string | null;
  created_at: string;
}

const COOKIE_NAME = "gateway-visited";

function setVisitedCookie() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `${COOKIE_NAME}=1; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export default function GatewayPage() {
  const router = useRouter();
  const question = getDailyQuestion();

  const [stage, setStage] = useState<Stage>("question");
  const [answer, setAnswer] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showNameField, setShowNameField] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [hasDB, setHasDB] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Delay input appearance — let the question land first
  useEffect(() => {
    const timer = setTimeout(() => setInputVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) {
      handleSkip();
      return;
    }

    setStage("submitting");

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          answer: answer.trim(),
          displayName: displayName.trim() || null,
        }),
      });
      const data = await res.json();
      if (data.offline) setHasDB(false);
    } catch {
      setHasDB(false);
    }

    // Fetch others' responses
    try {
      const res = await fetch(`/api/responses?questionId=${question.id}`);
      const data = await res.json();
      setResponses(data.responses ?? []);
    } catch {
      setResponses([]);
    }

    setStage("responses");
  }

  function handleSkip() {
    setVisitedCookie();
    setStage("entering");
    setTimeout(() => router.push("/"), 800);
  }

  function handleEnter() {
    setVisitedCookie();
    setStage("entering");
    setTimeout(() => router.push("/"), 800);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Ambient background — very subtle */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, var(--foreground) 0%, transparent 60%), radial-gradient(circle at 70% 80%, var(--foreground) 0%, transparent 60%)",
        }}
      />

      <AnimatePresence mode="wait">
        {/* ── Stage: Question + Input ── */}
        {(stage === "question" || stage === "submitting") && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl"
          >
            {/* Attribution — small, quiet */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs tracking-widest uppercase text-muted mb-12 text-center"
            >
              Allen Kang
            </motion.p>

            {/* The question */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] tracking-tight text-center mb-12"
            >
              {question.text}
            </motion.h1>

            {/* Input — appears after delay */}
            <AnimatePresence>
              {inputVisible && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <textarea
                      ref={textareaRef}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Your answer (optional)"
                      rows={3}
                      maxLength={500}
                      className="w-full bg-transparent border-b border-border text-base leading-relaxed resize-none focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted py-2 text-foreground"
                      disabled={stage === "submitting"}
                    />
                  </div>

                  {/* Optional name — the gate is open but you choose to walk through */}
                  <AnimatePresence>
                    {showNameField && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Your name (optional)"
                          maxLength={80}
                          className="w-full bg-transparent border-b border-border text-sm focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted py-2 text-foreground"
                          disabled={stage === "submitting"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      {!showNameField && (
                        <button
                          type="button"
                          onClick={() => setShowNameField(true)}
                          className="text-xs text-muted hover:text-foreground transition-colors"
                        >
                          + add your name
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="text-xs text-muted hover:text-foreground transition-colors"
                      >
                        skip
                      </button>
                      <button
                        type="submit"
                        disabled={stage === "submitting"}
                        className="text-sm text-foreground underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity disabled:opacity-40"
                      >
                        {stage === "submitting" ? "saving…" : answer.trim() ? "submit →" : "continue →"}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Stage: Responses ── */}
        {stage === "responses" && (
          <motion.div
            key="responses"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-xl"
          >
            {/* Repeat question softly */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs tracking-widest uppercase text-muted mb-6 text-center"
            >
              {question.text}
            </motion.p>

            {responses.length > 0 ? (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-muted mb-8 text-center"
                >
                  Others said
                </motion.p>

                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
                  {responses.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="border-b border-border pb-5 last:border-b-0"
                    >
                      <p className="text-base leading-relaxed text-foreground">
                        &ldquo;{r.answer}&rdquo;
                      </p>
                      <p className="text-xs text-muted mt-2">
                        {r.display_name ?? "anonymous"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted text-center mb-8"
              >
                {hasDB ? "You're the first to answer this." : "Thank you."}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: responses.length > 0 ? 0.5 + responses.length * 0.05 : 0.4 }}
              className="mt-10 text-center"
            >
              <button
                onClick={handleEnter}
                className="font-serif text-xl md:text-2xl font-normal hover:opacity-60 transition-opacity"
              >
                Come in →
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ── Stage: Transitioning out ── */}
        {stage === "entering" && (
          <motion.div
            key="entering"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-muted"
          >
            {" "}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
