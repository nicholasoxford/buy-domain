import { getDomainByName } from "@/lib/supabase/actions";
import { notFound } from "next/navigation";
import DomainPage from "./DomainPageClient";

export default async function DomainPageServer({
  params,
}: {
  params: { domain: string };
}) {
  const domain = await getDomainByName(params.domain);

  if (!domain) {
    notFound();
  }

  return <DomainPage domain={domain} />;
}
