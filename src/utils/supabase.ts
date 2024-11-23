import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export const supabaseServer = (
  cookieStore: ReadonlyRequestCookies,
  env: CloudflareEnv
) => {
  let supabaseResponse = NextResponse.next({});
  const cookies = cookieStore.getAll();

  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookies;
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error("Supabase error:", error);
  throw new Error(error.message || "An error occurred with the database");
};

export const isAuthenticated = async (env: CloudflareEnv, pathname: string) => {
  const cookieStore = await cookies();
  const supabase = supabaseServer(cookieStore, env);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user", user);
  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/auth")
  ) {
    console.log("redirecting to login");
    // no user, potentially respond by redirecting the user to the login page

    return false;
  }

  return user !== null;
};
