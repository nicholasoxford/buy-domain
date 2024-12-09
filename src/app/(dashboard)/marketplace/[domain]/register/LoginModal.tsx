"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleAuth, signInWithGoogle } from "@/app/(main)/login/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
}

export function LoginModal({ isOpen, onClose, redirectTo }: LoginModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [state, formAction] = useFormState(handleAuth, {
    error: null,
    success: false,
  });

  const handleGoogleSignIn = async () => {
    const url = await signInWithGoogle(redirectTo);
    if (url) {
      router.push(url);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-300"
        >
          ✕
        </button>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              {mode === "login" ? "Log in" : "Sign up"}
            </h2>
            <p className="text-slate-400">
              {mode === "login"
                ? "Log in to continue with your domain registration"
                : "Create an account to register your domain"}
            </p>
          </div>

          <form action={handleGoogleSignIn}>
            <Button
              type="submit"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="mode" value={mode} />
            <input type="hidden" name="redirect" value={redirectTo} />

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <Input
                type="email"
                name="email"
                required
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Password</label>
              <Input
                type="password"
                name="password"
                required
                className="bg-slate-800/50 border-slate-700 text-slate-300"
              />
            </div>

            {state.error && (
              <p className="text-red-400 text-sm">{state.error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white"
            >
              {mode === "login" ? "Log in" : "Sign up"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
