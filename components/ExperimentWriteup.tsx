"use client";

import { useState } from "react";
import Link from "next/link";

// The Life360 page's opening object: Fee Opt-In told as an experiment
// write-up. Six steps, from the problem to the next test. Every figure is
// from the case study (content/work/fee-opt-in-experimentation.mdx); the
// small checkout controls in the variants step are illustrative recreations.
// It opens on the result, fully drawn, so the first paint is complete.
// Motion only plays after a tap: the result number takes one breath and the
// bars grow in. Under reduced motion nothing moves. Sized in container units.
type StepKey = "problem" | "hypothesis" | "variants" | "metrics" | "result" | "next";

const STEPS: { key: StepKey; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "hypothesis", label: "Hypothesis" },
  { key: "variants", label: "Variants" },
  { key: "metrics", label: "Metrics" },
  { key: "result", label: "Result" },
  { key: "next", label: "Next test" },
];

type VariantKey = "control" | "slider" | "buttons" | "dropdown";
const VARIANTS: { key: VariantKey; label: string; note: string }[] = [
  { key: "control", label: "Control", note: "The existing fallback. It started empty, so doing nothing meant no fee." },
  { key: "slider", label: "Slider", note: "Starts at the full fee. A little less feels like a small step, not a cliff." },
  { key: "buttons", label: "Buttons", note: "Set amounts to pick from, with a soft decline kept in reach." },
  { key: "dropdown", label: "Dropdown", note: "A segmented menu of pre-framed choices, starting at the full fee." },
];

const BARS = [
  { label: "Original fee box", value: 75 },
  { label: "New box, old fallback", value: 82 },
  { label: "Slider fallback", value: 92, win: true },
];

function Bars({ animate }: { animate: boolean }) {
  return (
    <div className="xw-bars" role="img" aria-label="Fee opt-in: 75% with the original box, 82% with the new box and old fallback, 92% with the slider. The benchmark is 90%.">
      {BARS.map((b) => (
        <div key={b.label} className={`xw-bar${b.win ? " xw-win" : ""}`}>
          <span className="xw-bar-label">{b.label}</span>
          <span className="xw-track">
            <span className={`xw-fill${animate ? " xw-grow" : ""}`} style={{ width: `${b.value}%` }} />
            <span className="xw-bench" style={{ left: "90%" }} />
          </span>
          <span className="xw-bar-val">{b.value}%</span>
        </div>
      ))}
      <p className="xw-bench-note"><span className="xw-bench-key" aria-hidden /> 90% benchmark</p>
    </div>
  );
}

function VariantMock({ v }: { v: VariantKey }) {
  return (
    <div className="xw-mock" aria-hidden>
      <span className="xw-mock-row"><span>Cover the processing fee</span><span className="xw-mock-edit">Edit</span></span>
      {v === "control" && <span className="xw-field" />}
      {v === "slider" && (
        <span className="xw-slider"><span className="xw-slider-fill" /><span className="xw-thumb" /></span>
      )}
      {v === "buttons" && (
        <span className="xw-chips">
          <span className="on">Full</span><span>Less</span><span>Less still</span><span>None</span>
        </span>
      )}
      {v === "dropdown" && (
        <span className="xw-select"><span>Full fee</span><span className="xw-chev" /></span>
      )}
    </div>
  );
}

export default function ExperimentWriteup() {
  const [step, setStep] = useState<StepKey>("result");
  const [variant, setVariant] = useState<VariantKey>("slider");
  const [touched, setTouched] = useState(false);
  const go = (k: StepKey) => {
    setTouched(true);
    setStep(k);
  };
  const v = VARIANTS.find((x) => x.key === variant)!;

  return (
    <div className="xw-wrap">
      <div className="xw">
        <div className="xw-head">
          <span className="xw-title">Fee Opt-In</span>
          <span className="xw-chip">Shipped</span>
        </div>
        <p className="xw-sub">An A/B test on the moment a donor edits their fee</p>

        <div className="xw-steps" role="group" aria-label="Write-up sections">
          {STEPS.map((s, k) => (
            <button key={s.key} type="button" aria-pressed={s.key === step} aria-label={s.label} onClick={() => go(s.key)}>
              {k + 1}
            </button>
          ))}
        </div>

        <div key={step} className={`xw-body${touched ? " xw-in" : ""}`} aria-live="polite">
          <p className="xw-step-name">{STEPS.findIndex((s) => s.key === step) + 1}. {STEPS.find((s) => s.key === step)!.label}</p>

          {step === "problem" && (
            <>
              <p className="xw-lead">A new fee box lifted opt-in from 75% to 82%. It looked like a win.</p>
              <p className="xw-text">But the 12 to 20% of donors who clicked Edit landed in an older fallback that nudged them to the smallest fee. I argued to pause the rollout.</p>
            </>
          )}

          {step === "hypothesis" && (
            <blockquote className="xw-quote">
              Introducing a modernized fallback control when a donor clicks &ldquo;Edit&rdquo; will increase the average fee opt-in value while maintaining or improving the existing conversion rate.
            </blockquote>
          )}

          {step === "variants" && (
            <>
              <div className="xw-vtabs" role="group" aria-label="Variants">
                {VARIANTS.map((x) => (
                  <button key={x.key} type="button" aria-pressed={x.key === variant} onClick={() => setVariant(x.key)}>
                    {x.label}
                  </button>
                ))}
              </div>
              <VariantMock v={variant} />
              <p className="xw-text">{v.note}</p>
              <p className="xw-fine">Illustrative recreation. Four versions in all, tested in Pendo, each built ready to ship.</p>
            </>
          )}

          {step === "metrics" && (
            <dl className="xw-dl">
              <div><dt>Primary</dt><dd>Fee opt-in, against a 90% benchmark</dd></div>
              <div><dt>Guardrails</dt><dd>Conversion and average gift size, to hold steady</dd></div>
              <div><dt>Audience</dt><dd>The 12 to 20% of donors who click Edit</dd></div>
            </dl>
          )}

          {step === "result" && (
            <>
              <p className="xw-big"><span className={touched ? "xw-breathe" : undefined}>92%</span><span className="xw-big-note">fee opt-in with the slider, up from 75%</span></p>
              <Bars animate={touched} />
              <p className="xw-text">Conversion and average gift size held steady. The slider shipped across the platform.</p>
            </>
          )}

          {step === "next" && (
            <>
              <p className="xw-lead">Mobile, where 60%+ of giving happens.</p>
              <p className="xw-text">Nested scrolling hides the fee-and-total review. Next is one scroll, with the fee and Donate in the footer.</p>
            </>
          )}
        </div>

        <Link href="/work/fee-opt-in-experimentation" className="xw-link">Read the full case</Link>
      </div>
    </div>
  );
}
