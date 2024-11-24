"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DangerZone({ domain }: { domain: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this domain? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/domains/${domain}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete domain");
      }

      router.push("/dashboard/domains");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete domain");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-red-900/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Danger Zone</h2>
      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDeleting ? "Deleting..." : "Delete Domain"}
      </button>
    </div>
  );
}
