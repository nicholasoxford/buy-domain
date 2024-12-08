import { createClient } from "@/lib/supabase/server";
import { getNameAuth } from "@/lib/name";
export async function getNameAPIHeaders() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const nameAuth = await getNameAuth();

  return {
    Authorization: `Basic ${nameAuth}`,
    "Content-Type": "application/json",
  };
}
