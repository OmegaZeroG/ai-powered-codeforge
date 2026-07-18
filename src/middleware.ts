import { auth } from "@/auth"
import { NextResponse } from "next/server"

// Routes that require a logged-in user.
const PROTECTED_PREFIXES = ["/editor", "/topics", "/problems", "/profile", "/admin"]

export default auth((req) => {
  const { pathname, search, origin } = req.nextUrl
  const session = req.auth
  const isLoggedIn = !!session

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", origin)
    // Remember where the user was headed so login can send them back.
    loginUrl.searchParams.set("callbackUrl", pathname + search)
    return NextResponse.redirect(loginUrl)
  }

  // Banned users retain a session (bans can land mid-session) but must not reach
  // any protected area. Route them to an informational page instead.
  if (isProtected && session?.user?.banned && pathname !== "/banned") {
    return NextResponse.redirect(new URL("/banned", origin))
  }

  // /admin is staff-only. This edge gate is defense-in-depth ONLY — every admin
  // page and server action re-checks the specific permission server-side (see
  // src/lib/authz.ts). Non-staff are redirected to "/" rather than /login so the
  // existence of the admin panel is not advertised to ordinary users.
  if (pathname.startsWith("/admin")) {
    const permissions = session?.user?.permissions ?? []
    const isStaff = permissions.length > 0
    if (!isStaff) {
      return NextResponse.redirect(new URL("/", origin))
    }
  }
})

export const config = {
  matcher: [
    "/editor/:path*",
    "/topics/:path*",
    "/problems/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
}
