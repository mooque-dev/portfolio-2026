import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Only intercept the root path
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  // If they've already been through the gateway, let them in
  const hasVisited = request.cookies.get("gateway-visited");
  if (hasVisited) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/gateway", request.url));
}

export const config = {
  // Only run on the root path (not assets, api, etc.)
  matcher: ["/"],
};
