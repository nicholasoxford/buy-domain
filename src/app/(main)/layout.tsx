import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/nav-bar";
import { cookies } from "next/headers";
import { supabaseServer } from "@/utils/supabase";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Domain Dash - Monetize Your Dormant Domains",
  description:
    "Turn your unused domains into profit with Domain Dash. Choose from affordable templates or hassle-free hosting.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const { env } = await getCloudflareContext();
  const supabase = supabaseServer(cookieStore, env);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <NavBar initialUser={user} />
      <div className="">{children}</div>
    </>
  );
}
