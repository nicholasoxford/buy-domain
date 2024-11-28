import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { DomainStatsTable } from "@/components/DomainTable";
import { createDemoData, getDashboardData } from "@/lib/data/dashboard";
import { OfferForm } from "@/components/OfferFormExample";

export default async function AdminPage() {
  const { allDomains, offers, stats, metrics } = await createDemoData();

  if (!allDomains || allDomains.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-white">Example Page</h1>

        {/* Form Section - now with fixed height */}
        <div className="rounded-2xl overflow-hidden">
          <OfferForm />
        </div>

        {/* Dashboard Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white">Demo Dashboard</h2>
          <StatsGrid {...metrics} />
          <OffersTable offers={offers} />
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="px-6 py-4 border-b border-slate-700/50">
              <h2 className="text-lg font-medium text-white">
                Domain Statistics
              </h2>
            </div>
            <div className="p-6">
              <DomainStatsTable initialStats={stats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
