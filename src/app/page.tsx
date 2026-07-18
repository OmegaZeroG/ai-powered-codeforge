import { auth } from "@/auth"
import { LandingPage } from "@/components/landing/LandingPage"

export default async function Home() {
  const session = await auth()
  return <LandingPage isLoggedIn={Boolean(session?.user)} />
}
