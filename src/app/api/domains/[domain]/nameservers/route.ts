import { getNameservers } from "@/lib/dns";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const nameservers = await getNameservers(params.domain);
    return NextResponse.json({ nameservers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch nameservers" },
      { status: 500 }
    );
  }
}
