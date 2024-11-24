export default function AdminLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-slate-800/50 rounded-lg animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
              <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-slate-700/50 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Recent Offers Table Skeleton */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 mb-8">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Domain Statistics Table Skeleton */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse" />
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
