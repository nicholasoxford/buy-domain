"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  Loader2,
  ExternalLink,
  ShoppingCart,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminTable, Column } from "@/components/ui/admin-table";
import Link from "next/link";

interface DomainResult {
  domainName: string;
  purchasable?: boolean;
  purchasePrice?: number;
  purchaseType?: string;
  renewalPrice?: number;
  sld: string;
  tld: string;
  premium?: boolean;
}

interface MarketplaceDomain {
  domainName: string;
  status: {
    purchasable: boolean | undefined;
    premium: boolean | undefined;
  };
  price: number | undefined;
  renewal: number | undefined;
  actions: string;
}

interface DomainNameCellProps {
  domainName: string;
}

const DomainNameCell: React.FC<DomainNameCellProps> = ({ domainName }) => {
  return (
    <Link href={`/marketplace/${domainName}`}>
      <span className="text-blue-500 hover:underline">{domainName}</span>
    </Link>
  );
};

const TableLoadingState = () => (
  <Card className="bg-slate-900/50 border-slate-800 overflow-hidden animate-pulse">
    <div className="p-4 border-b border-slate-800">
      <div className="h-6 w-32 bg-slate-800 rounded"></div>
    </div>
    <div className="p-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-4 border-b border-slate-800/50 last:border-0"
        >
          <div className="h-4 w-48 bg-slate-800 rounded"></div>
          <div className="h-4 w-24 bg-slate-800 rounded"></div>
          <div className="h-4 w-24 bg-slate-800 rounded"></div>
          <div className="h-4 w-24 bg-slate-800 rounded"></div>
          <div className="h-8 w-28 bg-slate-800 rounded ml-auto"></div>
        </div>
      ))}
    </div>
  </Card>
);

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [hasSearched, setHasSearched] = useState(false);
  const [domains, setDomains] = useState<DomainResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    router.push(`/marketplace?q=${encodeURIComponent(searchTerm)}`, {
      scroll: false,
    });

    try {
      const response = await fetch("/api/domains/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: searchTerm }),
      });

      if (!response.ok) {
        throw new Error("Failed to search domains");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const results: DomainResult[] = [];

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const result = JSON.parse(line);
            results.push(result);
          } catch (e) {
            console.error("Failed to parse result:", e);
          }
        }
      }

      setDomains(results);
    } catch (error) {
      console.error("Search failed:", error);
      setError("Failed to search domains. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStatus = (status: {
    purchasable: boolean | undefined;
    premium: boolean | undefined;
  }) => {
    if (status.premium) {
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </span>
        </div>
      );
    }

    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          status.purchasable
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        )}
      >
        {status.purchasable ? "Available" : "Unavailable"}
      </span>
    );
  };

  const columns: Column<MarketplaceDomain>[] = [
    {
      header: "Domain Name",
      accessorKey: "domainName",
      cellType: "custom",
      render: (domain: MarketplaceDomain) => (
        <div className="flex items-center gap-2">
          <Link href={`/marketplace/${domain.domainName}`}>
            <span className="text-blue-500 hover:underline">
              {domain.domainName}
            </span>
          </Link>
          {domain.status.premium && (
            <Crown className="w-4 h-4 text-amber-400" />
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cellType: "custom",
      render: (domain: MarketplaceDomain) => renderStatus(domain.status),
    },
    {
      header: "Price",
      accessorKey: "price",
      cellType: "custom",
      render: (domain: MarketplaceDomain) => (
        <div
          className={cn(
            "font-medium",
            domain.status.premium ? "text-amber-400" : "text-slate-300"
          )}
        >
          {formatPrice(domain.price)}
        </div>
      ),
    },
    {
      header: "Renewal",
      accessorKey: "renewal",
      cellType: "currency",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellType: "default",
    },
  ];

  const tableData: MarketplaceDomain[] = domains.map((domain) => ({
    domainName: domain.domainName,
    status: {
      purchasable: domain.purchasable,
      premium: domain.premium,
    },
    price: domain.purchasePrice,
    renewal: domain.renewalPrice,
    actions: domain.domainName,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white">Domain Marketplace</h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Find the perfect domain name for your next project. Search through
          millions of available domains.
        </p>

        <Card className="mt-4 bg-slate-900/70 border-slate-800">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Try 'myproject' or 'mybrand'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12 text-lg bg-slate-900/50 border-slate-700 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchTerm.trim()}
                className={cn(
                  "h-12 px-8 text-lg bg-purple-600 hover:bg-purple-500 transition-all duration-150",
                  "shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105",
                  isLoading && "cursor-not-allowed opacity-50"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Searching
                  </>
                ) : (
                  "Search Domains"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {(isLoading || domains.length > 0) && (
        <>
          {isLoading ? (
            <TableLoadingState />
          ) : (
            <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h2 className="text-lg font-semibold text-white">
                  {domains.length} domains found
                </h2>
              </div>
              <div className="overflow-x-auto">
                <AdminTable
                  data={tableData}
                  columns={columns}
                  emptyState={<div>No domains found.</div>}
                  actionLink={{
                    href: (row) => `/marketplace/${row.domainName}`,
                    label: "View Details",
                    icon: <ExternalLink className="h-4 w-4" />,
                  }}
                  buyButton={{
                    href: (row) => `/marketplace/${row.domainName}/register`,
                    label: "Buy Now",
                    icon: <ShoppingCart className="h-4 w-4" />,
                  }}
                />
              </div>
            </Card>
          )}
        </>
      )}

      {!isLoading && hasSearched && domains.length === 0 && (
        <Card className="p-12 bg-slate-900/50 border-slate-800">
          <div className="text-center">
            <Search className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-white">
              No domains found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Try searching with different keywords
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
