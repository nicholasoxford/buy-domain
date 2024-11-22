"use client";
import { usePathname } from "next/navigation";
import { Github, Search, Command } from "lucide-react";
import Link from "next/link";

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
  {
    title: "Guides",
    links: [
      { title: "Domain Management", href: "/docs/domains" },
      { title: "Admin Dashboard", href: "/docs/admin" },
      { title: "Offer System", href: "/docs/offers" },
    ],
  },
  {
    title: "Reference",
    links: [
      { title: "CLI Commands", href: "/docs/cli" },
      { title: "API Reference", href: "/docs/api" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-white font-bold text-xl">
                Domain Dash
              </Link>

              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-64 px-4 py-1.5 pl-10 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs text-slate-400 bg-slate-800 rounded border border-white/10 hidden md:block">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/yourusername/domain-dash"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                target="_blank"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:block">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="flex gap-12 py-12">
          {/* Sidebar Navigation */}
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

            {/* Pro Tip */}
            <div className="mt-12 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            <div className="prose prose-invert">{children}</div>

            {/* Feedback Section */}
            <div className="mt-16 p-6 bg-slate-800/50 rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Was this page helpful?
              </h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                  Yes
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                  No
                </button>
              </div>
            </div>

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
