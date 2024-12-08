"use client";

import { AdminTable, type Column } from "@/components/ui/admin-table";
import { Database } from "@/lib/supabase/database.types";
import { PlusCircle, Settings } from "lucide-react";
import Link from "next/link";

// Types for our domain data
type DomainData = {
  domain: string;
  domainDetails: {
    created_at: string | null;
    domain: string;
    hosted: boolean | null;
    metadata: any;
    notification_frequencies:
      | Database["public"]["Enums"]["notification_frequency"][]
      | null;
    user_id: string | null;
    vercel_project_id: string | null;
    verification_details: any | null;
    verified: boolean | null;
  } | null;
  offers: { amount: number }[];
  visits: number;
  avgOffer: number;
};
interface DomainsTableProps {
  domainData: DomainData[];
}

const columns: Column<DomainData>[] = [
  {
    header: "Domain",
    accessorKey: "domain",
    cellType: "link",
    sortable: true,
  },
  {
    header: "Status",
    accessorKey: "domainDetails",
    cellType: "status",
  },
  {
    header: "Total Offers",
    accessorKey: "offers",
    cellType: "number",
    sortable: true,
  },
  {
    header: "Avg. Offer",
    accessorKey: "avgOffer",
    cellType: "currency",
    sortable: true,
  },
  {
    header: "Total Visits",
    accessorKey: "visits",
    cellType: "number",
    sortable: true,
  },
];

const DomainsTable: React.FC<DomainsTableProps> = ({ domainData }) => {
  return (
    <AdminTable
      data={domainData}
      columns={columns}
      searchable={false}
      searchPlaceholder="Search domains..."
      emptyState={<EmptyState />}
      actionLink={{
        href: (row) => `/dashboard/domains/${row.domain}`,
        label: "Manage Domain",
        icon: <Settings className="w-4 h-4" />,
      }}
    />
  );
};

export default DomainsTable;
// Empty state component
const EmptyState = () => (
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
        track offers, visits, and manage your domain portfolio all in one place.
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
