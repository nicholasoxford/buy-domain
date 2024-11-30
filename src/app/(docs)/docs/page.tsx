import { ArrowRight, Cloud, Server } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-static";

export default function Documentation() {
  return (
    <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
        Documentation
      </h1>
      <p className="text-xl text-slate-400 mb-16 max-w-3xl">
        Learn how to deploy and manage domain offer pages using our platform.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-24">
        {/* Self-Hosted Option */}
        <div className="relative bg-slate-900/30 rounded-2xl p-10 border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <Server className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-semibold hover:underline">
              <Link href="/docs/self-host">Self-Hosted</Link>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Deploy and manage your own instance using Cloudflare Workers.
            Perfect for developers and teams who want complete control.
          </p>
          <Link
            href="/docs/self-host"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
          >
            View Setup Guide <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Managed Service Option */}
        <div className="relative bg-slate-900/30 rounded-2xl p-10 border border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <Cloud className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-semibold hover:underline">
              <Link href="/docs/managed">Managed Service</Link>
            </h2>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Get started instantly with our hosted solution. No setup required,
            just connect your domains and go.
          </p>
          <Link
            href="/docs/managed"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
          >
            Learn More <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Feature Comparison */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Compare Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-slate-900/50 rounded-xl">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-4 px-6 text-slate-400">Feature</th>
                <th className="text-left py-4 px-6 text-slate-400">
                  Self-Hosted
                </th>
                <th className="text-left py-4 px-6 text-slate-400">Managed</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                ["Setup Time", "5-10 minutes", "Instant"],
                ["Custom Domain", "✓", "✓"],
                ["Analytics", "Basic", "Advanced"],
                ["Support", "Community", "Priority"],
                ["Price", "One-time", "Monthly"],
              ].map(([feature, self, managed]) => (
                <tr key={feature} className="border-b border-white/5">
                  <td className="py-4 px-4">{feature}</td>
                  <td className="py-4 px-4">{self}</td>
                  <td className="py-4 px-4">{managed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">Getting Help</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900/30 rounded-2xl p-8 border border-slate-800">
            <h3 className="text-xl font-semibold mb-4">Community Support</h3>
            <p className="text-slate-400 mb-6">
              Join our Discord community to get help from other users and share
              your experience.
            </p>
            <Link
              href="https://discord.gg/your-server"
              target="_blank"
              className="inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              Join Discord <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="bg-slate-900/30 rounded-2xl p-8 border border-slate-800">
            <h3 className="text-xl font-semibold mb-4">Email Support</h3>
            <p className="text-slate-400 mb-6">
              Need direct assistance? Our support team is ready to help.
            </p>
            <Link
              href="mailto:support@example.com"
              className="inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              Contact Support <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
