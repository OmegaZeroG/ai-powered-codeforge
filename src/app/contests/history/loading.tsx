import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContestHistoryLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <Skeleton className="mb-2 h-7 w-48" />
          <Skeleton className="mb-6 h-4 w-72 max-w-full" />
          <div className="mb-6 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
