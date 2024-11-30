import {
  ArrowRight,
  Globe,
  Key,
  Lock,
  Server,
  Shield,
  Download,
  Github,
  Sparkles,
  Code,
} from "lucide-react";
import Link from "next/link";
export const dynamic = "force-static";
export default function Documentation() {
  const stripeUrl = "https://buy.stripe.com/test_dR63f48ve81hbyE144";

  return (
    <>
      <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Self-Host Domain Dash
        </h1>
        <p className="lead text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12">
          Deploy and manage your own instance of Domain Dash on Cloudflare
          Workers.
        </p>

        <section id="features" className="scroll-mt-24 mb-12 sm:mb-16">
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Built-in Cloudflare Turnstile and rate limiting protection",
              },
              {
                icon: Globe,
                title: "Multi-Domain Support",
                description: "Manage unlimited domains from one dashboard",
              },
              {
                icon: Server,
                title: "Serverless Architecture",
                description: "Powered by Cloudflare Workers and KV Storage",
              },
              {
                icon: Lock,
                title: "Access Control",
                description:
                  "Role-based admin dashboard with secure authentication",
              },
              {
                icon: Code,
                title: "Developer Friendly",
                description: "TypeScript support with hot-reload development",
              },
              {
                icon: Sparkles,
                title: "Customizable",
                description: "Easily extend and modify the codebase",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-slate-800/50 border border-purple-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-purple-400" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">
                    {title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="prerequisites" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            System Requirements
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Required Tools
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Node.js 18 or higher</li>
                <li>• npm or yarn package manager</li>
                <li>• Git for version control</li>
                <li>• Wrangler CLI (latest version)</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Cloudflare Requirements
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Cloudflare account</li>
                <li>• Workers Paid Plan (for multiple domains)</li>
                <li>• KV Storage enabled</li>
                <li>• Domains configured on Cloudflare</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="installation" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Quick Start</h2>
          <div className="not-prose space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 sm:p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                1. Get Access
              </h3>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Download className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Instant Download</h4>
                    <p className="text-sm text-slate-300">
                      Get the complete source code as a ZIP file
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Github className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">GitHub Access</h4>
                    <p className="text-sm text-slate-300">
                      Get invited to the private repository
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Lifetime Updates</h4>
                    <p className="text-sm text-slate-300">
                      Free access to all future updates
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={stripeUrl}
                  target="_blank"
                  className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
                >
                  Purchase for $10
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/demo"
                  className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                >
                  View Live Demo
                </Link>
              </div>
            </div>

            {[
              {
                title: "2. Clone and Install",
                code: "git clone [repository-url]\ncd [repository-name]\nnpm install",
              },
              {
                title: "3. Login to Wrangler",
                code: "npx wrangler login",
              },
              {
                title: "4. Deploy Your First Domain",
                code: "npm run create-domain",
              },
            ].map(({ title, code }) => (
              <div
                key={title}
                className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden"
              >
                <div className="px-3 sm:px-4 py-2 border-b border-white/5 bg-white/5">
                  <h3 className="text-sm font-medium text-slate-300">
                    {title}
                  </h3>
                </div>
                <pre className="p-3 sm:p-4 text-sm overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section id="configuration" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Configuration Guide
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Environment Variables
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-4 pr-4 text-purple-400">Variable</th>
                      <th className="pb-4 pr-4 text-purple-400">Description</th>
                      <th className="pb-4 text-purple-400">Required</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[
                      {
                        variable: "ADMIN_PASSWORD",
                        description: "Dashboard access password",
                        required: "Yes",
                      },
                      {
                        variable: "TURNSTILE_SITE_KEY",
                        description: "Cloudflare Turnstile site key",
                        required: "Yes",
                      },
                      {
                        variable: "TURNSTILE_SECRET_KEY",
                        description: "Cloudflare Turnstile secret key",
                        required: "Yes",
                      },
                      {
                        variable: "KV_NAMESPACE_ID",
                        description: "Cloudflare KV namespace ID",
                        required: "Yes",
                      },
                    ].map((row) => (
                      <tr
                        key={row.variable}
                        className="border-b border-white/5"
                      >
                        <td className="py-4 pr-4 font-mono text-sm">
                          {row.variable}
                        </td>
                        <td className="py-4 pr-4">{row.description}</td>
                        <td className="py-4">{row.required}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Domain Configuration
              </h3>
              <p className="text-slate-300 mb-4">
                Each domain&apos;s configuration is stored in{" "}
                <code className="text-purple-400">
                  domains/&lt;domain&gt;/wrangler.toml
                </code>
                :
              </p>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-slate-300">
                  {`name = "example-com"
main = "../../.worker-next/index.mjs"
compatibility_date = "2024-09-26"

[vars]
BASE_URL = "example.com"
TURNSTILE_SITE_KEY = "your-site-key"

[[kv_namespaces]]
binding = "kvcache"
id = "your-kv-id"`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section id="deployment" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Deployment Options
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Deploy All Domains
              </h3>
              <p className="text-slate-300 mb-4">
                Use the <code className="text-purple-400">deploy-all</code>{" "}
                script to deploy all domains in your{" "}
                <code className="text-purple-400">domains/</code> directory:
              </p>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">
                <code className="text-sm text-slate-300">
                  npm run deploy-all
                </code>
              </pre>
              <p className="text-slate-300">This script will:</p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mt-2">
                <li>Verify Wrangler authentication</li>
                <li>Build the worker if needed</li>
                <li>Deploy each domain sequentially</li>
                <li>Set required secrets</li>
                <li>Provide detailed deployment status</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Secret Management
              </h3>
              <p className="text-slate-300 mb-4">
                Update secrets using the{" "}
                <code className="text-purple-400">update-secrets</code> command:
              </p>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-slate-300">{`npm run update-secrets \\
  --key ADMIN_PASSWORD \\
  --value your-new-password`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section id="security" className="scroll-mt-24 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Security Best Practices
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Regular Updates
              </h3>
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">
                <code className="text-sm text-slate-300">{`npm update
npm audit fix`}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Password Security
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Use strong passwords (min 12 characters)</li>
                <li>• Rotate secrets regularly</li>
                <li>• Enable 2FA on Cloudflare account</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Access Control
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Limit admin access</li>
                <li>• Use separate credentials per team member</li>
                <li>• Regular access audits</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">
                Monitoring
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Enable Cloudflare logging</li>
                <li>• Monitor API usage</li>
                <li>• Set up alerts for unusual activity</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="support" className="scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Support Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Documentation",
                items: [
                  "Full Documentation",
                  "API Reference",
                  "Deployment Guide",
                ],
              },
              {
                title: "Community",
                items: [
                  "Discord Community",
                  "GitHub Discussions",
                  "Stack Overflow",
                ],
              },
              {
                title: "Premium Support",
                items: [
                  "Priority Email Support",
                  "Custom Feature Development",
                  "Deployment Assistance",
                ],
              },
              {
                title: "Updates",
                items: ["Release Notes", "Security Advisories", "Newsletter"],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-slate-800/50 rounded-xl p-6 border border-white/5"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
