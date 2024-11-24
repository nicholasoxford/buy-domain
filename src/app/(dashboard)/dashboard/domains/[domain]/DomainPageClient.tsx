"use client";
interface DNSRecord {
  type: string;
  name: string;
  value: string;
  notes: string[];
}
// ... other imports ...
import { useState } from "react";
import { DangerZone } from "./DangerZone";
import Link from "next/link";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:bg-slate-700/50 rounded transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          className="w-4 h-4 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-slate-400 hover:text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
      )}
    </button>
  );
};

export const renderDNSRecord = (record: DNSRecord) => (
  <div key={record.type} className="bg-slate-900/50 rounded-lg p-4 space-y-3">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <div className="text-xs text-slate-400 mb-1">Type</div>
        <div className="font-mono text-purple-400">{record.type}</div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-1">Name</div>
        <div className="font-mono text-purple-400">{record.name}</div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-1">Value</div>
        <div className="flex items-center gap-2">
          <div className="font-mono text-slate-300">{record.value}</div>
          <CopyButton value={record.value} />
        </div>
      </div>
    </div>
    <div className="border-t border-slate-700/50 mt-3 pt-3">
      <div className="text-xs text-slate-400">
        {record.notes.map((note, i) => (
          <div key={i} className="flex items-center gap-2 mt-1">
            <span
              className={`${
                note.includes("Cloudflare")
                  ? "text-blue-400"
                  : "text-purple-400"
              }`}
            >
              {note.includes("Cloudflare") ? "⚠️" : "•"}
            </span>
            <span
              className={note.includes("Cloudflare") ? "text-blue-300" : ""}
            >
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function DomainPage({ domain }: { domain: any }) {
  const dnsRecords: DNSRecord[] = [
    {
      type: "A",
      name: "@",
      value: "76.76.21.21",
      notes: [
        "@ represents your base domain",
        "Points your base domain to Vercel's servers",
        "If using Cloudflare, set Proxy status to 'DNS only' (grey cloud)",
      ],
    },
    {
      type: "CNAME",
      name: "www",
      value: "cname.vercel-dns.com",
      notes: [
        "Points your www subdomain to Vercel",
        "If using Cloudflare, set Proxy status to 'DNS only' (grey cloud)",
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          Domain: {domain.domain}
        </h1>
        <Link
          href={`/dashboard/domains/${domain.domain}/verify`}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Verify Domain
        </Link>
      </div>

      <div className="space-y-6">
        {/* Status Card */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Status</h2>
            <div
              className={`px-2 py-1 rounded text-xs ${
                domain.verified
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              }`}
            >
              {domain.verified ? "Verified" : "Pending"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                domain.verified ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <span className="text-slate-300">
              {domain.verified
                ? "Domain is verified and active"
                : "Domain verification required"}
            </span>
          </div>
        </div>

        {/* DNS Records */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            DNS Configuration
          </h2>
          <div className="space-y-4">
            {dnsRecords.map((record) => renderDNSRecord(record))}
          </div>
        </div>

        {/* Domain Details */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Details</h2>
          <div className="bg-slate-900/50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Added On</div>
                <div className="text-slate-200">
                  {new Date(domain.created_at).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Project ID</div>
                <div className="font-mono text-slate-200">
                  {domain.vercel_project_id || "Not set"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone Component */}
        <DangerZone domain={domain.domain} />
      </div>
    </div>
  );
}
