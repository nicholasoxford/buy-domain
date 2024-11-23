"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { login, signup, type AuthState } from "./actions";
import { useState } from "react";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Loading..." : children}
    </button>
  );
}

const initialState: AuthState = {
  error: null,
  success: false,
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, formAction] = useFormState(
    isLogin ? login : signup,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create new account"}
          </h2>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          {state?.error && (
            <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
              {state.error}
            </div>
          )}

          {!isLogin && state?.success && (
            <div className="p-3 text-sm text-green-500 bg-green-100 rounded">
              Verification email sent! Please check your inbox.
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <SubmitButton>
              {isLogin ? "Sign in" : "Create account"}
            </SubmitButton>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
