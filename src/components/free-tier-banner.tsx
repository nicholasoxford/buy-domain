"use client";

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  "Custom landing page",
  "Instant notifications",
  "Basic analytics",
  "SSL included",
] as const;

export default function FreeTierBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-12">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-slate-900 to-slate-900/90">
        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
          <div className="absolute inset-[-1px] border border-blue-500/20 rounded-xl" />
        </div>

        <CardContent className="p-8 sm:p-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-200 border-blue-500/20"
            >
              <div className="p-0.5 bg-blue-500/20 rounded-full">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
              </div>
              Free Forever
            </Badge>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Start With One Free Domain
              </h2>
              <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
                Get started with one domain completely free. No credit card
                required. Includes all essential features to showcase and sell
                your domain.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full max-w-xl">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ring-1 ring-white/20">
                    <svg
                      className="size-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-lg h-12 px-8 group"
            >
              <Link href="/login?signup=true">
                Deploy Your First Domain
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
