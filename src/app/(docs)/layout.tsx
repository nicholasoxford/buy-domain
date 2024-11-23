import { cookies } from "next/headers";
import { supabaseServer } from "@/utils/supabase";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NavBar } from "@/components/nav-bar";
import { navigation } from "./navigation-config";
import { DocsClient } from "./docs-client";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const cookieStore = cookies();
  const { env } = await getCloudflareContext();
  const supabase = supabaseServer(cookieStore, env);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-slate-900 w-dvw">
      <NavBar initialUser={user} variant="docs" />
      <DocsClient navigation={navigation}>{children}</DocsClient>
    </div>
  );
}
