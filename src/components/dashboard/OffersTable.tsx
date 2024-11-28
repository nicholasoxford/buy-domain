import { DeleteOfferButton } from "@/components/DeleteOfferButton";
import { deleteOffer } from "@/lib/data/dashboard";
import Link from "next/link";

type Offer = {
  timestamp: string | null;
  domain: string | null;
  email: string;
  amount: number;
  description: string | null;
};

export function OffersTable({ offers }: { offers: Offer[] }) {
  return (
    <>
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 mb-8">
        <div className="px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-medium text-white">Recent Offers</h2>
        </div>
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
    </>
  );
}
