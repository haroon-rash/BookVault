/**
 * NextAuth configuration — credentials provider against Admin table.
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { logger } from "@/lib/logger";
import { loginSchema } from "@/lib/validations/auth.schema";
import { ROLES, type Role } from "@/types/auth";

if (!process.env.NEXTAUTH_SECRET) {
  logger.warn("Auth", "NEXTAUTH_SECRET is not set — sessions will not work");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      /** Validates input, checks Admin in DB, compares bcrypt hash */
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            logger.debug("Auth", "Login validation failed", {
              code: "VALIDATION_ERROR",
              fields: parsed.error.issues.map((i) => i.path.join(".")),
            });
            return null;
          }

          const { username, password } = parsed.data;

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            logger.debug("Auth", "Login failed — user not found", { username });
            return null;
          }

          const isValid = await comparePassword(password, admin.password);
          if (!isValid) {
            logger.debug("Auth", "Login failed — wrong password", { username });
            return null;
          }

          logger.info("Auth", "Admin logged in", { username });
          return {
            id: admin.id,
            name: admin.username,
            role: ROLES.ADMIN,
          };
        } catch (error) {
          logger.error("Auth", "authorize error", {
            message: error instanceof Error ? error.message : "unknown",
          });
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    /** Attach admin role to JWT on sign-in */
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    /** Expose role and id on client session */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};
