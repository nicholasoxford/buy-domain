import Stripe from "stripe";
import { createClient } from "./supabase/server";
import { headers } from "next/headers";
import { STRIPE_WEBHOOK_SECRET } from "@/utils/constants";

interface StripeRequestOptions {
  method: "GET" | "POST" | "DELETE";
  path: string;
  data?: any;
}

export async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  console.log("Payment successful for session:", session.id);
  console.log("Session mode:", session.mode);
  if (session.mode === "payment") {
    await handleTemplatePayment(session);
  } else if (session.mode === "subscription") {
    await handleSubscriptionChange({
      email: session.customer_details?.email || "",
      customerId: session.customer as string,
      subscriptionId: session.subscription as string,
      invoiceId: session.invoice as string,
    });
  }
}

export async function processStripeEvent(event: Stripe.Event, stripe: Stripe) {
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSession(event.data.object as Stripe.Checkout.Session);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
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

export function createStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });
}

// Helper to determine subscription tier from price
export function getTierFromPriceId(
  priceId: string
): "basic" | "premium" | "professional" | "template" {
  const PRICE_TO_TIER: Record<
    string,
    "basic" | "premium" | "professional" | "template"
  > = {
    [process.env.STRIPE_BASIC_PRICE_ID!]: "basic", // $5/month
    [process.env.STRIPE_PREMIUM_PRICE_ID!]: "premium", // $25/month
    [process.env.STRIPE_PRO_PRICE_ID!]: "professional", // $40/month
    [process.env.STRIPE_TEMPLATE_PRICE_ID!]: "template", // $10 one-time
  };
  return PRICE_TO_TIER[priceId] || "basic";
}

export type SubscriptionData = {
  email: string;
  customerId: string;
  subscriptionId: string;
  invoiceId: string;
};

export async function handleSubscriptionChange(data: SubscriptionData) {
  const supabase = await createClient();
  const email = data.email.trim().toLowerCase();

  console.log("Searching for email:", email);

  console.log("GET ALL PROFILES");

  console.log(await supabase.from("profiles").select("*"));

  // Simple exact match query with debug logging
  const { data: users, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  console.log("Query result:", { users, error: userError });

  if (userError) {
    console.error("Error looking up user:", userError);
    throw new Error(`Failed to lookup user: ${userError.message}`);
  }

  const user = users?.[0];
  if (!user) {
    console.warn(`No user found for email: ${email}`);
  }

  const updates = [
    supabase.from("purchases").upsert(
      {
        email: email,
        user_id: user?.id || null,
        product_type: "subscription",
        tier: "basic",
        status: "active",
        stripe_customer_id: data.customerId,
        stripe_subscription_id: data.subscriptionId,
        updated_at: new Date().toISOString(),
      },
      {
        // Specify which columns to match for the conflict
        onConflict: "stripe_customer_id, stripe_subscription_id",
      }
    ),
    user?.id
      ? supabase
          .from("profiles")
          .update({
            subscription_tier: "basic",
            subscription_status: "active",
          })
          .eq("id", user.id)
      : null,
  ].filter(Boolean);
  console.log("RIGHT BEFORE EXECUTION");
  // Execute all updates
  const results = await Promise.all(updates);
  console.log("RESULTS: ", results);
  // Check for errors and throw if an  found
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

export async function handleTemplatePayment(session: Stripe.Checkout.Session) {
  const supabase = await createClient();
  const customerId = session.customer as string;

  const { error } = await supabase.from("purchases").upsert({
    email: session.customer_details?.email!,
    product_type: "template",
    stripe_customer_id: customerId,
    expiration_date: new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString(), // 1 year
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to record template purchase: ${error.message}`);
  }
}
