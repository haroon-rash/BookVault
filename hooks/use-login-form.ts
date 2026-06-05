"use client";

/**
 * Hook for admin login — state, Zod validation, and NextAuth sign-in.
 * Used by: components/auth/login-form.tsx
 */

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSafeCallbackUrl } from "@/lib/auth/callback-url";
import { loginSchema, mapZodErrors, type LoginInput } from "@/lib/validations";
import type { FieldErrors } from "@/types/book";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const [form, setForm] = useState<LoginInput>({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const validation = loginSchema.safeParse(form);
    if (!validation.success) {
      setFieldErrors(mapZodErrors(validation.error));
      setError("Please fix the highlighted fields.");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      username: validation.data.username,
      password: validation.data.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return { form, fieldErrors, loading, error, handleChange, handleSubmit };
}
