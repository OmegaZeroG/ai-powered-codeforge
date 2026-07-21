import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { createAndSendVerificationToken } from "@/lib/email-verification"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Credentials accounts start UNVERIFIED (emailVerified stays null). The
    // login gate in auth.ts blocks sign-in until they confirm via the emailed
    // link. (OAuth accounts are created pre-verified in the auth signIn
    // callback and never touch this route.)
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
      },
    })

    // Issue + send the confirmation email. Don't fail the signup if mail
    // sending hiccups — the account exists and they can request a resend.
    try {
      await createAndSendVerificationToken(user.id, user.email)
    } catch (err) {
      console.error("[signup] failed to send verification email:", err)
    }

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        // Signal to the client that login is gated on email confirmation.
        verificationRequired: true,
        message:
          "Account created. Check your email for a confirmation link to activate your account.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}