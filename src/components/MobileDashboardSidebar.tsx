"use client";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Command, X, Home, Globe, PlusCircle, Settings } from "lucide-react";
import { MobileMenuContext } from "@/components/dashboard/DashboardLayout";

// Mobile Sidebar Component
export default function MobileSidebar({
  isSubscribed,
  stripeUrl,
}: {
  isSubscribed: boolean;
  profile: any;
  stripeUrl: string;
  user: any;
}) {
  const { isOpen, setIsOpen } = useContext(MobileMenuContext);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "absolute left-0 top-0 h-full w-64 bg-slate-900 p-4 shadow-lg transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <Command className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Domain Bridge
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/domains"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Globe className="w-5 h-5" />
                <span>Manage Domains</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/domains/add"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Domain</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              Upgrade Now
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
