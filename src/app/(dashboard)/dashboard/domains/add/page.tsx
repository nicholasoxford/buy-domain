import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ADD_DOMAIN_BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK } from "@/utils/constants";
import { AddDomainForm } from "./AddDomainForm";
import { getUserDomainCount } from "@/lib/supabase/actions";

export default async function AddDomainPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get current domain count
  const domainCount = await getUserDomainCount(user.id);

  // Check subscription status
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  // Allow one free domain, otherwise check subscription
  if (domainCount >= 1 && !isSubscribed) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 rounded-xl border border-slate-800 bg-slate-900/50">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Upgrade to Add Domains
          </h2>
          <p className="text-slate-400 mb-6">
            Subscribe to our service to start adding and managing more domains.
          </p>
          <a
            href={`${ADD_DOMAIN_BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK}?prefilled_email=${encodeURIComponent(
              user.email || ""
            )}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
          >
            Upgrade Now
          </a>
        </div>
      </div>
    );
  }

  return <AddDomainForm />;
}
