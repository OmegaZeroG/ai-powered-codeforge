import { NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Newsletter opt-in. Validates the email and acknowledges. Persistence is
 * intentionally decoupled — swap the marked block for your ESP / Prisma model
 * when one exists; the client contract stays the same.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email).trim().toLowerCase()
      : ""

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    )
  }

  // --- persist here (ESP subscribe / Prisma upsert) ---
  // Kept idempotent by design: a repeat email is a success, not an error.

  return NextResponse.json({ ok: true }, { status: 200 })
}
