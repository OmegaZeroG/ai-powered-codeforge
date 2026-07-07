import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isEditorPage = req.nextUrl.pathname.startsWith("/editor")

  if (isEditorPage && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ["/editor/:path*"],
}