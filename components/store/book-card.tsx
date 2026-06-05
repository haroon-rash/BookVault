"use client";

/**
 * Store catalog card — cover, price, stock badge, and add-to-cart.
 * Used by: components/store/book-grid.tsx
 */

import Link from "next/link";
import type { Book } from "@prisma/client";
import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { addToCart } = useCart();
  const outOfStock = book.quantity === 0;

  return (
    <Card className="group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <Badge variant="danger">Out of stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="space-y-3 p-4">
        <Link href={`/books/${book.id}`} className="block space-y-1">
          <h3 className="line-clamp-2 font-semibold text-slate-900 group-hover:text-indigo-700">
            {book.title}
          </h3>
          <p className="text-sm text-slate-500">{book.author}</p>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-indigo-600">
            {formatPrice(book.price)}
          </p>
          <Badge variant={outOfStock ? "danger" : "success"}>
            {outOfStock ? "0 left" : `${book.quantity} in stock`}
          </Badge>
        </div>

        <Button
          type="button"
          variant={outOfStock ? "secondary" : "primary"}
          className="w-full"
          disabled={outOfStock}
          onClick={() => addToCart(book)}
        >
          {outOfStock ? "Unavailable" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
