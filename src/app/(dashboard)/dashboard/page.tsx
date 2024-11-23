import { DomainSelector } from "@/components/DomainSelector";
import { DeleteOfferButton } from "@/components/DeleteOfferButton";
import { DomainStatsTable } from "@/components/DomainTable";
import Link from "next/link";
import { isAuthenticated } from "@/utils/supabase";
import { redirect } from "next/navigation";
import { getBaseUrlServerSide, getEnvVariables } from "@/utils/env";
import {
  getAllDomains,
  getAllOffers,
  getDomainOffers,
  getDomainStats,
  getTotalVisits,
  getVisits,
} from "@/lib/supabase/actions";
import { supabase } from "@/lib/supabase/server";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { domain?: string };
}) {
  const env = getEnvVariables();
  const baseUrl = await getBaseUrlServerSide();

  const isAuthenticatedRes = await isAuthenticated(env, "/admin");

  if (!isAuthenticatedRes) {
    redirect("/login");
  }

  // Get all domains and offers
  const [allDomains, offers] = await Promise.all([
    getAllDomains(),
    searchParams.domain === "all"
      ? getAllOffers()
      : getDomainOffers(searchParams.domain || baseUrl).then((offers) =>
          offers.map((offer) => ({
            ...offer,
            domain: searchParams.domain || baseUrl,
          }))
        ),
  ]);

  // Get visits count based on domain selection
  const visitsCount =
    searchParams.domain === "all"
      ? await getTotalVisits(allDomains)
      : await getVisits(searchParams.domain || baseUrl);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Overview</h1>

      {/* Domain Selector and All Domains link */}
      <div className="flex items-center gap-4 mb-6">
        <DomainSelector
          domains={allDomains}
          currentDomain={searchParams.domain || baseUrl}
        />
        <Link
          href="/admin?domain=all"
          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-200 ${
            searchParams.domain === "all"
              ? "bg-purple-500 text-white"
              : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          All Domains
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Offers</h3>
            <span className="flex items-center text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
              <span className="mr-1">↑</span> 2 new
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{offers.length}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Highest Offer
          </h3>
          <p className="text-3xl font-bold text-white">
            $
            {offers.length
              ? Math.max(...offers.map((o) => o.amount)).toLocaleString()
              : "0"}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Average Offer
          </h3>
          <p className="text-3xl font-bold text-white">
            $
            {offers.length
              ? Math.round(
                  offers.reduce((acc, o) => acc + o.amount, 0) / offers.length
                ).toLocaleString()
              : "0"}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Total Visits
          </h3>
          <p className="text-3xl font-bold text-white">
            {visitsCount.toLocaleString()}
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
          <DomainStatsTable initialStats={await getDomainStats()} />
        </div>
      </div>
    </div>
  );
}

// Add this server action
async function deleteOffer(domain: string, timestamp: string) {
  "use server";

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
