"use client";
import { CopyButton } from "./CopyButton";
import { NameserversDialog } from "@/components/nameservers/NameserversDialog";

interface NameserversSectionProps {
  nameservers: string[];
  domain: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export const NameserversSection = ({
  nameservers,
  domain,
  onOpenChange,
  open,
}: NameserversSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-slate-400">
          Configure the nameservers for your domain. Changes may take up to 48
          hours to propagate.
        </p>
        <button
          onClick={() => onOpenChange(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
        >
          Update Nameservers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nameservers.map((ns, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-3"
          >
            <span className="text-white font-mono text-sm flex-1 truncate">
              {ns}
            </span>
            <CopyButton value={ns} />
          </div>
        ))}
      </div>

      <NameserversDialog
        open={open}
        onOpenChange={onOpenChange}
        domain={domain}
        initialNameservers={nameservers}
      />
    </div>
  );
};
