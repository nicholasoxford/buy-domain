import { NavBar } from "@/components/nav-bar";
import { navigation } from "./navigation-config";
import { DocsClient } from "./docs-client";
import { createClient } from "@/lib/supabase/server";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const supabase = await createClient();
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
