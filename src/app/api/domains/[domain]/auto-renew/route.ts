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
    const NAME_API_BASE = getNameApiBase();
    const endpoint = enable ? "enableAutorenew" : "disableAutorenew";
    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}:${endpoint}`,
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
        `Failed to ${enable ? "enable" : "disable"} auto-renewal`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
