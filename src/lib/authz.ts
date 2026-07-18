// Central authorization helpers for the admin panel.
//
// Rule: never trust the middleware gate alone. Middleware runs on the edge and
// only narrows *routing*; it can be bypassed by internal calls, server actions
// invoked directly, or future refactors. So every admin page and every mutation
// re-derives the session and calls one of these helpers server-side.
import { redirect } from "next/navigation"
import type { Permission } from "@prisma/client"
import type { Session } from "next-auth"
import { auth } from "@/auth"

/** Does this session hold the given permission? Banned users always fail. */
export function hasPermission(
  session: Session | null,
  permission: Permission,
): boolean {
  if (!session?.user || session.user.banned) return false
  return session.user.permissions?.includes(permission) ?? false
}

/** Does this session hold at least one of the given permissions? */
export function hasAnyPermission(
  session: Session | null,
  permissions: Permission[],
): boolean {
  return permissions.some((p) => hasPermission(session, p))
}

/** True if the account is staff (holds any admin permission). */
export function isStaff(session: Session | null): boolean {
  if (!session?.user || session.user.banned) return false
  return (session.user.permissions?.length ?? 0) > 0
}

/**
 * Thrown by the require* helpers when authorization fails inside a server
 * action (where redirecting is not always appropriate). Callers can catch it
 * to return a structured error; uncaught, it surfaces as a 500 rather than
 * silently proceeding — failing closed.
 */
export class AuthorizationError extends Error {
  constructor(message = "Not authorized") {
    super(message)
    this.name = "AuthorizationError"
  }
}

/**
 * Load the current session and assert it holds `permission`. For use at the top
 * of admin server actions. Throws AuthorizationError (fail-closed) otherwise.
 * Returns the session so callers get the actor id without a second lookup.
 */
export async function requirePermission(
  permission: Permission,
): Promise<Session> {
  const session = await auth()
  if (!hasPermission(session, permission)) {
    throw new AuthorizationError(`Missing permission: ${permission}`)
  }
  return session as Session
}

/**
 * Page-level guard for admin routes: asserts the session holds `permission`,
 * redirecting non-holders away instead of throwing. Redirects to "/" (not the
 * login page) for signed-in-but-unauthorized users so the existence of /admin
 * is not advertised; unauthenticated users go to /login.
 */
export async function requirePermissionPage(
  permission: Permission,
): Promise<Session> {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  if (session.user.banned) {
    redirect("/banned")
  }
  if (!hasPermission(session, permission)) {
    redirect("/")
  }
  return session
}
