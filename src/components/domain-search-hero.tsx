"use client";

import WaterWaveAnimation from "@/app/(main)/new/water-wave-animation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DomainSearchHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative w-full min-h-[80vh] flex ">
      {/* Left side with dark theme */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="max-w-xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              Flip Domains Fast: Buy Low, Sell High with Domain Bobber
            </h1>
            <p className="text-xl md:text-2xl text-slate-400">
              Turn Unused Domains into Cash. Our Marketplace Connects You with
              Buyers & Makes Selling Easy.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Why Choose Domain Bobber?
            </h2>
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
                placeholder="Enter a keyword or niche (e.g., 'crypto', 'fitness')"
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-sky-100/80 
                         focus:border-sky-400 focus:outline-none shadow-lg
                         placeholder:text-slate-400 bg-white/95 backdrop-blur-sm
                         transition-all duration-200 group-hover:shadow-xl text-black"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2
                         bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full
                         transition-all duration-200 text-base font-medium
                         shadow-md active:shadow-lg active:-translate-y-0.5"
                onClick={handleSearch}
              >
                Start Flipping
              </button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-4 px-6">
            <div className="flex items-center justify-center gap-4 text-sm text-slate-300">
              <span>5,000+ Domains Flipped</span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span>Trusted by 1,000+ Users</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0">
          <WaterWaveAnimation />
        </div>
      </div>
    </div>
  );
}
