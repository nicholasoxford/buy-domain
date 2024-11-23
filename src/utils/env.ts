import { headers } from "next/headers";

export interface EnvVariables {
  ADMIN_PASSWORD: string;
  STRIPE_SECRET_KEY: string;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export function getEnvVariables(): EnvVariables {
  const env = process.env;

  return {
    ADMIN_PASSWORD: parseEnvVariableOrThrow(env.ADMIN_PASSWORD),
    STRIPE_SECRET_KEY: parseEnvVariableOrThrow(env.STRIPE_SECRET_KEY),
    GITHUB_TOKEN: parseEnvVariableOrThrow(env.GITHUB_TOKEN),
    GITHUB_OWNER: parseEnvVariableOrThrow(env.GITHUB_OWNER),
    GITHUB_REPO: parseEnvVariableOrThrow(env.GITHUB_REPO),
    SUPABASE_URL: parseEnvVariableOrThrow(env.SUPABASE_URL),
    SUPABASE_ANON_KEY: parseEnvVariableOrThrow(env.SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: parseEnvVariableOrThrow(
      env.SUPABASE_SERVICE_ROLE_KEY
    ),
  };
}

// Optional: Add a helper to get specific env variables safely
export function getEnvVariable<K extends keyof EnvVariables>(
  key: K
): EnvVariables[K] {
  const env = getEnvVariables();
  return env[key];
}

export function parseEnvVariableOrThrow<T>(variable: string | undefined): T {
  if (!variable) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
  return variable as T;
}

export async function getBaseUrlServerSide() {
  "use server";
  const headerInfo = headers();
  const host = headerInfo.get("host");

  return `${host}`;
}
