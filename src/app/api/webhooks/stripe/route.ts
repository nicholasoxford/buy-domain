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

    // Send response early to avoid timeout issues
    const response = NextResponse.json({ received: true }, { status: 200 });

    // Process the event asynchronously
    (async () => {
      try {
        await processStripeEvent(event, stripe);
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
