import { Skeleton } from "@/components/ui/skeleton"

export default function ProblemLoading() {
  return (
    <div className="h-screen w-screen bg-ink flex flex-col overflow-hidden">
      <div className="h-12 shrink-0 border-b border-edge" />
      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-[420px] shrink-0 border-r border-edge overflow-hidden px-6 py-6 min-h-0">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-7 w-48" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1" />
          <div className="h-56 border-t border-edge" />
        </div>
      </div>
    </div>
  )
}
