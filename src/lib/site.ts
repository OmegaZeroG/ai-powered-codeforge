// Single source of truth for site-wide identity: used by metadata, the footer,
// robots, and the Open Graph image so they can never drift apart.
export const SITE = {
  name: "CodeForge",
  tagline: "Adaptive coding practice with a real judge",
  description:
    "CodeForge is a self-hosted DSA judge and learning platform: sandboxed code judging, adaptive difficulty, a Socratic AI tutor, and weekly rated contests.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeforge-rust-xi.vercel.app",
  author: "Om Pathrabe",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "ompathrabe10@gmail.com",
  github: "https://github.com/OmegaZeroG",
} as const
