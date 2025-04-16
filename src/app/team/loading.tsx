import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">Loading team information...</h3>
      </div>
    </div>
  )
}
