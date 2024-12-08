"use client";

import WaterWaveAnimation from "@/app/(main)/new/water-wave-animation";
import { motion } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/components/testimonials";

export function DomainSearchHero() {
  return (
    <div className="relative w-full min-h-[80vh] flex ">
      {/* Left side with dark theme */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="max-w-xl space-y-8">
          {/* Add testimonials banner at the top */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <div className="flex -space-x-2">
                {testimonials.map((person) => (
                  <div
                    key={person.name}
                    className="relative w-6 h-6 rounded-full shadow-sm"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="24px"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-purple-200">
                Join 500+ Domain Owners
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Domain Bobber
            </h1>
            <p className="text-xl md:text-2xl text-slate-400">
              Your Domain, Your Profit. Flip Fast, Sell Smart.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Flip Domains for Profit",
                description:
                  "Buy low, sell high. It's that easy. Find undervalued domains and resell them quickly on our marketplace. No experience needed.",
                icon: "🔄",
              },
              {
                title: "Lowest Fees, Higher Profits",
                description:
                  "Keep more of your sale price. We offer significantly lower fees than other marketplaces, maximizing your earnings.",
                icon: "💰",
              },
              {
                title: "Instant 'For Sale' Pages",
                description:
                  "Turn any domain into a money-making asset. Create a professional 'For Sale' page in seconds and start attracting buyers immediately.",
                icon: "⏱️",
              },
              {
                title: "Secure and Transparent Transactions",
                description:
                  "We prioritize your security. Enjoy safe domain transfers and transparent transactions, every step of the way.",
                icon: "🔒",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side with animation and search */}
      <div className="w-1/2 relative">
        <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg">
          {/* Search Box */}
          <div className="relative px-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Find a domain to flip..."
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-sky-100/80 
                         focus:border-sky-400 focus:outline-none shadow-lg
                         placeholder:text-slate-400 bg-white/95 backdrop-blur-sm
                         transition-all duration-200 group-hover:shadow-xl"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                         bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full
                         transition-all duration-200 text-base font-medium
                         shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>
          </div>

          {/* Popular TLDs */}
          <div className="flex gap-3 justify-center mt-4 px-6">
            {[".com", ".io", ".dev", ".app"].map((tld) => (
              <button
                key={tld}
                className="px-6 py-2 rounded-full bg-white/90 hover:bg-white 
                         text-slate-700 text-sm font-medium transition-all duration-200
                         shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm
                         border border-sky-100/50 hover:border-sky-200"
              >
                {tld}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0">
          <WaterWaveAnimation />
        </div>
      </div>
    </div>
  );
}
