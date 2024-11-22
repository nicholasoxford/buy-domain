"use client";

import { Github } from "lucide-react";
import { useState } from "react";

function LoadingButton() {
  return (
    <button
      disabled
      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 text-white rounded-xl font-medium"
    >
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      Connecting...
    </button>
  );
}

export function GithubForm({ sessionId }: { sessionId: string }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/connect-github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect GitHub account");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
        <p className="text-green-400">GitHub account connected successfully!</p>
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
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your-username"
          />
          <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <LoadingButton />
      ) : (
        <button
          type="submit"
          disabled={!username}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Connect GitHub Account
        </button>
      )}
    </form>
  );
}
