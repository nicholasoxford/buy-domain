"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg 
        hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 
        transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          Verifying...
        </>
      ) : (
        "Verify"
      )}
    </button>
  );
}

export default function LoginForm({
  verifyPassword,
}: {
  verifyPassword: (formData: FormData) => Promise<{ error?: string }>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      const result = await verifyPassword(formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-200"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-200 
              focus:ring-2 focus:ring-purple-400 focus:border-purple-400 pr-10 transition-all"
            autoFocus
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <SubmitButton />

      <div className="text-center text-sm text-slate-400">
        <p>
          Need help?{" "}
          <a
            href="mailto:support@domaindash.dev"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </form>
  );
}
