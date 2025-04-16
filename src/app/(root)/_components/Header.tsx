import { currentUser } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../../../../convex/_generated/api"
import Link from "next/link"
import { Blocks, Code2, Sparkles } from "lucide-react"
import { SignedIn } from "@clerk/nextjs"
import ThemeSelector from "./ThemeSelector"
import LanguageSelector from "./LanguageSelector"
import RunButton from "./RunButton"
import HeaderProfileBtn from "./HeaderProfileBtn"

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  const user = await currentUser()

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  })

  return (
    <header className="relative z-10">
      <div className="bg-[#0a0a0f]/90 backdrop-blur-xl border border-gray-800/30 rounded-xl shadow-lg">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
              />
              <div
                className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
                ring-white/10 group-hover:ring-white/20 transition-all"
              >
                <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                  CodeMatriX
                </span>
                <span className="text-xs text-blue-400/60 font-medium">Online IDE</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Link
                href="/snippets"
                className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 bg-gray-800/50 
                  hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                  to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  Snippets
                </span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                  to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                  transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">Pro</span>
              </Link>
            )}

            <SignedIn>
              <RunButton />
            </SignedIn>

            <div className="pl-3 border-l border-gray-800">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top Row - Logo and Profile */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800/30">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-1.5 rounded-lg ring-1 ring-white/10">
                <Blocks className="size-4 text-blue-400" />
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                CodeMatriX
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {!convexUser?.isPro && (
                <Link
                  href="/pricing"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-xs font-medium text-amber-400/90">Pro</span>
                </Link>
              )}
              <div className="relative">
                <HeaderProfileBtn />
              </div>
            </div>
          </div>

          {/* Bottom Row - Controls */}
          <div className="flex items-center justify-between px-3 py-2 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
              <Link
                href="/snippets"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800/50 border border-gray-800"
              >
                <Code2 className="w-3 h-3 text-gray-300" />
                <span className="text-xs text-gray-300">Snippets</span>
              </Link>
            </div>

            <SignedIn>
              <RunButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
