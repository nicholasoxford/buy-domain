import { HomePage } from "@/components/home-page";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  return <HomePage user={user.user} />;
}
