"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { DNSRecord, AddDNSRecordFormData } from "./types";
import { DNSRecordForm } from "./DNSRecordForm";
import { DNSRecordList } from "./DNSRecordList";

interface HostedDomainSectionProps {
  domain: string;
}

export const HostedDomainSection = ({ domain }: HostedDomainSectionProps) => {
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
      <div className="p-6 space-y-6">
        <DNSRecordForm onSubmit={handleAddRecord} isLoading={isLoading} />
        <DNSRecordList records={records} onDelete={handleDeleteRecord} />
      </div>
    </div>
  );
};
