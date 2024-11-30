"use server";
import { DomainOffer } from "./utils";
import { LoopsClient } from "loops";
import { createClient } from "./supabase/client";

export async function sendDomainAddedNotification(
  domain: string,
  email: string
) {
  const LOOPS_API_KEY = process.env.LOOPS_API_KEY ?? "";
  const loops = new LoopsClient(LOOPS_API_KEY);
  console.log("Loops API Key: ", LOOPS_API_KEY);
  try {
    console.log(
      "Sending domain added notification to: ",
      email.trim(),
      " for domain: ",
      domain.trim()
    );
    const test = await loops.testApiKey();
    console.log({ test });
    const resp = await loops
      .sendTransactionalEmail({
        transactionalId: "cm3wis2ev00o3epr4uf1yrq5g",
        email: email.trim(),
        dataVariables: {
          domain: domain.trim(),
        },
      })
      .catch((err) => {
        console.log({ err });
      });

    if (!resp) {
      throw new Error("Failed to send domain added notification");
    }
    if (!resp.success && resp.type === "error") {
      console.log({ resp });
      throw new Error("Failed to send domain added notification");
    } else if (!resp.success && resp.type === "nestedError") {
      console.dir({ resp }, { depth: null });
      throw new Error("Failed to send domain added notification");
    }
    console.log("Domain added notification sent successfully to: ", email);
    return;
  } catch (error) {
    console.error("Error sending domain added notification: ", error);
  }
}

async function shouldSendNotification(domain: string, amount?: number) {
  const supabase = createClient();
  const { data: domainData, error } = await supabase
    .from("domains")
    .select("notification_frequencies, notification_threshold")
    .eq("domain", domain)
    .single();

  if (error || !domainData) {
    console.error("Error checking notification settings:", error);
    return false;
  }

  // If no notification frequencies are set, don't send
  if (!domainData.notification_frequencies?.length) {
    return false;
  }

  // If amount is provided and threshold is set, check threshold
  if (amount && domainData.notification_threshold) {
    if (amount < domainData.notification_threshold) {
      return false;
    }
  }

  return true;
}

export async function sendDomainOfferNotification({
  domain,
  email,
  offer,
}: {
  domain: string;
  email: string;
  offer: Omit<DomainOffer, "timestamp">;
}) {
  // Check notification settings before sending
  const shouldSend = await shouldSendNotification(domain, offer.amount);
  if (!shouldSend) {
    console.log("Skipping notification due to settings:", { domain, offer });
    return;
  }

  const LOOPS_API_KEY = process.env.LOOPS_API_KEY ?? "";
  const loops = new LoopsClient(LOOPS_API_KEY);

  try {
    console.log("Sending domain offer notification to: ", email);
    const resp = await loops.sendTransactionalEmail({
      transactionalId: "cm3xwppo100r1p6zxjnuk37t9",
      email: email.trim(),
      dataVariables: {
        domain: domain.trim(),
        offerAmount: offer.amount.toString(),
        buyerEmail: offer.email,
        message: offer.description || "",
        dashboardDomainUrl: `https://www.domain-bridge.com/dashboard/domains/${domain}`,
      },
    });

    if (!resp) {
      throw new Error("Failed to send domain offer notification");
    }
    if (!resp.success && resp.type === "error") {
      console.log({ resp });
      throw new Error("Failed to send domain offer notification");
    } else if (!resp.success && resp.type === "nestedError") {
      console.dir({ resp }, { depth: null });
      throw new Error("Failed to send domain offer notification");
    }

    console.log("Domain offer notification sent successfully to:", email);
    return;
  } catch (error) {
    console.error("Error sending domain offer notification:", error);
  }
}
