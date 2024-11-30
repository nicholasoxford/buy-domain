import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import {
  BUY_TEMPLATE_STRIPE_LINK,
  BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK,
} from "@/utils/constants";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirect = requestUrl.searchParams.get("redirect") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Handle special redirect cases
  let finalRedirect = redirect;
  if (redirect === "/buy-template") {
    finalRedirect = BUY_TEMPLATE_STRIPE_LINK;
  }
  if (redirect === "/buy-basic-subscription") {
    finalRedirect = BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK;
  }

  // For external URLs (like Stripe), use the full URL
  if (finalRedirect.startsWith("http")) {
    return NextResponse.redirect(finalRedirect);
  }

  // For internal routes, use the origin + path
  return NextResponse.redirect(`${requestUrl.origin}${finalRedirect}`);
}
