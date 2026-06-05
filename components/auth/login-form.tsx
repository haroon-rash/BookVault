"use client";

/**
 * Admin login form UI — username/password fields (logic in use-login-form hook).
 * Used on: /admin/login
 */

import { getFieldError } from "@/lib/validations";
import { useLoginForm } from "@/hooks/use-login-form";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Alert from "@/components/ui/alert";
import FormField from "@/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const { form, fieldErrors, loading, error, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <Card className="w-full max-w-md border-slate-200/80 bg-white/95 shadow-xl backdrop-blur">
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
          B
        </div>
        <CardTitle>Admin Sign In</CardTitle>
        <CardDescription>
          Manage your bookstore inventory and catalog
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormField
            label="Username"
            htmlFor="username"
            error={getFieldError(fieldErrors, "username")}
          >
            <Input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              error={Boolean(getFieldError(fieldErrors, "username"))}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            error={getFieldError(fieldErrors, "password")}
          >
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={Boolean(getFieldError(fieldErrors, "password"))}
            />
          </FormField>

          {error && <Alert variant="error">{error}</Alert>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
