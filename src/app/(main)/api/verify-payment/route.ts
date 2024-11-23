import { stripeRequest } from "@/lib/stripe";
import { getEnvVariables } from "@/utils/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const env = await getEnvVariables();
    const { sessionId } = (await request.json()) as { sessionId: string };

    const session = await stripeRequest<{ payment_status: string }>(
      {
        method: "GET",
        path: `/checkout/sessions/${sessionId}`,
      },
      env.STRIPE_SECRET_KEY!
    );

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to verify payment", details: error.message },
      { status: 500 }
    );
  }
}
