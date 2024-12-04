"use client";
import Link from "next/link";
import { Command, Home, Globe, PlusCircle, Settings } from "lucide-react";

interface DesktopSidebarProps {
  isSubscribed: boolean;
  stripeUrl: string;
}

export function DesktopSidebar({
  isSubscribed,
  stripeUrl,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 text-white p-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
      >
        <Command className="h-6 w-6 text-purple-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Domain Bobber
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
              <span>Manage Domains</span>
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
  );
}
