"use client";

/**
 * Client providers for the entire app — wraps children with CartProvider.
 */

import type { ReactNode } from "react";
import { CartProvider } from "@/providers/cart-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
