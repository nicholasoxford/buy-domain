"use client";
import { useState, useEffect } from "react";
import { DangerZone } from "./DangerZone";
import { DomainVerification } from "./DomainVerification";
import { NotificationSettings } from "./DomainSettings";
import { Tables } from "@/lib/supabase/database.types";
import { toast } from "sonner";

interface DNSRecord {
  id: number;
  type: string;
  host: string;
  answer: string;
  ttl: number;
  priority?: number;
}

interface AddDNSRecordFormData {
  type: string;
  name: string;
  value: string;
  ttl?: number;
  priority?: number;
}

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

const renderDNSRecord = (record: DNSRecord, onDelete: (id: number) => void) => (
  <div key={record.id} className="bg-slate-900/50 rounded-lg p-4 space-y-3">
    <div className="grid grid-cols-4 gap-4">
      <div>
        <div className="text-xs text-slate-400 mb-1">Type</div>
        <div className="font-mono text-purple-400">{record.type}</div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-1">Name</div>
        <div className="font-mono text-purple-400">{record.host}</div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-1">Value</div>
        <div className="flex items-center gap-2">
          <div className="font-mono text-slate-300">{record.answer}</div>
          <CopyButton value={record.answer} />
        </div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-1">Actions</div>
        <button
          onClick={() => onDelete(record.id)}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
    <div className="border-t border-slate-700/50 mt-3 pt-3">
      <div className="text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>•</span>
          <span>TTL: {record.ttl} seconds</span>
        </div>
        {record.priority !== undefined && (
          <div className="flex items-center gap-2 mt-1">
            <span>•</span>
            <span>Priority: {record.priority}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const DNSRecordForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: AddDNSRecordFormData) => void;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<AddDNSRecordFormData>({
    type: "A",
    name: "",
    value: "",
    ttl: 300,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ type: "A", name: "", value: "", ttl: 300 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-slate-900/50 rounded-lg p-4"
    >
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
            disabled={isLoading}
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
            <option value="NS">NS</option>
            <option value="SRV">SRV</option>
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        {formData.type === "MX" && (
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Priority
            </label>
            <input
              type="number"
              value={formData.priority || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: parseInt(e.target.value) || undefined,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
              placeholder="Priority (required for MX)"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Record"}
        </button>
      </div>
    </form>
  );
};

const HostedDomainSection = ({ domain }: { domain: string }) => {
  const [records, setRecords] = useState<DNSRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      const response = await fetch(`/api/domains/${domain}/dns`);
      if (!response.ok) {
        throw new Error("Failed to fetch DNS records");
      }
      const data = await response.json();
      setRecords(data.records || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      toast.error("Failed to fetch DNS records");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [domain]);

  const handleAddRecord = async (data: AddDNSRecordFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/domains/${domain}/dns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add DNS record");
      }

      await fetchRecords();
      toast.success("DNS record added successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      toast.error("Failed to add DNS record");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecord = async (id: number) => {
    if (!confirm("Are you sure you want to delete this DNS record?")) {
      return;
    }

    try {
      const response = await fetch(`/api/domains/${domain}/dns/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete DNS record");
      }

      await fetchRecords();
      toast.success("DNS record deleted successfully");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      toast.error("Failed to delete DNS record");
    }
  };

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">DNS Records</h2>
      </div>
      <DNSRecordForm onSubmit={handleAddRecord} isLoading={isLoading} />
      <div className="space-y-4">
        {records.map((record) => renderDNSRecord(record, handleDeleteRecord))}
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
            <HostedDomainSection domain={domain.domain} />
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
