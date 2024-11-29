import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { OffersTable } from "@/components/dashboard/OffersTable";
import { DomainStatsTable } from "@/components/DomainTable";
import { createDemoData, getDashboardData } from "@/lib/data/dashboard";
import { OfferForm } from "@/components/OfferFormExample";
import { OffersProvider } from "@/contexts/OffersContext";

export default async function AdminPage() {
  const { allDomains, offers, stats, metrics } = await createDemoData();

  if (!allDomains || allDomains.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-white">Example Page</h1>

        <OffersProvider initialOffers={offers}>
          <div className="space-y-12">
            {/* Form Section */}
            <div className="rounded-2xl overflow-hidden">
              <OfferForm />
            </div>

            {/* Dashboard Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">Demo Dashboard</h2>
              <StatsGrid initialTotalVisits={metrics.totalVisits} />
              <OffersTable />
              <DomainStatsTable initialStats={stats} />
            </div>
          </div>
        </OffersProvider>
      </div>
    </div>
  );
}
