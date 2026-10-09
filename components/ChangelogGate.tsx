"use client";

import { useActionState } from "react";
import { unlockChangelog } from "@/app/(portfolio)/changelog/actions";

// Password form shown in place of the changelog until it's unlocked.
export default function ChangelogGate() {
  const [state, action, pending] = useActionState(unlockChangelog, {});
  return (
    <form action={action} className="mt-10 max-w-sm">
      <label htmlFor="changelog-password" className="block text-sm font-medium">
        Password
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="changelog-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "changelog-error" : undefined}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-foreground px-4 py-2 text-[15px] font-medium text-background disabled:opacity-60"
        >
          {pending ? "Checking" : "Open"}
        </button>
      </div>
      <p id="changelog-error" role="alert" className="mt-2 min-h-[1.5em] text-sm text-[var(--seal)]">
        {state.error}
      </p>
    </form>
  );
}
