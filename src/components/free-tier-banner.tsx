import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function FreeTierBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-20">
      <div className="relative overflow-hidden rounded-xl bg-slate-900/80 backdrop-blur-xl border border-blue-500/20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        </div>

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl">
                <div className="p-0.5 bg-blue-500/20 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-blue-200">
                  Free Forever
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white mb-4">
                  Start With One Free Domain
                </h2>
                <p className="text-lg text-slate-300/90">
                  Get started with one domain completely free. No credit card
                  required. Includes all essential features to showcase and sell
                  your domain.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Custom landing page",
                  "Instant notifications",
                  "Basic analytics",
                  "SSL included",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-br from-blue-500/80 to-cyan-500/80 flex items-center justify-center ring-1 ring-white/10">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col items-center gap-3">
              <Link
                href="/login?signup=true"
                className="group relative inline-flex items-center justify-center"
              >
                <div className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-white">
                      Deploy Your First Domain
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
