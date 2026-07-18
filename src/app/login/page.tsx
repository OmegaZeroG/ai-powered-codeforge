import { redirect } from "next/navigation"

// There is no standalone login page: the landing-page AuthModal is the single
// auth UI. Redirect to it with ?auth=login, preserving any callbackUrl so the
// user still lands where they were originally headed after authenticating.
export default async function LoginRedirect({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams
  const params = new URLSearchParams({ auth: "login" })
  if (callbackUrl && callbackUrl.startsWith("/")) {
    params.set("callbackUrl", callbackUrl)
  }
  redirect(`/?${params.toString()}`)
}
