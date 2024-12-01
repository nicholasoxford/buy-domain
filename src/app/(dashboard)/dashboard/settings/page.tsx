"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Database } from "@/lib/supabase/database.types";

type NotificationFrequency =
  Database["public"]["Enums"]["notification_frequency"];

const NOTIFICATION_OPTIONS = [
  { value: "never", label: "Never" },
  { value: "on_demand", label: "On Demand" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const;

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    notificationEmail: "",
    notificationFrequencies: ["on_demand"] as NotificationFrequency[],
    notificationThreshold: 0,

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

  const [isCancelling, setIsCancelling] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadSettings();
    loadSubscriptionStatus();
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
        "notification_email, notification_frequencies, notification_threshold"
      )
      .eq("id", user.id)
      .single();

    if (profile) {
      setSettings((currentSettings) => ({
        ...currentSettings,
        notificationEmail: profile.notification_email || "",
        notificationFrequencies: profile.notification_frequencies || [
          "on_demand",
        ],
        notificationThreshold: profile.notification_threshold || 0,
      }));
    }
  }

  async function loadSubscriptionStatus() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Get profile and purchase info
    const [profileResult, purchaseResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("subscription_status, subscription_tier")
        .eq("id", user.id)
        .single(),
      supabase
        .from("purchases")
        .select("expiration_date")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .single(),
    ]);

    if (profileResult.data) {
      setIsSubscribed(
        profileResult.data.subscription_status === "active" ||
          profileResult.data.subscription_status === "pending_cancellation"
      );
      setSubscriptionTier(profileResult.data.subscription_tier);
    }

    if (purchaseResult.data) {
      setSubscriptionEndDate(purchaseResult.data.expiration_date);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
        notification_frequencies: settings.notificationFrequencies,
        notification_threshold: settings.notificationThreshold,
      })
      .eq("id", user.id);

    setIsSaving(false);
    if (error) {
      setMessage({ type: "error", text: "Failed to save settings" });
    } else {
      setMessage({ type: "success", text: "Settings saved successfully" });
    }
  };

  const toggleFrequency = (frequency: NotificationFrequency) => {
    setSettings((prev) => {
      const frequencies = prev.notificationFrequencies || [];
      const newFrequencies = frequencies.includes(frequency)
        ? frequencies.filter((f) => f !== frequency)
        : [...frequencies, frequency];
      return {
        ...prev,
        notificationFrequencies: newFrequencies,
      };
    });
  };

  async function handleCancelSubscription() {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period."
      )
    ) {
      return;
    }

    setIsCancelling(true);
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to cancel subscription");
      }

      setIsSubscribed(false);
      setSubscriptionTier(null);
      setMessage({
        type: "success",
        text: "Your subscription has been cancelled and will end at the end of the current billing period",
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to cancel subscription",
      });
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Subscription Management Section */}
      {isSubscribed && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Subscription Management
          </h2>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  Current Plan: {subscriptionTier?.charAt(0).toUpperCase()}
                  {subscriptionTier?.slice(1)}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {subscriptionEndDate
                    ? `Your subscription will end on ${formatDate(subscriptionEndDate)}. You'll continue to have access to all features until then.`
                    : `You are currently subscribed to our ${subscriptionTier} plan`}
                </p>
              </div>
              {!subscriptionEndDate && (
                <button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Subscription"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Notification Settings
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notification Email
              </label>
              <input
                type="email"
                value={settings.notificationEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationEmail: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your notification email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notification Frequency
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {NOTIFICATION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      toggleFrequency(option.value as NotificationFrequency)
                    }
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      settings.notificationFrequencies?.includes(
                        option.value as NotificationFrequency
                      )
                        ? "bg-purple-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notification Threshold (USD)
              </label>
              <input
                type="number"
                value={settings.notificationThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Minimum offer amount for notifications"
                min="0"
                step="100"
              />
              <p className="text-xs text-slate-400 mt-1">
                You will only be notified of offers above this amount
              </p>
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
