"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { User } from "@supabase/supabase-js";
import { testimonials, Testimonials } from "@/components/testimonials";
import { Pricing } from "./pricing";

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

export function HomePage({ user }: { user: User | null }) {
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
                {testimonials.map((person) => (
                  <div
                    key={person.name}
                    className="relative w-6 h-6 rounded-full shadow-sm"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="24px"
                    />
                  </div>
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

          <Pricing user={user} />
          <div className="relative group mb-4">
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
          <Testimonials />

          <motion.div
            className="text-center  mx-auto mb-8"
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
          </motion.div>

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
