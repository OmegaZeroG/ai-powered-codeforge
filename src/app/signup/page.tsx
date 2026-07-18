import { redirect } from "next/navigation"

// There is no standalone signup page: the landing-page AuthModal is the single
// auth UI. Redirect to it with ?auth=signup, preserving any callbackUrl so the
// user still lands where they were originally headed after authenticating.
export default async function SignupRedirect({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams
  const params = new URLSearchParams({ auth: "signup" })
  if (callbackUrl && callbackUrl.startsWith("/")) {
    params.set("callbackUrl", callbackUrl)
  }
  redirect(`/?${params.toString()}`)
}
