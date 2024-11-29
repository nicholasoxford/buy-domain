import { ArrowRight, Check, Code, Server, Building2 } from "lucide-react";
import Link from "next/link";

export function ManagedServicePricing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
      {/* Starter Plan */}
      <div className="flex flex-col bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Code className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Starter</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-purple-400">$5</span>
              <span className="text-purple-300 text-sm">/month</span>
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-6 flex-1">
          {[
            "Up to 10 domains",
            "Instant notifications",
            "Basic analytics",
            "SSL certificates included",
            "Community support",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Check className="h-4 w-4 text-purple-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/dashboard"
          className="block w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors mt-auto"
        >
          Start Free Trial
        </Link>
      </div>

      {/* Pro Plan */}
      <div className="flex flex-col relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full font-medium shadow-lg">
            Most Popular
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Server className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Pro</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-purple-400">$20</span>
              <span className="text-purple-300 text-sm">/month</span>
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-6 flex-1">
          {[
            "Up to 100 domains",
            "Priority notifications",
            "Advanced analytics",
            "Custom DNS settings",
            "Priority support",
            "API access",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Check className="h-4 w-4 text-purple-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/dashboard"
          className="block w-full text-center py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all mt-auto"
        >
          Start Free Trial
        </Link>
      </div>

      {/* Enterprise Plan */}
      <div className="flex flex-col relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-medium shadow-lg">
            Revenue Share
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Building2 className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Enterprise</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-purple-400">10%</span>
              <span className="text-purple-300 text-sm">of sales</span>
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-6 flex-1">
          {[
            "Unlimited domains",
            "Premium analytics",
            "Custom integrations",
            "Dedicated support",
            "Success manager",
            "Custom features",
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-300"
            >
              <Check className="h-4 w-4 text-purple-400 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="mailto:sales@example.com"
          className="block w-full text-center py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-medium transition-all mt-auto"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
