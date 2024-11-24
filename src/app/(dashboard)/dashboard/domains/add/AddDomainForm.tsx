"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddDomainForm() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Add New Domain</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mb-6"
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

      {/* Information Section */}

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">
          Before You Begin
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-400 text-sm">1</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">
                DNS Access Required
              </h3>
              <p className="text-sm text-slate-400">
                You&apos;ll need access to your domain&apos;s DNS settings
                through your domain registrar (like GoDaddy, Namecheap, or
                Google Domains).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-400 text-sm">2</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">
                Preparation Steps
              </h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Remove any existing A or CNAME records for the domain</li>
                <li>
                  • Disconnect the domain from any existing Vercel projects
                </li>
                <li>• Ensure you have no conflicting DNS settings</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-400 text-sm">3</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-200 mb-1">
                Propagation Time
              </h3>
              <p className="text-sm text-slate-400">
                After updating DNS records:
              </p>
              <ul className="text-sm text-slate-400 mt-1 space-y-1">
                <li>• Status may show &quot;Active&quot; within minutes</li>
                <li>• Full propagation can take up to 48 hours</li>
                <li>• Your domain might not be immediately accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
