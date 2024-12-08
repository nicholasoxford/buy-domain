import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { STRIPE_WEBHOOK_SECRET } from "@/utils/constants";
import { Database } from "@/lib/supabase/database.types";
import { getNameAuth } from "./name";

// Common types
interface StripeRequestOptions {
  method: "GET" | "POST" | "DELETE";
  path: string;
  data?: any;
}

export type SubscriptionData = {
  email: string;
  customerId: string;
  subscriptionId: string;
  invoiceId: string;
};

// Database update helpers
async function updatePurchaseRecord(
  supabase: any,
  {
    email,
    userId = null,
    productType,
    tier = null,
    status,
    customerId,
    subscriptionId = null,
    expirationDate = null,
  }: {
    email: string;
    userId?: string | null;
    productType: "subscription" | "template";
    tier?: string | null;
    status: string;
    customerId: string;
    subscriptionId?: string | null;
    expirationDate?: string | null;
  }
) {
  return supabase.from("purchases").upsert(
    {
      email,
      user_id: userId,
      product_type: productType,
      tier,
      status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      expiration_date: expirationDate,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: subscriptionId
        ? "stripe_customer_id, stripe_subscription_id"
        : "stripe_customer_id",
    }
  );
}

async function updateUserProfile(
  supabase: any,
  {
    userId,
    email,
    tier = null,
    status = null,
  }: {
    userId: string;
    email: string;
    tier?: string | null;
    status?: string | null;
  }
) {
  return supabase
    .from("profiles")
    .update({
      subscription_tier: tier,
      subscription_status: status,
    })
    .eq(userId ? "id" : "email", userId || email);
}

// Main handlers
export async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  console.log("Payment successful for session:", session.id);
  console.log("Session mode:", session.mode);

  if (session.mode === "payment") {
    if (session.metadata?.type === "domain_purchase") {
      await handleDomainPurchase(session);
    } else {
      await handleTemplatePayment(session);
    }
  } else if (session.mode === "subscription") {
    await handleSubscriptionChange({
      email: session.customer_details?.email || "",
      customerId: session.customer as string,
      subscriptionId: session.subscription as string,
      invoiceId: session.invoice as string,
    });
  }
}

export async function handleSubscriptionCancelled(
  subscription: Stripe.Subscription
) {
  const supabase = await createClient();

  console.log("Handling subscription cancelled:", subscription);
  const isEndedNow =
    subscription.status === "canceled" &&
    (!subscription.current_period_end ||
      subscription.current_period_end * 1000 <= Date.now());

  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .select("user_id, status")
    .eq("stripe_subscription_id", subscription.id)
    .single();

  if (purchaseError) {
    console.error("Error finding purchase:", purchaseError);
    return;
  }

  if (!purchase.user_id) {
    throw new Error("No user ID found for subscription");
  }

  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", purchase.user_id)
    .single();

  console.log({
    CANCEL_AT_PERIOD_END: subscription.cancel_at_period_end,
    IS_ENDED_NOW: isEndedNow,
    USER_EMAIL: user?.email,
  });

  if (subscription.cancel_at_period_end && !isEndedNow && user?.email) {
    // Handle scheduled cancellation
    const expirationDate = new Date(
      subscription.current_period_end * 1000
    ).toISOString();

    await updatePurchaseRecord(supabase, {
      email: user.email,
      userId: purchase.user_id,
      productType: "subscription",
      status: "active",
      customerId: subscription.customer as string,
      subscriptionId: subscription.id,
      expirationDate,
    });

    if (purchase?.user_id) {
      await updateUserProfile(supabase, {
        userId: purchase.user_id,
        email: user.email,
        status: "pending_cancellation",
      });
    }
    return;
  }

  if (isEndedNow && user?.email) {
    // Handle immediate cancellation
    await updatePurchaseRecord(supabase, {
      email: user.email,
      userId: purchase.user_id,
      productType: "subscription",
      status: "cancelled",
      customerId: subscription.customer as string,
      subscriptionId: subscription.id,
    });

    if (purchase?.user_id) {
      await updateUserProfile(supabase, {
        userId: purchase.user_id,
        email: user.email,
        status: "cancelled",
        tier: null,
      });
    }
  }
}

export async function handleSubscriptionChange(data: SubscriptionData) {
  console.log("Handling subscription change:", data);
  const supabase = await createClient();
  const email = data.email.trim().toLowerCase();

  const { data: users, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (userError) {
    throw new Error(`Failed to lookup user: ${userError.message}`);
  }

  const user = users?.[0];

  const updates = [
    updatePurchaseRecord(supabase, {
      email,
      userId: user?.id || null,
      productType: "subscription",
      tier: "basic",
      status: "active",
      customerId: data.customerId,
      subscriptionId: data.subscriptionId,
    }),
    user?.id
      ? updateUserProfile(supabase, {
          userId: user.id,
          email,
          tier: "basic",
          status: "active",
        })
      : null,
  ].filter(Boolean);

  const results = await Promise.all(updates);

  const errors = results
    .map(
      (result, index) =>
        result?.error && `Update ${index}: ${result.error.message}`
    )
    .filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`Database updates failed: ${errors.join(", ")}`);
  }
}

export async function handleTemplatePayment(session: Stripe.Checkout.Session) {
  const supabase = await createClient();
  const customerId = session.customer as string;
  const email = session.customer_details?.email!;

  const { error } = await updatePurchaseRecord(supabase, {
    email,
    productType: "template",
    status: "active",
    customerId,
    expirationDate: new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString(),
  });

  if (error) {
    throw new Error(`Failed to record template purchase: ${error.message}`);
  }
}

