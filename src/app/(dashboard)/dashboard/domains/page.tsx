import Link from "next/link";
import { ExternalLink, PlusCircle, Settings } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { AdminTable, type Column } from "@/components/ui/admin-table";
import { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  getAllDomains,
  getVisits,
  getDomainOffers,
  getDomainByName,
} from "@/lib/supabase/actions";
import DomainsTable from "./DomainsTable";

export default async function DomainsPage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const allDomains = await getAllDomains(user.id);

  // Fetch all domain data in parallel
  const domainData = await Promise.all(
    allDomains.map(async (domain) => {
      const [domainDetails, offers, visits] = await Promise.all([
        getDomainByName(domain),
        getDomainOffers(domain),
        getVisits(domain),
      ]);

      const avgOffer =
        offers.length > 0
          ? offers.reduce((sum, offer) => sum + offer.amount, 0) / offers.length
          : 0;

      return { domain, domainDetails, offers, visits, avgOffer };
    })
  );

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

      <DomainsTable domainData={domainData} />
    </div>
  );
}
