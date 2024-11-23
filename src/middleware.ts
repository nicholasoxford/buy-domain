import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only enforce auth for admin/dashboard routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    return await updateSession(request);
  }

  // Allow public access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match admin and dashboard routes
    "/admin/:path*",
    "/dashboard/:path*",

    // Exclude static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
