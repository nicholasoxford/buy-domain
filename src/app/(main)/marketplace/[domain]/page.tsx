import { DomainInfoClient } from "./DomainInfoClient";

export default async function DomainPage({
  params,
}: {
  params: { domain: string };
}) {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <DomainInfoClient domain={params.domain} />
      </div>
    </div>
  );
}
