// Tiny presentational avatar for admin tables/headers. Uses the account image
// when present, otherwise renders initials — mirrors the profile page fallback
// so staff see the same face they'd see publicly.
export function Avatar({
  name,
  email,
  image,
  size = 32,
}: {
  name?: string | null
  email?: string | null
  image?: string | null
  size?: number
}) {
  const display = name || email?.split("@")[0] || "User"
  const initials =
    display
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"

  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full bg-foreground/10 object-cover"
      />
    )
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/40 font-display text-primary-foreground"
    >
      {initials}
    </span>
  )
}
