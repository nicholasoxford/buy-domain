import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { DomainStatsTable } from "@/components/DomainTable";
import { getDashboardData } from "@/lib/data/dashboard";
import { OffersProvider } from "@/contexts/OffersContext";
import { Search } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { allDomains, offers, stats, metrics } = await getDashboardData(
    user.id
  );

  if (!allDomains || allDomains.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header with Add Domain button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your domain offers and statistics
          </p>
        </div>
        <Link
          href="/dashboard/domains/add"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all duration-150"
        >
          Add Domain
        </Link>
      </div>

      <OffersProvider initialOffers={offers}>
        <div className="space-y-8">
          <StatsGrid initialTotalVisits={metrics.totalVisits} />
          <OffersTable />
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
      </OffersProvider>
    </div>
  );
}
