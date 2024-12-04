"use client";
import { useState, useEffect } from "react";
import { DangerZone } from "./DangerZone";
import { DomainVerification } from "./DomainVerification";
import { NotificationSettings } from "./DomainSettings";
import { Tables } from "@/lib/supabase/database.types";
import { toast } from "sonner";
import { formatDate } from "@/utils/format";
import { NameserversDialog } from "@/components/nameservers/NameserversDialog";

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

interface DomainInfo {
  domainName: string;
  expireDate: string;
  createDate: string;
  locked: boolean;
  autorenewEnabled: boolean;
  privacyEnabled: boolean;
  nameservers: string[];
  renewalPrice: number;
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
  <div key={record.id} className="bg-slate-800/50 rounded-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-1">
        <div className="text-xs font-medium text-slate-400">Type</div>
        <div className="font-mono text-purple-400 text-sm">{record.type}</div>
      </div>
      <div className="space-y-1">
        <div className="text-xs font-medium text-slate-400">Name</div>
        <div className="font-mono text-purple-400 text-sm truncate">
          {record.host}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs font-medium text-slate-400">Value</div>
        <div className="flex items-center gap-2">
          <div className="font-mono text-slate-300 text-sm truncate">
            {record.answer}
          </div>
          <CopyButton value={record.answer} />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs font-medium text-slate-400">Settings</div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400">TTL: {record.ttl}s</div>
          {record.priority !== undefined && (
            <div className="text-xs text-slate-400">
              Priority: {record.priority}
            </div>
          )}
          <button
            onClick={() => onDelete(record.id)}
            className="text-red-400 hover:text-red-300 text-sm ml-auto"
          >
            Delete
          </button>
        </div>
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
    <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
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
          <label className="text-xs font-medium text-slate-400 block mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            placeholder="@"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1">
            Value
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white text-sm"
            placeholder="Enter value"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Record"}
          </button>
        </div>
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
    <div className="bg-slate-900/50 rounded-lg overflow-hidden">
      <div className="border-b border-slate-700/50 p-4">
        <h2 className="text-lg font-semibold text-white">DNS Records</h2>
      </div>
      <div className="p-6 space-y-6">
        <DNSRecordForm onSubmit={handleAddRecord} isLoading={isLoading} />
        <div className="space-y-4">
          {records.map((record) => renderDNSRecord(record, handleDeleteRecord))}
        </div>
      </div>
    </div>
  );
};

