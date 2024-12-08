import { RegistrationForm } from "./RegistrationForm";

export default function RegisterPage({
  params,
}: {
  params: { domain: string };
}) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-lg p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Register Domain</h1>
          <p className="text-2xl font-medium text-purple-400">
            {params.domain}
          </p>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl">
          Complete your domain registration by providing the required
          information below
        </p>
      </div>
      <RegistrationForm initialDomain={params.domain} />
    </div>
  );
}
