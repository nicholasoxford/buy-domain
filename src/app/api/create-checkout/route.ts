import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { DomainProduct } from "@/types";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  console.log("HELLO");
  const stripe = createStripeClient();
  const supabase = createClient();
  console.log("LETS GO");
  try {
    const {
      domainName,
      price,
      currency = "usd",
      email,
      userId,
    }: DomainProduct & {
      email?: string;
      userId?: string;
    } = await request.json();
    console.log("PAST JSON");
    // Validate required email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    console.log("PAST EMAIL");

    // Create a new product for this domain
    const product = await stripe.products.create({
      name: domainName,
      metadata: {
        domainName,
        type: "domain_purchase",
      },
    });
    console.log("PAST PRODUCT... price: ", price);
    // Convert price to cents and ensure it's a clean integer
    const priceInCents = Math.round(price * 100);
    // Create a one-time price for this product
    const stripePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: priceInCents,
      currency: "usd",
    });
    console.log("PAST PRICE");
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        domainName,
        userId: userId || "",
        type: "domain_purchase",
      },
      customer_email: email,
    } as Stripe.Checkout.SessionCreateParams);
    console.log("PAST EVERYTHING STRIPE");
    // Save initial purchase record
    const { error: purchaseError } = await supabase.from("purchases").insert({
      email,
      user_id: userId || null,
      product_type: "other" as const,
      status: "pending",
      metadata: {
        domainName,
        price,
        currency,
        stripeProductId: product.id,
        stripePriceId: stripePrice.id,
        stripeSessionId: session.id,
        type: "domain_purchase",
      },
      created_at: new Date().toISOString(),
    });

    if (purchaseError) {
      console.error("Error saving purchase:", purchaseError);
    }

    // Return the checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
