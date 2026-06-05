"use client";

/**
 * Admin inventory table — lists books with inline edit form support.
 * Used on: /admin
 */

import { useState } from "react";
import type { Book } from "@prisma/client";
import Alert from "@/components/ui/alert";
import BookForm from "@/components/admin/book-form";
import BookRow from "@/components/admin/book-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  books: Book[];
};

export default function BookTable({ books }: Props) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [tableError, setTableError] = useState("");

  return (
    <div className="space-y-6">
      {tableError && <Alert variant="error">{tableError}</Alert>}

      {editingBook && (
        <BookForm
          editingBook={editingBook}
          onCancelEdit={() => setEditingBook(null)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventory ({books.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {books.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No books yet. Add your first book above.
            </p>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Title</th>
                  <th className="pb-3 pr-4 font-medium">Author</th>
                  <th className="pb-3 pr-4 font-medium">Price</th>
                  <th className="pb-3 pr-4 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <BookRow
                    key={book.id}
                    book={book}
                    onEdit={setEditingBook}
                    onError={setTableError}
                  />
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
