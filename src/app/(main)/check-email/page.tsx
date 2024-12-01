"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, Bell, Shield, Clock } from "lucide-react";
import Link from "next/link";

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

const features = [
  {
    icon: Shield,
    title: "Secure Verification",
    description:
      "We use industry-standard security practices to keep your account safe.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description:
      "Most verification emails arrive within minutes. Check your spam folder if you don't see it.",
  },
  {
    icon: Bell,
    title: "Stay Updated",
    description:
      "Once verified, you'll get important updates about your account and domains.",
  },
];

export default function CheckEmailPage() {
  return (
    <div className="min-h-dvh bg-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={2} />
        <FloatingOrb delay={4} />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl w-full text-center"
      >
        {/* Email Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 mx-auto mb-8 bg-purple-500/10 rounded-full flex items-center justify-center"
        >
          <Mail className="h-10 w-10 text-purple-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Check Your Email
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          We&apos;ve sent you a verification link. Please check your email to
          continue.
        </p>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="p-3 bg-purple-500/10 rounded-xl d-xl w-fit mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Back to Sign In */}
        <Link
          className="mt-6 text-sm text-slate-300 hover:text-white"
          href="/signin"
        >
          Back to Sign In
        </Link>
      </motion.div>
    </div>
  );
}
