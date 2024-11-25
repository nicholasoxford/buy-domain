"use client";

import Link from "next/link";
import { type NavigationSection } from "./navigation-config";
import { useDocNavigation } from "@/hooks/useDocNavigation";

interface DocSidebarProps {
  navigation: NavigationSection[];
  onSectionClick?: () => void;
  mobile?: boolean;
}

export function DocSidebar({
  navigation,
  onSectionClick,
  mobile,
}: DocSidebarProps) {
  const { activeSection, scrollToSection, currentPath } = useDocNavigation();

  const baseClasses = mobile ? "mt-2 space-y-6" : "sticky top-24 space-y-8";

  return (
    <nav className={baseClasses}>
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            <Link href="/docs" className="hover:text-white transition-colors">
              {section.title}
            </Link>
          </h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors ${
                    currentPath === link.href ? "text-white bg-white/5" : ""
                  }`}
                  onClick={onSectionClick}
                >
                  {link.title}
                </Link>
                {link.sections && currentPath === link.href && (
                  <ul className="mt-2 ml-4 space-y-1 border-l border-white/5">
                    {link.sections.map((section) => (
                      <li key={section.href}>
                        <button
                          onClick={() => {
                            scrollToSection(section.href);
                            onSectionClick?.();
                          }}
                          className={`block w-full text-left px-4 py-1.5 text-sm transition-colors ${
                            activeSection === section.href
                              ? "text-purple-400"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {section.title}
                        </button>
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
  );
}
