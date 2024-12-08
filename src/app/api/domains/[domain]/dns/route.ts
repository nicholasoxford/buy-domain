import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getNameApiBase } from "@/lib/stripe";

const NAME_API_BASE = getNameApiBase();

async function getNameAPIHeaders() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // You should store these securely in environment variables
  const username = process.env.NAMECOM_USERNAME;
  const token = process.env.NAMECOM_TOKEN;

  if (!username || !token) {
    throw new Error("Missing Name.com API credentials");
  }

  const auth = Buffer.from(`${username}:${token}`).toString("base64");
  return {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
}

// GET /api/domains/[domain]/dns
export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string } }
) {
  try {
    const headers = await getNameAPIHeaders();
    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}/records`,
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

// POST /api/domains/[domain]/dns
export async function POST(
  request: NextRequest,
  { params }: { params: { domain: string } }
) {
  try {
    const body = await request.json();
    const headers = await getNameAPIHeaders();

    const response = await fetch(
      `${NAME_API_BASE}/domains/${params.domain}/records`,
      {
        method: "POST",
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
