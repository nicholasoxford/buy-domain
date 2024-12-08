import { createClient } from "@/lib/supabase/server";
import { BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK } from "@/utils/constants";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  const profile = profiles?.[0];
  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  let stripeUrl = BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK;
  if (user.email) {
    stripeUrl += `?prefilled_email=${user.email}`;
  }

  return (
    <DashboardLayout
      user={user}
      profile={profile}
      isSubscribed={isSubscribed}
      stripeUrl={stripeUrl}
    >
      {children}
    </DashboardLayout>
  );
}
