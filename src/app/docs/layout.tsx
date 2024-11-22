"use client";
import { usePathname } from "next/navigation";
import { Github, Search, Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface Section {
  title: string;
  href: string;
}

interface NavigationLink {
  title: string;
  href: string;
  sections?: Section[];
}

interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

const navigation: NavigationSection[] = [
  {
    title: "Documentation",
    links: [
      {
        title: "Introduction",
        href: "/docs",
        sections: [
          { title: "Quick Start", href: "#quick-start" },
          { title: "Prerequisites", href: "#prerequisites" },
          { title: "Turnstile Setup", href: "#turnstile-setup" },
          { title: "CLI Options", href: "#cli-options" },
          { title: "Multiple Domains", href: "#multiple-domains" },
          { title: "Post-Deployment", href: "#post-deployment" },
          { title: "Configuration", href: "#configuration" },
        ],
      },
    ],
  },
  //   {
  //     title: "Guides",
  //     links: [
  //       { title: "Domain Management", href: "/docs/domains" },
  //       { title: "Admin Dashboard", href: "/docs/admin" },
  //       { title: "Offer System", href: "/docs/offers" },
  //     ],
  //   },
  //   {
  //     title: "Reference",
  //     links: [
  //       { title: "CLI Commands", href: "/docs/cli" },
  //       { title: "API Reference", href: "/docs/api" },
  //       { title: "Configuration", href: "/docs/configuration" },
  //     ],
  //   },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 w-dvw ">
      {/* Header - Simplified for mobile */}
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link
                href="/"
                className="text-white font-bold text-lg sm:text-xl"
              >
                Domain Dash
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="https://github.com/yourusername/domain-dash"
                className="text-slate-300 hover:text-white transition-colors"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Improved layout */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900/95 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <nav className="mt-2 space-y-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-3 py-2 text-base text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.title}
                        </Link>
                        {link.sections && pathname === link.href && (
                          <ul className="mt-1 ml-3 space-y-1 border-l border-white/10">
                            {link.sections.map((section) => (
                              <li key={section.href}>
                                <a
                                  href={section.href}
                                  className="block px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {section.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

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

      <div className="lg:container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-12 py-6 sm:py-12">
          {/* Desktop Sidebar - unchanged */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        >
                          {link.title}
                        </Link>
                        {/* Show sections for the current page */}
                        {link.sections && pathname === link.href && (
                          <ul className="mt-2 ml-4 space-y-1 border-l border-white/5">
                            {link.sections.map((section) => (
                              <li key={section.href}>
                                <a
                                  href={section.href}
                                  className="block px-4 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                  {section.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 max-w-3xl">
            {/* Pro Tip - Hide on mobile */}
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
                    <Link
                      href="/docs/contributing"
                      className="hover:text-white"
                    >
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
    </div>
  );
}
