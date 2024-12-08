import { getNameApiBase } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getNameAuth } from "@/lib/name";
const NAMECOM_API_BASE = getNameApiBase();
export async function GET(
  request: Request,
  { params }: { params: { domain: string } }
) {
  const nameAuth = await getNameAuth();
  try {
    const url = `${NAMECOM_API_BASE}/domains/${params.domain}`;

    console.log({ url });

    const response = await fetch(url, {
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
    console.error("Error fetching domain info:", error);
    return NextResponse.json(
      { error: "Failed to fetch domain information" },
      { status: 500 }
    );
  }
}
