/**
 * Public store header — logo, nav, and cart button.
 * Used by: app/(store)/layout.tsx
 */

import Link from "next/link";
import Container from "@/components/ui/container";
import CartButton from "@/components/cart/cart-button";

export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              B
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">BookVault</p>
              <p className="text-xs text-slate-500">Curated collection</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm font-medium text-slate-600 hover:text-indigo-600 sm:inline"
            >
              Browse
            </Link>
            <CartButton />
          </nav>
        </div>
      </Container>
    </header>
  );
}
