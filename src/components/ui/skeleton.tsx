import { cn } from "@/lib/utils"

/** Generic shimmering placeholder block. Compose with className to match the
 *  shape of whatever it's standing in for (a card, a line of text, an avatar). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
    />
  )
}
