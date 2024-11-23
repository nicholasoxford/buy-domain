import { Download, Github } from "lucide-react";

export default function ThankYouLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
          <div className="text-center mb-8">
            {/* Animated loading circle */}
            <div className="h-12 w-12 mx-auto mb-4">
              <div className="animate-spin h-full w-full rounded-full border-4 border-purple-500/20 border-t-purple-500" />
            </div>
            {/* Loading title and description */}
            <div className="h-8 w-48 bg-slate-700/50 rounded-lg animate-pulse mx-auto mb-2" />
            <div className="h-4 w-64 bg-slate-700/50 rounded-lg animate-pulse mx-auto" />
          </div>

          <div className="space-y-4">
            {/* Loading download button */}
            <div className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-700/50 animate-pulse rounded-xl">
              <Download className="h-5 w-5 text-slate-500" />
              <div className="h-5 w-32 bg-slate-600/50 rounded-lg" />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">or</span>
              </div>
            </div>

            {/* Loading GitHub form */}
            <div className="space-y-4">
              <div>
                <div className="h-4 w-24 bg-slate-700/50 rounded-lg animate-pulse mb-2" />
                <div className="relative">
                  <div className="h-12 w-full bg-slate-700/50 rounded-xl animate-pulse" />
                  <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                </div>
              </div>
              <div className="h-12 w-full bg-slate-700/50 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
