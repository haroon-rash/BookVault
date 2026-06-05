"use client";

/**
 * Admin dashboard header — logo, store link, and sign-out button.
 * Used on: /admin
 */

import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "@/components/ui/button";

export default function AdminHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
              B
            </span>
            <span className="font-semibold text-slate-900">Admin Panel</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-indigo-600"
          >
            View Store
          </Link>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
