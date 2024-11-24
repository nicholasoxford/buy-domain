import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No stripe-signature header found" },
        { status: 400 }
      );
    }

    console.log("Received webhook with signature:", sig);
    console.log("Webhook body:", body);
    console.log("Endpoint secret:", endpointSecret.slice(0, 5) + "..."); // Log first few chars for debugging

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for session:", session.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }
}

// Disable body parsing, we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
