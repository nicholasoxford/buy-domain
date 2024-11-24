import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteDomain } from "@/lib/supabase/actions";

export async function DELETE(
  req: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteDomain(params.domain, session.user.id);
    return NextResponse.json({ message: "Domain deleted successfully" });
  } catch (error) {
    console.error("Failed to delete domain:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete domain",
      },
      { status: 500 }
    );
  }
}
