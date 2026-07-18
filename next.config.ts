import type { NextConfig } from "next"

// Security response headers applied to every route. These are defense-in-depth:
// they don't replace server-side authz, but they harden the browser side
// against clickjacking, MIME sniffing, referrer leakage, and reduce the blast
// radius of any injected markup.
//
// Note on CSRF: next-auth v5 already ships CSRF protection for its own POST
// endpoints (double-submit token), and our mutations run as React Server
// Actions, which Next protects with an Origin check against the configured
// allowedOrigins — a cross-site form POST is rejected before the action runs.
// The headers below complement that rather than duplicating it.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
