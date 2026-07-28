import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
            <aside className="space-y-6">
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </aside>

            <div>
              <Skeleton className="mb-2 mt-3 h-10 w-64" />
              <Skeleton className="mb-8 h-4 w-80 max-w-full" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-2xl" />
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <Skeleton className="h-64 rounded-2xl" />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
