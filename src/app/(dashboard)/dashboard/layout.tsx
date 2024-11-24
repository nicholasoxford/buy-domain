import Link from "next/link";
import {
  Home,
  Globe,
  Settings,
  PlusCircle,
  Command,
  BookOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK } from "@/utils/constants";
import { redirect } from "next/navigation";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, subscription_status")
    .eq("id", user.id)
    .single();

  const isSubscribed =
    profile?.subscription_status === "active" ||
    profile?.subscription_status === "trialing";

  const stripeUrl = new URL(BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
  if (user.email) {
    stripeUrl.searchParams.set("prefilled_email", user.email);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 text-white p-4">
        <Link
          href="/"
          className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
        >
          <Command className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Domain Bridge
          </span>
        </Link>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/domains"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>All Domains</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/domains/add"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Domain</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {!isSubscribed && (
          <div className="mt-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <h3 className="text-sm font-medium text-purple-400 mb-2">
              Upgrade Your Account
            </h3>
            <p className="text-xs text-slate-300 mb-3">
              Get access to premium features and increase your domain limits.
            </p>
            <a
              href={stripeUrl.toString()}
              className="block w-full text-center px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors"
            >
              Upgrade Now
            </a>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl">
          <div className="h-full px-8 flex items-center justify-between">
            <h1 className="text-lg font-medium text-white">Dashboard</h1>

            <div className="flex items-center gap-6">
              {isSubscribed && (
                <span className="px-2 py-1 text-xs font-medium text-purple-400 bg-purple-500/20 rounded-full">
                  {profile?.subscription_tier?.toUpperCase()}
                </span>
              )}

              {/* Documentation Link */}
              <Link
                href="/docs"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Documentation
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-400">
                      {user?.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    {user?.email?.split("@")[0]}
                  </span>
                </div>

                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
