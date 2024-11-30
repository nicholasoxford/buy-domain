import { getDomainByName } from "@/lib/supabase/actions";
import { notFound } from "next/navigation";
import DomainPage from "./DomainPageClient";
import { getNameservers } from "@/lib/dns";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export default async function DomainPageServer({
  params,
}: {
  params: { domain: string };
}) {
  const domain = await getDomainByName(params.domain);

  if (!domain) {
    notFound();
  }

  const nameservers = await getNameservers(domain.domain);

  console.log({ nameservers });

  return <DomainPage domain={domain} />;
}
