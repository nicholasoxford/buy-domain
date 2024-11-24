"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";

export default function AddDomainPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a domain");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/domains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes("already in use")) {
          throw new Error(
            "This domain is already assigned to another project and couldn't be reassigned. Please remove it from the other project first."
          );
        }
        throw new Error(data.error || "Failed to add domain");
      }

      router.push(`/dashboard/domains/${domain}/verify`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add domain");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Add New Domain</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="domain"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Domain Name
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="example.com"
            required
            disabled={loading}
          />
        </div>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Domain"}
        </button>
      </form>
    </div>
  );
}
