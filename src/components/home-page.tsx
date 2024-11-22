"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Server,
  CheckCircle,
  Star,
  Check,
} from "lucide-react";
import Link from "next/link";

const FloatingOrb = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.2, 1],
      x: [0, 100, 0],
      y: [0, -50, 0],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
  />
);

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center p-4 antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-slate-900 to-slate-900" />

      <div className="fixed inset-0 overflow-hidden">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={2} />
        <FloatingOrb delay={4} />
      </div>

      <motion.div
        className="fixed inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(600px at 0% 0%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 100% 100%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 0% 100%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 100% 0%, purple 0%, transparent 80%)",
            "radial-gradient(600px at 0% 0%, purple 0%, transparent 80%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 mb-20"
        >
          <span className="inline-block px-6 py-2 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium mb-4 border border-purple-500/20">
            Trusted by Domain Investors Worldwide
          </span>

          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 text-transparent bg-clip-text leading-tight tracking-tight">
            Turn Dead Domains
            <br />
            Into Revenue
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Deploy beautiful &ldquo;Domain For Sale&rdquo; pages in seconds. Get
            instant notifications when offers arrive. Track performance across
            your entire portfolio.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link
              href="https://buy.stripe.com/test_dR63f48ve81hbyE144"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors"
            >
              Deploy Your First Domain
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
            >
              See How It Works
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-slate-300">
              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <p>10,000+ Offers Tracked</p>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-300">
              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <p>500+ Active Domains</p>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-300">
              <Star className="h-5 w-5 text-purple-400 flex-shrink-0" />
              <p>4.9/5 Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 text-left border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Code className="h-7 w-7 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Self-Hosted</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-purple-300">
                    $10
                  </span>
                  <span className="text-purple-300">one-time purchase</span>
                </div>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
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
                  className="flex items-center gap-3 text-slate-300"
                >
                  <Check className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="https://buy.stripe.com/test_dR63f48ve81hbyE144"
              className="block w-full text-center px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
            >
              Buy Now
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-8 text-left border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="absolute -top-3 right-8">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full font-medium shadow-xl">
                Most Popular
              </span>
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Server className="h-7 w-7 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Managed Service
                </h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-purple-300">$5</span>
                  <span className="text-purple-300">/month for 5 domains</span>
                </div>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Everything in Self-Hosted +",
                "Instant email notifications",
                "Advanced analytics & tracking",
                "Automated DNS & SSL setup",
                "Managed backups & support",
                "Priority support",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <Check className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-xl rounded-3xl p-12 border border-white/[0.05] shadow-2xl shadow-purple-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text mb-12">
            Deploy in Under 60 Seconds
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12 text-left">
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
  );
}
