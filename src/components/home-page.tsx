"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code,
  Server,
  Check,
  Clock,
  Shield,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK,
  BUY_TEMPLATE_STRIPE_LINK,
} from "@/utils/constants";
import { User } from "@supabase/supabase-js";
import { Testimonials } from "@/components/testimonials";

const FloatingOrb = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      x: [0, 50, 0],
      y: [0, -25, 0],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
  />
);

const OFFER_END_DATE = new Date("2024-11-30T23:59:59");

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = OFFER_END_DATE.getTime() - new Date().getTime();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-pink-400 animate-pulse" />
      <span className="text-pink-200">
        Offer ends: {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}h
        {String(timeLeft.minutes).padStart(2, "0")}m{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
};

export function HomePage({ user }: { user: User | null }) {
  const [showSelfHostedModal, setShowSelfHostedModal] = useState(false);
  const [showManagedModal, setShowManagedModal] = useState(false);
  const router = useRouter();

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      const stripeUrl = new URL(BUY_TEMPLATE_STRIPE_LINK);
      if (user.email) {
        stripeUrl.searchParams.set("prefilled_email", user.email);
      }
      window.location.href = stripeUrl.toString();
    } else {
      setShowSelfHostedModal(true);
    }
  };

  const handleStartTrialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      const stripeUrl = new URL(BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
      if (user.email) {
        stripeUrl.searchParams.set("prefilled_email", user.email);
      }
      window.location.href = stripeUrl.toString();
    } else {
      setShowManagedModal(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-900 flex flex-col items-center justify-start antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-slate-900" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={2} />
        <FloatingOrb delay={4} />
      </div>

      <motion.div
        className="fixed inset-0 opacity-50 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(300px at 0% 0%, purple 0%, transparent 80%)",
            "radial-gradient(300px at 100% 100%, purple 0%, transparent 80%)",
            "radial-gradient(300px at 0% 100%, purple 0%, transparent 80%)",
            "radial-gradient(300px at 100% 0%, purple 0%, transparent 80%)",
            "radial-gradient(300px at 0% 0%, purple 0%, transparent 80%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 ring-2 ring-slate-900"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-purple-200">
                Trusted by 500+ Domain Investors
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center mx-auto max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white leading-[1.1] tracking-tight mb-6">
            Transform Dormant Domains Into
            <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Profitable Assets
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            Deploy beautiful &ldquo;Domain For Sale&rdquo; pages in seconds. Get
            instant notifications when offers arrive. Track performance across
            your entire portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              {user ? "Visit Dashboard" : "Deploy Your First Domain"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-colors border border-white/10"
            >
              {user ? "Documentation" : "See How It Works"}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">10,000+</div>
              <div className="text-sm text-slate-400">Offers Tracked</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-slate-400">Active Domains</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-slate-400">Customer Rating</div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Starter Plan */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Code className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Starter</h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-purple-400">
                        $5
                      </span>
                      <span className="text-purple-300 text-sm">/month</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
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
              </div>

              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full font-medium shadow-lg">
                  Most Popular
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Server className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Pro</h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-purple-400">
                        $20
                      </span>
                      <span className="text-purple-300 text-sm">/month</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
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
              </div>

              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all duration-200"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-medium shadow-lg">
                  Revenue Share
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Building2 className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Enterprise</h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-purple-400">
                        10%
                      </span>
                      <span className="text-purple-300 text-sm">of sales</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
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
              </div>

              <Link
                href="mailto:sales@example.com"
                className="block w-full text-center py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg font-medium transition-all duration-200"
              >
                Contact Sales
              </Link>
            </motion.div>

            {/* Self-Hosted Template */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative flex flex-col bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-emerald-500 text-white text-sm rounded-full font-medium shadow-lg">
                  Limited Time Offer
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Code className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Self-Hosted
                    </h2>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-medium text-slate-400 line-through">
                        $20
                      </span>
                      <span className="text-2xl font-bold text-purple-400">
                        $10
                      </span>
                      <span className="text-purple-300 text-sm">one-time</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-4">
                  Offer ends: 6d 05h 16m 06s
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    "Deploy to unlimited domains",
                    "Spam-protected offer forms",
                    "Unified admin dashboard",
                    "Bulk deployment via CLI",
                    "Lifetime updates",
                    "Developer friendly",
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
              </div>

              <button
                onClick={() => (window.location.href = "/docs")}
                className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-lg font-medium transition-all duration-200"
              >
                Buy Template
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            className="text-center max-w-4xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text mb-6">
              Turn Domain Inquiries Into Sales
            </h2>

            <p className="text-lg text-slate-300 mb-12">
              Our powerful dashboard gives you everything you need to close more
              domain sales, faster. From instant offer notifications to detailed
              analytics, we&apos;ve got you covered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {/* Market Stats */}
              <div className="relative group bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300 text-left">
                <div className="absolute -top-3 left-8">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full font-medium shadow-xl">
                    Market Data
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Domain Market Insights
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      $4,000
                    </div>
                    <div className="text-sm text-slate-300">
                      Median .com sale price
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      $10,000
                    </div>
                    <div className="text-sm text-slate-300">
                      Median .ai sale price
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-1">
                      1-3%
                    </div>
                    <div className="text-sm text-slate-300">
                      Average yearly sell-through rate
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-sm text-slate-400">
                    Data sourced from Escrow.com&apos;s 2023 report
                  </div>
                </div>
              </div>

              {/* Our Solution */}
              <div className="relative group bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300 text-left">
                <div className="absolute -top-3 left-8">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full font-medium shadow-xl">
                    Our Solution
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Maximize Your Sales
                </h3>
                <ul className="space-y-4">
                  {[
                    "Professional offer forms that convert",
                    "Instant notifications for every offer",
                    "Advanced analytics to optimize pricing",
                    "Automated follow-ups to close deals",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
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
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <Link
                href="/example"
                className="relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-200"
              >
                <div className="flex flex-col items-start">
                  <span className="text-lg font-semibold text-white">
                    Try It Yourself
                  </span>
                  <span className="text-sm text-slate-400">
                    See our interactive offer form in action
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
          <Testimonials />

          <motion.div
            className="text-center bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/10 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text mb-12">
              Deploy in Under 60 Seconds
            </h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 text-left">
              {[
                {
                  step: "01",
                  title: "Install & Login",
                  code: "npm install\nnpx wrangler login",
                },
                {
                  step: "02",
                  title: "Configure",
                  code: "npm run create-domain",
                },
                {
                  step: "03",
                  title: "Deploy",
                  code: "npx domain-dash deploy",
                },
              ].map(({ step, title, code }) => (
                <motion.div
                  key={step}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                  <div className="relative bg-black/40 rounded-2xl p-6 border border-white/5 group-hover:border-purple-500/20 transition-colors">
                    <p className="text-lg font-mono text-purple-400 mb-3">
                      {step}
                    </p>
                    <h3 className="font-semibold text-white text-xl mb-4">
                      {title}
                    </h3>
                    <pre className="text-sm text-slate-300 bg-black/50 p-4 rounded-xl font-mono overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              href="/docs"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30"
            >
              View Full Documentation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
