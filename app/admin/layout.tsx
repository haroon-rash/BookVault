/**
 * Admin layout — session provider and background for all /admin routes.
 */

import AdminBackground from "@/components/layout/admin-background";
import AdminSessionProvider from "@/components/admin/session-provider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <AdminBackground>{children}</AdminBackground>
    </AdminSessionProvider>
  );
}
