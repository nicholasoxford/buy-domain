import {
  ArrowRight,
  Book,
  Code,
  Command,
  Github,
  Globe,
  Key,
  Lock,
  Server,
  Settings,
  Shield,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Main Content */}
      <main className="flex-1 max-w-3xl">
        <div className="prose prose-invert">
          <h1>Domain Offer Page Deployer</h1>
          <p className="lead text-xl text-slate-300">
            Deploy "Domain For Sale" pages to your unused Cloudflare domains
            with a built-in offer submission system.
          </p>

          <section id="introduction" className="scroll-mt-24">
            <div className="not-prose my-8 grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Spam Protected",
                  description: "Built-in Cloudflare Turnstile protection",
                },
                {
                  icon: Globe,
                  title: "Multi-Domain",
                  description: "Manage multiple domains from one dashboard",
                },
                {
                  icon: Server,
                  title: "Serverless",
                  description: "Powered by Cloudflare Workers",
                },
                {
                  icon: Lock,
                  title: "Secure",
                  description: "Admin dashboard with password protection",
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6"
                >
                  <Icon className="h-6 w-6 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="prerequisites" className="scroll-mt-24">
            <h2>Prerequisites</h2>
            <ul>
              <li>Node.js installed</li>
              <li>A Cloudflare account</li>
              <li>One or more domains on Cloudflare</li>
              <li>
                <a
                  href="https://developers.cloudflare.com/workers/wrangler/install-and-update/"
                  target="_blank"
                >
                  Wrangler CLI
                </a>{" "}
                installed
              </li>
            </ul>
          </section>

          <section id="quick-start" className="scroll-mt-24">
            <h2>Quick Start</h2>
            <p>Get started with these simple steps:</p>

            <div className="not-prose space-y-6">
              {[
                {
                  title: "1. Clone and Install",
                  code: "git clone [repository-url]\ncd [repository-name]\nnpm install",
                },
                {
                  title: "2. Login to Wrangler",
                  code: "npx wrangler login",
                },
                {
                  title: "3. Deploy Your First Domain",
                  code: "npm run create-domain",
                },
              ].map(({ title, code }) => (
                <div
                  key={title}
                  className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-white/5 bg-white/5">
                    <h3 className="text-sm font-medium text-slate-300">
                      {title}
                    </h3>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="turnstile-setup" className="scroll-mt-24">
            <h2>Turnstile Setup</h2>
            <div className="not-prose space-y-4">
              <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-xl">
                <Key className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white mb-1">
                    Get Your API Keys
                  </h3>
                  <p className="text-sm text-slate-300">
                    Visit the Cloudflare Dashboard to create a new Turnstile
                    widget and get your Site and Secret keys.
                  </p>
                </div>
              </div>

              <Link
                href="https://dash.cloudflare.com/?to=/:account/turnstile"
                target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
              >
                Open Cloudflare Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section id="cli-options" className="scroll-mt-24">
            <h2>CLI Options</h2>
            <p className="text-slate-300">
              Speed up deployment by providing configuration options directly
              through the command line:
            </p>

            <div className="not-prose bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden my-6">
              <div className="px-4 py-2 border-b border-white/5 bg-white/5">
                <h3 className="text-sm font-medium text-slate-300">
                  Deployment Command
                </h3>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code>{`npm run create-domain \\
  --kv-id your-kv-id \\
  --admin-password your-password \\
  --turnstile-site-key your-site-key \\
  --turnstile-secret-key your-secret-key`}</code>
              </pre>
            </div>

            <div className="not-prose">
              <div className="grid gap-4">
                {[
                  {
                    option: "--kv-id",
                    description: "Your Cloudflare KV namespace ID",
                  },
                  {
                    option: "--admin-password",
                    description: "Password for accessing admin dashboards",
                  },
                  {
                    option: "--turnstile-site-key",
                    description: "Cloudflare Turnstile Site Key",
                  },
                  {
                    option: "--turnstile-secret-key",
                    description: "Cloudflare Turnstile Secret Key",
                  },
                ].map(({ option, description }) => (
                  <div
                    key={option}
                    className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5"
                  >
                    <code className="flex-shrink-0 px-2 py-1 bg-purple-500/10 text-purple-400 rounded font-mono">
                      {option}
                    </code>
                    <p className="text-slate-300 text-sm">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="multiple-domains" className="scroll-mt-24">
            <h2>Managing Multiple Domains</h2>

            <div className="not-prose space-y-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Shared Resources
                </h3>
                <ul className="space-y-3">
                  {[
                    "KV namespace",
                    "Admin password",
                    "Turnstile configuration",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Domain Management
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li>
                    • Each domain gets its own configuration in{" "}
                    <code>domains/</code>
                  </li>
                  <li>• Run the script multiple times to add more domains</li>
                  <li>• Manage all domains from a single dashboard</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="post-deployment" className="scroll-mt-24">
            <h2>Post-Deployment</h2>

            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  title: "Sale Page",
                  url: "https://your-domain.com",
                  description: "Your public-facing domain sale page",
                },
                {
                  title: "Admin Dashboard",
                  url: "https://your-domain.com/admin",
                  description: "Manage offers and view statistics",
                },
              ].map(({ title, url, description }) => (
                <div
                  key={title}
                  className="bg-slate-800/50 rounded-xl p-6 border border-white/5"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">{description}</p>
                  <code className="text-sm text-purple-400">{url}</code>
                </div>
              ))}
            </div>

            <div className="not-prose bg-slate-800/50 rounded-xl p-6 border border-white/5 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Dashboard Features
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Total offers received",
                  "Highest offer amount",
                  "Average offer value",
                  "Visit statistics",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <svg
                      className="h-5 w-5 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="configuration" className="scroll-mt-24">
            <h2>Updating Configuration</h2>

            <div className="not-prose space-y-6">
              <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-2 border-b border-white/5 bg-white/5">
                  <h3 className="text-sm font-medium text-slate-300">
                    Change Admin Password
                  </h3>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code>
                    npx wrangler secret put ADMIN_PASSWORD -c
                    domains/your-domain/wrangler.toml
                  </code>
                </pre>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-2 border-b border-white/5 bg-white/5">
                  <h3 className="text-sm font-medium text-slate-300">
                    Update Turnstile Secret
                  </h3>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code>
                    npx wrangler secret put TURNSTILE_SECRET_KEY -c
                    domains/your-domain/wrangler.toml
                  </code>
                </pre>
              </div>

              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Important Notes
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li>• DNS propagation may take up to 48 hours</li>
                  <li>• Turnstile protection helps prevent spam submissions</li>
                  <li>• All offers are stored in Cloudflare KV storage</li>
                  <li>• Regular backups are recommended</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="shortcuts" className="scroll-mt-24">
            <h2>Keyboard Shortcuts</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4">
              {[
                { keys: ["⌘", "K"], description: "Search documentation" },
                { keys: ["Esc", "Esc"], description: "Access admin panel" },
                { keys: ["⌘", "/"], description: "Toggle navigation" },
              ].map(({ keys, description }) => (
                <div
                  key={description}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl"
                >
                  <span className="text-slate-300">{description}</span>
                  <div className="flex gap-1">
                    {keys.map((key) => (
                      <kbd
                        key={key}
                        className="px-2 py-1 text-sm text-slate-400 bg-slate-800 rounded border border-white/10"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
