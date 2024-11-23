"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Menu, X, Command, Github, ChevronDown } from "lucide-react";

interface NavBarProps {
  initialUser?: User | null;
  variant?: "default" | "docs";
}

export function NavBar({ initialUser, variant = "default" }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  // using an useEffect, setUser to the user from supabase
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const isActive = (path: string) => pathname === path;
  const isDocs = variant === "docs";
  console.log({ NAVBAR_USER: user });
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
                DomainDash
              </span>
            </Link>

            {/* Primary Navigation */}
            <div className="hidden md:flex items-center space-x-1">
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
              {user && (
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
              )}
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/yourusername/domain-dash"
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg group"
              target="_blank"
            >
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-400">
                      {user?.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    {user.email?.split("@")[0]}
                  </span>
                </div>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-150 flex items-center gap-1"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
              >
                Sign In
              </Link>
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

                {/* GitHub Link */}
                <div className="border-t border-slate-800 pt-6">
                  <Link
                    href="https://github.com/yourusername/domain-dash"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white hover:bg-slate-800 rounded-lg"
                    target="_blank"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </Link>
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
                      <form action="/auth/signout" method="post">
                        <button
                          type="submit"
                          className="w-full px-3 py-2.5 text-sm font-medium text-white hover:bg-slate-800 rounded-lg text-left"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Out
                        </button>
                      </form>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full px-3 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg text-center shadow-lg shadow-purple-500/20"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
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
