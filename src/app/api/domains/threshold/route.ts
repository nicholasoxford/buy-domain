import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const { threshold } = await request.json();
    const supabase = await createClient();

    // Verify user has access to this domain
    const { data: domain, error: domainError } = await supabase
      .from("domains")
      .select("user_id")
      .eq("domain", params.domain)
      .single();

    if (domainError || !domain) {
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });
    }

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user || user.id !== domain.user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update threshold
    const { error: updateError } = await supabase
      .from("domains")
      .update({ notification_threshold: threshold })
      .eq("domain", params.domain);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating threshold:", error);
    return NextResponse.json(
      { error: "Failed to update threshold" },
      { status: 500 }
    );
  }
}
