import { OfferForm } from "@/components/OfferFormExample";
import { trackPageView } from "@/lib/supabase/actions";
import { headers } from "next/headers";

export default function Page() {
  async function getSiteKey() {
    "use server";
    const headersRes = headers();
    const domain = headersRes.get("host");

    if (!domain) {
      throw new Error("Domain not found");
    }

    return {
      BASE_URL: domain,
    };
  }

  async function trackVisit() {
    "use server";

    // get the domain from the base url
    const headersRes = headers();
    const domain = headersRes.get("host");

    if (!domain) {
      throw new Error("Domain not found");
    }

    await trackPageView(
      JSON.stringify({
        domain,
        timestamp: new Date().toISOString(),
        userAgent: headersRes.get("user-agent"),
        referer: headersRes.get("referer"),
      })
    );
  }

  return <OfferForm getSiteKey={getSiteKey} trackVisit={trackVisit} />;
}
