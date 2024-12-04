export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back button skeleton */}
        <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />

        {/* Domain Header skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="space-y-4">
            <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Pricing Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200"
            >
              <div className="space-y-4">
                <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
