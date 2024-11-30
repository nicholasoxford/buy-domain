"use client";
import { DeleteOfferButton } from "@/components/DeleteOfferButton";
import Link from "next/link";
import { useOffers } from "@/contexts/OffersContext";
import { DollarSign, ExternalLink, Mail } from "lucide-react";

export interface OffersTableProps {
  isSubscribed: boolean;
}

export function OffersTable({ isSubscribed }: OffersTableProps) {
  const { offers, deleteOffer } = useOffers();

  // Limit offers to last 20 for non-subscribed users
  const displayedOffers = isSubscribed ? offers : offers.slice(0, 20);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
      <div className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Recent Offers</h2>
        {!isSubscribed && (
          <div className="text-sm text-slate-400">
            Showing last 20 offers -{" "}
            <Link
              href="/pricing"
              className="text-purple-400 hover:text-purple-300"
            >
              Upgrade to see all
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-wider text-slate-400 bg-slate-800/50">
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
            {displayedOffers.map((offer) => (
              <tr
                key={offer.timestamp}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200">
                      {new Date(offer.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(offer.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`https://${offer.domain}`}
                    target="_blank"
                    className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 group"
                  >
                    {offer.domain}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {offer.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm font-medium text-white">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      {offer.amount.toLocaleString()}
                    </div>
                    {offer.amount >= 5000 && (
                      <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                        High Value
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-300 truncate max-w-xs">
                    {offer.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <DeleteOfferButton
                    offer={offer}
                    onDelete={async () => await deleteOffer(offer.timestamp)}
                  />
                </td>
              </tr>
            ))}
            {displayedOffers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-slate-400">
                      No offers yet
                    </span>
                    <span className="text-xs text-slate-500">
                      Offers will appear here when submitted
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
