"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDomainPage() {
  const [domain, setDomain] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the domain
    // For now, we'll just simulate it
    console.log(`Adding domain: ${domain}`);
    // Redirect to the all domains page after adding
    router.push("/admin/domains");
  };

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
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Add Domain
        </button>
      </form>
    </div>
  );
}
