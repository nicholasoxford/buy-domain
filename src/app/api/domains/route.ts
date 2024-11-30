import { NextResponse } from "next/server";
import { addDomain } from "@/lib/supabase/actions";
import { auth } from "@/lib/auth";
import { withErrorHandler } from "@/lib/error-handler";
import { validateData, domainSchema } from "@/lib/validation";
import { headers } from "next/headers";

async function handler(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const validatedDomain = await validateData(domainSchema, data.domain);

  const result = await addDomain(validatedDomain, session.user.id);
  return NextResponse.json(result);
}

export const POST = withErrorHandler(handler);
