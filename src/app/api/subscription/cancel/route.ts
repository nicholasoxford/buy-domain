import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User ID:", user.id);

    // Get the user's subscription from the purchases table
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("stripe_subscription_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    console.log({ purchase, purchaseError });

    if (purchaseError || !purchase?.stripe_subscription_id) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    // Cancel the subscription in Stripe
    const stripe = createStripeClient();
    await stripe.subscriptions.update(purchase.stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    // Update the purchase record
    await supabase
      .from("purchases")
      .update({ status: "cancelled" })
      .eq("stripe_subscription_id", purchase.stripe_subscription_id);

    // Update the user's profile
    await supabase
      .from("profiles")
      .update({
        subscription_status: "cancelled",
        subscription_tier: null,
      })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
