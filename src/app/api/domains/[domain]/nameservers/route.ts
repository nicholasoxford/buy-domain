import { NextResponse } from "next/server";
import { getNameAuth } from "@/lib/name";
import { getNameApiBase } from "@/lib/stripe";

export async function POST(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const { nameservers } = await request.json();
    const nameAuth = await getNameAuth();
    const NAME_API_BASE = getNameApiBase();

    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}:setNameservers`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${nameAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameservers }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update nameservers");
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
