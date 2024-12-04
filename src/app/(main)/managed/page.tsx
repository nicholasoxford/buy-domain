"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Shield,
  Zap,
  LineChart,
  Clock,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { ManagedServicePricing } from "./managed-service-pricing";
import FreeTierBanner from "@/components/free-tier-banner";

export const dynamic = "force-static";

export default function ManagedServicePage() {
  const features = [
    {
      icon: Cloud,
      title: "Instant Setup",
      description:
        "Connect your domain and go live in minutes with zero configuration",
    },
    {
      icon: Shield,
      title: "Managed Security",
      description: "Built-in protection against spam and automated threats",
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
      description: "Detailed insights into offers and visitor behavior",
    },
  ];

  return (
    <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            Hassle-Free Domain Sales
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Focus on selling your domains while we handle the infrastructure.
            Enterprise-grade hosting with zero maintenance required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/demo"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Live Demo
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              Documentation
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="text-sm text-slate-400">{description}</p>
              </motion.div>
            ))}
          </div>

          <FreeTierBanner />

          {/* Pricing Section */}
          <ManagedServicePricing />

          {/* Getting Started Steps */}
          <GettingStartedSteps />
        </div>
      </div>
    </div>
  );
}

function GettingStartedSteps() {
  return (
    <div className="text-left max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Get Started in Minutes
      </h2>
      <div className="space-y-6">
        {[
          {
            icon: Users,
            title: "Create Account",
            description: "Sign up for a Domain Bobber account",
          },
          {
            icon: Cloud,
            title: "Add Domain",
            description: "Connect your domain through our dashboard",
          },
          {
            icon: Settings,
            title: "Configure",
            description: "Customize your offer page appearance",
          },
          {
            icon: Clock,
            title: "Go Live",
            description: "Start receiving offers in minutes",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-4 bg-slate-800/50 rounded-xl p-6 border border-blue-500/20"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">{title}</h3>
              <p className="text-sm text-slate-300">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
