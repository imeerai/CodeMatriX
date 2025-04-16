function ProfileHeaderSkeleton() {
  return (
    <div
      className="relative mb-4 sm:mb-6 md:mb-8 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-4 sm:p-6 md:p-8 border
     border-gray-800/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        {/* Avatar Skeleton */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl" />
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-800/80 animate-pulse relative z-10 border-4 border-gray-800/50" />
          <div
            className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500/50 
          to-purple-600/50 rounded-full z-20 animate-pulse"
          />
        </div>

        {/* User Info Skeleton */}
        <div className="space-y-3 w-full sm:w-auto text-center sm:text-left">
          <div className="h-6 sm:h-8 w-48 max-w-full mx-auto sm:mx-0 bg-gray-800/80 rounded animate-pulse" />
          <div className="h-4 sm:h-5 w-32 max-w-full mx-auto sm:mx-0 bg-gray-800/80 rounded animate-pulse" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 sm:mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative p-4 rounded-xl bg-gray-800/20 border border-gray-800/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-5" />
            <div className="relative space-y-4">
              {/* Stat Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 w-16 sm:w-24 bg-gray-800/80 rounded animate-pulse" />
                  <div className="h-6 sm:h-8 w-12 sm:w-16 bg-gray-800/80 rounded animate-pulse" />
                  <div className="h-3 sm:h-4 w-20 sm:w-32 bg-gray-800/80 rounded animate-pulse" />
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-800/80 animate-pulse" />
              </div>

              {/* Stat Footer */}
              <div className="pt-3 sm:pt-4 border-t border-gray-800/50 flex items-center gap-2">
                <div className="h-3 sm:h-4 w-3 sm:w-4 bg-gray-800/80 rounded animate-pulse" />
                <div className="h-3 sm:h-4 w-16 sm:w-20 bg-gray-800/80 rounded animate-pulse" />
                <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-800/80 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileHeaderSkeleton
