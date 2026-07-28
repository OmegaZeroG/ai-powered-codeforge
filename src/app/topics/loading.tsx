import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function TopicsLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-ember-radial opacity-40" />
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
            <aside className="space-y-6">
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-56 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </aside>

            <div>
              <Skeleton className="mb-2 h-8 w-40" />
              <Skeleton className="mb-8 h-4 w-72 max-w-full" />
              <Skeleton className="mb-4 h-28 rounded-2xl" />
              <Skeleton className="mb-6 h-24 rounded-2xl" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl" />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
