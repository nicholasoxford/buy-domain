export interface EnvVariables {
  STRIPE_SECRET_KEY: string;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  VERCEL_PROJECT_ID: string;
  VERCEL_ACCESS_TOKEN: string;
}

export function getEnvVariables(): EnvVariables {
  const env = process.env;

  return {
    STRIPE_SECRET_KEY: parseEnvVariableOrThrow(
      env.STRIPE_SECRET_KEY,
      "STRIPE_SECRET_KEY"
    ),
    GITHUB_TOKEN: parseEnvVariableOrThrow(env.GITHUB_TOKEN, "GITHUB_TOKEN"),
    GITHUB_OWNER: parseEnvVariableOrThrow(env.GITHUB_OWNER, "GITHUB_OWNER"),
    GITHUB_REPO: parseEnvVariableOrThrow(env.GITHUB_REPO, "GITHUB_REPO"),
    SUPABASE_URL: parseEnvVariableOrThrow(env.SUPABASE_URL, "SUPABASE_URL"),
    SUPABASE_ANON_KEY: parseEnvVariableOrThrow(
      env.SUPABASE_ANON_KEY,
      "SUPABASE_ANON_KEY"
    ),
    SUPABASE_SERVICE_ROLE_KEY: parseEnvVariableOrThrow(
      env.SUPABASE_SERVICE_ROLE_KEY,
      "SUPABASE_SERVICE_ROLE_KEY"
    ),
    NEXT_PUBLIC_SUPABASE_URL: parseEnvVariableOrThrow(
      env.NEXT_PUBLIC_SUPABASE_URL,
      "NEXT_PUBLIC_SUPABASE_URL"
    ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: parseEnvVariableOrThrow(
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    ),
    VERCEL_PROJECT_ID: parseEnvVariableOrThrow(
      env.VERCEL_PROJECT_ID,
      "VERCEL_PROJECT_ID"
    ),
    VERCEL_ACCESS_TOKEN: parseEnvVariableOrThrow(
      env.VERCEL_ACCESS_TOKEN,
      "VERCEL_ACCESS_TOKEN"
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

class MissingEnvironmentVariableError extends Error {
  constructor(variableName: string) {
    super(`Missing required environment variable: ${variableName}
    
Please make sure to:
1. Create or update your .env.local file
2. Add the following variable: ${variableName}
3. Restart your development server

If you're deploying to production, add this variable to your environment configuration.`);
    this.name = "MissingEnvironmentVariableError";
  }
}

export function parseEnvVariableOrThrow<T>(
  variable: string | undefined,
  variableName: string
): T {
  if (!variable) {
    throw new MissingEnvironmentVariableError(variableName);
  }
  return variable as T;
}
