"use client";

import { useState } from "react";
import Link from "next/link";
import { Command } from "lucide-react";
import { type NavigationSection } from "./navigation-config";
import { DocSidebar } from "./doc-sidebar";
import { useDocNavigation } from "@/hooks/useDocNavigation";

interface DocsClientProps {
  children: React.ReactNode;
  navigation: NavigationSection[];
}

export function DocsClient({ children, navigation }: DocsClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection } = useDocNavigation();

  return (
    <div className="lg:container mx-auto">
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900/95 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <DocSidebar
              navigation={navigation}
              onSectionClick={() => setMobileMenuOpen(false)}
              mobile
            />

            {/* Mobile Footer */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex flex-col gap-2 px-2">
                <Link
                  href="/docs/contributing"
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Contributing
                </Link>
                <Link
                  href="/docs/changelog"
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Changelog
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:gap-12 py-6 sm:py-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <DocSidebar navigation={navigation} />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl">
          {/* Pro Tip */}
          <div className="fixed bottom-8 right-8 w-72 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 shadow-lg backdrop-blur-sm hidden md:block">
            <div className="flex items-center gap-2 mb-2">
              <Command className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                Pro Tip
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Press{" "}
              <kbd className="px-1.5 py-0.5 text-xs bg-slate-800 rounded border border-white/10">
                ESC
              </kbd>{" "}
              twice to access the admin panel from anywhere.
            </p>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-invert max-w-none">{children}</div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center text-sm text-slate-400">
                <div>Last updated: April 2024</div>
                <div className="flex items-center gap-4">
                  <Link href="/docs/contributing" className="hover:text-white">
                    Contributing
                  </Link>
                  <Link href="/docs/changelog" className="hover:text-white">
                    Changelog
                  </Link>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
