/**
 * NextAuth type augmentation — adds id and role to Session, User, and JWT.
 */

import type { Role } from "./auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      role?: Role;
    };
  }

  interface User {
    id: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
