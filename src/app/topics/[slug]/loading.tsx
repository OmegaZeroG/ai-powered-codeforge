import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function TopicDetailLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-3xl px-6 py-10">
          <Skeleton className="mb-4 h-4 w-24" />
          <Skeleton className="mb-2 mt-3 h-10 w-56" />
          <Skeleton className="mb-8 h-4 w-96 max-w-full" />
          <section className="mt-12 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
