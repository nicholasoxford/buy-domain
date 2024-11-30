import { HomePage } from "@/components/home-page";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  return (
    <>
      <link rel="icon" href="/domain-dash-icon-only.svg" sizes="any" />

      <HomePage user={user.user} />
    </>
  );
}
