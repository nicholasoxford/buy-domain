"use client";
import { useOffers } from "@/contexts/OffersContext";

type StatsGridProps = {
  initialTotalVisits: number;
};

export function StatsGrid({ initialTotalVisits }: StatsGridProps) {
  const { offers } = useOffers();

  const stats = {
    totalOffers: offers.length,
    highestOffer: Math.max(...offers.map((offer) => offer.amount), 0),
    averageOffer: offers.length
      ? offers.reduce((sum, offer) => sum + offer.amount, 0) / offers.length
      : 0,
    totalVisits: initialTotalVisits,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Offers" value={stats.totalOffers} icon="📊" />
      <StatCard
        title="Highest Offer"
        value={`$${stats.highestOffer.toLocaleString()}`}
        icon="💎"
      />
      <StatCard
        title="Average Offer"
        value={`$${Math.round(stats.averageOffer).toLocaleString()}`}
        icon="📈"
      />
      <StatCard
        title="Total Visits"
        value={stats.totalVisits.toLocaleString()}
        icon="👥"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
