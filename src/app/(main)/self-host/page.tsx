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
  CreditCard,
  Code2,
  Rocket,
} from "lucide-react";
import Link from "next/link";

import { useUser } from "@/lib/hooks/useUser";
import { useAuthModal } from "@/hooks/useAuthModal";
import { AuthModal } from "@/components/auth-modal";
import { TEMPLATE_STRIPE_LINK } from "@/utils/constants";

export default function SelfHostShowcase() {
  const { user } = useUser();
  const {
    showAuthModal,
    setShowAuthModal,
    handleGuestCheckout,
    handleSignIn,
    closeModal,
  } = useAuthModal({
    onGuestCheckout: () => {
      window.location.href = TEMPLATE_STRIPE_LINK;
    },
    redirectPath: "/self-host",
  });

  const features = [
    {
      icon: Shield,
      title: "Spam Protected",
      description:
        "Built-in Cloudflare Turnstile protection against automated threats",
    },
    {
      icon: Globe,
      title: "Multi-Domain",
      description: "Manage unlimited domains from a single dashboard interface",
    },
    {
      icon: Server,
      title: "Serverless",
      description: "Zero maintenance with Cloudflare Workers deployment",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Advanced security features and password protection",
    },
    {
      icon: Code,
      title: "Full Customization",
      description: "Complete access to source code for unlimited customization",
    },
    {
      icon: Shield,
      title: "Data Ownership",
      description: "Host your data where you want, maintain full control",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Purchase License",
      description: "Get instant access to the private GitHub repository",
      icon: CreditCard,
      details: [
        "One-time payment",
        "Instant repository access",
        "Lifetime updates included",
      ],
    },
    {
      step: "2",
      title: "Clone & Configure",
      description: "Set up your environment and customize settings",
      icon: Code2,
      details: [
        "Simple environment setup",
        "Customizable configuration",
        "Detailed documentation",
      ],
    },
    {
      step: "3",
      title: "Deploy",
      description: "Deploy to Cloudflare Workers with one command",
      icon: Rocket,
      details: [
        "Single command deployment",
        "Automatic SSL/HTTPS",
        "Global CDN distribution",
      ],
    },
  ];

  const faq = [
    {
      q: "What are the system requirements?",
      a: "You need Node.js 18+ and a Cloudflare account with Workers enabled.",
    },
    {
      q: "Can I modify the source code?",
      a: "Yes, you have full access to modify and customize the entire codebase.",
    },
    {
      q: "Is technical support included?",
      a: "Yes, you get access to our private Discord for direct support.",
    },
    {
      q: "How many domains can I host?",
      a: "You can host unlimited domains with the self-hosted version.",
    },
  ];

  const handleGetStarted = () => {
    if (user?.email) {
      window.location.href = TEMPLATE_STRIPE_LINK;
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeModal}
        onGuestCheckout={handleGuestCheckout}
        onSignIn={handleSignIn}
      />

      <div className="px-4 sm:px-6 max-w-[100vw] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            {/* Hero Section */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Self-Host Your Domain Bobber
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Take full control of your domain sales infrastructure with our
              self-hosted solution. Deploy unlimited domains with complete
              ownership and customization capabilities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Started for $10
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                View Live Demo
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {features.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-6 w-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400">{description}</p>
                </motion.div>
              ))}
            </div>

            {/* Getting Started Steps */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Getting Started
              </h2>
              <div className="space-y-4">
                {steps.map(
                  ({ step, title, description, icon: Icon, details }) => (
                    <div
                      key={step}
                      className="relative bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20"
                    >
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {title}
                        </h3>
                      </div>

                      {/* Description - Centered */}
                      <p className="text-slate-400 text-center mb-8">
                        {description}
                      </p>

                      {/* Details - Three Column Grid */}
                      <div className="grid grid-cols-3 gap-x-4">
                        {details.map((detail, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                              </div>
                            </div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Vertical Line Connector */}
                      {step !== "3" && (
                        <div className="absolute left-[2.25rem] -bottom-4 w-0.5 h-8 bg-purple-500/20" />
                      )}
                    </div>
                  )
                )}
              </div>
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

            {/* FAQ Section */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faq.map(({ q, a }) => (
                  <div
                    key={q}
                    className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 text-left"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {q}
                    </h3>
                    <p className="text-slate-400">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
