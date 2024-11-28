import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { DomainStatsTable } from "@/components/DomainTable";
import { getDashboardData } from "@/lib/data/dashboard";

export default async function AdminPage() {
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
      <h1 className="text-2xl font-bold text-white mb-6">Overview</h1>
      <StatsGrid {...metrics} />
      <OffersTable offers={offers} />
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-medium text-white">Domain Statistics</h2>
        </div>
        <div className="p-6">
          <DomainStatsTable initialStats={stats} />
        </div>
      </div>
    </div>
  );
}
