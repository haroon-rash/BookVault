"use client";

/**
 * Cart item list — renders all books in the cart or empty state.
 * Used on: /cart
 */

import { useCart } from "@/providers/cart-provider";
import CartItemRow from "./cart-item";

export default function CartList() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
        <p className="mt-1 text-sm text-slate-500">
          Browse our collection and add books you love.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}
