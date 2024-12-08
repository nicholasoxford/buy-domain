import { DomainInfoClient } from "./DomainInfoClient";

export default async function DomainPage({
  params,
}: {
  params: { domain: string };
}) {
  return (
    <div className="min-h-full">
      <DomainInfoClient domain={params.domain} />
    </div>
  );
}
