"use client";

/**
 * Single row in the admin inventory table — edit and delete actions.
 * Used by: components/admin/book-table.tsx
 */

import { useState } from "react";
import type { Book } from "@prisma/client";
import { deleteBook } from "@/actions/books";
import { applyActionFailure } from "@/lib/action-result";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

type Props = {
  book: Book;
  onEdit: (book: Book) => void;
  onError: (message: string) => void;
};

export default function BookRow({ book, onEdit, onError }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${book.title}"?`)) return;

    setLoading(true);
    onError("");

    const result = await deleteBook(book.id);
    setLoading(false);

    if (!result.success) {
      applyActionFailure(result, { setError: onError });
    }
  };

  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-4 pr-4 font-medium text-slate-900">{book.title}</td>
      <td className="py-4 pr-4 text-slate-600">{book.author}</td>
      <td className="py-4 pr-4">{formatPrice(book.price)}</td>
      <td className="py-4 pr-4">
        <Badge variant={book.quantity === 0 ? "danger" : "success"}>
          {book.quantity}
        </Badge>
      </td>
      <td className="py-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(book)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </td>
    </tr>
  );
}
