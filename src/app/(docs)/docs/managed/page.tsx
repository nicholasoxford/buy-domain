import { ArrowRight, Cloud, Shield, Zap, LineChart } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-static";

export default function ManagedDocs() {
  return (
    <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Managed Service
      </h1>
      <p className="lead text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12">
        Get started instantly with our fully managed domain offer page solution.
      </p>

      {/* Features Grid */}
      <section id="features" className="scroll-mt-24 mb-16">
        <h2 className="text-2xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Cloud,
              title: "Instant Setup",
              description:
                "Connect your domain and go live in minutes with zero configuration required",
            },
            {
              icon: Shield,
              title: "Managed Security",
              description:
                "Built-in protection against spam and automated threats",
            },
            {
              icon: Zap,
              title: "Auto-Scaling",
              description:
                "Handle any amount of traffic with our enterprise infrastructure",
            },
            {
              icon: LineChart,
              title: "Advanced Analytics",
              description:
                "Detailed insights into offers, visitor behavior, and conversion rates",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started Steps */}
      <section id="getting-started" className="scroll-mt-24 mb-16">
        <h2 className="text-2xl font-bold mb-8">Getting Started</h2>
        <div className="space-y-6">
          {[
            {
              step: "1",
              title: "Create an Account",
              description:
                "Sign up for a Domain Dash account to access the dashboard",
            },
            {
              step: "2",
              title: "Add Your Domain",
              description:
                "Enter your domain name and verify ownership through DNS",
            },
            {
              step: "3",
              title: "Configure Settings",
              description:
                "Customize your offer page appearance and notification preferences",
            },
            {
              step: "4",
              title: "Go Live",
              description:
                "Publish your offer page and start receiving inquiries",
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="flex items-start gap-4 bg-slate-800/50 rounded-xl p-6 border border-slate-800"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">{step}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domain Setup */}
      <section id="domain-setup" className="scroll-mt-24 mb-16">
        <h2 className="text-2xl font-bold mb-8">Domain Setup</h2>
        <div className="space-y-6">
          {[
            {
              step: "1",
              title: "Add Your Domain",
              description: "Enter your domain name in the dashboard",
            },
            {
              step: "2",
              title: "Configure DNS",
              description: "Update your DNS settings to point to our servers",
            },
            {
              step: "3",
              title: "Verify Ownership",
              description: "Confirm domain ownership through DNS verification",
            },
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="flex items-start gap-4 bg-slate-800/50 rounded-xl p-6 border border-slate-800"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">{step}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 mb-16">
        <h2 className="text-2xl font-bold mb-8">Pricing</h2>
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-800">
          <div className="mb-6">
            <div className="text-3xl font-bold text-white mb-2">$5/month</div>
            <div className="text-slate-400">per 5 domains</div>
          </div>
          <ul className="space-y-3 mb-8">
            {[
              "Unlimited offers",
              "Advanced analytics",
              "Custom domain support",
              "Email notifications",
              "Priority support",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-slate-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "How long does it take to set up?",
              a: "Most users are up and running within 5 minutes of signing up.",
            },
            {
              q: "Can I use my own domain?",
              a: "Yes, you can use any domain you own and manage through our platform.",
            },
            {
              q: "What happens if I exceed the domain limit?",
              a: "You can upgrade your plan at any time to add more domains.",
            },
            {
              q: "Is there a contract or commitment?",
              a: "No, our service is month-to-month and you can cancel at any time.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-800"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{q}</h3>
              <p className="text-slate-400">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
