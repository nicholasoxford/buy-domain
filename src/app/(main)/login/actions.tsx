"use server";

import { supabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthState = {
  error: string | null;
  success: boolean;
};

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required", success: false };
  }

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log({ data });
  if (error) {
    return { error: error.message, success: false };
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required", success: false };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters", success: false };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message, success: false };
  }

  return { error: null, success: true };
}
