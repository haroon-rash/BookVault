"use client";

/**
 * Single cart line item — quantity controls and remove button.
 * Used by: components/cart/cart-list.tsx
 */

import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/providers/cart-provider";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-24 w-20 rounded-lg object-cover bg-slate-100"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.author}</p>
            <p className="mt-1 text-sm font-medium text-indigo-600">
              {formatPrice(item.price)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 text-sm hover:bg-slate-50"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm">{item.quantity}</span>
              <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.maxQuantity}
                className="px-3 py-1 text-sm hover:bg-slate-50 disabled:opacity-40"
              >
                +
              </button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <p className="font-semibold text-slate-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </CardContent>
    </Card>
  );
}
