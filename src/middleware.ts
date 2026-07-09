import { auth } from "@/auth"
import { NextResponse } from "next/server"

const PROTECTED_PREFIXES = ["/editor", "/topics", "/problems"]

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  )

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/editor/:path*", "/topics/:path*", "/problems/:path*"],
}
