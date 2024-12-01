"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import {
  handleAuth,
  login,
  signInWithGoogle,
  signup,
  type AuthState,
} from "./actions";
import { useState, useEffect } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { testimonials } from "@/components/testimonials";
import Image from "next/image";
import { useUser } from "@/lib/hooks/useUser";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] text-lg"
    >
      <span className="flex items-center justify-center">
        {pending ? (
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {children}
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </span>
    </button>
  );
}

const initialState: AuthState = {
  error: null,
  success: false,
};

export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const showSignup = searchParams.get("signup") === "true";
  const [state, formAction] = useFormState(handleAuth, initialState);

  const isLogin = !showSignup;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const toggleMode = () => {
    const params = new URLSearchParams(searchParams);
    if (showSignup) {
      params.delete("signup");
    } else {
      params.set("signup", "true");
    }
    if (redirectTo) {
      params.set("redirect", redirectTo);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-16 sm:pt-24 p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-slate-900/0 to-slate-900/0" />
      </div>

      <div className="fixed top-8 left-8">
        <div className="flex items-center gap-2 text-xl font-semibold text-white">
          <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            DB
          </div>
          Domain Dash
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            {!isLogin && (
              <div className="flex -space-x-2 mr-2">
                {testimonials.map((person) => (
                  <div
                    key={person.name}
                    className="relative w-6 h-6 rounded-full shadow-sm"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="24px"
                    />
                  </div>
                ))}
              </div>
            )}
            <span className="text-sm font-medium text-purple-200">
              {isLogin ? "Welcome back!" : "Join 500+ Domain Investors"}
            </span>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white mb-3">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h1>
          <p className="text-slate-400">
            {isLogin
              ? "Manage your domains and track offers"
              : "Start managing your domain portfolio"}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-xl">
          <form
            action={async () => {
              const url = await signInWithGoogle(redirectTo || "");
              if (url) window.location.href = url;
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-colors text-lg"
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
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="redirect" value={redirectTo || ""} />
            <input
              type="hidden"
              name="mode"
              value={showSignup ? "signup" : "login"}
            />

            {state?.error && (
              <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                {state.error}
              </div>
            )}

            {!isLogin && state?.success && (
              <div className="p-4 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg">
                Verification email sent! Please check your inbox.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <SubmitButton>
              {isLogin ? "Sign in to dashboard" : "Create account"}
            </SubmitButton>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
            >
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span className="font-medium text-purple-400">
                    Create one
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="font-medium text-purple-400">Sign in</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-400">
          By continuing, you agree to our{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
