"use client";

import { motion } from "framer-motion";
import { Rocket, ArrowRight, Layout, Mail, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    icon: Layout,
    title: "Deploy Your First Domain",
    description:
      "Create your first 'Domain for Sale' page in under 60 seconds.",
    link: "/dashboard/domains/add",
    cta: "Add Domain",
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with other domain investors and share strategies.",
    link: "/community",
    cta: "Join Now",
  },
  {
    icon: Mail,
    title: "Set Up Notifications",
    description: "Configure email alerts for new domain offers.",
    link: "/dashboard/settings",
    cta: "Configure",
  },
];

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (!token_hash || !type) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }, [searchParams]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-slate-900 flex flex-col items-center justify-center antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-slate-900" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <Rocket className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Welcome to Domain Bobber! 🎉
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Your email has been verified. Let&apos;s get you set up with
            everything you need to start managing your domain portfolio like a
            pro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-4">
                <feature.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-slate-300 mb-4">{feature.description}</p>
              <Link
                href={feature.link}
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
              >
                {feature.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
