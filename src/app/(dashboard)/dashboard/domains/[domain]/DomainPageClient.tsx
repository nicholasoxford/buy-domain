"use client";
import { useState, useEffect } from "react";
import { DangerZone } from "./DangerZone";
import { DomainVerification } from "./DomainVerification";
import { NotificationSettings } from "./DomainSettings";
import { Tables } from "@/lib/supabase/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HostedDomainSection } from "./components/HostedDomainSection";
import { NameserversSection } from "./components/NameserversSection";
import { DomainInfo } from "./components/DomainInfo";
import { TransferSection } from "./components/TransferSection";

interface DomainInfoType {
  domainName: string;
  expireDate: string;
  createDate: string;
  locked: boolean;
  autorenewEnabled: boolean;
  privacyEnabled: boolean;
  nameservers: string[];
  renewalPrice: number;
}

export default function DomainPage({ domain }: { domain: Tables<"domains"> }) {
  const [nameserversDialogOpen, setNameserversDialogOpen] = useState(false);
  const [domainInfo, setDomainInfo] = useState<DomainInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDomainInfo = async () => {
    if (!domain.hosted) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/domains/${domain.domain}/info`);
      if (!response.ok) {
        throw new Error("Failed to fetch domain information");
      }
      const data = await response.json();
      setDomainInfo(data);
    } catch (error) {
      // Silently handle error for non-hosted domains
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDomainInfo();
  }, [domain]);

  return (
    <div className="min-h-dvh">
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {domain.domain}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Manage your domain settings and DNS records
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DomainInfo
          domain={domain.domain}
          isHosted={domain.hosted ?? false}
          domainInfo={domainInfo}
          setDomainInfo={setDomainInfo}
          isLoading={isLoading}
          fetchDomainInfo={fetchDomainInfo}
        />

        <div className="mt-8">
          <Tabs
            defaultValue={domain.hosted ? "dns" : "verification"}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-b border-slate-700/50">
              {domain.hosted && (
                <>
                  <TabsTrigger value="dns" className="px-4 py-2">
                    DNS Records
                  </TabsTrigger>
                  <TabsTrigger value="nameservers" className="px-4 py-2">
                    Nameservers
                  </TabsTrigger>
                  <TabsTrigger value="transfer" className="px-4 py-2">
                    Transfer
                  </TabsTrigger>
                </>
              )}
              {!domain.hosted && (
                <TabsTrigger value="verification" className="px-4 py-2">
                  Verification
                </TabsTrigger>
              )}
              <TabsTrigger value="notifications" className="px-4 py-2">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="danger" className="px-4 py-2">
                Danger Zone
              </TabsTrigger>
            </TabsList>

            {domain.hosted && (
              <>
                <TabsContent value="dns" className="mt-6">
                  <HostedDomainSection domain={domain.domain} />
                </TabsContent>
                <TabsContent value="nameservers" className="mt-6">
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    {domainInfo && !isLoading && (
                      <NameserversSection
                        nameservers={domainInfo.nameservers}
                        domain={domain.domain}
                        onOpenChange={setNameserversDialogOpen}
                        open={nameserversDialogOpen}
                      />
                    )}
                    {isLoading && (
                      <p className="text-slate-400">Loading nameservers...</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="transfer" className="mt-6">
                  <TransferSection
                    domain={domain.domain}
                    domainInfo={domainInfo}
                  />
                </TabsContent>
              </>
            )}

            {!domain.hosted && (
              <TabsContent value="verification" className="mt-6">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <DomainVerification domain={domain} />
                </div>
              </TabsContent>
            )}

            <TabsContent value="notifications" className="mt-6">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <NotificationSettings
                  domain={domain.domain}
                  initialFrequencies={domain.notification_frequencies}
                  initialThreshold={domain.notification_threshold}
                />
              </div>
            </TabsContent>

            <TabsContent value="danger" className="mt-6">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <DangerZone domain={domain.domain} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
