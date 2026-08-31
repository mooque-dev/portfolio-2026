"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level error boundary. Catches render/data errors from any segment below
// the root layout (including the (portfolio) group) and shows a branded recovery
// instead of Next's default overlay. Renders inside the root layout, so the
// fonts and Tailwind theme are available here.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real logger (Sentry, etc.) when ready.
    console.error("[route error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 h-16 flex items-center max-w-6xl mx-auto w-full">
        <Link
          href="/"
          className="leading-none hover:opacity-70 transition-opacity text-[26px] text-foreground"
          style={{ fontFamily: "var(--font-script)" }}
          aria-label="Allen Kang, go to home"
        >
          Allen Kang
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div className="-mt-16">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            Something broke
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight">
            Oops
          </h1>
          <p className="mt-6 text-lg text-muted max-w-md mx-auto">
            Something on this page didn&apos;t load the way it should. You can try
            again, or head back home.
          </p>
          <nav
            aria-label="Recovery"
            className="mt-10 flex items-center justify-center gap-6 text-sm"
          >
            <button
              type="button"
              onClick={reset}
              className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
            >
              Try again
            </button>
            <Link
              href="/"
              className="text-muted hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="text-muted hover:text-foreground transition-colors"
            >
              Work
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
