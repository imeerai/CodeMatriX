"use client"

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { motion } from "framer-motion"
import { Loader2, Play } from "lucide-react"
import { api } from "../../../../convex/_generated/api"
import { useMediaQuery } from "@/hooks/use-media-query"

function RunButton() {
  const { user } = useUser()
  const { runCode, language, isRunning } = useCodeEditorStore()
  const saveExecution = useMutation(api.codeExecutions.saveExecution)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleRun = async () => {
    await runCode()
    const result = getExecutionResult()

    if (user && result) {
      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      })
    }
  }

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-1.5 sm:gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white/90">
              {isMobile ? "Running..." : "Executing..."}
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white">
              {isMobile ? "Run" : "Run Code"}
            </span>
          </>
        )}
      </div>
    </motion.button>
  )
}
export default RunButton
