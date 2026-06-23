import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

// Root-level 404: catches top-level URLs that don't match any route. The root
// layout has no Header/Footer (those live in the (portfolio) route group), so
// this page carries its own minimal logo + navigation to stay on-brand.
export default function NotFound() {
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
          <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
            Error 404
          </p>
          <h1 className="font-serif text-7xl md:text-9xl font-bold tracking-tight">
            404
          </h1>
          <p className="mt-6 text-lg text-muted max-w-md mx-auto">
            This page doesn&apos;t exist. It may have been moved or removed.
          </p>
          <nav
            aria-label="Recovery"
            className="mt-10 flex items-center justify-center gap-6 text-sm"
          >
            <Link
              href="/"
              className="underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="text-muted hover:text-foreground transition-colors"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-muted hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
