"use client";

import { Github, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

function LoadingButton() {
  return (
    <button
      disabled
      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 text-white rounded-xl font-medium"
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      Sending Invitation...
    </button>
  );
}

interface StatusMessage {
  type: "success" | "error" | "info";
  text: string;
}

export function GithubForm({ sessionId }: { sessionId: string }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/add-collaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sessionId }),
      });

      const data = (await response.json()) as {
        error: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Failed to add collaborator");
      }

      // Handle different success scenarios
      if (response.status === 201) {
        setStatus({
          type: "success",
          text: "Invitation sent! Check your GitHub email to accept.",
        });
      } else if (response.status === 204) {
        setStatus({
          type: "info",
          text: "You already have access to the repository.",
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setStatus({
        type: "error",
        text: err.message || "Failed to connect GitHub account",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-400">GitHub Connected!</h4>
              <p className="text-sm text-green-400/80 mt-1">
                {status?.text ||
                  "You'll receive access to the repository shortly."}
              </p>
            </div>
          </div>
        </div>
        <a
          href="https://github.com/notifications"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
        >
          <Github className="h-5 w-5" />
          Check GitHub Notifications
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="github"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          GitHub Username
        </label>
        <div className="relative">
          <input
            type="text"
            id="github"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            className="block w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your-username"
            disabled={loading}
            required
            pattern="^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$"
            title="Please enter a valid GitHub username"
          />
          <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        </div>
      </div>

      {status?.type === "error" && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {status.text}
          </div>
        </div>
      )}

      {loading ? (
        <LoadingButton />
      ) : (
        <button
          type="submit"
          disabled={!username || loading}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Github className="h-5 w-5" />
          Connect GitHub Account
        </button>
      )}

      <p className="text-xs text-slate-400 text-center">
        You&apos;ll receive an invitation to access the private repository
      </p>
    </form>
  );
}
