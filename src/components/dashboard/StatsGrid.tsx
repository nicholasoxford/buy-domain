type StatsGridProps = {
  totalOffers: number;
  highestOffer: number;
  averageOffer: number;
  totalVisits: number;
};

export function StatsGrid({
  totalOffers,
  highestOffer,
  averageOffer,
  totalVisits,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Offers" value={totalOffers} />
      <StatCard
        title="Highest Offer"
        value={`$${highestOffer.toLocaleString()}`}
      />
      <StatCard
        title="Average Offer"
        value={`$${averageOffer.toLocaleString()}`}
      />
      <StatCard title="Total Visits" value={totalVisits.toLocaleString()} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
      <h3 className="text-sm font-medium text-slate-400 mb-4">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
