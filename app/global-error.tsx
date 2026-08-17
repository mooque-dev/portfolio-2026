"use client";

import { useEffect } from "react";

// Last-resort boundary: fires only when the root layout itself throws, so it
// replaces the whole document and cannot rely on the layout's fonts, Tailwind,
// or theme CSS. Everything here is self-contained and inlined on purpose.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          background: "#f7f4ec",
          color: "#141210",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <style>{`
          @media (prefers-color-scheme: dark) {
            body { background: #141210 !important; color: #f7f4ec !important; }
            .ge-btn { background: #ef5350 !important; }
            .ge-muted { color: #a8a29a !important; }
          }
        `}</style>
        <div style={{ maxWidth: "28rem" }}>
          <p
            className="ge-muted"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b6660",
              margin: "0 0 1rem",
            }}
          >
            Something broke
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            This page couldn&apos;t load
          </h1>
          <p
            className="ge-muted"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "#6b6660",
              margin: "1.5rem 0 2rem",
            }}
          >
            An unexpected error stopped the page from rendering. Try reloading,
            and if it keeps happening, come back in a bit.
          </p>
          <button
            type="button"
            onClick={reset}
            className="ge-btn"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "0.75rem 1.75rem",
              borderRadius: "0.75rem",
              background: "#cd2e3a",
              color: "#ffffff",
              fontSize: "0.9375rem",
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
