import { NextResponse } from "next/server";
import { getNameAuth } from "@/lib/name";
import { getNameApiBase } from "@/lib/stripe";

export async function POST(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const { enable } = await request.json();
    const nameAuth = await getNameAuth();
    const BASE_URL = getNameApiBase();
    const endpoint = enable ? "enableWhoisPrivacy" : "disableWhoisPrivacy";
    const response = await fetch(
      `${BASE_URL}/domains/${params.domain}:${endpoint}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${nameAuth}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to ${enable ? "enable" : "disable"} WHOIS privacy`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error toggling WHOIS privacy:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
