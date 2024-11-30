"use client";

import * as React from "react";
import { Bell, Info, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type NotificationFrequency =
  Database["public"]["Enums"]["notification_frequency"];

const frequencies: {
  value: NotificationFrequency;
  label: string;
  description: string;
}[] = [
  {
    value: "daily",
    label: "Daily Updates",
    description: "Get a summary of all offers at the end of each day",
  },
  {
    value: "weekly",
    label: "Weekly Digest",
    description: "Receive a weekly summary of all activity",
  },
  {
    value: "on_demand",
    label: "On Demand",
    description: "Only get notified when specific conditions are met",
  },
  {
    value: "never",
    label: "Never",
    description: "Don't receive any email notifications",
  },
];

interface NotificationSettingsProps {
  domain: string;
  initialFrequencies: NotificationFrequency[] | null;
  initialThreshold?: number | null;
}

export function NotificationSettings({
  domain,
  initialFrequencies,
  initialThreshold = null,
}: NotificationSettingsProps) {
  const [selectedFrequencies, setSelectedFrequencies] = React.useState<
    NotificationFrequency[]
  >(initialFrequencies || []);
  const [threshold, setThreshold] = React.useState<number | null>(
    initialThreshold
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [isTestingSend, setIsTestingSend] = React.useState(false);
  const supabase = createClient();

  const hasUnsavedChanges = React.useMemo(() => {
    const hasThresholdChanged = threshold !== initialThreshold;
    const hasFrequenciesChanged =
      JSON.stringify(selectedFrequencies) !==
      JSON.stringify(initialFrequencies);
    return hasThresholdChanged || hasFrequenciesChanged;
  }, [threshold, selectedFrequencies, initialThreshold, initialFrequencies]);

  const toggleFrequency = (frequency: NotificationFrequency) => {
    setSelectedFrequencies((current) => {
      if (current.includes(frequency)) {
        // Don't allow removing the last frequency
        if (current.length === 1) return current;
        return current.filter((f) => f !== frequency);
      }
      return [...current, frequency];
    });
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("domains")
        .update({
          notification_frequencies: selectedFrequencies,
          notification_threshold: threshold,
        })
        .eq("domain", domain);

      if (error) throw error;
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const sendTestNotification = async () => {
    setIsTestingSend(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsTestingSend(false);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Bell className="h-5 w-5 text-blue-400" />
          </div>
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-b border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Webhooks</span>
              <Badge variant="secondary" className="bg-slate-800">
                Soon
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {frequencies.map(({ value, label, description }) => {
              const isSelected = selectedFrequencies.includes(value);
              const isDisabled = selectedFrequencies.length === 1 && isSelected;

              return (
                <button
                  key={value}
                  onClick={() => toggleFrequency(value)}
                  disabled={isDisabled}
                  className={`
                    w-full px-4 py-3 rounded-lg flex items-center justify-between
                    transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-blue-950 text-blue-100"
                        : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"
                    }
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-medium">{label}</span>
                    <span className="text-sm text-slate-400">
                      {description}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-blue-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Notification Threshold</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <Input
                  type="number"
                  value={threshold || ""}
                  onChange={(e) =>
                    setThreshold(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-24 bg-slate-800 border-slate-700"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Get notified immediately when an offer exceeds this amount
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Extra Verification</span>
              <Badge variant="secondary" className="bg-slate-800">
                Coming Soon
              </Badge>
            </div>
            <p className="text-sm text-slate-500">
              Require additional verification steps before accepting offers
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={sendTestNotification}
            disabled={isTestingSend}
            className="bg-transparent"
          >
            {isTestingSend ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Send Test Notification
          </Button>

          <Button
            size="sm"
            onClick={saveChanges}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
