import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const text = await req.text(); // Get raw body as text
    const headersList = headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No stripe-signature header found" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      console.log({ endpointSecret });
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

    // Process the event asynchronously
    (async () => {
      try {
        switch (event.type) {
          case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            console.log("Payment successful for session:", session.id);
            // Handle your business logic here
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
