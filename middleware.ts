/**
 * Route middleware — protects /admin; redirects unauthenticated users to login.
 */

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/lib/logger";
import { ROLES } from "@/types/auth";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token?.role !== ROLES.ADMIN) {
      logger.debug("Middleware", "Blocked admin route — redirecting to login", {
        path: request.nextUrl.pathname,
      });

      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    logger.error("Middleware", "Middleware failed", {
      path: request.nextUrl.pathname,
      message: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
