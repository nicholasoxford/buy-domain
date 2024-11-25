"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Server,
  Lock,
  Download,
  Github,
  Sparkles,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function SelfHostShowcase() {
  const features = [
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
  ];

  return (
    <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Self-Host Your Domain Bridge
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Take full control of your domain sales infrastructure with our
            self-hosted solution. Deploy unlimited domains with complete
            ownership and customization capabilities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="https://buy.stripe.com/test_dR63f48ve81hbyE144"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              Get Started for $10
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Live Demo
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-6 w-6 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="text-sm text-slate-400">{description}</p>
              </motion.div>
            ))}
          </div>

          {/* What's Included Section */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-purple-500/20 mb-20">
            <h2 className="text-2xl font-bold mb-8">What&apos;s Included</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Download className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-white">Source Code</h4>
                  <p className="text-sm text-slate-300">
                    Complete codebase with documentation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Github className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-white">
                    Private Repo Access
                  </h4>
                  <p className="text-sm text-slate-300">
                    GitHub repository invitation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-white">Lifetime Updates</h4>
                  <p className="text-sm text-slate-300">
                    Free access to all future updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
