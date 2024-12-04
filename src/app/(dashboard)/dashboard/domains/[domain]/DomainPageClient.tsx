"use client";
interface DNSRecord {
  type: string;
  name: string;
  value: string;
  notes: string[];
}

interface AddDNSRecordFormData {
  type: string;
  name: string;
  value: string;
}

// ... other imports ...
import { useState } from "react";
import { DangerZone } from "./DangerZone";
import { DomainVerification } from "./DomainVerification";
import { NotificationSettings } from "./DomainSettings";
import { Tables } from "@/lib/supabase/database.types";

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

const DNSRecordForm = ({
  onSubmit,
}: {
  onSubmit: (data: AddDNSRecordFormData) => void;
}) => {
  const [formData, setFormData] = useState<AddDNSRecordFormData>({
    type: "A",
    name: "",
    value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: "A", name: "", value: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-slate-900/50 rounded-lg p-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
            placeholder="@"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Value</label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
            placeholder="Enter value"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
        >
          Add Record
        </button>
      </div>
    </form>
  );
};

const HostedDomainSection = () => {
  const [records, setRecords] = useState<DNSRecord[]>([
    {
      type: "A",
      name: "@",
      value: "76.76.21.21",
      notes: ["Default Vercel A record"],
    },
  ]);

  const handleAddRecord = (data: AddDNSRecordFormData) => {
    setRecords([...records, { ...data, notes: ["Custom record"] }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">DNS Records</h2>
      </div>
      <DNSRecordForm onSubmit={handleAddRecord} />
      <div className="space-y-4">
        {records.map((record, index) => renderDNSRecord(record))}
      </div>
    </div>
  );
};

export default function DomainPage({ domain }: { domain: Tables<"domains"> }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          Domain: {domain.domain}
        </h1>
      </div>

      <div className="space-y-6">
        {domain.hosted ? (
          <>
            <HostedDomainSection />
            <NotificationSettings
              domain={domain.domain}
              initialFrequencies={domain.notification_frequencies}
              initialThreshold={domain.notification_threshold}
            />
            <DangerZone domain={domain.domain} />
          </>
        ) : (
          <>
            <DomainVerification domain={domain} />
            <NotificationSettings
              domain={domain.domain}
              initialFrequencies={domain.notification_frequencies}
              initialThreshold={domain.notification_threshold}
            />
            <DangerZone domain={domain.domain} />
          </>
        )}
      </div>
    </div>
  );
}
