import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const EMBER = "#e5532a"

// The link-preview card shown when the site is shared (Slack, LinkedIn, X,
// WhatsApp). Generated at build time, so it costs nothing at request time.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(229,83,42,0.35), rgba(11,11,11,0) 70%), #0b0b0b",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: EMBER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            CF
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Practice coding against a real judge.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9a9a9a" }}>
            Sandboxed judging · Adaptive difficulty · AI tutor · Rated contests
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", color: EMBER }}>
            {SITE.url.replace(/^https?:\/\//, "")}
          </div>
          <div style={{ display: "flex", color: "#6a6a6a" }}>Built by {SITE.author}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
