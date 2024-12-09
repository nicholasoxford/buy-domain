"use client";

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
    <div className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-5xl mx-auto px-8 py-16 text-center text-white space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Flip Domains Fast: Buy Low, Sell High with{" "}
          <span className="text-yellow-300">Domain Bobber</span>
        </h1>
        <p className="text-xl md:text-2xl">
          Turn unused domains into cash. Our marketplace connects you with
          buyers & makes selling easy.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Enter a keyword or niche (e.g., 'crypto', 'fitness')"
              className="w-full px-6 py-4 text-lg rounded-full shadow-lg placeholder:text-slate-400 text-black"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full transition-all duration-200 text-base font-medium shadow-md"
              onClick={handleSearch}
            >
              Start Flipping
            </button>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 flex items-center justify-center gap-6 text-lg">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-300 text-2xl">⭐</span>
            <span>5,000+ Domains Flipped</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-white"></span>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-300 text-2xl">👥</span>
            <span>Trusted by 1,000+ Users</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Flip Domains for Profit",
              description:
                "Find undervalued domains and resell them quickly on our marketplace. No experience needed.",
              icon: "🔄",
            },
            {
              title: "Lowest Fees, Higher Profits",
              description:
                "We offer significantly lower fees than other marketplaces, maximizing your earnings.",
              icon: "💰",
            },
            {
              title: "Instant 'For Sale' Pages",
              description:
                "Turn any domain into a money-making asset. Create a professional 'For Sale' page in seconds.",
              icon: "⏱️",
            },
            {
              title: "Secure and Transparent Transactions",
              description:
                "Enjoy safe domain transfers and transparent transactions, every step of the way.",
              icon: "🔒",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex items-start space-x-4 bg-white bg-opacity-10 p-6 rounded-lg"
            >
              <span className="text-4xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-2xl">{feature.title}</h3>
                <p className="text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
