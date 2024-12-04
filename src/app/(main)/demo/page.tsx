import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { DomainStatsTable } from "@/components/DomainTable";
import { createDemoData, getDashboardData } from "@/lib/data/dashboard";
import { OfferForm } from "@/components/OfferFormExample";
import { OffersProvider } from "@/contexts/OffersContext";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const { allDomains, offers, stats, metrics } = await createDemoData();

  if (!allDomains || allDomains.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-dvh bg-slate-900 p-1 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Demo Page</h1>

        <OffersProvider initialOffers={offers}>
          <div className="space-y-8 sm:space-y-12">
            {/* Form Section */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden">
              <OfferForm />
            </div>

            {/* Dashboard Section */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Demo Dashboard
              </h2>
              <StatsGrid initialTotalVisits={metrics.totalVisits} />
              <OffersTable />
              <DomainStatsTable initialStats={stats} showManageButton={false} />
            </div>

            {/* New CTA Section */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-slate-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse" />

              <div className="relative px-6 py-8 sm:px-12 sm:py-12 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl mb-6 sm:mb-8">
                  <div className="p-0.5 bg-purple-500/20 rounded-full">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-purple-200">
                    Ready to Get Started?
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white mb-4">
                  Deploy Your Domain Bobber
                </h2>

                <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mb-6 sm:mb-8">
                  Start receiving offers on your domains in minutes. No credit
                  card required to get started.
                </p>

                <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
                  >
                    View Documentation
                  </Link>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
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
                    Free 7-day trial
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
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
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OffersProvider>
      </div>
    </div>
  );
}
