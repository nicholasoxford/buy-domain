import { cookies } from "next/headers";
import { z } from "node_modules/zod/lib";
import { redirect } from "next/navigation";
import { getEnvVariables } from "@/utils/env";

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
