"use client"

import type React from "react"

import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { useMutation } from "convex/react"
import { useState } from "react"
import { api } from "../../../../convex/_generated/api"
import { X } from "lucide-react"
import toast from "react-hot-toast"

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const { language, getCode } = useCodeEditorStore()
  const createSnippet = useMutation(api.snippets.createSnippet)

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSharing(true)

    try {
      const code = getCode()
      await createSnippet({ title, language, code })
      onClose()
      setTitle("")
      toast.success("Snippet shared successfully")
    } catch (error) {
      console.log("Error creating snippet:", error)
      toast.error("Error creating snippet")
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e2e] rounded-xl border border-gray-800/30 shadow-2xl p-4 w-full max-w-xs mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-white">Share Snippet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleShare}>
          <div className="mb-3">
            <label htmlFor="title" className="block text-xs font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1.5 bg-[#181825] border border-[#313244] rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter snippet title"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              disabled:opacity-50 shadow-lg"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ShareSnippetDialog
