import { getEnvVariables } from "@/utils/env";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const env = getEnvVariables();
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
