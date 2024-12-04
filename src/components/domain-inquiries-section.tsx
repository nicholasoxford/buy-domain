"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  MessagesSquare,
  Clock,
  LineChart,
} from "lucide-react";

export function DomainInquiriesSection() {
  return (
    <motion.div
      className="text-center mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text mb-6">
        Accelerate Your Domain Sales
      </h2>

      <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto">
        The average domain takes 12-24 months to sell. With Domain Bobber, you
        can dramatically reduce that time through better lead management and
        automated follow-ups.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {/* Traditional Process */}
        <div className="relative group bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300 text-left">
          <div className="absolute -top-3 left-8">
            <span className="px-4 py-1.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm rounded-full font-medium shadow-xl">
              Traditional Process
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">
            Without Domain Bobber
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-slate-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-xl font-bold text-red-400 mb-1">
                  12-24 Months
                </div>
                <div className="text-sm text-slate-300">
                  Average time to sell a domain
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  ❌
                </div>
                <span>Missed inquiries due to delayed responses</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  ❌
                </div>
                <span>Manual follow-up process</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  ❌
                </div>
                <span>No insights into buyer behavior</span>
              </div>
            </div>
          </div>
        </div>

        {/* With Domain Bobber */}
        <div className="relative group bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300 text-left">
          <div className="absolute -top-3 left-8">
            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full font-medium shadow-xl">
              With Domain Bobber
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6">
            Faster Sales, Better Results
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-xl font-bold text-green-400 mb-1">
                  3-6 Months
                </div>
                <div className="text-sm text-slate-300">
                  Average time to sell with our platform
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <MessagesSquare className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-slate-300">
                  Instant response to every inquiry
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-slate-300">
                  Automated follow-up sequences
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <LineChart className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-slate-300">
                  Real-time analytics and insights
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-slate-400">
              Based on average customer results in 2023
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
