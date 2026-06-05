/**
 * Server-side session helpers — read session, guard admin pages and actions.
 */

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/config";
import { ForbiddenError, UnauthorizedError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { ROLES, type Role } from "@/types/auth";

/** Reads the current NextAuth session from the server */
export async function getSession() {
  return getServerSession(authOptions);
}

/** Returns logged-in user info, or null if not authenticated */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user) return null;

  return {
    id: session.user.id,
    name: session.user.name,
    role: session.user.role as Role | undefined,
  };
}

/** Checks if role string is admin */
export function isAdminRole(role?: string): role is Role {
  return role === ROLES.ADMIN;
}

/** Page guard — redirects to login if user is not admin */
export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || !isAdminRole(user.role)) {
    logger.debug("Auth", "requireAdmin failed — redirecting", {
      userId: user?.id,
    });
    redirect("/admin/login");
  }

  return user;
}

/** Action guard — throws if user is not admin (used before mutations) */
export async function assertAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    logger.warn("Auth", "assertAdmin failed — not signed in");
    throw new UnauthorizedError();
  }

  if (!isAdminRole(user.role)) {
    logger.warn("Auth", "assertAdmin failed — not admin", { userId: user.id });
    throw new ForbiddenError();
  }

  return user;
}

/** Returns true if current session belongs to an admin */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return Boolean(user && isAdminRole(user.role));
}
