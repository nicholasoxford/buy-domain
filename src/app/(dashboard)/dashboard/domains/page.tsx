import Link from "next/link";
import {
  getAllDomains,
  getVisits,
  getDomainOffers,
  getDomainByName,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AllDomainsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const allDomains = await getAllDomains(data.user.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">All Domains</h1>
        <Link
          href="/dashboard/domains/add"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
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
              <th className="px-6 py-3 font-medium">Total Visits</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {allDomains.map(async (domain) => {
              const offers = await getDomainOffers(domain);
              const visits = await getVisits(domain);
              const domainData = await getDomainByName(domain);

              return (
                <tr
                  key={domain}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`https://${domain}`}
                      className="text-purple-400 hover:text-purple-300"
                      target="_blank"
                    >
                      {domain}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          domainData.verified ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-slate-300">
                        {domainData.verified ? (
                          "Verified"
                        ) : (
                          <Link
                            href={`/dashboard/domains/${domain}/verify`}
                            className="text-yellow-400 hover:text-yellow-300"
                          >
                            Needs Verification
                          </Link>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{offers.length}</td>
                  <td className="px-6 py-4 text-slate-300">{visits}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/domains/${domain}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </Link>
                      {!domainData.verified && (
                        <Link
                          href={`/dashboard/domains/${domain}/verify`}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          Verify
                        </Link>
                      )}
                    </div>
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
