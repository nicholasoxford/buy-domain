import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

import { createClient } from "@/lib/supabase/server";

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = profiles;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar initialUser={user} initialProfile={profile} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
