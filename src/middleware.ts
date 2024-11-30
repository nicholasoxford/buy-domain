import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/middleware";
import { Ratelimit } from "@upstash/ratelimit";

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://united-chow-30282.upstash.io",
  token: "AXZKAAIjcDEyYzc2NzY0Mzg1Yzg0ZDQxYWZkYjdlN2RmNTk3OWYxZnAxMA",
}); // Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

// Security headers to be added to all responses
const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export async function middleware(request: NextRequest) {
  // Skip rate limiting for static files
  if (!request.nextUrl.pathname.match(/(api|auth)/)) {
    const response = await updateSession(request);
    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // // Rate limiting for API routes
  // const ip = request.ip ?? "127.0.0.1";
  // const { success, pending, limit, reset, remaining } = await ratelimit.limit(
  //   `ratelimit_${ip}`
  // );

  // if (!success) {
  //   return new NextResponse("Too Many Requests", {
  //     status: 429,
  //     headers: {
  //       "Retry-After": reset.toString(),
  //       ...securityHeaders,
  //     },
  //   });
  // }

  const response = await updateSession(request);

  // Add rate limit headers
  // response.headers.set("X-RateLimit-Limit", limit.toString());
  // response.headers.set("X-RateLimit-Remaining", remaining.toString());
  // response.headers.set("X-RateLimit-Reset", reset.toString());

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    // Exclude static files and images
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
