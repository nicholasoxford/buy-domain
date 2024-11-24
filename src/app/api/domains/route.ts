import { NextResponse } from "next/server";
import { addDomain } from "@/lib/supabase/actions";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      );
    }

    const result = await addDomain(domain, session.user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to add domain:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to add domain",
      },
      { status: 500 }
    );
  }
}
