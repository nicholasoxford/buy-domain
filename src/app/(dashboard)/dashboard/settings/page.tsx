"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notificationEmail: "",
    minimumOfferAmount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the settings
    console.log("Saving settings:", settings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="notificationEmail"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Notification Email
          </label>
          <input
            type="email"
            id="notificationEmail"
            value={settings.notificationEmail}
            onChange={(e) =>
              setSettings({ ...settings, notificationEmail: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="admin@example.com"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minimumOfferAmount"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Minimum Offer Amount ($)
          </label>
          <input
            type="number"
            id="minimumOfferAmount"
            value={settings.minimumOfferAmount}
            onChange={(e) =>
              setSettings({
                ...settings,
                minimumOfferAmount: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
