import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { checkDomainVerification } from "@/lib/vercel/api";

export async function GET(
  req: Request,
  { params }: { params: { domain: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await checkDomainVerification(params.domain);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to verify domain:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to verify domain",
      },
      { status: 500 }
    );
  }
}
