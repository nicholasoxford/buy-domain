import { DomainOffer, DomainStat } from "../utils";
import { createClient } from "./server";
import { addDomainToVercel, removeDomainFromVercel } from "../vercel/api";
import {
  sendDomainAddedNotification,
  sendDomainOfferNotification,
} from "../loops";
import { revalidatePath } from "next/cache";

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

  // Send notification to owner
  const owner = await getUserByDomain(domain);
  console.log("OWNER", owner);
  if (owner?.email) {
    await sendDomainOfferNotification(domain, owner.email, offer);
  }

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

export async function getAllDomains(userId?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("domains")
    .select("domain")
    .not("domain", "like", "www.%")
    .order("domain");

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to get domains: ${error.message}`);
  }

  return data.map((d) => d.domain);
}

export async function getAllOffers(userId?: string) {
  const supabase = await createClient();

  // First get all domains owned by the user
  const { data: userDomains, error: domainsError } = await supabase
    .from("domains")
    .select("domain")
    .eq("user_id", userId ?? "");

  if (domainsError) {
    throw new Error(`Failed to get user domains: ${domainsError.message}`);
  }

  // Extract domain names into an array
  const domainNames = userDomains.map((d) => d.domain);

  // Get offers only for user's domains
  const { data, error } = await supabase
    .from("domain_offers")
    .select("*")
    .in("domain", domainNames)
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

export async function getDomainStats(userId?: string): Promise<DomainStat[]> {
  const supabase = await createClient();

  const userDomains = await getAllDomains(userId);

  let query = supabase
    .from("domain_stats")
    .select("*")
    .in("domain", userDomains)
    .order("offer_count", { ascending: false })
    .order("visits", { ascending: false })
    .order("domain");

  const { data, error } = await query;

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
export async function trackPageView(
  domain: string,
  userId?: string,
  metadata?: any
) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_views").insert({
    page_url: domain,
    user_id: userId,
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
    .eq("domain", domain);

  if (error) {
    throw new Error(`Failed to get visits: ${error.message}`);
  }

  return data[0]?.visits ?? 0;
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

export async function addDomain(domain: string, userId: string) {
  // Clean and validate the domain
  const cleanDomain = cleanDomainName(domain);
  validateDomainName(cleanDomain);

  const supabase = await createClient();

  // First check if domain exists
  const { data: existingDomain, error: checkError } = await supabase
    .from("domains")
    .select("*")
    .eq("domain", cleanDomain)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "not found" error
    throw new Error(`Failed to check domain existence: ${checkError.message}`);
  }

  try {
    let dbDomain;

    if (existingDomain) {
      // Update ownership of existing domain
      const { data: updatedDomain, error: updateError } = await supabase
        .from("domains")
        .update({
          user_id: userId,
          verified: false,
          created_at: new Date().toISOString(),
        })
        .eq("domain", cleanDomain)
        .select()
        .single();

      if (updateError) {
        throw new Error(
          `Failed to update domain ownership: ${updateError.message}`
        );
      }

      dbDomain = updatedDomain;
    } else {
      // Insert new domain
      const { data: newDomain, error: insertError } = await supabase
        .from("domains")
        .insert({
          domain: cleanDomain,
          user_id: userId,
          verified: false,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(
          `Failed to add domain to database: ${insertError.message}`
        );
      }

      dbDomain = newDomain;
    }

    // Add both domains to Vercel (handled internally by addDomainToVercel)
    await addDomainToVercel(process.env.VERCEL_PROJECT_ID!, cleanDomain);

    // Update database with Vercel project ID
    const { error: updateError } = await supabase
      .from("domains")
      .update({
        vercel_project_id: process.env.VERCEL_PROJECT_ID,
      })
      .eq("domain", cleanDomain);

    if (updateError) {
      throw new Error(`Failed to update domain: ${updateError.message}`);
    }

    // Get user data first
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();
    console.log("User data: ", userData);
    if (userError) {
      throw new Error(`Failed to fetch user: ${userError.message}`);
    }
    if (userData?.email) {
      // After successful domain creation
      await sendDomainAddedNotification(cleanDomain, userData.email);
    }
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/domains");
    return {
      ...dbDomain,
    };
  } catch (error) {
    // If Vercel fails, revert any database changes
    if (existingDomain) {
      // Revert ownership
      await supabase
        .from("domains")
        .update({ user_id: existingDomain.user_id })
        .eq("domain", cleanDomain);
    } else {
      // Delete the new domain
      await supabase.from("domains").delete().eq("domain", cleanDomain);
    }
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

// Helper functions for domain validation
function cleanDomainName(domain: string): string {
  // Remove protocol and www
  let cleanDomain = domain.toLowerCase().trim();
  cleanDomain = cleanDomain.replace(/^https?:\/\//, "");
  cleanDomain = cleanDomain.replace(/^www\./, "");

  // Remove trailing slash and anything after it
  cleanDomain = cleanDomain.split("/")[0] ?? "";

  return cleanDomain;
}

function validateDomainName(domain: string): void {
  // Basic domain validation regex
  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

  if (!domainRegex.test(domain)) {
    throw new Error(
      "Invalid domain name. Please enter a valid domain (e.g., example.com)"
    );
  }
}

export async function getDomainByName(domain: string) {
  const supabase = await createClient();
  const cleanDomain = cleanDomainName(domain);

  const { data, error } = await supabase
    .from("domains")
    .select("*")
    .eq("domain", cleanDomain)
    .single();

  if (error) {
    throw new Error(`Failed to get domain: ${error.message}`);
  }

  return data;
}

export async function deleteDomain(domain: string, userId: string) {
  const supabase = await createClient();

  // First verify the user owns the domain
  const { data: domainData, error: fetchError } = await supabase
    .from("domains")
    .select("user_id")
    .eq("domain", domain)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch domain: ${fetchError.message}`);
  }

  if (domainData.user_id !== userId) {
    throw new Error("Unauthorized: You don't own this domain");
  }

  try {
    // First remove from Vercel
    await removeDomainFromVercel(domain);

    // Then delete from database
    const { error: deleteError } = await supabase
      .from("domains")
      .delete()
      .eq("domain", domain);

    if (deleteError) {
      throw new Error(`Failed to delete domain: ${deleteError.message}`);
    }

    // Also delete any associated offers
    await supabase.from("domain_offers").delete().eq("domain", domain);

    return {
      message: "Domain deleted successfully",
    };
  } catch (error) {
    throw error;
  }
}

export async function getUserDomainCount(userId: string) {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("domains")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to get domain count: ${error.message}`);
  }

  return count || 0;
}

export async function getUserByDomain(domain: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("domains")
    .select(
      `
      user_id,
      profiles:profiles(*)
    `
    )
    .eq("domain", domain)
    .single();

  if (error) {
    throw new Error(`Failed to get domain owner: ${error.message}`);
  }

  if (!data?.profiles) {
    throw new Error("Domain not found or has no owner");
  }
  // Return the user profile
  const profile = data.profiles[0];
  return profile;
}
