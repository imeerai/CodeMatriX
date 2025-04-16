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
    if (isMobile) return "300px"
    if (isTablet) return "400px"
    return "600px"
  }

  return (
    <div className="relative bg-[#181825] rounded-xl p-3 sm:p-4 ring-1 ring-gray-800/50 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-300">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div
          className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-3 sm:p-4 overflow-auto font-mono text-xs sm:text-sm"
          style={{ height: getOutputHeight() }}
        >
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-2 sm:gap-3 text-red-400">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80 text-[10px] sm:text-xs">{error}</pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 mb-2 sm:mb-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300 text-[10px] sm:text-xs">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <p className="text-center text-xs sm:text-sm">Run your code to see the output here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OutputPanel
