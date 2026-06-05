"use client";

/**
 * NextAuth SessionProvider scoped to admin routes only.
 * Used by: app/admin/layout.tsx
 */

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function AdminSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
