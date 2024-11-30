import { createClient } from "@/lib/supabase/server";
import { sendPeriodicReport } from "@/lib/reports";
import { NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

type UserBasic = {
  id: string;
  email: string | null;
};

// Vercel cron job handler
export async function GET(request: Request) {
  // Verify cron secret to ensure request is from Vercel
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const supabase = await createClient();

    // Get all users with domains
    const { data: users, error } = await supabase
      .from("profiles")
      .select("id, email");

    if (error) {
      throw error;
    }

    if (!users?.length) {
      return NextResponse.json({ message: "No users found" });
    }

    // Get current hour to determine which reports to send
    const currentHour = new Date().getUTCHours();

    // Daily reports at 00:00 UTC
    if (currentHour === 0) {
      await Promise.all(
        users.map((user: UserBasic) => sendPeriodicReport(user.id, "daily"))
      );
    }

    // Weekly reports on Monday at 00:00 UTC
    if (currentHour === 0 && new Date().getUTCDay() === 1) {
      await Promise.all(
        users.map((user: UserBasic) => sendPeriodicReport(user.id, "weekly"))
      );
    }

    // Monthly reports on 1st of month at 00:00 UTC
    if (currentHour === 0 && new Date().getUTCDate() === 1) {
      await Promise.all(
        users.map((user: UserBasic) => sendPeriodicReport(user.id, "monthly"))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending periodic reports:", error);
    return NextResponse.json(
      { error: "Failed to send periodic reports" },
      { status: 500 }
    );
  }
}
