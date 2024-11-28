import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
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
          Get started by adding a domain to your account. You&apos;ll be able to
          track offers, visits, and manage your domain portfolio all in one
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
