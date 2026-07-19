"use client"

// Renders an absolute instant in the VIEWER's local timezone. Contest times are
// stored as absolute instants (UTC in the DB); formatting them on the server
// would use the server's timezone and drift from what the admin picked in their
// browser. Doing it on the client guarantees WYSIWYG. A stable placeholder is
// rendered on the server pass (suppressHydrationWarning) to avoid a mismatch.
import { useEffect, useState } from "react"

export function LocalTime({
  value,
  className,
  withWeekday = true,
}: {
  value: string | number | Date
  className?: string
  withWeekday?: boolean
}) {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    const d = new Date(value)
    setText(
      d.toLocaleString("en-US", {
        weekday: withWeekday ? "short" : undefined,
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    )
  }, [value, withWeekday])

  return (
    <span className={className} suppressHydrationWarning>
      {text ?? "…"}
    </span>
  )
}
