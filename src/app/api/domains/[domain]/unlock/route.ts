import { getNameAuth } from "@/lib/name";
import { getNameApiBase } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const nameAuth = await getNameAuth();
    const BASE_URL = getNameApiBase();

    const url = `${BASE_URL}/domains/${params.domain}:unlock`;
    console.log({ url });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${nameAuth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log({ UNLOCKDATA: data });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error unlocking domain:", error);
    return NextResponse.json(
      { error: "Failed to unlock domain" },
      { status: 500 }
    );
  }
}
