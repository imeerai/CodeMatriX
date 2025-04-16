import { Terminal } from "lucide-react"

export function EditorPanelSkeleton() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl blur-2xl" />
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-3 sm:p-4 md:p-6 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="h-[280px] sm:h-[380px] md:h-[480px] lg:h-[580px] bg-[#1e1e2e]/50 backdrop-blur-sm p-2 sm:p-3 md:p-4">
            {/* Code line skeletons */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                <div className={`w-6 sm:w-8 md:w-12 h-3 sm:h-4 bg-white/5 rounded`} />
                <div className={`h-3 sm:h-4 bg-white/5 rounded`} style={{ width: `${Math.random() * 60 + 20}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-2 sm:mt-3 flex justify-end">
          <div className={`w-24 sm:w-32 md:w-40 h-5 sm:h-6 bg-white/5 rounded-lg`} />
        </div>
      </div>
    </div>
  )
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#181825] rounded-xl p-3 sm:p-4 ring-1 ring-gray-800/50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400/50" />
          </div>
          <div className={`w-12 sm:w-16 h-3 sm:h-4 bg-white/5 rounded`} />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] to-[#1a1a2e] rounded-xl -z-10" />
        <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-3 sm:p-4 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-4 bg-white/5 rounded-xl`} />
              <div className={`w-32 sm:w-40 md:w-48 h-3 sm:h-4 mx-auto bg-white/5 rounded`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 w-full">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  )
}
