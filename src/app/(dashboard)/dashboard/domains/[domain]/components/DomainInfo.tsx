"use client";
import { useState } from "react";
import { toast } from "sonner";
import { formatDate } from "@/utils/format";
import { CopyButton } from "./CopyButton";

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

interface DomainInfoProps {
  domain: string;
  isHosted: boolean;
  domainInfo: DomainInfo | null;
  setDomainInfo: (info: DomainInfo | null) => void;
  isLoading: boolean;
  fetchDomainInfo: () => Promise<void>;
}

export const DomainInfo = ({
  domain,
  isHosted,
  domainInfo,
  setDomainInfo,
  isLoading,
  fetchDomainInfo,
}: DomainInfoProps) => {
  const [isUpdating, setIsUpdating] = useState({
    autorenew: false,
    lock: false,
    privacy: false,
    authCode: false,
  });

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

  const handleToggleLock = async () => {
    if (!domainInfo) return;
    setIsUpdating((prev) => ({ ...prev, lock: true }));
    try {
      const response = await fetch(
        `/api/domains/${domain}/${domainInfo.locked ? "unlock" : "lock"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to ${domainInfo.locked ? "unlock" : "lock"} domain`
        );
      }

      await fetchDomainInfo();
      toast.success(
        `Domain ${domainInfo.locked ? "unlocked" : "locked"} successfully`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to ${domainInfo.locked ? "unlock" : "lock"} domain`
      );
    } finally {
      setIsUpdating((prev) => ({ ...prev, lock: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900/50 rounded-lg p-6">
        <p className="text-slate-400">Loading domain information...</p>
      </div>
    );
  }

  if (!domainInfo) {
    return null;
  }

  return (
    <div className="bg-slate-900/50 rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">
            Registration Date
          </div>
          <div className="text-white">{formatDate(domainInfo.createDate)}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">
            Expiration Date
          </div>
          <div className="text-white">{formatDate(domainInfo.expireDate)}</div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">
            Domain Status
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${domainInfo.locked ? "bg-yellow-400" : "bg-green-400"}`}
            ></div>
            <div className="flex items-center gap-2">
              <span className="text-white">
                {domainInfo.locked ? "Locked" : "Unlocked"}
              </span>
              <button
                onClick={handleToggleLock}
                disabled={isUpdating.lock}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
              >
                {isUpdating.lock
                  ? "Updating..."
                  : domainInfo.locked
                    ? "Unlock"
                    : "Lock"}
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-400">Auto-Renewal</div>
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
    </div>
  );
};
