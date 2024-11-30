"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function EnterpriseThankYouPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-900">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900 to-slate-900" />

      <div className="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative group max-w-2xl mx-auto"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-75" />
          <Card className="relative p-6 sm:p-8 bg-slate-900/60 border-purple-500/20 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center ring-1 ring-purple-500/20">
                <CheckCircle2 className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white mb-4">
              Thank You!
            </h1>

            <p className="text-lg text-slate-300 mb-8">
              We&apos;ve received your enterprise inquiry and will be in touch
              within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <h2 className="text-sm font-medium text-purple-300 mb-2">
                  What happens next?
                </h2>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Our enterprise team will review your requirements</li>
                  <li>
                    • We&apos;ll prepare a custom solution tailored to your
                    needs
                  </li>
                  <li>
                    • Schedule a personalized demo of our enterprise features
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login?signup=true" className="inline-block">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-purple-500/50"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/" className="inline-block">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
