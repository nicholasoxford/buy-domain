"use client";

import { useState } from "react";

type BuyDomainButtonProps = {
  domainName: string;
  price: number;
  currency?: string;
};

export function BuyDomainButton({
  domainName,
  price,
  currency = "usd",
}: BuyDomainButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domainName,
          price,
          currency,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full px-4 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:opacity-50 transition-colors"
    >
      {isLoading ? "Loading..." : `Purchase ${domainName}`}
    </button>
  );
}
