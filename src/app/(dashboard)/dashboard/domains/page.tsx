import Link from 'next/link'
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { DomainOffersKV } from "@/lib/kv-storage";

export default async function AllDomainsPage() {
  const { env } = await getCloudflareContext();
  const domainOffersKV = new DomainOffersKV(env.kvcache);
  const allDomains = await domainOffersKV.getAllDomains();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">All Domains</h1>
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-xs text-slate-400 bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 font-medium">Domain</th>
              <th className="px-6 py-3 font-medium">Total Offers</th>
              <th className="px-6 py-3 font-medium">Total Visits</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {allDomains.map(async (domain) => {
              const offers = await domainOffersKV.getDomainOffers(domain);
              const visits = await domainOffersKV.getVisits(domain);
              return (
                <tr key={domain} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`https://${domain}`} className="text-purple-400 hover:text-purple-300">
                      {domain}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{offers.length}</td>
                  <td className="px-6 py-4 text-slate-300">{visits}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/domains/${domain}`} className="text-blue-400 hover:text-blue-300">
                      Edit
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

