import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Code editor",
  description:
    "A scratchpad for JavaScript, Python, C++, and Java: write code, feed it custom input, and run it in a sandbox.",
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return children
}
