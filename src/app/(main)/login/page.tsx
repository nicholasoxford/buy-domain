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
import GoogleSignInButton from "./GoogleSignInButton";

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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton />

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
