import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { isBanActive } from "@/lib/ban"

// Next.js 16 renamed the edge "middleware" file convention to "proxy". Same
// runtime, same signature (auth()-wrapped handler + a matcher config); only the
// filename changed. This runs on the edge before a request reaches a route.

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

  // Banned users keep their session (bans can land mid-session) and MAY sign in,
  // but are confined to their profile page, where they see the suspension notice
  // and countdown. Any other protected route bounces them back to /profile.
  // Uses isBanActive() so an expired timed ban imposes no restriction -- no
  // background job needed to "lift" it. Staff are never profile-locked (a staff
  // account can't be banned via the panel anyway; this is belt-and-suspenders).
  const isStaffUser = (session?.user?.permissions?.length ?? 0) > 0
  if (
    isProtected &&
    !isStaffUser &&
    isBanActive(session?.user) &&
    !pathname.startsWith("/profile")
  ) {
    return NextResponse.redirect(new URL("/profile", origin))
  }

  // /admin is staff-only. This edge gate is defense-in-depth ONLY -- every admin
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
