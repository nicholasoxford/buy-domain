import { TEMPLATE_STRIPE_LINK } from "@/utils/constants";
import { ArrowRight, Download, Github, Sparkle, Sparkles } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-static";
export default function Documentation() {
  const stripeUrl = TEMPLATE_STRIPE_LINK;

  return (
    <>
      <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Self-Host Domain Bobber
        </h1>
        <p className="lead text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12">
          Deploy and manage your own instance of Domain Bobber on Cloudflare
          Workers.
        </p>

        <section id="prerequisites" className="scroll-mt-24 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            System Requirements
          </h2>
          <div className="space-y-4">
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
          </div>
        </section>
        <section id="installation" className="scroll-mt-24 mb-4">
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
          </div>
        </section>

        <section id="installation" className="scroll-mt-24 mb-16">
          <div className="not-prose space-y-8">
            {[
              {
                title: "1. Installation",
                code: `git clone https://github.com/yourusername/domain-dash-pro
cd domain-dash-pro
npm install`,
              },
              {
                title: "2. Authentication",
                code: "npx wrangler login",
              },
              {
                title: "3. KV Storage Setup",
                code: `# Create KV namespace
npx wrangler kv:namespace create kvcache

# Note the ID from the output:
# kvcache_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`,
              },
              {
                title: "4. Turnstile Setup",
                steps: [
                  {
                    text: "Visit Cloudflare Turnstile Dashboard",
                    link: "https://dash.cloudflare.com/?to=/:account/turnstile",
                  },
                  "Create a new site widget",
                  "Note both the Site Key and Secret Key",
                ],
              },
              {
                title: "5. Deploy Your First Domain",
                code: `npm run create-domain`,
                additionalCode: `# Or with all options specified:
npm run create-domain \\
  --kv-id your-kv-id \\
  --admin-password your-password \\
  --turnstile-site-key your-site-key \\
  --turnstile-secret-key your-secret-key`,
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>
                <div className="p-6">
                  {step.code && (
                    <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">
                      <code className="text-sm text-slate-300">
                        {step.code}
                      </code>
                    </pre>
                  )}
                  {step.additionalCode && (
                    <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mt-4">
                      <code className="text-sm text-slate-300">
                        {step.additionalCode}
                      </code>
                    </pre>
                  )}
                  {step.steps && (
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      {step.steps.map((item, index) => (
                        <li key={index}>
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <Link
                              href={item.link}
                              className="text-purple-400 hover:text-purple-300 underline"
                              target="_blank"
                            >
                              {item.text}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                <h3 className="text-lg font-semibold text-white">
                  Command Line Options
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-4 pr-4 text-purple-400">Option</th>
                        <th className="pb-4 pr-4 text-purple-400">
                          Description
                        </th>
                        <th className="pb-4 pr-4 text-purple-400">Required</th>
                        <th className="pb-4 text-purple-400">Example</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {[
                        {
                          option: "--kv-id",
                          description: "Your Cloudflare KV namespace ID",
                          required: "Yes",
                          example: "--kv-id abc123...",
                        },
                        {
                          option: "--admin-password",
                          description:
                            "Password for accessing admin dashboards",
                          required: "Yes",
                          example: "--admin-password mySecurePass123!",
                        },
                        {
                          option: "--turnstile-site-key",
                          description: "Cloudflare Turnstile Site Key",
                          required: "Yes",
                          example: "--turnstile-site-key 0x4AAAAAAACt...",
                        },
                        {
                          option: "--turnstile-secret-key",
                          description: "Cloudflare Turnstile Secret Key",
                          required: "Yes",
                          example: "--turnstile-secret-key 0x4AAAAAAACt...",
                        },
                      ].map((row) => (
                        <tr
                          key={row.option}
                          className="border-b border-white/5"
                        >
                          <td className="py-4 pr-4 font-mono text-sm">
                            {row.option}
                          </td>
                          <td className="py-4 pr-4">{row.description}</td>
                          <td className="py-4 pr-4">{row.required}</td>
                          <td className="py-4 font-mono text-sm">
                            {row.example}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
      </div>
    </>
  );
}
