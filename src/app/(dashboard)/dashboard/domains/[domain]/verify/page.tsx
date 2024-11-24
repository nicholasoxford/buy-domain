import { getDomainByName } from "@/lib/supabase/actions";
import { DomainVerification } from "./DomainVerification";

export default async function DomainVerificationPage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = await getDomainByName(params.domain);

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">
        Verify Domain: {params.domain}
      </h1>

      <DomainVerification domain={params.domain} />
    </div>
  );
}
