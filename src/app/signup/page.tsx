"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setIsLoading(false)
        return
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (signInResult?.error) {
        setError("Account created, but sign in failed. Try logging in.")
        setIsLoading(false)
        return
      }

      router.push("/editor")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Create your account
        </h1>
        <p className="text-[#8888A8] text-sm mb-6">
          Start writing and running code with CodeForge.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#8888A8] mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1A1A24] text-[#F0F0FF] text-sm border border-[#2A2A38] rounded-md px-3 py-2 focus:outline-none focus:border-[#7C6AF7]"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888A8] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A24] text-[#F0F0FF] text-sm border border-[#2A2A38] rounded-md px-3 py-2 focus:outline-none focus:border-[#7C6AF7]"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888A8] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A24] text-[#F0F0FF] text-sm border border-[#2A2A38] rounded-md px-3 py-2 focus:outline-none focus:border-[#7C6AF7]"
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <p className="text-[#F87171] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C6AF7] hover:bg-[#9580FF] text-white text-sm font-medium rounded-md py-2.5 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-[#55556A] text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#7C6AF7] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}