"use client";
import { useState } from "react";
import { AddDNSRecordFormData } from "./types";

interface DNSRecordFormProps {
  onSubmit: (data: AddDNSRecordFormData) => void;
  isLoading: boolean;
}

export const DNSRecordForm = ({ onSubmit, isLoading }: DNSRecordFormProps) => {
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
