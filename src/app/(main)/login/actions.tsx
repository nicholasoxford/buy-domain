"use server";

import { createClient } from "@/lib/supabase/server";
import {
  BUY_TEMPLATE_STRIPE_LINK,
  BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK,
} from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthState = {
  error: string | null;
  success: boolean;
};

export const handleAuth = async (prevState: AuthState, formData: FormData) => {
  const isSignup = formData.get("mode") === "signup";
  return isSignup ? signup(prevState, formData) : login(prevState, formData);
};

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string;

  if (!email || !password) {
    return { error: "Email and password are required", success: false };
  }
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return { error: error.message, success: false };
  }

  let redirectUrl = redirectTo;

  if (redirectTo === "/buy-template") {
    redirectUrl = BUY_TEMPLATE_STRIPE_LINK;
  }
  if (redirectTo === "/buy-basic-subscription") {
    redirectUrl = BUY_BASIC_DOMAIN_BRIDGE_SUBSCRIPTION_LINK;
  }

  revalidatePath("/", "layout");
  redirect(redirectUrl || "/dashboard");
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

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log({ error });
    return { error: error.message, success: false };
  }
  revalidatePath("/", "layout");
  redirect("/check-email");
  return { error: null, success: true };
}
