import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify email",
  description: "Confirm your email address to activate your CodeForge account.",
  robots: { index: false, follow: false },
}

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children
}
