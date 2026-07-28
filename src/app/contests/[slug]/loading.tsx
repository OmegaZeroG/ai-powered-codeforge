import { ProductNav } from "@/components/ProductNav"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContestDetailLoading() {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <Skeleton className="mx-auto mb-4 h-5 w-32" />
            <Skeleton className="mx-auto mb-8 h-9 w-72 max-w-full" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </main>
      </div>
    </div>
  )
}
