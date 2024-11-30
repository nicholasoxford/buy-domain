import Link from "next/link";
import { Command, Twitter, Github, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Example
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs/self-host"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Self-Hosting
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://twitter.com/domainbridge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/domainbridge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/discord"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl group"
          >
            <Command className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Domain Dash
            </span>
          </Link>
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Domain Dash. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
