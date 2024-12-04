"use client";
import { useState } from "react";
import { toast } from "sonner";
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

interface TransferSectionProps {
  domain: string;
  domainInfo: DomainInfo | null;
}

export const TransferSection = ({
  domain,
  domainInfo,
}: TransferSectionProps) => {
  const [isUpdating, setIsUpdating] = useState({
    autorenew: false,
    lock: false,
    privacy: false,
    authCode: false,
  });
  const [authCode, setAuthCode] = useState<string | null>(null);
  const handleGetAuthCode = async () => {
    if (!domainInfo) return;
    setIsUpdating((prev) => ({ ...prev, authCode: true }));
    try {
      const response = await fetch(`/api/domains/${domain}/auth-code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get auth code");
      }

      const data = await response.json();
      setAuthCode(data.authCode);
      toast.success("Auth code retrieved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to get auth code"
      );
    } finally {
      setIsUpdating((prev) => ({ ...prev, authCode: false }));
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

      // Refresh the page to update the domain info
      window.location.reload();

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

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Domain Transfer</h3>
        <div className="space-y-4">
          <p className="text-slate-400">
            To transfer your domain to another registrar, you&apos;ll need to:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li>Unlock your domain (if currently locked)</li>
            <li>
              Obtain an authorization/EPP code from your current registrar
            </li>
            <li>Disable WHOIS privacy (if enabled)</li>
            <li>Initiate the transfer at your new registrar</li>
          </ol>

          <div className="mt-6">
            <div className="bg-slate-900/50 rounded p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Auth Code</div>
                  <div className="text-sm text-slate-400">
                    Get the authorization code needed to transfer this domain to
                    another registrar
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {authCode && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{authCode}</span>
                      <CopyButton value={authCode} />
                    </div>
                  )}
                  <button
                    onClick={handleGetAuthCode}
                    disabled={isUpdating.authCode || !domainInfo}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {isUpdating.authCode ? "Getting Code..." : "Get Auth Code"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Domain Lock Status</h4>
                  <p className="text-sm text-slate-400">
                    {domainInfo?.locked
                      ? "Your domain is currently locked and cannot be transferred"
                      : "Your domain is unlocked and can be transferred"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      domainInfo?.locked
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-green-400/10 text-green-400"
                    }`}
                  >
                    {domainInfo?.locked ? "Locked" : "Unlocked"}
                  </div>
                  <button
                    onClick={handleToggleLock}
                    disabled={isUpdating.lock || !domainInfo}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      domainInfo?.locked
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isUpdating.lock
                      ? "Updating..."
                      : domainInfo?.locked
                        ? "Unlock Domain"
                        : "Lock Domain"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">WHOIS Privacy</h4>
                  <p className="text-sm text-slate-400">
                    {domainInfo?.privacyEnabled
                      ? "WHOIS Privacy is enabled and may need to be disabled for transfer"
                      : "WHOIS Privacy is disabled"}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    domainInfo?.privacyEnabled
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "bg-green-400/10 text-green-400"
                  }`}
                >
                  {domainInfo?.privacyEnabled ? "Enabled" : "Disabled"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
