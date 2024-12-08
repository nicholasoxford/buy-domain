export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Section skeleton */}
      <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-lg p-8 space-y-6">
        {/* Back button skeleton */}
        <div className="h-6 w-40 bg-slate-800/50 rounded animate-pulse" />

        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="h-10 w-96 bg-slate-800/50 rounded animate-pulse" />
            <div className="h-6 w-80 bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-slate-800/50 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-slate-800/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Pricing Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-slate-900/50 rounded-xl p-6 border border-slate-800"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-slate-800/50 rounded animate-pulse" />
                <div className="h-6 w-1/2 bg-slate-800/50 rounded animate-pulse" />
              </div>
              <div className="h-4 w-3/4 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-8 w-1/3 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-10 w-full bg-slate-800/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
