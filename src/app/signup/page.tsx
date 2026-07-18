"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
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

      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Create your account
        </h1>
        <p className="text-fg-muted text-sm mb-6">
          Start writing and running code with CodeForge.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-fg-muted mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-raised text-fg text-sm border border-edge rounded-md px-3 py-2 focus:outline-none focus:border-brand"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-fg-muted mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-raised text-fg text-sm border border-edge rounded-md px-3 py-2 focus:outline-none focus:border-brand"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-fg-muted mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-raised text-fg text-sm border border-edge rounded-md px-3 py-2 focus:outline-none focus:border-brand"
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <p className="text-wa text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand hover:bg-brand-bright text-white text-sm font-medium rounded-md py-2.5 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-fg-faint text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-brand hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <SignupForm />
    </Suspense>
  )
}