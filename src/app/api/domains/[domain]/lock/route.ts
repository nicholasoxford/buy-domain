import { getNameApiBase } from "@/lib/stripe";
import { NextResponse } from "next/server";

const NAMECOM_USERNAME = process.env.NAMECOM_USERNAME;
const NAMECOM_TOKEN = process.env.NAMECOM_TOKEN;
const NAMECOM_API_BASE = getNameApiBase();

export async function POST(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const auth = Buffer.from(`${NAMECOM_USERNAME}:${NAMECOM_TOKEN}`).toString(
      "base64"
    );

    const url = `${NAMECOM_API_BASE}/domains/${params.domain}:lock`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error locking domain:", error);
    return NextResponse.json(
      { error: "Failed to lock domain" },
      { status: 500 }
    );
  }
}
