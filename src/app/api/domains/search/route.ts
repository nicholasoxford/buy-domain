import { getNameApiBase } from "@/lib/stripe";
import { getNameAPIHeaders } from "@/lib/name-api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { keyword } = await request.json();
    const NAME_API_BASE = getNameApiBase();
    const headers = await getNameAPIHeaders();

    const response = await fetch(`${NAME_API_BASE}/domains:searchStream`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });

    // Stream the response directly to the client
    return new NextResponse(response.body);
  } catch (error) {
    console.error("Domain search failed:", error);
    return NextResponse.json(
      { error: "Failed to search domains" },
      { status: 500 }
    );
  }
}
