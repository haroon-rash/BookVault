/**
 * NextAuth API route — handles /api/auth/* (login, session, logout).
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
