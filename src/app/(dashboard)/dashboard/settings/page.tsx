"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Database } from "@/lib/supabase/database.types";

type NotificationFrequency =
  Database["public"]["Enums"]["notification_frequency"];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    notificationEmail: "",
    notificationFrequency: "on_demand" as NotificationFrequency,
    minimumOfferAmount: 0,

    // New Settings
    enableHighValueAlerts: true,
    highValueThreshold: 5000,
    enableBulkOfferAlerts: false,
    enableDomainExpiryAlerts: true,
    expiryAlertDays: 30,
    defaultCurrency: "USD",
    defaultReplyTemplate: "",
    autoRejectBelowAmount: 0,
    enableWeeklyReports: true,
    enableComparisonData: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select(
        "notification_email, notification_frequency, notification_minimum_amount"
      )
      .eq("id", user.id)
      .single();

    if (profile) {
      setSettings((currentSettings) => ({
        ...currentSettings,
        notificationEmail: profile.notification_email || "",
        notificationFrequency: profile.notification_frequency || "on_demand",
        minimumOfferAmount: profile.notification_minimum_amount || 0,
      }));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        notification_email: settings.notificationEmail,
        notification_frequency: settings.notificationFrequency,
        notification_minimum_amount: settings.minimumOfferAmount,
      })
      .eq("id", user.id);

    setIsSaving(false);
    if (error) {
      setMessage({ type: "error", text: "Failed to save settings" });
    } else {
      setMessage({ type: "success", text: "Settings saved successfully" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Notification Settings Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Notification Settings
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              High Value Offer Alerts
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableHighValueAlerts"
                  checked={settings.enableHighValueAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableHighValueAlerts: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="enableHighValueAlerts"
                  className="text-sm text-slate-300"
                >
                  Enable instant notifications for high-value offers
                </label>
              </div>
              <input
                type="number"
                value={settings.highValueThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    highValueThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="High value threshold amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Domain Expiry Alerts
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableDomainExpiryAlerts"
                  checked={settings.enableDomainExpiryAlerts}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      enableDomainExpiryAlerts: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="enableDomainExpiryAlerts"
                  className="text-sm text-slate-300"
                >
                  Notify me before domains expire
                </label>
              </div>
              <input
                type="number"
                value={settings.expiryAlertDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    expiryAlertDays: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Days before expiry"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Auto-Response Template
            </label>
            <textarea
              value={settings.defaultReplyTemplate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  defaultReplyTemplate: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
              placeholder="Thank you for your interest in {domain}. Your offer of ${amount} has been received..."
            />
            <p className="text-xs text-slate-400 mt-1">
              Use &quot;{`{domain}`}&quot;, &quot;{`{amount}`}&quot;, and &quot;
              {`{email}`}&quot; as placeholders
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Auto-Reject Threshold
            </label>
            <input
              type="number"
              value={settings.autoRejectBelowAmount}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  autoRejectBelowAmount: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Automatically reject offers below this amount"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableWeeklyReports"
                checked={settings.enableWeeklyReports}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableWeeklyReports: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <label
                htmlFor="enableWeeklyReports"
                className="text-sm text-slate-300"
              >
                Send weekly portfolio performance reports
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableComparisonData"
                checked={settings.enableComparisonData}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enableComparisonData: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <label
                htmlFor="enableComparisonData"
                className="text-sm text-slate-300"
              >
                Include market comparison data in reports
              </label>
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all duration-150 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
