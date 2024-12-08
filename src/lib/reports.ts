import { createClient } from "./supabase/server";
import { LoopsClient } from "loops";
import type { Database } from "./supabase/database.types";

interface DomainStat {
  domain: string;
  offers: number;
  totalValue: number;
}

interface ReportData {
  totalOffers: number;
  totalValue: number;
  averageValue: number;
  domains: DomainStat[];
}

async function generateReportData(
  userId: string,
  startDate: Date,
  frequency: "daily" | "weekly" | "monthly" | "on_demand" | "never"
): Promise<ReportData> {
  const supabase = await createClient();

  // Get all domains for user with their notification settings
  const { data: domains, error: domainsError } = await supabase
    .from("domains")
    .select("*")
    .eq("user_id", userId);

  if (domainsError || !domains?.length) {
    return {
      totalOffers: 0,
      totalValue: 0,
      averageValue: 0,
      domains: [],
    };
  }

  const domainStats = await Promise.all(
    domains.map(async (domain) => {
      // Skip domains that don't have the required notification frequency
      if (!domain.notification_frequencies?.includes(frequency)) {
        return null;
      }

      const { data: offers, error: offersError } = await supabase
        .from("domain_offers")
        .select("amount")
        .eq("domain", domain.domain)
        .gte("created_at", startDate.toISOString());

      if (offersError || !offers) {
        return null;
      }

      const totalValue = offers.reduce((sum, offer) => sum + offer.amount, 0);

      return {
        domain: domain.domain,
        offers: offers.length,
        totalValue,
      };
    })
  );

  // Filter out null values from domains that were skipped
  const validDomainStats = domainStats.filter(
    (stat): stat is DomainStat => stat !== null
  );

  const totalOffers = validDomainStats.reduce(
    (sum, stat) => sum + stat.offers,
    0
  );
  const totalValue = validDomainStats.reduce(
    (sum, stat) => sum + stat.totalValue,
    0
  );

  return {
    totalOffers,
    totalValue,
    averageValue: totalOffers ? totalValue / totalOffers : 0,
    domains: validDomainStats,
  };
}

export async function sendPeriodicReport(
  userId: string,
  frequency: "daily" | "weekly" | "monthly"
) {
  const supabase = await createClient();

  // Get user email
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", userId)
    .single();

  if (userError || !user?.email) {
    console.error("Error getting user:", userError);
    return;
  }

  // Calculate start date based on frequency
  const now = new Date();
  const startDate = new Date();
  switch (frequency) {
    case "daily":
      startDate.setDate(now.getDate() - 1);
      break;
    case "weekly":
      startDate.setDate(now.getDate() - 7);
      break;
    case "monthly":
      startDate.setMonth(now.getMonth() - 1);
      break;
  }

  const reportData = await generateReportData(userId, startDate, frequency);

  // Skip if no activity
  if (reportData.totalOffers === 0) {
    return;
  }

  const LOOPS_API_KEY = process.env.LOOPS_API_KEY ?? "";
  const loops = new LoopsClient(LOOPS_API_KEY);

  // Send report email using Loops
  await loops.sendTransactionalEmail({
    transactionalId: "periodic_report",
    email: user.email,
    dataVariables: {
      frequency,
      reportData: JSON.stringify(reportData),
      periodStart: startDate.toLocaleDateString(),
      periodEnd: now.toLocaleDateString(),
    },
  });
}
