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
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl">
          <div className="h-full px-8 flex items-center justify-between">
            <h1 className="text-lg font-medium text-white">Dashboard</h1>

            <div className="flex items-center gap-6">
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
