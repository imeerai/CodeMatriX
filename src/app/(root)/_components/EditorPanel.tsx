"use client"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { useEffect, useState } from "react"
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants"
import { Editor } from "@monaco-editor/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { RotateCcwIcon, ShareIcon, TypeIcon, MenuIcon } from "lucide-react"
import { useClerk } from "@clerk/nextjs"
import { EditorPanelSkeleton } from "./EditorPanelSkeleton"
import useMounted from "@/hooks/useMounted"
import ShareSnippetDialog from "./ShareSnippetDialog"
import { useMediaQuery } from "@/hooks/use-media-query"

function EditorPanel() {
  const clerk = useClerk()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 768px)")

  const mounted = useMounted()

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`)
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode
    if (editor) editor.setValue(newCode)
  }, [language, editor])

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size")
    if (savedFontSize) setFontSize(Number.parseInt(savedFontSize))
  }, [setFontSize])

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode
    if (editor) editor.setValue(defaultCode)
    localStorage.removeItem(`editor-code-${language}`)
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value)
  }

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24)
    setFontSize(size)
    localStorage.setItem("editor-font-size", size.toString())
  }

  if (!mounted) return null

  return (
    <div className="relative w-full">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="Logo"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-medium text-white">Code Editor</h2>
              <p className="text-[10px] sm:text-xs text-gray-500">Write and execute your code</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5"
            >
              <MenuIcon className="size-4 text-gray-400" />
            </button>
          )}

          {/* Desktop Controls */}
          {!isMobile && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Font Size Slider */}
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
                <TypeIcon className="size-3 sm:size-4 text-gray-400" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(Number.parseInt(e.target.value))}
                    className="w-16 sm:w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-400 min-w-[1.5rem] sm:min-w-[2rem] text-center">
                    {fontSize}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-1.5 sm:p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
                aria-label="Reset to default code"
              >
                <RotateCcwIcon className="size-3 sm:size-4 text-gray-400" />
              </motion.button>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsShareDialogOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg overflow-hidden bg-gradient-to-r
                from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
              >
                <ShareIcon className="size-3 sm:size-4 text-white" />
                <span className="text-xs sm:text-sm font-medium text-white">Share</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div className="mb-3 p-3 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5 space-y-3">
            {/* Font Size Control */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">Font Size</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(Number.parseInt(e.target.value))}
                  className="w-24 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-medium text-gray-400 min-w-[1.5rem] text-center">{fontSize}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1 p-1.5 bg-[#2a2a3a] rounded-lg ring-1 ring-white/5"
              >
                <RotateCcwIcon className="size-3 text-gray-400" />
                <span className="text-xs text-gray-400">Reset</span>
              </button>

              <button
                onClick={() => setIsShareDialogOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r
                from-blue-500 to-blue-600 opacity-90"
              >
                <ShareIcon className="size-3 text-white" />
                <span className="text-xs font-medium text-white">Share</span>
              </button>
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded && (
            <Editor
              height={isMobile ? "300px" : isTablet ? "400px" : "600px"}
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: !isMobile },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: isMobile ? 8 : 16, bottom: isMobile ? 8 : 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: isMobile ? 4 : 8,
                  horizontalScrollbarSize: isMobile ? 4 : 8,
                },
              }}
            />
          )}

          {!clerk.loaded && <EditorPanelSkeleton />}
        </div>
      </div>
      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </div>
  )
}
export default EditorPanel
