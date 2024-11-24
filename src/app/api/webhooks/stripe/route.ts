import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper to determine subscription tier from price
function getTierFromPriceId(
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

async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
  customerDetails?: Stripe.Checkout.Session.CustomerDetails | null
) {
  const supabase = await createClient();
  console.log("RIGHT BEFORE USER LOOKUP");
  // Try to find user by email
  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", customerDetails?.email || "")
    .single();

  console.log({ user: user?.id });
  console.log({ priceId: subscription?.items.data[0]?.price?.id });
  const tier = getTierFromPriceId(subscription?.items.data[0]?.price?.id || "");
  console.log({ tier });
  // Start a transaction to update both tables
  const updates = [
    // Update purchases table
    supabase.from("purchases").upsert(
      {
        email: customerDetails?.email || "",
        user_id: user?.id || null,
        product_type: "subscription",
        tier,
        status: subscription.status,
        stripe_customer_id: (subscription.customer as string) ?? null,
        stripe_subscription_id: subscription.id,
        expiration_date: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "stripe_subscription_id" }
    ),

    // Update profiles table if we have a user
    user?.id
      ? supabase
          .from("profiles")
          .update({
            subscription_tier: tier,
            subscription_status: subscription.status,
          })
          .eq("id", user.id)
      : null,
  ].filter(Boolean);

  // Execute all updates
  const results = await Promise.all(updates);

  // Check for errors
  results.forEach((result, index) => {
    if (result?.error) {
      console.error(`Error in update ${index}:`, result.error);
    }
  });
}

async function handleTemplatePayment(session: Stripe.Checkout.Session) {
  const supabase = await createClient();
  const customerId = session.customer as string;

  // Upsert purchase record for template
  const { error, data } = await supabase.from("purchases").upsert({
    email: session.customer_details?.email!,
    product_type: "template",
    stripe_customer_id: customerId,
    expiration_date: new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString(), // 1 year
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error recording template purchase:", error);
  }
}

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const sig = headers().get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No stripe-signature header found" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(text, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Send response early to avoid timeout issues
    const response = NextResponse.json({ received: true }, { status: 200 });
    console.log("Received event:", event.type);
    // Process the event asynchronously
    (async () => {
      try {
        switch (event.type) {
          case "payment_intent.succeeded":
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log("Payment successful for intent:", paymentIntent.id);
            break;

          case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            console.log("Payment successful for session:", session.id);
            console.log("Session mode:", session.mode);
            if (session.mode === "payment") {
              await handleTemplatePayment(session);
            } else if (session.mode === "subscription") {
              const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
              );
              await handleSubscriptionChange(
                subscription,
                session.customer_details
              );
            }
            break;

          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;
            await handleSubscriptionChange(subscription);
            break;

          default:
            console.log(`Unhandled event type: ${event.type}`);
        }
      } catch (err: any) {
        console.error("Async webhook processing error:", err.message);
      }
    })();

    return response;
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }
}
