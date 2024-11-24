"use client";
import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";
import MobileSidebar from "@/components/MobileDashboardSidebar";
import { DesktopSidebar } from "./DesktopSidebar";
import { DashboardHeader } from "./DashboardHeader";

// Create context for mobile menu state
export const MobileMenuContext = createContext({
  isOpen: false,
  setIsOpen: (value: boolean) => {},
});

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  profile: any; // Type this properly based on your profile structure
  isSubscribed: boolean;
  stripeUrl: string;
}

export default function DashboardLayout({
  children,
  user,
  profile,
  isSubscribed,
  stripeUrl,
}: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <DesktopSidebar isSubscribed={isSubscribed} stripeUrl={stripeUrl} />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isSubscribed={isSubscribed}
          profile={profile}
          stripeUrl={stripeUrl}
          user={user}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <DashboardHeader
            user={user}
            profile={profile}
            isSubscribed={isSubscribed}
          />
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
}
