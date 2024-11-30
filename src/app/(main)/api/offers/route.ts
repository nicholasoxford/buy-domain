import { NextRequest, NextResponse } from "next/server";
import { cleanDomainName, submitDomainOffer } from "@/lib/supabase/actions";
import { withErrorHandler } from "@/lib/error-handler";
import { validateData, offerSchema } from "@/lib/validation";

// CORS headers with more restrictive settings
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

async function handler(request: NextRequest) {
  if (request.method !== "POST") {
    return new NextResponse("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  // Validate request origin
  const origin = request.headers.get("origin");
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOWED_ORIGINS &&
    !process.env.ALLOWED_ORIGINS.split(",").includes(origin || "")
  ) {
    return new NextResponse("Invalid origin", {
      status: 403,
      headers: corsHeaders,
    });
  }

  const data = await request.json();
  const validatedData = await validateData(offerSchema, data);

  // Clean domain name
  const cleanedDomain = cleanDomainName(validatedData.domain);

  // Submit offer with validated and cleaned data
  const result = await submitDomainOffer(cleanedDomain, {
    email: validatedData.email,
    amount: validatedData.amount,
    description:
      validatedData.description || `Offer from ${validatedData.name}`,
    domain: cleanedDomain,
    name: validatedData.name,
  });

  return new NextResponse(JSON.stringify(result), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export const POST = withErrorHandler(handler);
