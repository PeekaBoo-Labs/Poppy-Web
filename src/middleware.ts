import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.tokenBucket(5, "120 s", 40)
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/:path*",
};

export default async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";

  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ", request.url));
}
