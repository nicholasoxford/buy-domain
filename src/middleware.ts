import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Exclude static files, images, and public routes
    "/((?!_next/static|_next/image|favicon.ico|docs|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Exclude home page
    "/((?!^$).*)",
  ],
};
