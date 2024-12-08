import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { z } from "node_modules/zod/lib";
import { redirect } from "next/navigation";

export async function handleLogout() {
  "use server";
  cookies().delete("admin_auth");
  cookies().delete("admin_auth_time");
  redirect("/");
}

// Check if authenticated
export async function checkAuth() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("admin_auth");

  if (!authCookie?.value || authCookie.value !== "true") {
    return false;
  }

  const cookieAge = cookieStore.get("admin_auth_time")?.value;
  if (!cookieAge || Date.now() - parseInt(cookieAge) > 3600000) {
    // 1 hour
    return false;
  }

  return true;
}

export const passwordSchema = z.object({
  password: z.string().min(1),
});

export type Session = {
  user: {
    id: string;
    email?: string;
    role?: string;
  };
};

export async function auth(): Promise<Session | null> {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
