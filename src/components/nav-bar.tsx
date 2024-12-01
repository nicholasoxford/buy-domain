"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Menu, X, Command, ChevronDown, LogOut, Settings } from "lucide-react";
import { BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK } from "@/utils/constants";
import { signOut } from "@/lib/supabase/server-actions";
import Image from "next/image";

interface NavigationItem {
  href: string;
  label: string;
  color: string;
}

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const isSubscribed =
    initialProfile?.subscription_status === "active" ||
    initialProfile?.subscription_status === "trialing";
  const isDocs = variant === "docs";

  const stripeUrl = new URL(BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
  if (user?.email) {
    stripeUrl.searchParams.set("prefilled_email", user.email);
  }

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setUser(null);
  };

  const isActive = (path: string) => pathname === path;

  const navigationItems: NavigationItem[] = [
    { href: "/managed", label: "Managed Service", color: "blue" },
    { href: "/self-host", label: "Self-Host", color: "purple" },
    { href: "/demo", label: "Live Demo", color: "purple" },
    { href: "/docs", label: "Docs", color: "purple" },
    { href: "/dashboard", label: "Dashboard", color: "purple" },
  ];

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
          {/* Logo and Primary Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center -ml-3 py-2">
              <Image
                src="/domain-dash-larger-text-white.svg"
                alt="Domain Dash"
                width={100}
                height={48}
                className="w-48 h-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive(item.href)
                      ? `bg-${item.color}-500/10 text-${item.color}-400 ring-1 ring-${item.color}-500/20`
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
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
                <UserMenu
                  user={user}
                  isOpen={isUserMenuOpen}
                  setIsOpen={setIsUserMenuOpen}
                  handleSignOut={handleSignOut}
                />
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          user={user}
          navigationItems={navigationItems}
          isActive={isActive}
          handleSignOut={handleSignOut}
          setIsOpen={setIsMobileMenuOpen}
        />
      )}
    </nav>
  );
}

interface UserMenuProps {
  user: User | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSignOut: () => void;
}

// Extracted components for better organization
function UserMenu({ user, isOpen, setIsOpen, handleSignOut }: UserMenuProps) {
  return (
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
          {user?.email?.split("@")[0]}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <UserDropdownMenu setIsOpen={setIsOpen} handleSignOut={handleSignOut} />
      )}
    </div>
  );
}

function UserDropdownMenu({
  setIsOpen,
  handleSignOut,
}: {
  setIsOpen: (isOpen: boolean) => void;
  handleSignOut: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
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
            className="w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );
}

function AuthButtons() {
  return (
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
  );
}

interface MobileMenuProps {
  user: User | null;
  navigationItems: NavigationItem[];
  isActive: (path: string) => boolean;
  handleSignOut: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

function MobileMenu({
  user,
  navigationItems,
  isActive,
  handleSignOut,
  setIsOpen,
}: MobileMenuProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-slate-950 border-l border-slate-800 z-50 shadow-2xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center gap-2">
            <Image
              src="/domain-dash-icon-only.svg"
              alt="Domain Dash"
              width={48}
              height={48}
              className="w-auto h-auto"
            />
            <span className="text-sm font-medium text-white">Menu</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-950">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? `bg-${item.color}-500/10 text-${item.color}-400 ring-1 ring-${item.color}-500/20`
                      : "text-white hover:bg-slate-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

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
                <AuthButtons />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
