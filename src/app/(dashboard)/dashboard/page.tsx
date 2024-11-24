import { DeleteOfferButton } from "@/components/DeleteOfferButton";
import { DomainStatsTable } from "@/components/DomainTable";
import Link from "next/link";
import {
  getAllDomains,
  getAllOffers,
  getDomainStats,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default async function AdminPage() {
  // Get all domains and offers
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const [allDomains, offers] = await Promise.all([
    getAllDomains(user.id),
    getAllOffers(user.id),
  ]);

  // If no domains, show empty state
  if (!allDomains || allDomains.length === 0) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 rounded-xl border border-slate-800 bg-slate-900/50">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlusCircle className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Add Your First Domain
          </h2>
          <p className="text-slate-400 mb-6">
            Get started by adding a domain to your account. You&apos;ll be able
            to track offers, visits, and manage your domain portfolio all in one
            place.
          </p>
          <Link
            href="/dashboard/domains/add"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            Add Domain
          </Link>
        </div>
      </div>
    );
  }

  // Get visits count based on domain selection
  const stats = await getDomainStats(user.id);

  const totalVisits = stats.reduce((sum, stat) => sum + stat.visits, 0);
  const totalOffers = stats.reduce((sum, stat) => sum + stat.offerCount, 0);
  const highestOffer = Math.max(...stats.map((stat) => stat.topOffer));
  const averageOffer =
    stats.reduce((sum, stat) => sum + stat.avgOffer, 0) / stats.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Offers</h3>
          </div>
          <p className="text-3xl font-bold text-white">{totalOffers}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Highest Offer
          </h3>
          <p className="text-3xl font-bold text-white">
            ${highestOffer.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Average Offer
          </h3>
          <p className="text-3xl font-bold text-white">
            ${averageOffer.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Total Visits
          </h3>
          <p className="text-3xl font-bold text-white">
            {totalVisits.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Offers Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 mb-8">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-medium text-white">Recent Offers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-slate-400 bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Domain</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {offers.map((offer) => (
                <tr
                  key={offer.timestamp}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {offer.timestamp
                      ? new Date(offer.timestamp).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`https://${offer.domain}`}
                      className="text-sm font-medium text-purple-400 hover:text-purple-300"
                    >
                      {offer.domain}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {offer.email}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        ${offer.amount.toLocaleString()}
                      </span>
                      {offer.amount >= 5000 && (
                        <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                          High Value
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 truncate max-w-xs">
                    {offer.description}
                  </td>
                  <td className="px-6 py-4">
                    <DeleteOfferButton
                      domain={offer.domain || ""}
                      timestamp={offer.timestamp || ""}
                      onDelete={deleteOffer}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Domain Statistics */}
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

// Add this server action
async function deleteOffer(domain: string, timestamp: string) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("domain_offers")
    .delete()
    .eq("domain", domain)
    .eq("created_at", timestamp);

  if (error) {
    throw new Error(`Failed to delete offer: ${error.message}`);
  }
}
