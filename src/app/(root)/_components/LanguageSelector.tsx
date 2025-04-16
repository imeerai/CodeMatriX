"use client"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { useEffect, useRef, useState } from "react"
import { LANGUAGE_CONFIG } from "../_constants"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react"
import useMounted from "@/hooks/useMounted"
import { useMediaQuery } from "@/hooks/use-media-query"

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const mounted = useMounted()
  const isMobile = useMediaQuery("(max-width: 640px)")

  const { language, setLanguage } = useCodeEditorStore()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentLanguageObj = LANGUAGE_CONFIG[language]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && langId !== "javascript") return

    setLanguage(langId)
    setIsOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-1.5 px-2 py-1.5 bg-[#1e1e2e]/80 
      rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700
       ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Decoration */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />

        <div className="size-4 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={currentLanguageObj.logoPath || "/placeholder.svg"}
            alt="programming language logo"
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>

        {!isMobile && (
          <span className="text-xs text-gray-200 min-w-[50px] text-left group-hover:text-white transition-colors">
            {currentLanguageObj.label}
          </span>
        )}

        <ChevronDownIcon
          className={`size-3 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-[#1e1e2e]/95 backdrop-blur-xl
           rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
            style={{
              left: isMobile ? "auto" : "auto",
              right: isMobile ? 0 : 0,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400">Select Language</p>
            </div>

            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                const isLocked = !hasAccess && lang.id !== "javascript"

                return (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group px-2"
                  >
                    <button
                      className={`
                      relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                      ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}
                    `}
                      onClick={() => handleLanguageSelect(lang.id)}
                      disabled={isLocked}
                    >
                      {/* decorator */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div
                        className={`
                         relative size-6 rounded-lg p-1 group-hover:scale-110 transition-transform
                         ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                       `}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                        <Image
                          width={24}
                          height={24}
                          src={lang.logoPath || "/placeholder.svg"}
                          alt={`${lang.label} logo`}
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>

                      <span className="flex-1 text-sm text-left group-hover:text-white transition-colors">
                        {lang.label}
                      </span>

                      {/* selected language border */}
                      {language === lang.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}

                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        language === lang.id && <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default LanguageSelector
