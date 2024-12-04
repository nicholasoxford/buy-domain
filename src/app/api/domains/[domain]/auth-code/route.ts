import { getNameAuth } from "@/lib/name";
import { getNameApiBase } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const nameAuth = await getNameAuth();
    const BASE_URL = getNameApiBase();

    const url = `${BASE_URL}/domains/${params.domain}:getAuthCode`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${nameAuth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting auth code:", error);
    return NextResponse.json(
      { error: "Failed to get auth code" },
      { status: 500 }
    );
  }
}
