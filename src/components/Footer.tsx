import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Blocks className="size-5" />
            <span>Made with 🖤 by 22cs 078 || 074 || 040</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/Team" className="text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Contacts
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
            >
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                View code:
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
