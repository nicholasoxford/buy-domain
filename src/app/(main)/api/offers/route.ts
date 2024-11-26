import { NextRequest } from "next/server";
import { cleanDomainName, submitDomainOffer } from "@/lib/supabase/actions";
import { DomainOffer } from "@/lib/utils";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

async function handleRequest(request: NextRequest) {
  // Get domain from query param

  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    console.log("RIGHT BEFORE JSON");
    const { email, amount, description, domain, name } =
      (await request.json()) as DomainOffer;
    console.log("AFTER JSON");
    if (!email || !amount) {
      return new Response("Email, amount, and token are required", {
        status: 400,
        headers: corsHeaders,
      });
    }
    // Convert offer to number
    const offerAmount =
      typeof amount === "number" ? amount : parseInt(String(amount), 10);
    console.log("AFTER AMOUNT");
    // // Verify the token
    // const isValid = await verifyToken(token, env);
    // if (!isValid) {
    //   return new Response("Invalid token", {
    //     status: 400,
    //     headers: corsHeaders,
    //   });
    // }

    // clean up the domain to remove http:// or https:// and www.
    const cleanedDomain = cleanDomainName(domain);

    // Then submit the offer
    const result = await submitDomainOffer(domain, {
      email,
      amount: offerAmount,
      description: description || `Offer from ${name}`,
      domain: cleanedDomain,
      name,
    });
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting domain offer: ", error);
    return new Response("Invalid request body: " + error, {
      status: 400,
      headers: corsHeaders,
    });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const DELETE = handleRequest;
