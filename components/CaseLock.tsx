"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

// A soft lock for case studies about confidential products. The site is a
// static export and this repo is public, so this keeps casual visitors out,
// nothing more. Only a SHA-256 of the salted password is stored.
const SALT = "mooque/locked-case:";
const CHECK = "77b875fc9880fb9ef3d39ac57b442917f1041d9e34aade6938ecd0ad9fcf2dd2";
const STORE = "case-unlocked";

async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(SALT + value));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function CaseLock({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem(STORE) === CHECK;
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(saved);
  }, []);

  useEffect(() => {
    // Once unlocked, honour a #hash in the link, which had nowhere to land before.
    if (open && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if ((await hash(value)) === CHECK) {
      try {
        localStorage.setItem(STORE, CHECK);
      } catch {}
      setOpen(true);
    } else {
      setWrong(true);
    }
  };

  if (open) return <>{children}</>;
  if (open === null) return <div className="min-h-[60vh]" aria-hidden />;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-36 pb-32">
      <div className="max-w-[520px]">
        <p className="microlabel text-muted">Password protected</p>
        <h1 className="mt-3 text-[32px] md:text-[44px] leading-[1.08] font-medium tracking-[-0.03em] text-balance">
          {title.split(":")[0]}
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          This one covers a confidential product, so I share it with the teams I&rsquo;m
          talking to. If you don&rsquo;t have the password, email me at{" "}
          <a href="mailto:allensmkang@gmail.com" className="text-foreground underline underline-offset-4">
            allensmkang@gmail.com
          </a>
          .
        </p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="case-password" className="sr-only">
            Password
          </label>
          <input
            id="case-password"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setWrong(false);
            }}
            aria-invalid={wrong}
            aria-describedby={wrong ? "case-password-error" : undefined}
            className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-3.5 text-[15px] focus:border-foreground focus:outline-none"
            placeholder="Password"
          />
          <button type="submit" className="h-11 rounded-lg bg-foreground px-5 text-[15px] font-medium text-background hover:opacity-85 transition-opacity">
            Unlock
          </button>
        </form>
        {wrong && (
          <p id="case-password-error" role="alert" className="mt-3 text-[14px] text-[var(--seal)]">
            That isn&rsquo;t it. Check the capitals and symbols, or email me for it.
          </p>
        )}
      </div>
    </div>
  );
}
