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

export async function GET(
  request: Request,
  { params }: { params: { domain: string } }
) {
  const domain = params.domain;
  const namecomUsername = process.env.NAMECOM_USERNAME;
  const namecomToken = process.env.NAMECOM_TOKEN;
  const namecomCredentials = Buffer.from(
    `${namecomUsername}:${namecomToken}`
  ).toString("base64");

  const namecomApiBase =
    process.env.NODE_ENV === "development"
      ? "https://api.dev.name.com/v4"
      : "https://api.name.com/v4";

  try {
    // First check availability
    const availabilityResponse = await fetch(
      `${namecomApiBase}/domains:checkAvailability`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${namecomCredentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainNames: [domain],
        }),
      }
    );

    // Get pricing info
    const pricingResponse = await fetch(
      `${namecomApiBase}/domains/${domain}:getPricing`,
      {
        headers: {
          Authorization: `Basic ${namecomCredentials}`,
          Accept: "application/json",
        },
      }
    );

    const availabilityData = await availabilityResponse.json();
    const pricingData = await pricingResponse.json();
    console.log({ availabilityData: availabilityData.results, pricingData });
    // The first result in the array contains our domain's availability
    const domainResult = availabilityData.results?.[0];

    const namecomPricesWithMarkup = {
      provider: "Name.com",
      registration_price: pricingData.purchasePrice,
      renewal_price: pricingData.renewalPrice,
      transfer_price: pricingData.transferPrice,
      premium: pricingData.premium || false,
    };

    console.log({});

    return NextResponse.json({
      prices: [namecomPricesWithMarkup],
      availability: domainResult.purchasable,
    });
  } catch (error) {
    console.error("Error fetching domain info:", error);
    return NextResponse.json(
      { error: "Failed to fetch domain information" },
      { status: 500 }
    );
  }
}
