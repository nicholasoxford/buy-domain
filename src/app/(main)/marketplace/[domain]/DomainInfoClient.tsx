"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  DollarSignIcon,
  GlobeIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { DomainCheckoutDialog } from "@/components/DomainCheckoutDialog";

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
  const [prices, setPrices] = useState<DomainPrices | null>(null);
  const [availability, setAvailability] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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
        <div className="h-8 bg-slate-200 rounded w-1/4"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-64 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!prices) {
    return <div>No pricing information available for {domain}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link
        href="/marketplace"
        className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Link>

      {/* Domain Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{domain}</h1>
            <p className="text-slate-500 mt-1">
              {availability
                ? "This domain is available for registration"
                : "This domain is currently registered"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {prices.premium && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Premium
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                availability
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
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
            action: "Register Now",
            primary: true,
            onClick: () => setCheckoutOpen(true),
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
          <div
            key={item.title}
            className={`bg-white rounded-xl shadow-sm p-6 border ${
              item.primary
                ? "border-sky-200 ring-1 ring-sky-200"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon
                className={`h-6 w-6 ${
                  item.primary ? "text-sky-600" : "text-slate-600"
                }`}
              />
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
            </div>
            <p className="mt-2 text-slate-600 text-sm">{item.description}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              ${item.price.toFixed(2)}
            </p>
            {item.info && (
              <p className="mt-1 text-sm text-slate-500">{item.info}</p>
            )}
            {item.action && availability && (
              <button
                onClick={item.onClick}
                className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  item.primary
                    ? "bg-sky-500 hover:bg-sky-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {item.action}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Checkout Dialog */}
      {prices && (
        <DomainCheckoutDialog
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          domain={domain}
          prices={prices}
        />
      )}
    </div>
  );
}
