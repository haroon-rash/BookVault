/**
 * Singleton Prisma client — reused in dev to avoid too many DB connections.
 */

import { PrismaClient } from "@prisma/client";
import { logger } from "@/lib/logger";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (!process.env.DATABASE_URL) {
  logger.warn("Prisma", "DATABASE_URL is not set — database calls will fail");
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  logger.debug("Prisma", "Reusing singleton client in development");
}
