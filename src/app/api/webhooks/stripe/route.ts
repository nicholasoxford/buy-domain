import { NextResponse } from "next/server";
import {
  createStripeClient,
  processStripeEvent,
  verifyStripeWebhook,
} from "@/lib/stripe";
import { withErrorHandler, AppError } from "@/lib/error-handler";
import { headers } from "next/headers";

async function handler(req: Request) {
  // Verify request method
  if (req.method !== "POST") {
    throw new AppError("Method not allowed", 405);
  }

  // Get Stripe signature
  const headersList = headers();
  const signature = headersList.get("stripe-signature");
  if (!signature) {
    throw new AppError("No Stripe signature found", 400);
  }

  const stripe = createStripeClient();

  // Verify webhook signature and get event
  const { event } = await verifyStripeWebhook(req, stripe);

  // Process the event with retries
  let retries = 3;
  while (retries > 0) {
    try {
      await processStripeEvent(event, stripe);
      break;
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw new AppError(
          `Failed to process Stripe event after 3 retries: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          500
        );
      }
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, 3 - retries) * 1000)
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export const POST = withErrorHandler(handler);
