import Link from "next/link";
import {
  getAllDomains,
  getVisits,
  getDomainOffers,
  getDomainByName,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ExternalLink, PlusCircle, Settings } from "lucide-react";
import { formatCurrency } from "@/utils/format";

export default async function AllDomainsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const allDomains = await getAllDomains(data.user.id);

  // Add empty state redirect
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Domains</h1>
        <Link
          href="/dashboard/domains/add"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
        >
          Add Domain
        </Link>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-400 bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 font-medium">Domain</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Total Offers</th>
              <th className="px-6 py-3 font-medium">Avg. Offer</th>
              <th className="px-6 py-3 font-medium">Total Visits</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {allDomains.map(async (domain) => {
              const domainDetails = await getDomainByName(domain);
              const offers = await getDomainOffers(domain);
              const visits = await getVisits(domain);
              const avgOffer =
                offers.length > 0
                  ? offers.reduce((sum, offer) => sum + offer.amount, 0) /
                    offers.length
                  : 0;

              return (
                <tr
                  key={domain}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <a
                      href={`https://${domain}`}
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {domain}
                      <ExternalLink className="w-4 h-4 opacity-50" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        domainDetails?.verified
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {domainDetails?.verified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{offers.length}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {avgOffer > 0 ? formatCurrency(avgOffer) : "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{visits}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/domains/${domain}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:text-blue-300 rounded-md transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Manage Domain
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
