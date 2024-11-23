import { DomainOffer, DomainStat } from "../utils";
import { createClient } from "./server";

export async function submitDomainOffer(
  domain: string,
  offer: Omit<DomainOffer, "timestamp">
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_offers")
    .insert({
      domain,
      email: offer.email,
      amount: offer.amount,
      description: offer.description,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit offer: ${error.message}`);
  }

  return {
    domain,
    offer: {
      ...offer,
      timestamp: data.created_at,
    },
    totalOffers: await getOffersCount(domain),
  };
}

export async function getDomainOffers(domain: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_offers")
    .select("*")
    .eq("domain", domain)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to get domain offers: ${error.message}`);
  }

  return data.map((offer) => ({
    email: offer.email,
    amount: offer.amount,
    description: offer.description,
    timestamp: offer.created_at,
    token: offer.token,
  }));
}

export async function deleteDomainOffers(domain: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("domain_offers")
    .delete()
    .eq("domain", domain);

  if (error) {
    throw new Error(`Failed to delete domain offers: ${error.message}`);
  }

  return {
    domain,
    message: "Domain offers deleted successfully",
    timestamp: new Date().toISOString(),
  };
}

export async function getAllDomains() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domains")
    .select("domain")
    .order("domain");

  if (error) {
    throw new Error(`Failed to get domains: ${error.message}`);
  }

  return data.map((d) => d.domain);
}

export async function getAllOffers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_offers")
    .select("*, domains!inner(*)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to get all offers: ${error.message}`);
  }

  return data.map((offer) => ({
    domain: offer.domain,
    email: offer.email,
    amount: offer.amount,
    description: offer.description,
    timestamp: offer.created_at,
    token: offer.token,
  }));
}

export async function deleteSingleOffer(domain: string, timestamp: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("domain_offers")
    .delete()
    .eq("domain", domain)
    .eq("created_at", timestamp);

  if (error) {
    throw new Error(`Failed to delete offer: ${error.message}`);
  }

  return {
    domain,
    message: "Offer deleted successfully",
    timestamp: new Date().toISOString(),
  };
}

export async function initializeDomain(domain: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("domains").upsert({ domain }).select();

  if (error) {
    throw new Error(`Failed to initialize domain: ${error.message}`);
  }

  return {
    domain,
    message: "Domain initialized successfully",
    timestamp: new Date().toISOString(),
  };
}

export async function getDomainStats(): Promise<DomainStat[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_stats")
    .select("*")
    .order("offer_count", { ascending: false })
    .order("visits", { ascending: false })
    .order("domain");

  if (error) {
    throw new Error(`Failed to get domain stats: ${error.message}`);
  }

  return data.map((stat) => ({
    domain: stat.domain ?? "",
    visits: stat.visits ?? 0,
    lastOffer: stat.last_offer ? new Date(stat.last_offer) : null,
    avgOffer: Math.round(stat.avg_offer ?? 0),
    topOffer: stat.top_offer ?? 0,
    offerCount: stat.offer_count ?? 0,
  }));
}

async function getOffersCount(domain: string): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("domain_offers")
    .select("*", { count: "exact" })
    .eq("domain", domain);

  if (error) {
    throw new Error(`Failed to get offers count: ${error.message}`);
  }

  return count || 0;
}
export async function trackPageView(domain: string, metadata?: any) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_views").insert({
    page_url: domain,
    metadata,
    view_timestamp: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to track page view: ${error.message}`);
  }
}

export async function getVisits(domain: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_stats")
    .select("visits")
    .eq("domain", domain)
    .single();

  if (error) {
    throw new Error(`Failed to get visits: ${error.message}`);
  }

  return data?.visits ?? 0;
}

export async function getTotalVisits(domains: string[]): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("domain_stats")
    .select("visits")
    .in("domain", domains);

  if (error) {
    throw new Error(`Failed to get total visits: ${error.message}`);
  }

  return data.reduce((sum, { visits }) => sum + (visits ?? 0), 0);
}
