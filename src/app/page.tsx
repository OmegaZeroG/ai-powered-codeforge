import { auth } from "@/auth"
import { LandingPage } from "@/components/landing/LandingPage"

// The landing page doubles as the auth surface: /login and /signup redirect
// here with ?auth=login|signup (and an optional callbackUrl), which auto-opens
// the AuthModal. There is intentionally no standalone login/signup page.
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string; callbackUrl?: string }>
}) {
  const [session, params] = await Promise.all([auth(), searchParams])
  const initialAuthMode =
    params.auth === "login" || params.auth === "signup" ? params.auth : null

  return (
    <LandingPage
      isLoggedIn={Boolean(session?.user)}
      initialAuthMode={initialAuthMode}
      callbackUrl={params.callbackUrl}
    />
  )
}
