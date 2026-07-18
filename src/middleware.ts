import { auth } from "@/auth"
import { NextResponse } from "next/server"

const PROTECTED_PREFIXES = ["/editor", "/topics", "/problems", "/profile"]

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  )

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    // Remember where the user was headed so login can send them back.
    loginUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    )
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/editor/:path*", "/topics/:path*", "/problems/:path*", "/profile/:path*"],
}
