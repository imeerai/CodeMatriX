import { Terminal } from "lucide-react"

export function EditorPanelSkeleton() {
  return (
    <div className="relative w-full">
      <div className="relative bg-[#12121a]/95 backdrop-blur rounded-xl border border-white/[0.05] shadow-xl overflow-hidden">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1e1e2e] rounded-lg"></div>
            <div className="space-y-1">
              <div className="w-24 h-4 bg-white/5 rounded"></div>
              <div className="w-36 h-3 bg-white/5 rounded"></div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32 h-8 bg-[#1e1e2e] rounded-lg"></div>
            <div className="w-8 h-8 bg-[#1e1e2e] rounded-lg"></div>
            <div className="w-24 h-8 bg-blue-500/30 rounded-lg"></div>
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="h-[350px] sm:h-[450px] md:h-[600px] bg-[#1e1e2e]/50 p-4">
          {/* Code line skeletons */}
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-3">
              <div className={`w-12 h-4 bg-white/5 rounded`} />
              <div className={`h-4 bg-white/5 rounded`} style={{ width: `${Math.random() * 60 + 20}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#181825] rounded-xl border border-gray-800/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400/50" />
          </div>
          <div className={`w-16 h-4 bg-white/5 rounded`} />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="h-[350px] sm:h-[450px] md:h-[600px] bg-[#1e1e2e]/50 p-4">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl`} />
            <div className={`w-48 h-4 mx-auto bg-white/5 rounded`} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  )
}
