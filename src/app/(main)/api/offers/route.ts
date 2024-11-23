import { NextRequest } from "next/server";
import {
  EnvVariables,
  getBaseUrlServerSide,
  getEnvVariables,
} from "@/utils/env";
import { submitDomainOffer } from "@/lib/supabase/actions";
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
  // Get KV namespace
  const env = getEnvVariables();
  const baseUrl = await getBaseUrlServerSide();

  // Get domain from query param
  const domain = baseUrl;

  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const { email, amount, description } =
      (await request.json()) as DomainOffer;

    if (!email || !amount) {
      return new Response("Email, amount, and token are required", {
        status: 400,
        headers: corsHeaders,
      });
    }
    // Convert offer to number
    const offerAmount =
      typeof amount === "number" ? amount : parseInt(String(amount), 10);

    // // Verify the token
    // const isValid = await verifyToken(token, env);
    // if (!isValid) {
    //   return new Response("Invalid token", {
    //     status: 400,
    //     headers: corsHeaders,
    //   });
    // }

    // Then submit the offer
    const result = await submitDomainOffer(domain, {
      email,
      amount: offerAmount,
      description: description || `Offer from ${name}`,
    });
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Invalid request body", {
      status: 400,
      headers: corsHeaders,
    });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const DELETE = handleRequest;
