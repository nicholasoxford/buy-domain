import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteDomain } from "@/lib/supabase/actions";
import { getNameApiBase } from "@/lib/stripe";
import { getNameAuth } from "@/lib/name";

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

export async function GET(
  request: Request,
  { params }: { params: { domain: string } }
) {
  const domain = params.domain;

  const nameAuth = await getNameAuth();
  const NAME_API_BASE = getNameApiBase();
  try {
    // First check availability
    const availabilityResponse = await fetch(
      `${NAME_API_BASE}/domains:checkAvailability`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${nameAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainNames: [domain],
        }),
      }
    );

    // Get pricing info
    const pricingResponse = await fetch(
      `${NAME_API_BASE}/domains/${domain}:getPricing`,
      {
        headers: {
          Authorization: `Basic ${nameAuth}`,
          Accept: "application/json",
        },
      }
    );

    const availabilityData = await availabilityResponse.json();
    const pricingData = await pricingResponse.json();
    // The first result in the array contains our domain's availability
    const domainResult = availabilityData.results?.[0];

    const namecomPricesWithMarkup = {
      provider: "Name.com",
      registration_price: calculatePriceWithMarkup(pricingData.purchasePrice),
      renewal_price: calculatePriceWithMarkup(pricingData.renewalPrice),
      transfer_price: calculatePriceWithMarkup(pricingData.transferPrice),
      premium: pricingData.premium || false,
    };

    function calculatePriceWithMarkup(basePrice: number): number {
      const tenPercentMarkup = basePrice * 0.1;
      const markup = Math.max(4, tenPercentMarkup);
      return Number((basePrice + markup).toFixed(2));
    }

    console.log({ domainResult, namecomPricesWithMarkup });

    return NextResponse.json({
      prices: [namecomPricesWithMarkup],
      availability: domainResult.purchasable ?? false,
    });
  } catch (error) {
    console.error("Error fetching domain info:", error);
    return NextResponse.json(
      { error: "Failed to fetch domain information" },
      { status: 500 }
    );
  }
}
