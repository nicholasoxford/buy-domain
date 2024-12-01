"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Server,
  Building2,
  Check,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import {
  BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK,
  PRO_DOMAIN_BRIDGE_SUBSCRIPTION_LINK,
  TEMPLATE_STRIPE_LINK,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import { AuthModal } from "@/components/auth-modal";

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
    <div className="text-xs text-slate-400 mb-4">
      Offer ends: {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}h{" "}
      {String(timeLeft.minutes).padStart(2, "0")}m{" "}
      {String(timeLeft.seconds).padStart(2, "0")}s
    </div>
  );
};

export function Pricing({ user }: { user: User | null }) {
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
    redirectPath: "/buy-template",
  });

  const router = useRouter();

  const handleStarterPlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.email) {
      const stripeUrl = new URL(BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
      stripeUrl.searchParams.set("prefilled_email", user.email);
      window.location.href = stripeUrl.toString();
    } else {
      router.push("/login?redirect=/buy-basic-subscription");
    }
  };

  const handleProPlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.email) {
      const stripeUrl = new URL(PRO_DOMAIN_BRIDGE_SUBSCRIPTION_LINK);
      stripeUrl.searchParams.set("prefilled_email", user.email);
      window.location.href = stripeUrl.toString();
    } else {
      router.push("/login?redirect=/buy-pro-subscription&signup=true");
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ TEMPLATE_STRIPE_LINK });
    if (user?.email) {
      const stripeUrl = new URL(TEMPLATE_STRIPE_LINK);

      if (user.email) {
        stripeUrl.searchParams.set("prefilled_email", user.email);
      }
      window.location.href = stripeUrl.toString();
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Free Plan (New) */}

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
                  <span className="text-2xl font-bold text-purple-400">$5</span>
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
            onClick={handleStarterPlanClick}
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
            onClick={handleProPlanClick}
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
            href="/enterprise"
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
                <h2 className="text-xl font-bold text-white">Self-Hosted</h2>
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

            <CountdownTimer />

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
            onClick={handleBuyNowClick}
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-lg font-medium transition-all duration-200"
          >
            Buy Template
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
