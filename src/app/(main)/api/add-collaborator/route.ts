import { getEnvVariables } from "@/utils/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const env = getEnvVariables();
    const { username, sessionId } = (await request.json()) as {
      username: string;
      sessionId: string;
    };
    // Validate the session ID first (similar to thank-you page)
    // This ensures only paid users can add collaborators
    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    const session = (await stripeResponse.json()) as {
      payment_status: string;
    } as {
      payment_status: string;
    };
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 403 }
      );
    }
    // Add user as collaborator using GitHub API with User-Agent header
    const response = await fetch(
      `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/collaborators/${username}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "Domain-Dash-App",
        },
        body: JSON.stringify({
          permission: "pull", // or whatever permission level you want to grant
        }),
      }
    );

    if (!response.ok) {
      const res = await response.text();
      const error = (await response.json()) as {
        message: string;
      };
      return NextResponse.json(
        { error: error.message || "Failed to add collaborator" },
        { status: response.status }
      );
    }
    // Status 201: New invitation created
    // Status 204: User was already a collaborator
    const status = response.status;
    const res = await response.text();
    return NextResponse.json({
      success: true,
      status,
      message: status === 201 ? "Invitation sent" : "Collaborator added",
    });
  } catch (error: any) {
    const message = error.message || "Internal server error";
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
