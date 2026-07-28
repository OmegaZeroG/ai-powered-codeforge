import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContestsLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <Skeleton className="mb-2 h-7 w-40" />
          <Skeleton className="mb-8 h-4 w-80 max-w-full" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
