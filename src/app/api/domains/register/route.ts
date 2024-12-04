import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call Name.com API to register the domain
    const response = await fetch("https://api.name.com/v4/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NAME_COM_USERNAME}:${process.env.NAME_COM_API_TOKEN}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        domain: {
          domainName: body.domain,
          contacts: body.contacts,
        },
        // Add other required fields based on the Name.com API
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register domain");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error registering domain:", error);
    return NextResponse.json(
      { error: "Failed to register domain" },
      { status: 500 }
    );
  }
}