export function getNameApiBase() {
  // return process.env.NODE_ENV === "development"
  //   ? "https://api.dev.name.com/v4"
  //   : "https://api.name.com/v4";
  return "https://api.dev.name.com/v4";
}

async function registerDomain(domainName: string, email: string) {
  const nameAuth = await getNameAuth();

  const namecomApiBase = getNameApiBase();

  try {
    // First check availability one last time
    const availabilityResponse = await fetch(
      `${namecomApiBase}/domains:checkAvailability`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${nameAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainNames: [domainName],
        }),
      }
    );

    const availabilityData = await availabilityResponse.json();
    const domainResult = availabilityData.results?.[0];

    if (!domainResult?.purchasable) {
      throw new Error("Domain is no longer available for purchase");
    }

    // Register the domain
    const response = await fetch(`${namecomApiBase}/domains`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${nameAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: {
          domainName,
        },
        contacts: {
          registrant: {
            email,
          },
        },
        period: 1, // 1 year registration
        purchasePrice: domainResult.purchasePrice,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to register domain: ${error.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering domain:", error);
    throw error;
  }
}

async function handleDomainPurchase(session: Stripe.Checkout.Session) {
  console.log("Processing domain purchase for session:", session.id);
  const supabase = await createClient();

  const { domainName, userId } = session.metadata || {};
  const email = session.customer_details?.email;

  if (!domainName || !email) {
    throw new Error("Missing required domain purchase information");
  }

  // Find existing purchase record by session ID
  const { data: existingPurchase, error: lookupError } = await supabase
    .from("purchases")
    .select("*")
    .eq("metadata->stripeSessionId", `"${session.id}"`)
    .single();

  if (lookupError) {
    console.error("Error looking up purchase:", lookupError);
    throw lookupError;
  }

  if (!existingPurchase) {
    throw new Error("No purchase record found for session: " + session.id);
  }

  try {
    console.log("BEFORE REGISTER");
    await registerDomain(domainName, email);
    console.log("PAST REGISTER");

    // Update the existing purchase record
    const { error: purchaseError } = await supabase
      .from("purchases")
      .update({
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("metadata->stripeSessionId", `"${session.id}"`);

    if (purchaseError) {
      console.error("Error updating purchase:", purchaseError);
      throw purchaseError;
    }

    // Add domain to domains table if user exists
    if (userId) {
      const { error: domainError } = await supabase.from("domains").upsert({
        domain: domainName,
        user_id: userId,
        created_at: new Date().toISOString(),
        verified: false,
      });

      if (domainError) {
        console.error("Error saving domain:", domainError);
      }
    }
  } catch (error) {
    // Update the existing purchase record with error status
    await supabase
      .from("purchases")
      .update({
        status: "failed",
        updated_at: new Date().toISOString(),
        metadata: {
          ...((existingPurchase.metadata as Record<string, unknown>) || {}),
          error: error instanceof Error ? error.message : "Unknown error",
        },
      })
      .eq("metadata->stripeSessionId", `"${session.id}"`);

    throw error;
  }
}

// Utility functions
export function createStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });
}

export async function stripeRequest<T>(
  { method, path, data }: StripeRequestOptions,
  secretKey: string
): Promise<T> {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      "Stripe-Version": "2023-10-16",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = (await response.json()) as { error?: { message: string } };
    throw new Error(error.error?.message || "Stripe API error");
  }

  return response.json();
}

export async function verifyStripeWebhook(req: Request, stripe: Stripe) {
  const text = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    throw new Error("No stripe-signature header found");
  }

  try {
    return {
      event: stripe.webhooks.constructEvent(text, sig, STRIPE_WEBHOOK_SECRET),
      rawBody: text,
    };
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    throw new Error(`Webhook Error: ${err.message}`);
  }
}

export async function processStripeEvent(event: Stripe.Event, stripe: Stripe) {
  console.log("Processing Stripe event: ", event.type);
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSession(event.data.object as Stripe.Checkout.Session);
      break;

    case "customer.subscription.deleted":
      await handleSubscriptionCancelled(
        event.data.object as Stripe.Subscription
      );
      break;
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(
        subscription.customer as string
      );
      if (customer.deleted) {
        throw new Error("Customer has been deleted");
      }

      const supabase = await createClient();

      // If subscription is scheduled for cancellation
      if (subscription.cancel_at_period_end) {
        const { data: purchase } = await supabase
          .from("purchases")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (purchase?.user_id) {
          const expirationDate = new Date(
            subscription.current_period_end * 1000
          ).toISOString();

          await updatePurchaseRecord(supabase, {
            email: customer.email || "",
            userId: purchase.user_id,
            productType: "subscription",
            status: "active",
            customerId: subscription.customer as string,
            subscriptionId: subscription.id,
            expirationDate,
          });

          await updateUserProfile(supabase, {
            userId: purchase.user_id,
            email: customer.email || "",
            status: "pending_cancellation",
          });
        }
      } else {
        // Regular subscription update
        const subscriptionData: SubscriptionData = {
          email: customer.email || "",
          customerId: subscription.customer as string,
          subscriptionId: subscription.id,
          invoiceId: subscription.latest_invoice as string,
        };
        await handleSubscriptionChange(subscriptionData);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}
