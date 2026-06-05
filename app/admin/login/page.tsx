/**
 * Admin login page — credentials form with callback redirect.
 * Route: /admin/login
 */

import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
