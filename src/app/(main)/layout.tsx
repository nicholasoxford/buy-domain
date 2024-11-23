import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/nav-bar";

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
  console.log({ LAYOUT_USER: user });
  return (
    <>
      <NavBar initialUser={user} />
      <div className="">{children}</div>
    </>
  );
}
