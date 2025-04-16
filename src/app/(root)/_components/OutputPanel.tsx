"use client"

import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react"
import { useState } from "react"
import RunningCodeSkeleton from "./RunningCodeSkeleton"
import { useMediaQuery } from "@/hooks/use-media-query"

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore()
  const [isCopied, setIsCopied] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 768px)")

  const hasContent = error || output

  const handleCopy = async () => {
    if (!hasContent) return
    await navigator.clipboard.writeText(error || output)
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }

  // Calculate height based on screen size
  const getOutputHeight = () => {
    if (isMobile) return "350px"
    if (isTablet) return "450px"
    return "600px"
  }

  return (
    <div className="relative bg-[#181825] rounded-xl border border-gray-800/30 shadow-xl overflow-hidden mt-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div
        className="relative bg-[#1e1e2e]/50 backdrop-blur-sm p-4 overflow-auto font-mono text-sm"
        style={{ height: getOutputHeight() }}
      >
        {isRunning ? (
          <RunningCodeSkeleton />
        ) : error ? (
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <div className="font-medium">Execution Error</div>
              <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Execution Successful</span>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-center">Run your code to see the output here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel
