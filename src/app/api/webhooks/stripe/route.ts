import { NextResponse } from "next/server";
import {
  createStripeClient,
  processStripeEvent,
  verifyStripeWebhook,
} from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = createStripeClient();

  try {
    // Verify webhook signature and get event
    const { event } = await verifyStripeWebhook(req, stripe);

    // Process the event immediately
    await processStripeEvent(event, stripe);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    // Log the full error for debugging
    console.error("Webhook error:", err);

    // Return a more specific error message
    return NextResponse.json(
      {
        error: `Webhook error: ${err.message}`,
        type: err.type || "unknown",
      },
      { status: 400 }
    );
  }
}
