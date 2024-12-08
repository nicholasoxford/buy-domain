import { createClient } from "@/lib/supabase/server";

export async function getNameAPIHeaders() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // You should store these securely in environment variables
  const username = process.env.NAMECOM_USERNAME;
  const token = process.env.NAMECOM_TOKEN;

  if (!username || !token) {
    throw new Error("Missing Name.com API credentials");
  }

  const auth = Buffer.from(`${username}:${token}`).toString("base64");
  return {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
}
