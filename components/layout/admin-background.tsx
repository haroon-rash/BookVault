/**
 * Full-screen background image wrapper for admin pages.
 * Used by: app/admin/layout.tsx
 */

import { PAGE_BACKGROUND } from "@/lib/constants";

export default function AdminBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PAGE_BACKGROUND}
        alt=""
        className="fixed inset-0 h-full w-full object-cover"
      />
      <div className="relative min-h-screen bg-slate-900/60">{children}</div>
    </div>
  );
}
