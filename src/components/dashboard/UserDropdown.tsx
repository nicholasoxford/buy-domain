"use client";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  user: any;
  profile: any;
}

export function UserDropdown({ user, profile }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
      >
        <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
          <span className="text-xs font-medium text-purple-400">
            {user?.email?.[0]?.toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:inline text-sm text-slate-300">
          {user?.email?.split("@")[0]}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute right-0 mt-2 w-48 py-2 bg-slate-800 rounded-lg shadow-lg border border-slate-700/50 transition-all duration-150",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        <div className="px-4 py-2 border-b border-slate-700/50">
          <p className="text-sm font-medium text-white">
            {user?.email?.split("@")[0]}
          </p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
