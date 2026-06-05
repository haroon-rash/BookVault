"use client";

/**
 * Book detail page actions — add selected book to cart.
 * Used on: /books/[id]
 */

import type { Book } from "@prisma/client";
import { useCart } from "@/providers/cart-provider";
import Button from "@/components/ui/button";

type Props = {
  book: Book;
};

export default function BookDetailActions({ book }: Props) {
  const { addToCart } = useCart();
  const outOfStock = book.quantity === 0;

  return (
    <Button
      type="button"
      size="lg"
      variant={outOfStock ? "secondary" : "primary"}
      disabled={outOfStock}
      onClick={() => addToCart(book)}
    >
      {outOfStock ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
