"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  DollarSignIcon,
  GlobeIcon,
  ShieldCheckIcon,
  Crown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DomainPrices {
  provider: string;
  premium: boolean;
  registration_price: number;
  renewal_price: number;
  transfer_price: number;
}

interface DomainAvailability {
  domain: string;
  available: boolean;
  premium: boolean;
}

interface DomainInfoClientProps {
  domain: string;
}

export function DomainInfoClient({ domain }: DomainInfoClientProps) {
  const router = useRouter();
  const [prices, setPrices] = useState<DomainPrices | null>(null);
  const [availability, setAvailability] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDomainInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/domains/${domain}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch domain information");
        }

        console.log("API Response:", data);

        if (!data.prices || data.prices.length === 0) {
          throw new Error("No pricing information available");
        }

        setPrices(data.prices[0]); // Name.com prices
        setAvailability(data.availability);
      } catch (error) {
        console.error("Error fetching domain info:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDomainInfo();
  }, [domain]);

  console.log({
    loading,
    prices,
    availability,
    error,
    domain,
  });

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-800/50 rounded w-1/4"></div>
        <div className="h-32 bg-slate-800/50 rounded"></div>
        <div className="h-64 bg-slate-800/50 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 bg-red-500/10 p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!prices) {
    return (
      <div className="text-slate-300 bg-slate-800/50 p-4 rounded-lg">
        No pricing information available for {domain}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-lg p-8">
        <div className="flex items-center gap-2 text-slate-300 hover:text-slate-200 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
          <Link href="/marketplace">Back to Marketplace</Link>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              {domain}
              {prices.premium && <Crown className="h-6 w-6 text-amber-400" />}
            </h1>
            <p className="text-slate-300 text-lg mt-2">
              {availability
                ? "This domain is available for registration"
                : "This domain is currently registered"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {prices.premium && (
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                Premium
              </span>
            )}
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                availability
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {availability ? "Available" : "Taken"}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Registration",
            price: prices.registration_price,
            icon: GlobeIcon,
            description: "First year registration fee",
            action: "Buy Now",
            primary: true,
            onClick: () => router.push(`/marketplace/${domain}/register`),
          },
          {
            title: "Transfer",
            price: prices.transfer_price,
            icon: ShieldCheckIcon,
            description: "Transfer from another registrar",
            action: "Transfer Domain",
            primary: false,
          },
          {
            title: "Renewal",
            price: prices.renewal_price,
            icon: DollarSignIcon,
            description: "Annual renewal fee",
            info: "Price after first year",
            primary: false,
          },
        ].map((item) => (
          <Card
            key={item.title}
            className={cn(
              "bg-slate-900/50 border-slate-800",
              item.primary && "ring-1 ring-purple-500/50"
            )}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    item.primary ? "text-purple-400" : "text-slate-400"
                  )}
                />
                <h3 className="text-lg font-semibold text-slate-200">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-slate-400 text-sm">{item.description}</p>
              <p className="mt-3 text-2xl font-bold text-slate-200">
                ${item.price.toFixed(2)}
              </p>
              {item.info && (
                <p className="mt-1 text-sm text-slate-400">{item.info}</p>
              )}
              {item.action && availability && (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors",
                    item.primary
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  )}
                >
                  {item.action}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
