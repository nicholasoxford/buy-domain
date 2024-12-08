import { NextRequest, NextResponse } from "next/server";

import { getNameApiBase } from "@/lib/stripe";
import { getNameAPIHeaders } from "@/lib/name-api";

const NAME_API_BASE = getNameApiBase();

// GET /api/domains/[domain]/dns/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string; id: string } }
) {
  try {
    const headers = await getNameAPIHeaders();
    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}/records/${params.id}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
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

// PUT /api/domains/[domain]/dns/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { domain: string; id: string } }
) {
  try {
    const body = await request.json();
    const headers = await getNameAPIHeaders();

    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}/records/${params.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          host: body.name,
          type: body.type,
          answer: body.value,
          ttl: body.ttl || 300,
          priority: body.priority,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
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

// DELETE /api/domains/[domain]/dns/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { domain: string; id: string } }
) {
  try {
    const headers = await getNameAPIHeaders();
    console.log({ NAME_API_BASE });
    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}/records/${params.id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Name.com API error: ${response.statusText}`);
    }

    return NextResponse.json({});
  } catch (error) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
