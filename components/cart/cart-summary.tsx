"use client";

/**
 * Cart order summary — subtotal and continue-shopping link.
 * Used on: /cart
 */

import Link from "next/link";
import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartSummary() {
  const { items, total } = useCart();

  if (items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-indigo-600">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-slate-500">
          Demo project — checkout is not implemented.
        </p>
        <Link href="/" className="block">
          <Button variant="primary" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
