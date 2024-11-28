import { createClient } from "@/lib/supabase/server";
import {
  getAllDomains,
  getAllOffers,
  getDomainStats,
} from "@/lib/supabase/actions";

// Add this function to generate demo data
export async function createDemoData() {
  const demoOffers = [
    {
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      domain: "example.com",
      email: "buyer1@example.com",
      amount: 5500,
      description: "Interested in purchasing for my tech startup",
    },
    {
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      domain: "demo-domain.com",
      email: "buyer2@example.com",
      amount: 3000,
      description: "Would like to use for my personal brand",
    },
    {
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      domain: "test-site.com",
      email: "buyer3@example.com",
      amount: 7500,
      description: "Perfect fit for our new product launch",
    },
  ];

  const demoStats = [
    {
      domain: "example.com",
      visits: 150,
      offerCount: 3,
      topOffer: 5500,
      avgOffer: 4200,
      lastOffer: new Date(Date.now() - 86400000),
    },
    {
      domain: "demo-domain.com",
      visits: 89,
      offerCount: 2,
      topOffer: 3000,
      avgOffer: 2800,
      lastOffer: new Date(Date.now() - 172800000),
    },
    {
      domain: "test-site.com",
      visits: 234,
      offerCount: 4,
      topOffer: 7500,
      avgOffer: 5100,
      lastOffer: new Date(Date.now() - 259200000),
    },
  ];

  const demoDomains = demoStats.map((stat) => ({
    domain: stat.domain,
    created_at: new Date(Date.now() - 1000000000).toISOString(),
    user_id: "1234",
  }));

  return {
    allDomains: demoDomains,
    offers: demoOffers,
    stats: demoStats,
    metrics: {
      totalVisits: demoStats.reduce((sum, stat) => sum + stat.visits, 0),
      totalOffers: demoStats.reduce((sum, stat) => sum + stat.offerCount, 0),
      highestOffer: Math.max(...demoStats.map((stat) => stat.topOffer)),
      averageOffer:
        demoStats.reduce((sum, stat) => sum + stat.avgOffer, 0) /
        demoStats.length,
    },
  };
}

export async function getDashboardData(userId: string) {
  const [allDomains, offers, stats] = await Promise.all([
    getAllDomains(userId),
    getAllOffers(userId),
    getDomainStats(userId),
  ]);

  const totalVisits = stats.reduce((sum, stat) => sum + stat.visits, 0);
  const totalOffers = stats.reduce((sum, stat) => sum + stat.offerCount, 0);
  const highestOffer = Math.max(...stats.map((stat) => stat.topOffer));
  const averageOffer =
    stats.reduce((sum, stat) => sum + stat.avgOffer, 0) / stats.length;

  return {
    allDomains,
    offers,
    stats,
    metrics: {
      totalVisits,
      totalOffers,
      highestOffer,
      averageOffer,
    },
  };
}

export async function deleteOffer(domain: string, timestamp: string) {
  "use server";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("domain_offers")
    .delete()
    .eq("domain", domain)
    .eq("created_at", timestamp);

  if (error) throw new Error(`Failed to delete offer: ${error.message}`);
}
