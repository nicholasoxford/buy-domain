"use client";
import { DNSRecord } from "./types";
import { CopyButton } from "./CopyButton";

interface DNSRecordListProps {
  records: DNSRecord[];
  onDelete: (id: number) => void;
}

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

export const DNSRecordList = ({ records, onDelete }: DNSRecordListProps) => {
  return (
    <div className="space-y-4">
      {records.map((record) => renderDNSRecord(record, onDelete))}
    </div>
  );
};
