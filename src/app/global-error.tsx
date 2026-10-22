"use client"

// Replaces the root layout when it itself fails, so it carries its own
// <html>/<body> and plain inline styles (no app CSS is guaranteed to load).
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1rem",
          background: "#0b0b0b",
          color: "#ededed",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          textAlign: "center",
        }}
      >
        <title>Something went wrong — CodeForge</title>
        <main style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 500, margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#8a8a8a", lineHeight: 1.6, marginTop: "1rem" }}>
            CodeForge hit an unexpected error. Try again, and if it keeps happening, reload
            the page.
          </p>
          {error.digest ? (
            <p style={{ color: "#5a5a5a", fontFamily: "monospace", fontSize: 12 }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              marginTop: "1.5rem",
              background: "#e5532a",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: "0.65rem 1.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
