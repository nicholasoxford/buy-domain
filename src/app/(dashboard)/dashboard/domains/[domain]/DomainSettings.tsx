"use client";

import { useState, useEffect } from "react";
import { Bell, Loader2, Save } from "lucide-react";
import type { Database, Tables } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/client";

type NotificationFrequency =
  Database["public"]["Enums"]["notification_frequency"];

interface DomainSettingsProps {
  domain: string;
  initialFrequencies: NotificationFrequency[] | null;
  initialThreshold?: number | null;
}

export function DomainSettings({
  domain,
  initialFrequencies,
  initialThreshold = null,
}: DomainSettingsProps) {
  const [frequencies, setFrequencies] = useState<NotificationFrequency[]>(
    initialFrequencies || []
  );
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [threshold, setThreshold] = useState<number | null>(initialThreshold);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const hasThresholdChanged = threshold !== initialThreshold;
    const hasFrequenciesChanged =
      JSON.stringify(frequencies) !== JSON.stringify(initialFrequencies);
    setHasUnsavedChanges(hasThresholdChanged || hasFrequenciesChanged);
  }, [threshold, frequencies, initialThreshold, initialFrequencies]);

  const toggleFrequency = (frequency: NotificationFrequency) => {
    let newFrequencies: NotificationFrequency[];

    if (frequencies.includes(frequency)) {
      // Don't allow removing the last frequency
      if (frequencies.length === 1) {
        return;
      }
      newFrequencies = frequencies.filter((f) => f !== frequency);
    } else {
      newFrequencies = [...frequencies, frequency];
    }

    setFrequencies(newFrequencies);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("domains")
        .update({
          notification_frequencies: frequencies,
          notification_threshold: threshold,
        })
        .eq("domain", domain);

      if (error) throw error;
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Bell className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-white">
          Notification Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(["daily", "weekly", "on_demand", "never"] as const).map(
            (option) => (
              <button
                key={option}
                onClick={() => toggleFrequency(option)}
                disabled={
                  frequencies.length === 1 && frequencies.includes(option)
                }
                className={`
                relative px-4 py-3 rounded-lg border transition-all duration-200
                ${
                  frequencies.includes(option)
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                    : "bg-slate-900/50 border-slate-700/50 text-slate-300 hover:border-slate-600"
                }
                ${
                  frequencies.length === 1 && frequencies.includes(option)
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              `}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium capitalize">
                    {option}
                  </span>
                  {frequencies.includes(option) && (
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  )}
                </div>
              </button>
            )
          )}
        </div>

        <div className="text-sm space-y-2">
          <p className="text-slate-400">
            Choose when you want to receive email notifications about new offers
            for {domain}.
          </p>
          <p className="text-slate-500">
            Current notifications:{" "}
            {frequencies
              .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
              .join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2 text-slate-300 hover:text-slate-200 w-full p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          <span className="text-sm font-medium">Advanced Settings</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isAdvancedOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isAdvancedOpen && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Immediate notification threshold
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <input
                  type="number"
                  value={threshold || ""}
                  onChange={(e) =>
                    setThreshold(e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder="Enter amount"
                  className="bg-slate-900/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 w-32"
                />
              </div>
              <p className="text-sm text-slate-500">
                Get notified immediately when an offer exceeds this amount
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-300">
                  Extra Verification for Offers
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-400">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Require additional verification steps before accepting offers
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          {hasUnsavedChanges && (
            <span className="text-sm text-slate-400">
              You have unsaved changes
            </span>
          )}
          <button
            onClick={saveChanges}
            disabled={!hasUnsavedChanges || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ml-auto ${
              !hasUnsavedChanges
                ? "bg-slate-800/50 text-slate-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