const DomainInfo = ({ domain }: { domain: string }) => {
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<{
    privacy?: boolean;
    autorenew?: boolean;
  }>({});
  const [nameserversDialogOpen, setNameserversDialogOpen] = useState(false);

  const fetchDomainInfo = async () => {
    try {
      const response = await fetch(`/api/domains/${domain}/info`);
      if (!response.ok) {
        throw new Error("Failed to fetch domain information");
      }
      const data = await response.json();
      setDomainInfo(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      toast.error("Failed to fetch domain information");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDomainInfo();
  }, [domain]);

  const handleTogglePrivacy = async () => {
    if (!domainInfo) return;
    setIsUpdating((prev) => ({ ...prev, privacy: true }));
    try {
      const response = await fetch(`/api/domains/${domain}/whois-privacy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enable: !domainInfo.privacyEnabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to update WHOIS privacy");
      }

      await fetchDomainInfo();
      toast.success(
        `WHOIS privacy ${domainInfo.privacyEnabled ? "disabled" : "enabled"} successfully`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update WHOIS privacy"
      );
    } finally {
      setIsUpdating((prev) => ({ ...prev, privacy: false }));
    }
  };

  const handleToggleAutorenew = async () => {
    if (!domainInfo) return;
    setIsUpdating((prev) => ({ ...prev, autorenew: true }));
    try {
      const response = await fetch(`/api/domains/${domain}/auto-renew`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enable: !domainInfo.autorenewEnabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to update auto-renewal");
      }

      await fetchDomainInfo();
      toast.success(
        `Auto-renewal ${domainInfo.autorenewEnabled ? "disabled" : "enabled"} successfully`
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update auto-renewal"
      );
    } finally {
      setIsUpdating((prev) => ({ ...prev, autorenew: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900/50 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-1/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
        {error}
      </div>
    );
  }

  if (!domainInfo) {
    return null;
  }

  return (
    <div className="bg-slate-900/50 rounded-lg overflow-hidden">
      <div className="border-b border-slate-700/50 p-4">
        <h2 className="text-lg font-semibold text-white">Domain Overview</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              Registration Date
            </div>
            <div className="text-white">
              {formatDate(domainInfo.createDate)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              Expiration Date
            </div>
            <div className="text-white">
              {formatDate(domainInfo.expireDate)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              Renewal Price
            </div>
            <div className="text-white">
              ${domainInfo.renewalPrice.toFixed(2)} USD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              Domain Status
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${domainInfo.locked ? "bg-yellow-400" : "bg-green-400"}`}
              ></div>
              <span className="text-white">
                {domainInfo.locked ? "Locked" : "Unlocked"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              Auto-Renewal
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${domainInfo.autorenewEnabled ? "bg-green-400" : "bg-red-400"}`}
              ></div>
              <div className="flex items-center gap-2">
                <span className="text-white">
                  {domainInfo.autorenewEnabled ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={handleToggleAutorenew}
                  disabled={isUpdating.autorenew}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                  {isUpdating.autorenew
                    ? "Updating..."
                    : domainInfo.autorenewEnabled
                      ? "Disable"
                      : "Enable"}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-400">
              WHOIS Privacy
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${domainInfo.privacyEnabled ? "bg-green-400" : "bg-red-400"}`}
              ></div>
              <div className="flex items-center gap-2">
                <span className="text-white">
                  {domainInfo.privacyEnabled ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={handleTogglePrivacy}
                  disabled={isUpdating.privacy}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                  {isUpdating.privacy
                    ? "Updating..."
                    : domainInfo.privacyEnabled
                      ? "Disable"
                      : "Enable"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-400">
              Nameservers
            </div>
            <button
              onClick={() => setNameserversDialogOpen(true)}
              className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
            >
              Update Nameservers
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {domainInfo.nameservers.map((ns, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-2"
              >
                <span className="text-white font-mono text-sm flex-1 truncate">
                  {ns}
                </span>
                <CopyButton value={ns} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <NameserversDialog
        open={nameserversDialogOpen}
        onOpenChange={setNameserversDialogOpen}
        domain={domain}
        initialNameservers={domainInfo?.nameservers || []}
      />
    </div>
  );
};

export default function DomainPage({ domain }: { domain: Tables<"domains"> }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">{domain.domain}</h1>
          <p className="text-slate-400">
            Manage your domain settings and DNS records
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <DomainInfo domain={domain.domain} />
        {domain.hosted ? (
          <>
            <HostedDomainSection domain={domain.domain} />
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700/50 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Notification Settings
                </h2>
              </div>
              <div className="p-6">
                <NotificationSettings
                  domain={domain.domain}
                  initialFrequencies={domain.notification_frequencies}
                  initialThreshold={domain.notification_threshold}
                />
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700/50 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Danger Zone
                </h2>
              </div>
              <div className="p-6">
                <DangerZone domain={domain.domain} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700/50 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Domain Verification
                </h2>
              </div>
              <div className="p-6">
                <DomainVerification domain={domain} />
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700/50 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Notification Settings
                </h2>
              </div>
              <div className="p-6">
                <NotificationSettings
                  domain={domain.domain}
                  initialFrequencies={domain.notification_frequencies}
                  initialThreshold={domain.notification_threshold}
                />
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-slate-700/50 p-4">
                <h2 className="text-lg font-semibold text-white">
                  Danger Zone
                </h2>
              </div>
              <div className="p-6">
                <DangerZone domain={domain.domain} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
