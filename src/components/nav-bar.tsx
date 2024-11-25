"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Menu, X, Command, ChevronDown, LogOut, Settings } from "lucide-react";
import { BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK } from "@/utils/constants";
import { signOut } from "@/lib/supabase/server-actions";

interface NavBarProps {
  initialUser?: User | null;
  initialProfile?: {
    subscription_status?: string | null;
    subscription_tier?: string | null;
  } | null;
  variant?: "default" | "docs";
}

export function NavBar({
  initialUser,
  initialProfile,
  variant = "default",
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isSubscribed =
    initialProfile?.subscription_status === "active" ||
    initialProfile?.subscription_status === "trialing";

  const stripeUrl = new URL(BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
  if (user?.email) {
    stripeUrl.searchParams.set("prefilled_email", user.email);
  }

  // using an useEffect, setUser to the user from supabase
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    // force a reload of the page
    setUser(null);
  };

  const isActive = (path: string) => pathname === path;
  const isDocs = variant === "docs";
  return (
    <nav
      className={`sticky top-0 z-50 border-b ${
        isDocs
          ? "bg-slate-900/95 border-white/5"
          : "bg-slate-900/95 backdrop-blur-xl border-slate-800/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl group"
            >
              <Command className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Domain Bridge
              </span>
            </Link>

            {/* Primary Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/self-host"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive("/self-host")
                    ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Self-Host
              </Link>

              <Link
                href="/docs"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive("/docs")
                    ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Docs
              </Link>

              <Link
                href="/example"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive("/example")
                    ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Example
              </Link>

              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive("/dashboard")
                    ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {!isSubscribed && (
                  <a
                    href={stripeUrl.toString()}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
                  >
                    Upgrade
                  </a>
                )}
                {isSubscribed && (
                  <span className="px-2 py-1 text-xs font-medium text-purple-400 bg-purple-500/20 rounded-full">
                    {initialProfile?.subscription_tier?.toUpperCase()}
                  </span>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-400">
                        {user?.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-slate-300">
                      {user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {isOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 py-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50">
                        <Link
                          href="/dashboard/settings"
                          className="w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <form action={handleSignOut}>
                          <button
                            type="submit"
                            className="w-full px-3 py-2.5 text-sm font-medium text-white hover:bg-slate-800 rounded-lg text-left"
                          >
                            Sign Out
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/login?signup=true"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-slate-950 border-l border-slate-800 z-50 shadow-2xl animate-in slide-in-from-right">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                <Command className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium text-white">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-950">
              <div className="px-4 py-6 space-y-6">
                {/* Navigation Links */}
                <div className="space-y-1">
                  <Link
                    href="/self-host"
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive("/self-host")
                        ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                        : "text-white hover:bg-slate-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Self-Host
                  </Link>

                  <Link
                    href="/docs"
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive("/docs")
                        ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                        : "text-white hover:bg-slate-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Docs
                  </Link>

                  <Link
                    href="/example"
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive("/example")
                        ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                        : "text-white hover:bg-slate-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Example
                  </Link>

                  {user && (
                    <Link
                      href="/dashboard"
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                        isActive("/dashboard")
                          ? "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"
                          : "text-white hover:bg-slate-800"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>

                {/* User Section */}
                <div className="border-t border-slate-800 pt-6">
                  {user ? (
                    <div className="space-y-3">
                      <div className="px-3 py-3 bg-slate-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-400">
                              {user?.email?.[0]?.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                              {user.email?.split("@")[0]}
                            </span>
                            <span className="text-xs text-slate-400">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <form action={handleSignOut}>
                        <button
                          type="submit"
                          className="w-full px-3 py-2.5 text-sm font-medium text-white hover:bg-slate-800 rounded-lg text-left"
                        >
                          Sign Out
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/login?signup=true"
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
